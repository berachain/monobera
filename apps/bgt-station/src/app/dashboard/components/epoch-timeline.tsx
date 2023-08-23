"use client";

import React from "react";
import { usePollEpochs } from "@bera/berajs";
import { Card } from "@bera/ui/card";
import { Progress } from "@bera/ui/progress";
import { formatDistance } from "date-fns";

export function EpochTimeline() {
  const { useCurrentEpoch } = usePollEpochs();
  const currentEpoch = useCurrentEpoch();

  const duration = (s: number) =>
    formatDistance(0, s, { includeSeconds: true });

  return (
    <Card className=" w-full p-8 py-[39px]">
      <div className="flex h-8 items-center gap-3">
        <div className="font-semi text-3xl font-semibold">
          {currentEpoch?.current ?? 0}
        </div>
        <div className="flex-1">
          <div className="mb-1 flex justify-between text-xs font-medium text-muted-foreground">
            {/* <span>{0.toFixed(2)}%</span> */}
            <span>
              {/* {currentEpoch
                ? duration(currentEpoch.endTime - currentEpoch.startTime)
                : "0d"}{" "} */}
              remaining
            </span>
          </div>
          <Progress className="h-2" value={0} />
        </div>
        <div className="font-semi text-3xl font-semibold text-muted-foreground">
          {currentEpoch?.current ? currentEpoch?.current + 1 : "0"}
        </div>
      </div>
    </Card>
  );
}
