import React from "react";
import {
  formatter,
  usePollActiveValidators,
  usePollBgtSupply,
} from "@bera/berajs";
import { Card } from "@bera/ui/card";

import { EpochTimeline } from "./epoch-timeline";
import { Stats } from "./stats";

export function Details() {
  const { useTotalValidators } = usePollActiveValidators();
  const total = useTotalValidators();
  const { useBgtSupply } = usePollBgtSupply();
  const bgtSupply = useBgtSupply();
  const generalInfo = [
    {
      amount: total,
      text: "Total validators",
    },
    {
      amount: "34%",
      text: "Average APY",
    },
    {
      amount: `${formatter.format(Number(bgtSupply ?? 0))} BGT`,
      text: "Total BGT supply",
    },
  ];
  return (
    <div className="mb-10 mt-8 flex w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-2 md:flex-row">
        <div className="md:w-[360px] ">
          <EpochTimeline />
        </div>
        {generalInfo.map((info, index) => (
          <Card key={index} className="h-full flex-1 p-8 text-center">
            <div className="flex h-8 items-center justify-center text-2xl font-semibold leading-loose text-foreground">
              {info.amount}
            </div>
            <div className="text-sm font-medium leading-[14px] text-muted-foreground">
              {info.text}
            </div>
          </Card>
        ))}
      </div>
      <Stats />
    </div>
  );
}
