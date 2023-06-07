import React from "react";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Progress } from "@bera/ui/progress";

export function EpochTimeline({
  epoch,
}: {
  epoch: { current: number; progress: number };
}) {
  return (
    <Card>
      <CardHeader className="pb-1">
        <h3 className="text-md font-semibold text-backgroundSecondary">
          Epoch
        </h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-5">
          <div className="font-semi text-3xl font-semibold">
            {epoch.current}
          </div>
          <div className="flex-1">
            <div className="mb-2 flex justify-between text-sm font-semibold text-backgroundSecondary">
              <span>{epoch.progress}%</span>
              <span>ETA 1d 4h</span>
            </div>
            <Progress className="h-2" value={epoch.progress} />
          </div>
          <div className="font-semi text-3xl font-semibold text-backgroundSecondary">
            {epoch.current + 1}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
