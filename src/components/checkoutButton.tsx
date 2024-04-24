"use client";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

// sub button
export default function CheckoutButton({
  stripePriceId,
  label,
  user,
  tier,
  isDiabled,
}: {
  stripePriceId: string;
  label: string;
  user?: { email: string; id: string };
  tier: string;
  isDiabled: boolean;
}) {
  const handleCheckout = async () => {
    if (!user) {
      toast.error("You must be logged in to a make a purchase.");
      return;
    }

    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    );
    const stripe = await stripePromise;

    const response = await fetch("/api/subs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // we will use all of these in our webhooks
        priceId: stripePriceId,
        email: user.email,
        userId: user.id,
        tier: tier,
      }),
    });

    const stripeSession = (await response.json()) as { id: string };
    await stripe?.redirectToCheckout({ sessionId: stripeSession.id });
  };

  return (
    <Button disabled={isDiabled} onClick={handleCheckout}>
      {label}
    </Button>
  );
}
