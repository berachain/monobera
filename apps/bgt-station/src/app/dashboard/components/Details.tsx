import React from "react";
import { usePollActiveValidators, type Validator } from "@bera/berajs";
import { Card } from "@bera/ui/card";

import { bgtDetails as details } from "../constants";
import { Stats } from "./Stats";
import { EpochTimeline } from "./epoch-timeline";

export function Details() {
  const { useActiveValidators } = usePollActiveValidators();
  const validators: Validator[] = useActiveValidators();
  const generalInfo = [
    {
      amount: validators.length,
      text: "Total validators",
    },
    {
      amount: "34%",
      text: "Average staker APY",
    },
    {
      amount: "999.99M",
      text: "Total BGT supply",
    },
  ];
  return (
    <div className="mb-10 mt-8 flex flex-col gap-5">
      <div className="flex w-full gap-2">
        <div className="basis-2/5">
          <EpochTimeline />
        </div>
        {generalInfo.map((info, index) => (
          <Card className="basis-1/5 p-8 text-center" key={index}>
            <div className="text-2xl font-semibold leading-loose text-foreground">
              {info.amount}
            </div>
            <div className="text-sm font-medium leading-[14px] text-muted-foreground">
              {info.text}
            </div>
          </Card>
        ))}
      </div>
      <Stats stats={details.stats} />
    </div>
  );
}
