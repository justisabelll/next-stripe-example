import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { stripe } from "~/lib/stripe";
import type Stripe from "stripe";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { subcriptionStripeCustomers } from "~/server/db/schema";

// for these webhooks to work you need to run the follow command
// stripe listen -e customer.subscription.updated,customer.subscription.deleted,checkout.session.completed --forward-to http://localhost:3000/api/webhook
// what this does is listen for the events you specify and then forwards them to your localhost

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("stripe-signature");

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(
          `Webhook signature verification failed: ${error.message}`,
        );
      } else {
        console.error(
          "Webhook signature verification failed with unknown error type.",
        );
      }
      return NextResponse.json({ message: "Webhook Error" }, { status: 400 });
    }

    switch (event.type) {
      // in the event of a successful checkout
      case "checkout.session.completed":
        const session: Stripe.Checkout.Session = event.data.object;
        console.log(session);
        const userId = session.metadata?.user_id;
        const tier = session.metadata?.tier!.toLowerCase() as
          | "basic"
          | "none"
          | "essential"
          | "growth";

        if (!userId) {
          console.error("User ID is undefined.");
          return NextResponse.json(
            { message: "User ID is missing" },
            { status: 400 },
          );
        }

        await db
          .insert(subcriptionStripeCustomers)
          .values({
            userId: userId,
            stripeCustomerId: session.customer as string,
            currentSubStatus: "active",
            currentSubTier: tier,
          })
          .onDuplicateKeyUpdate({
            set: {
              stripeCustomerId: session.customer as string,
              currentSubStatus: "active",
              currentSubTier: tier,
            },
          });
        break;

      // in the event of a subscription being updated
      case "customer.subscription.updated":
        const subscription: Stripe.Subscription = event.data.object;
        const userIdUpdated = subscription.metadata?.user_id;
        const tierUpdated = subscription.metadata?.tier!.toLowerCase() as
          | "basic"
          | "none"
          | "essential"
          | "growth";

        if (!userIdUpdated) {
          console.error("User ID is undefined.");
          return NextResponse.json(
            { message: "User ID is missing" },
            { status: 400 },
          );
        }

        await db
          .update(subcriptionStripeCustomers)
          .set({
            currentSubTier: tierUpdated,
          })
          .where(eq(subcriptionStripeCustomers.userId, userIdUpdated));
        break;

      // in the event of a subscription being deleted
      case "customer.subscription.deleted":
        const subscriptionDeleted: Stripe.Subscription = event.data.object;
        const userIdDeleted = subscriptionDeleted.metadata?.user_id;

        if (!userIdDeleted) {
          console.error("User ID is undefined.");
          return NextResponse.json(
            { message: "User ID is missing" },
            { status: 400 },
          );
        }

        await db
          .update(subcriptionStripeCustomers)
          .set({
            currentSubStatus: "canceled",
            currentSubTier: "none",
          })
          .where(eq(subcriptionStripeCustomers.userId, userIdDeleted));
        break;

      default:
        console.log("Unhandled event type:", event.type);

      // there are many other events that can be handled
      // it is up to you based on your business logic
      // see https://stripe.com/docs/api/events/types

      // you can do things like send users emails if they
      // dont finish a checkout, or if they cancel a subscription
    }

    return NextResponse.json({ message: "success" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 },
      );
    }
  }
}
