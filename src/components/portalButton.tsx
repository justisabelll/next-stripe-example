"use client";

import { createPortalSession } from "~/server/actions";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

export default function PortalButton({
  userId,
  customerId,
}: {
  userId: string;
  customerId: string;
}) {
  const handleClick = async () => {
    try {
      if (!userId) {
        toast.error("You must be logged in to access the portal.");
        return;
      }
      if (!customerId || customerId === "") {
        toast.error("You must have a subscription to access the portal.");
        return;
      }

      // this has to be activated at https://dashboard.stripe.com/test/settings/billing/portal to work in test mode
      const { url } = await createPortalSession(customerId);

      window.location.href = url;
    } catch (error) {
      console.error(error);
      toast.error("There was an error creating the portal session.");
    }
  };
  return (
    <Button
      className="m-2 text-lg  underline hover:text-primary/70"
      variant="ghost"
      onClick={handleClick}
    >
      Manage Subscription
    </Button>
  );
}
