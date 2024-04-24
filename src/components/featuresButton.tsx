"use client";

import { useReward } from "react-rewards";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export const FeatureButtons = ({
  tier,
  userSubscription,
}: {
  tier: string[];
  userSubscription: string;
}) => {
  const { reward: confettiReward } = useReward("confettiReward", "confetti");
  const { reward: emojiReward } = useReward("emojiReward", "emoji");
  const { reward: balloonsReward } = useReward("balloonsReward", "balloons");

  // Determine the index of the user's current subscription tier
  const userTierIndex = tier.findIndex(
    (t) => t.toLowerCase() === userSubscription.toLowerCase(),
  );

  return (
    <div className="mt-4">
      <div className="flex justify-center gap-4">
        {tier.map((tierName, index) => (
          <TooltipProvider key={tierName}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  size={"lg"}
                  className="text-center text-xl"
                  disabled={index > userTierIndex}
                  onClick={() => {
                    if (index === 0) confettiReward();
                    else if (index === 1) emojiReward();
                    else if (index === 2) balloonsReward();
                  }}
                >
                  <span
                    className="mr-2"
                    id={
                      index === 0
                        ? "confettiReward"
                        : index === 1
                          ? "emojiReward"
                          : "balloonsReward"
                    }
                  />
                  {tierName}
                </Button>
              </TooltipTrigger>
              {index > userTierIndex && (
                <TooltipContent>
                  <p>Upgrade to {tierName} to access this feature.</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};
