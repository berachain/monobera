import React from "react";
import {
  formatter,
  usePollActiveValidators,
  usePollBgtSupply,
  usePollGlobalValidatorBribes,
} from "@bera/berajs";
import { Card } from "@bera/ui/card";

import { usePollPrices } from "~/hooks/usePollPrices";
import { EpochTimeline } from "./epoch-timeline";
import { Stats } from "./stats";

export function Details({
  avgValidatorUptime,
}: {
  avgValidatorUptime: string;
}) {
  const { useTotalValidators } = usePollActiveValidators();
  const total = useTotalValidators();
  const { useBgtSupply } = usePollBgtSupply();
  const bgtSupply = useBgtSupply();
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { useGlobalAvgApy } = usePollGlobalValidatorBribes(prices);
  const avgApy = useGlobalAvgApy();
  const generalInfo = [
    {
      amount: Number.isNaN(total) ? 0 : total,
      text: "Active validators",
    },
    {
      amount: `${avgApy?.toFixed(2) ?? 0}%`,
      text: "Average APY",
    },
    {
      amount: `${formatter.format(Number(bgtSupply ?? 0))} BGT`,
      text: "Total BGT supply",
    },
  ];
  return (
    <div className="mb-10 mt-8 flex w-full flex-col gap-2 lg:gap-5">
      <div className="flex w-full flex-col gap-2 lg:flex-row ">
        <div className="flex-shrink-0 lg:w-[360px]">
          <EpochTimeline />
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row">
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
      </div>
      <Stats avgValidatorUptime={avgValidatorUptime} />
    </div>
  );
}
