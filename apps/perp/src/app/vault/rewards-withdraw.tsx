"use client";

import { useMemo } from "react";
import Image from "next/image";
import {
  formatter,
  usePollBHoneyBalance,
  usePollBHoneyPrice,
  usePollBalanceOfAssets,
} from "@bera/berajs";
import { DataTable, RewardBtn } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";
import type { Address } from "wagmi";

import { withdraw_queue_columns } from "./withdraw-queue-columns";

export const RewardsWithdraw = () => {
  const { isLoading: isGHoneyBalanceLoading, useFormattedBHoneyBalance } =
    usePollBHoneyBalance();

  const { isLoading: isBHoneyPriceLoading, useFormattedHoneyPrice } =
    usePollBHoneyPrice();

  const { isLoading: isBalanceOfAssetsLoading, useFormattedBalanceOfAssets } =
    usePollBalanceOfAssets();
  const honeyPrice = useFormattedHoneyPrice();

  const ghoneyBalance = useFormattedBHoneyBalance();

  const balanceOfAssets = useFormattedBalanceOfAssets();
  const stakedHoney = useMemo(() => {
    return Number(ghoneyBalance) * honeyPrice;
  }, [ghoneyBalance, honeyPrice]);

  const estimatedEarnings = useMemo(() => {
    return stakedHoney - balanceOfAssets;
  }, [stakedHoney, balanceOfAssets]);

  const isLoading =
    isGHoneyBalanceLoading || isBHoneyPriceLoading || isBalanceOfAssetsLoading;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col justify-between gap-1 rounded-xl border border-border bg-muted px-6 py-4">
        <p className="text-sm font-medium text-muted-foreground">
          Est. Rewards
        </p>
        <div className="flex w-full flex-row justify-between">
          {isLoading ? (
            <Skeleton className="h-[28px] w-1/4" />
          ) : (
            <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
              <Image
                src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/bgt.png"
                alt="Honey"
                width={20}
                height={20}
              />{" "}
              0
            </div>
          )}

          {isLoading ? (
            <Skeleton className="h-[28px] w-1/4" />
          ) : (
            <RewardBtn
              size="sm"
              poolAddress={
                process.env.NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address
              }
            />
          )}
        </div>
      </div>
      <div className="flex w-full flex-row gap-2">
        <div className="flex w-full flex-col justify-between gap-1 rounded-xl border border-border bg-muted px-6 py-4">
          <p className="text-sm font-medium text-muted-foreground">
            bHONEY Balance
          </p>
          {isLoading ? (
            <Skeleton className="h-[28px] w-1/2" />
          ) : (
            <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
              {formatter.format(Number(ghoneyBalance))}{" "}
              <Image
                src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/bhoney.png"
                alt="Honey"
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
        <div className="flex w-full flex-col justify-between gap-1 rounded-xl border border-border bg-muted px-6 py-4">
          <p className="text-sm font-medium text-muted-foreground">
            Total HONEY Value
          </p>
          {isLoading ? (
            <Skeleton className="h-[28px] w-1/2" />
          ) : (
            <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
              {formatter.format(stakedHoney)}{" "}
              <Image
                src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
                alt="Honey"
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
        <div className="flex w-full flex-col justify-between gap-1 rounded-xl border border-border bg-muted px-6 py-4">
          <p className="w-full text-sm font-medium text-muted-foreground">
            Est. Earnings
          </p>
          {isLoading ? (
            <Skeleton className="h-[28px] w-1/2" />
          ) : (
            <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
              {formatter.format(estimatedEarnings)}{" "}
              <Image
                src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
                alt="Honey"
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <p className="text-lg font-semibold">Withdrawal Queue</p>
      </div>
      <DataTable
        columns={withdraw_queue_columns}
        data={[]}
        className="h-full min-w-[490px]"
      />
    </div>
  );
};
