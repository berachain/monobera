"use client";

import React from "react";
import { usePollEpochs } from "@bera/berajs";
import { Card } from "@bera/ui/card";
import { Progress } from "@bera/ui/progress";

export function EpochTimeline() {
  const { useCurrentEpoch } = usePollEpochs();
  const currentEpoch = useCurrentEpoch();
  return (
    <Card className=" w-full p-8 py-[39px]">
      <div className="flex h-8 items-center gap-3">
        <div className="font-semi text-3xl font-semibold">{currentEpoch}</div>
        <div className="flex-1">
          <div className="mb-1 flex justify-between text-xs font-medium text-muted-foreground">
            <span>{50}%</span>
            <span>1d 4h remaining</span>
          </div>
          <Progress className="h-2" value={50} />
        </div>
        <div className="font-semi text-3xl font-semibold text-muted-foreground">
          {currentEpoch + 1}
        </div>
      </div>
    </Card>
  );
}
