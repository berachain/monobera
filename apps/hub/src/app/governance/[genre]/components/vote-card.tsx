import React from "react";
import { Card } from "@bera/ui/card";
import { cn } from "@bera/ui";

interface IVoteCard {
  abstainPercentage: string;
  noPercentage: string;
  yesPercentage: string;
}

const VotePercentage = ({
  percentage,
  type,
}: { percentage: number; type: "yes" | "no" | "abstain" }) => {
  const color =
    type === "yes"
      ? "text-success-foreground"
      : type === "no"
        ? "text-destructive-foreground"
        : "text-muted-foreground";
  return (
    <div className="flex flex-1 flex-col items-center border-r border-border last:border-r-0 sm:w-[140px]">
      <div
        className={cn("text-lg font-semibold leading-none sm:text-xl", color)}
      >
        {Math.round(percentage * 100 ?? 0)}%
      </div>
      <div className="flex capitalize items-center text-xs font-medium leading-none text-muted-foreground sm:text-sm">
        {type}
      </div>
    </div>
  );
};
export function VoteCard({
  abstainPercentage,
  noPercentage,
  yesPercentage,
}: IVoteCard) {
  return (
    <Card className="flex w-full grow p-3">
      <VotePercentage percentage={Number(yesPercentage)} type="yes" />
      <VotePercentage percentage={Number(noPercentage)} type="no" />
      <VotePercentage percentage={Number(abstainPercentage)} type="abstain" />
    </Card>
  );
}
