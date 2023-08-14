import React from "react";
import { Tooltip } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";

export default function Uptime() {
  return (
    <div className="flex w-2/5 min-w-[353px] flex-col gap-4 text-lg font-semibold leading-7">
      <div className="flex items-center gap-1">
        Uptime <Tooltip text="uptime" />
      </div>
      <Card className="flex flex-col p-8">
        <div className=" text-sm font-normal leading-normal text-muted-foreground">
          no idea what this is
        </div>
        <div className="w-full text-sm font-normal leading-normal text-muted-foreground">
          Last 100 blocks
        </div>
      </Card>
    </div>
  );
}
