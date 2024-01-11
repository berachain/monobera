import React from "react";
import {
  formatter,
  usePollActiveValidators,
  usePollBgtSupply,
  usePollGlobalValidatorBribes,
  usePollPrices,
} from "@bera/berajs";
import { BribeApyTooltip } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";

import { EpochTimeline } from "./epoch-timeline";

export function Details() {
  const { useTotalValidators } = usePollActiveValidators();
  const total = useTotalValidators();
  const { useBgtSupply } = usePollBgtSupply();
  const bgtSupply = useBgtSupply();
  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();
  const { useGlobalAvgApy } = usePollGlobalValidatorBribes(prices);
  const avgApy = useGlobalAvgApy();

  const generalInfo = [
    {
      amount:
        total === undefined || Number.isNaN(total) ? (
          <Skeleton className="mb-2 h-8 w-20" />
        ) : (
          total
        ),
      text: "Active Validators",
    },
    {
      amount:
        avgApy === undefined ? (
          <Skeleton className="mb-2 h-8 w-20" />
        ) : (
          `${avgApy?.toFixed(2)}%`
        ),
      text: "Average Bribe APY",
    },
    {
      amount:
        bgtSupply === undefined ? (
          <Skeleton className="mb-2 h-8 w-20" />
        ) : (
          `${formatter.format(Number(bgtSupply))} BGT`
        ),
      text: "Total BGT Supply",
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
              <div className="flex h-8 items-center justify-center text-2xl font-semibold leading-loose text-foreground whitespace-nowrap">
                {info.amount}
              </div>
              <div className="flex flex-row items-center justify-center gap-1 self-center text-center text-sm font-medium leading-[14px] text-muted-foreground">
                {info.text}{" "}
                {info.text === "Average Bribe APY" && <BribeApyTooltip />}
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* <Stats avgValidatorUptime={avgValidatorUptime} /> */}
    </div>
  );
}
