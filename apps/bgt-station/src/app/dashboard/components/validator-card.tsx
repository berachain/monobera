"use client";

import React from "react";
import Link from "next/link";
import {
  usePollGlobalValidatorBribes,
  usePollPrices,
  type PoLValidator,
} from "@bera/berajs";
import { formatter } from "@bera/berajs/src/utils";
import { BribeApyTooltip, TokenIconList, ValidatorIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { formatCommission } from "~/utils/formatCommission";

export default function ValidatorCard({
  validator,
  keyword,
}: {
  validator: PoLValidator;
  keyword: string;
}) {
  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();
  const { useValidatorvAPY, useValidatorTotalActiveBribeValue } =
    usePollGlobalValidatorBribes(prices);
  const bribeValue = useValidatorTotalActiveBribeValue(validator.operatorAddr);
  const vApy = useValidatorvAPY(validator.operatorAddr);
  const formattedBGTRewards =
    validator.tokens < 0.01
      ? "< 0.01"
      : formatter.format(parseFloat(formatUnits(BigInt(validator.tokens), 18)));
  const info = [
    {
      amount: `${String(vApy?.toFixed(2) ?? 0)}%`,
      text: "APY",
    },
    {
      amount: `$${formatter.format(Number(bribeValue ?? 0))}`,
      text: "Bribe value",
    },
    {
      amount: `${formattedBGTRewards.toString()} BGT`,
      text: "Voting power",
    },
    {
      amount: `${formatCommission(validator.commission.commissionRates.rate)}%`,
      text: "Commission",
    },
  ];
  console.log("validatorrrrr", validator, validator?.description?.identity);
  return (
    <div className="col-span-1 mx-auto flex w-full max-w-[275px] flex-col justify-end overflow-hidden rounded-xl border border-border bg-background shadow">
      <div className="flex flex-col items-center justify-center gap-1 p-6 pb-4">
        <ValidatorIcon
          address={validator?.description?.identity ?? undefined}
          className="h-12 w-12"
        />
        <div className="flex h-12 w-full items-center justify-center font-medium text-muted-foreground">
          {validator.description.moniker.length > 25
            ? `${validator.description.moniker.slice(0, 25)}...`
            : validator.description.moniker}
        </div>
        {!validator.bribeTokenList || validator.bribeTokenList.length === 0 ? (
          <div className="h-8 font-medium text-muted-foreground">
            ~ No bribes ~
          </div>
        ) : (
          <TokenIconList tokenList={validator.bribeTokenList ?? []} size="xl" />
        )}

        <div className="flex h-7 gap-2 text-center text-xl font-semibold">
          {info.find((data) => data.text === keyword)?.amount ?? "0"}
        </div>
      </div>

      <div className="flex flex-col gap-1 bg-muted px-6 py-3">
        <div className=" flex justify-between">
          <div className="flex flex-row items-center gap-1 text-sm font-medium text-muted-foreground">
            {info[0]!.text} <BribeApyTooltip />
          </div>
          <div
            className={cn(
              "text-sm font-medium",
              bribeValue > 0
                ? "text-success-foreground"
                : "text-muted-foreground",
            )}
          >
            {info[0]!.amount}
          </div>
        </div>
        {info.slice(1).map((data, index) => (
          <div key={index} className=" flex justify-between">
            <div className="text-sm font-medium text-muted-foreground">
              {data.text}
            </div>
            <div className="text-sm font-medium">{data.amount}</div>
          </div>
        ))}
      </div>

      <div className="w-full bg-muted p-3">
        <div className="flex gap-1">
          <Link
            href={`/delegate?action=delegate&validator=${validator.operatorAddr}`}
          >
            <Button className="w-fit py-[10px]">
              <Icons.add className="h-6 w-6" />
            </Button>
          </Link>
          <Link
            href={`/validators/${validator.operatorAddr}`}
            className="w-full"
          >
            <Button className="h-11 w-full" variant={"secondary"}>
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SkeletonValidatorCard() {
  return (
    <div className="col-span-1 flex w-full max-w-[275px] flex-col rounded-xl bg-background">
      <div className="flex flex-col items-center gap-1 px-6 pb-4 pt-6">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-7 w-full" />
      </div>
      <div className="flex flex-col gap-1 bg-muted px-6 py-3">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <div className="flex w-full gap-1 bg-muted p-3 pt-6 ">
        <Skeleton className="h-[44px] w-14 flex-shrink-0" />
        <Skeleton className="h-[44px] w-full" />
      </div>
    </div>
  );
}
