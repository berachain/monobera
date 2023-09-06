"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { usePollGlobalValidatorBribes, type PoLValidator } from "@bera/berajs";
import { formatter } from "@bera/berajs/src/utils";
import { TokenIconList, ValidatorIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { formatCommission } from "~/utils/formatCommission";
import YellowCard from "~/components/yellow-card";
import { usePollPrices } from "~/hooks/usePollPrices";

export default function ValidatorCard({
  validator,
}: {
  validator: PoLValidator;
}) {
  const router = useRouter();
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { useValidatorvAPY, useValidatorTotalActiveBribeValue } =
    usePollGlobalValidatorBribes(prices);
  const bribeValue = useValidatorTotalActiveBribeValue(validator.operatorAddr);
  const vApy = useValidatorvAPY(validator.operatorAddr);
  const info = [
    {
      amount: `$${formatter.format(Number(bribeValue ?? 0))}`,
      text: "Bribe value",
    },
    {
      amount:
        formatter.format(Number(formatUnits(BigInt(validator.tokens), 18))) +
        " BGT",
      text: "Voting power",
    },
    {
      amount: formatCommission(validator.commission.commissionRates.rate) + "%",
      text: "Commission",
    },
    {
      amount: `${vApy?.toFixed(2) ?? 0}%`,
      text: "vAPY",
    },
  ];
  return (
    <YellowCard className="flex flex-1 flex-col gap-8 p-6">
      <div className="flex w-full gap-2">
        <ValidatorIcon
          address={validator.operatorAddr as Address}
          className="h-8 w-8"
        />
        <div className="text-lg font-semibold leading-7 text-foreground">
          {validator.description.moniker}
        </div>
      </div>
      <div className="w-full">
        <TokenIconList tokenList={validator.bribeTokenList ?? []} size="xl" />
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        {" "}
        {info.map((value, index) => (
          <YellowCard className="w-full gap-0 bg-muted px-4 py-2" key={index}>
            <div className="w-full text-xs font-medium leading-tight text-muted-foreground">
              {value.text}
            </div>
            <div className="w-full text-base font-medium leading-normal text-foreground">
              {value.amount}
            </div>
          </YellowCard>
        ))}
      </div>

      <Button
        className="w-full border-border bg-muted text-foreground"
        variant="outline"
        onClick={() =>
          router.push(
            `/delegate?action=delegate&validator=${validator.operatorAddr}`,
          )
        }
      >
        Delegate
      </Button>
    </YellowCard>
  );
}

export function SkeletonValidatorCard() {
  return (
    <YellowCard className="flex flex-1 flex-col gap-8 p-6">
      <div className="flex w-full items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="w-full">
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="grid w-full grid-cols-2 gap-4">
        {" "}
        {[0, 0, 0, 0].map((_, index) => (
          <YellowCard className="w-full gap-0 px-4 py-2" key={index}>
            <Skeleton className="mb-1 h-5 w-[80px]" />
            <Skeleton className="h-5 w-[80px]" />
          </YellowCard>
        ))}
      </div>

      <Skeleton className="h-11 w-full" />
    </YellowCard>
  );
}
