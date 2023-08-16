import React from "react";
import { Timeblock, Tooltip } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";

export default function Uptime() {
  return (
    <div className="flex w-full flex-col gap-4 text-lg font-semibold leading-7 md:w-2/5 md:min-w-[353px]">
      <div className="flex items-center gap-1">
        Uptime <Tooltip text="uptime" />
      </div>
      <Card className="flex flex-col items-center gap-4 p-8">
        <div className="grid w-[278px] grid-cols-10 gap-4 text-sm font-normal leading-normal text-muted-foreground">
          {Array.from({ length: 100 }, (_, i) => i + 1).map((number) => (
            <Timeblock
              key={number}
              text="March 21, 2023"
              blockDown={Boolean(Math.random() >= 0.95)}
            />
          ))}
        </div>
        <div className="w-[278px] text-right text-sm font-normal leading-normal text-muted-foreground">
          Last 100 blocks
        </div>
      </Card>
    </div>
  );
}
