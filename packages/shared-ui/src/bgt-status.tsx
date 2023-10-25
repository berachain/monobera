"use client";

import React from "react";
import {
  formatter,
  usePollBgtBalance,
  usePollDelegatorUnbonding,
  usePollPrices,
  usePollTotalDelegated,
} from "@bera/berajs";
import { beraTokenAddress, bgtTokenAddress } from "@bera/config";
import { Skeleton } from "@bera/ui/skeleton";

import { TokenIcon } from "./token-icon";

export function BGTStatus() {
  const { usePrice } = usePollPrices();
  const { data: price } = usePrice(beraTokenAddress);
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  const { useTotalDelegatorDelegated } = usePollTotalDelegated();
  const total = useTotalDelegatorDelegated();
  const { useDelegatorTotalUnbonding } = usePollDelegatorUnbonding();
  const totalUnbonding = useDelegatorTotalUnbonding();

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-5">
        <div className="flex gap-4">
          <TokenIcon address={bgtTokenAddress} fetch size="2xl" />
          <div className="font-medium">
            <div className="flex-1 text-sm font-medium leading-6">
              {formatter.format(Number(userBalance))} BGT
            </div>
            <div className="text-sm font-medium leading-6 text-muted-foreground">
              Available
            </div>
          </div>
        </div>
        <div className="whitespace-nowrap text-sm font-medium">
          {userBalance && price ? (
            "$" + formatter.format(Number(userBalance) * Number(price))
          ) : (
            <Skeleton className="h-8 w-16" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="flex gap-4">
          <TokenIcon address={bgtTokenAddress} fetch size="2xl" />
          <div className="font-medium">
            <div className="flex-1 text-sm font-medium leading-6">
              {formatter.format(total ?? 0)} BGT
            </div>
            <div className="text-sm font-medium leading-6 text-muted-foreground">
              Staked on BGT Station
            </div>
          </div>
        </div>
        <div className="whitespace-nowrap text-sm font-medium">
          {total === undefined || !price ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            "$" + formatter.format(total * Number(price))
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="flex gap-4">
          <TokenIcon address={bgtTokenAddress} fetch size="2xl" />
          <div className="font-medium">
            <div className="flex-1 text-sm font-medium leading-6">
              {formatter.format(totalUnbonding ?? 0)} BGT
            </div>
            <div className="text-sm font-medium leading-6 text-muted-foreground">
              In Unbonding Queue
            </div>
          </div>
        </div>
        <div className="whitespace-nowrap text-sm font-medium">
          {totalUnbonding === undefined || !price ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            "$" + formatter.format(totalUnbonding * Number(price))
          )}
        </div>
      </div>
    </div>
  );
}
