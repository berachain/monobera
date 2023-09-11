"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import {
  formatter,
  usePollActiveValidators,
  usePollBgtSupply,
  usePollGlobalValidatorBribes,
} from "@bera/berajs";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";

import { cloudinaryUrl } from "~/config";
import { useGlobalValidatorGaugeWeight } from "~/hooks/useGaugeWeights";
import { usePollPrices } from "~/hooks/usePollPrices";
import ValidatorsTable from "./validators-table";

function calculatePercentageChange(
  oldValue: number | undefined,
  newValue: number | undefined,
) {
  if (
    oldValue === undefined ||
    newValue === undefined ||
    oldValue === 0 ||
    newValue === 0
  ) {
    return "0%";
  }
  if (oldValue === 0) {
    if (newValue > 0) {
      return "+∞%";
    } else if (newValue < 0) {
      return "-∞%";
    } else {
      return "0%";
    }
  }

  const percentageChange = ((newValue - oldValue) / Math.abs(oldValue)) * 100;

  if (percentageChange > 0) {
    return `+${percentageChange.toFixed(2)}%`;
  } else if (percentageChange < 0) {
    return `${percentageChange.toFixed(2)}%`;
  } else {
    return "0%";
  }
}

// Example usage
const oldValue = 50;
const newValue = 75;
const percentageChange = calculatePercentageChange(oldValue, newValue);
console.log(`Percentage Change: ${percentageChange}`);

export default function Validators({
  activeGauges,
}: {
  activeGauges: number;
  oldBgtSupply: number | undefined;
}) {
  const { useTotalValidators, isLoading: isActiveValidatorsLoading } = usePollActiveValidators();
  const totalValidators: number = useTotalValidators();
  const { useBgtSupply } = usePollBgtSupply();
  const currentSupply = useBgtSupply();
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { useGlobalActiveBribeValue, isLoading: isGlobalBribeLoading } = usePollGlobalValidatorBribes(prices);
  const totalBribeValue = useGlobalActiveBribeValue();
  const { data, isLoading } = useGlobalValidatorGaugeWeight();

  const inflation = useMemo(() => {
    if (data === undefined || currentSupply === undefined) return 0;
    const projectedBGTPerYear = data?.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
    const inflation = ((projectedBGTPerYear ?? 0) / currentSupply) * 100;
    return inflation;
  }, [data, currentSupply]);

  const generalInfo = [
      {
        amount: isActiveValidatorsLoading ? (
          <Skeleton className="mb-2 h-10 w-full" />
        ) : (
          totalValidators
        ),
        text: "Total validators",
      },
      {
        amount: isGlobalBribeLoading ? (
          <Skeleton className="mb-2 h-10 w-full" />
        ) : (
          "$" +( totalBribeValue === undefined ? '0.00' : formatter.format(totalBribeValue))
        ),
        text: "In bribe rewards",
      },
      {
        amount: isLoading ? (
          <Skeleton className="mb-2 h-10 w-full" />
        ) : (
          inflation.toFixed(4) + "%"
        ),
        text: "BGT inflation rate",
      },
      {
        amount: 
          activeGauges,
        text: "Active gauges",
      },
    ];

  return (
    <div className="container mb-10 max-w-[1078px]">
      <div className="p-8 text-center">
        <Image
          className="mx-auto"
          src={`${cloudinaryUrl}/bears/n0irsbetrzmredmmu82c`}
          alt="bera banner"
          width={449.32}
          height={174}
        />
        <div className="text-center text-3xl font-extrabold leading-[48px] text-foreground md:text-5xl">
          Validators
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {generalInfo.map((info, index) => (
          <Card className="p-8 text-center" key={info.text + index}>
            <div className="text-2xl font-semibold leading-loose text-foreground">
              {info.amount}
            </div>
            <div className="text-sm font-medium leading-[14px] text-muted-foreground">
              {info.text}
            </div>
          </Card>
        ))}
      </div>
      <ValidatorsTable />
    </div>
  );
}
