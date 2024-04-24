import { Button } from "~/components/ui/button";
import CheckoutButton from "~/components/checkoutButton";
import PortalButton from "~/components/portalButton";
import Link from "next/link";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { subcriptionStripeCustomers } from "~/server/db/schema";
import { FeatureButtons } from "~/components/featuresButton";

interface Subscription {
  name: string;
  id: string;
  stripePriceId: string;
  price: { monthly: string; annually: string };
  description: string;
  features: string[];
  callToAction: string;
}

const tiers = [
  {
    name: "Basic",
    id: "tier-basic",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!,
    price: { monthly: "$15", annually: "$12" },
    description: "Everything necessary to get started.",
    features: [
      "Access to the basic button",
      "Tell your friends",
      "Bragging rights",
    ],
    callToAction: "Subscribe",
  },
  {
    name: "Essential",
    id: "tier-essential",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ESSENTIAL_PRICE_ID!,
    price: { monthly: "$20", annually: "$18" },
    description:
      "Everything in Basic, plus essential tools for growing your business.",
    features: [
      "Access to the basic button",
      "Access to the essential button",
      "Tell your friends",
      "Bragging rights",
    ],
    callToAction: "Subscribe",
  },
  {
    name: "Growth",
    id: "tier-growth",
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_GROWTH_PRICE_ID!,
    price: { monthly: "$60", annually: "$48" },
    description:
      "Everything in Essential, plus collaboration tools and deeper insights.",
    features: [
      "Access to the basic button",
      "Access to the essential button",
      "Access to the growth button",
      "Tell your friends",
      "Bragging rights",
    ],
    callToAction: "Subscribe",
  } as Subscription,
];

export default async function Subscriptions() {
  const session = await auth();

  const user =
    session?.user?.email && session?.user?.id
      ? { email: session.user.email, id: session.user.id }
      : undefined;

  const customer = await db
    .select()
    .from(subcriptionStripeCustomers)
    .where(eq(subcriptionStripeCustomers.userId, user?.id ?? ""));

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between ">
        <div>
          <Button
            variant="link"
            className="text-xl underline hover:text-primary/70"
          >
            <Link href="/">Back Home</Link>
          </Button>
        </div>
        <div>
          <PortalButton
            userId={user?.id ?? ""}
            customerId={customer[0]?.stripeCustomerId ?? ""}
          />
        </div>
      </div>

      <div className="py-12 sm:py-24">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Subcription Pricing Page
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
            Walkthrough checkout like a customer.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8  sm:text-center">
          Pressing any of the buttons below will take you to the respective plan
          payment page.
        </p>
        <SubscriptionsPricing user={user} />
      </div>
      <div className="text-center text-xl font-semibold">
        <p>Unlock full access to all features by subscribing now!</p>
      </div>
      <FeatureButtons
        tier={tiers.map((tier) => tier.name)}
        userSubscription={customer[0]?.currentSubTier ?? "none"}
      />
    </div>
  );
}

const SubscriptionsPricing = async ({
  user,
  subscription,
}: {
  user: { email: string; id: string } | undefined;
  subscription?: string;
}) => {
  const tierOrder = ["none", "basic", "essential", "growth"];

  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                <h3 id={tier.id} className="text-base font-semibold leading-7 ">
                  {tier.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight">
                    {tier.price.monthly}
                  </span>
                  <span className="text-sm font-semibold leading-6">
                    /month
                  </span>
                </p>
                <p className="mt-3 text-sm leading-6 ">
                  {tier.price.annually} per month if paid annually
                </p>

                <CheckoutButton
                  isDiabled={
                    tierOrder.indexOf(tier.name) <=
                    tierOrder.indexOf(subscription!)
                  }
                  stripePriceId={tier.stripePriceId}
                  tier={tier.name}
                  label={tier.callToAction}
                  user={user}
                />
                <p className="mt-10 text-sm font-semibold leading-6">
                  {tier.description}
                </p>
                <ul role="list" className="mt-6 space-y-3 text-sm leading-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
