"use client";

import React from "react";
import Image from "next/image";
import {
  formatter,
  usePollActiveValidators,
  usePollBgtSupply,
  usePollGlobalValidatorBribes,
} from "@bera/berajs";
import { Card } from "@bera/ui/card";

import { cloudinaryUrl } from "~/config";
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
  oldBgtSupply,
}: {
  activeGauges: number;
  oldBgtSupply: number | undefined;
}) {
  const { useTotalValidators } = usePollActiveValidators();
  const totalValidators: number = useTotalValidators();
  const { useBgtSupply } = usePollBgtSupply();
  const currentSupply = useBgtSupply();
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { useGlobalActiveBribeValue } = usePollGlobalValidatorBribes(prices);
  const totalBribeValue = useGlobalActiveBribeValue();
  const percentage = calculatePercentageChange(oldBgtSupply, currentSupply);
  const generalInfo = [
    {
      amount: Number.isNaN(totalValidators) ? 0 : totalValidators,
      text: "Total validators",
    },
    {
      amount: `$${
        totalBribeValue === undefined ? 0 : formatter.format(totalBribeValue)
      }`,
      text: "In bribe rewards",
    },
    {
      amount: percentage,
      text: "BGT inflation rate",
    },
    {
      amount: `${activeGauges}`,
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
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
