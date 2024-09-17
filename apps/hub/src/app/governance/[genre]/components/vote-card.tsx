import React from "react";
import { Card } from "@bera/ui/card";

interface IVoteCard {
  abstainPercentage: number;
  noPercentage: number;
  yesPercentage: number;
}

export function VoteCard({
  abstainPercentage,
  noPercentage,
  yesPercentage,
}: IVoteCard) {
  return (
    <Card className="flex w-full p-3">
      <div className="flex flex-1 flex-col items-center gap-2 border-r border-border sm:w-[140px]">
        <div className="text-lg font-semibold leading-9 text-success-foreground sm:text-3xl">
          {Math.round(yesPercentage ?? 0)}%
        </div>
        <div className="flex items-center gap-0.5 text-xs font-medium leading-[14px] text-muted-foreground sm:text-sm">
          Yes
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 border-r border-border sm:w-[140px]">
        <div className="text-lg font-semibold leading-9 text-destructive-foreground sm:text-3xl">
          {Math.round(noPercentage ?? 0)}%
        </div>
        <div className="flex items-center gap-0.5 text-xs font-medium leading-[14px] text-muted-foreground sm:text-sm">
          No
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center gap-2 sm:w-[140px]">
        <div className="text-lg font-semibold leading-9 text-muted-foreground sm:text-3xl">
          {Math.round(abstainPercentage ?? 0)}%
        </div>
        <div className="flex items-center gap-0.5 text-xs font-medium leading-[14px] text-muted-foreground sm:text-sm">
          Abstain
        </div>
      </div>
    </Card>
  );
}
