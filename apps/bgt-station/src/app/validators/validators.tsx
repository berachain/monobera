"use client";

import React from "react";
import { usePollGlobalData, usePollValidatorInfo } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import ValidatorsTable from "./components/validators-table";

export default function Validators() {
  const { validatorCounts, isLoading } = usePollValidatorInfo();
  const { data } = usePollGlobalData();
  const generalInfo = [
    {
      amount: validatorCounts,
      text: "Total Validators",
      img: (
        <div className="absolute bottom-3 right-3">
          <Icons.valiCounts />
        </div>
      ),
    },
    {
      amount: "$130.123",
      text: "Total Active Incentives",
      img: (
        <div className="absolute bottom-3 right-3">
          <Icons.celebrateIcons />
        </div>
      ),
    },
    {
      amount: (
        <FormattedNumber
          value={data?.bgtInfo?.bgtInflation ?? 0}
          percent
          showIsSmallerThanMin
        />
      ),
      text: "BGT Inflation",
      img: (
        <div className="absolute bottom-0 right-0">
          <Icons.inflationIcons />
        </div>
      ),
    },
    {
      amount: "15",
      text: "Active gauges",
      img: (
        <div className="absolute bottom-0 right-3">
          <Icons.clockIcons />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {generalInfo.map((info, index) => (
          <Card
            className="relative h-[150px] border-border bg-muted p-6 text-left"
            key={info.text + index}
          >
            <div className="text-xs font-medium leading-[14px] text-muted-foreground">
              {info.text}
            </div>
            {isLoading ? (
              <Skeleton className="mt-4 h-[45px] w-[120px]" />
            ) : (
              <div className="mt-4 text-2xl font-semibold leading-loose text-foreground">
                {info.amount}
              </div>
            )}
            {info.img}
          </Card>
        ))}
      </div>
      <ValidatorsTable />
    </div>
  );
}
