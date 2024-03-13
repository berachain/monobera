"use client";

import React from "react";
import Image from "next/image";
import {
  formatter,
  usePollActiveValidators,
  usePollGlobalValidatorBribes,
} from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";

import ValidatorsTable from "./validators-table";

export default function Validators({
  activeGauges,
  bgtSupply,
}: {
  activeGauges: number;
  bgtSupply: number;
}) {
  const { useTotalValidators, isLoading: isActiveValidatorsLoading } =
    usePollActiveValidators();
  const totalValidators: number = useTotalValidators();
  const prices = undefined;
  const { useGlobalActiveBribeValue, isLoading: isGlobalBribeLoading } =
    usePollGlobalValidatorBribes(prices);
  const totalBribeValue = useGlobalActiveBribeValue();

  const isDataLoading = isActiveValidatorsLoading || isGlobalBribeLoading;
  const generalInfo = [
    {
      amount: isDataLoading ? (
        <Skeleton className="mb-2 h-10 w-full" />
      ) : (
        totalValidators
      ),
      text: "Total validators",
    },
    {
      amount: isDataLoading ? (
        <Skeleton className="mb-2 h-10 w-full" />
      ) : (
        `$${
          totalBribeValue === undefined || Number.isNaN(totalBribeValue)
            ? "0.00"
            : formatter.format(totalBribeValue)
        }`
      ),
      text: "In bribe rewards",
    },
    {
      amount: isDataLoading ? (
        <Skeleton className="mb-2 h-10 w-full" />
      ) : (
        `${bgtSupply.toFixed(2)}%`
      ),
      text: "BGT inflation rate",
    },
    {
      amount: isDataLoading ? (
        <Skeleton className="mb-2 h-10 w-full" />
      ) : (
        activeGauges
      ),
      text: "Active gauges",
    },
  ];

  return (
    <div>
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
