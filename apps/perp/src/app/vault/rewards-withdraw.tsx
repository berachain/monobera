"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BTOKEN_ABI,
  TransactionActionType,
  formatter,
  useBeraJs,
  usePollBHoneyBalance,
  usePollBHoneyPrice,
  usePollBalanceOfAssets,
  usePollPerpsBgtRewards,
} from "@bera/berajs";
import { formatAmountSmall } from "@bera/berajs/src/utils/formatAmountSmall";
import { DataTable, DynamicRewardBtn, Tooltip, useTxn } from "@bera/shared-ui";
import { parseUnits } from "ethers";
import { type Address } from "wagmi";

import { usePollWithdrawQueue } from "~/hooks/usePollWithdrawQueue";
import { withdraw_queue_columns } from "./withdraw-queue-columns";
import { Skeleton } from "@bera/ui/skeleton";

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

  const { useWithdrawQueue } = usePollWithdrawQueue();
  const withdrawQueue = useWithdrawQueue();

  const {
    isLoading: isRewardsLoading,
    useBgtRewards,
    refetch,
  } = usePollPerpsBgtRewards();
  const claimableBgtRewards = useBgtRewards();
  const [claimAmount, setClaimAmount] = useState<number | undefined>(0);

  const { account } = useBeraJs();
  const { write, ModalPortal } = useTxn({
    message: "Claiming BGT",
    actionType: TransactionActionType.CLAIMING_REWARDS,
    onSuccess: () => {
      void refetch();
    },
  });

  const { isSmall, numericValue: formattedBgt } =
    formatAmountSmall(claimableBgtRewards === undefined ? '' : claimableBgtRewards);

  return (
    <div className="flex w-full flex-col gap-2">
      {ModalPortal}
      <div className="flex w-full flex-col justify-between gap-1 rounded-md border border-border bg-muted px-6 py-4">
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
              {isSmall ? `< ${formattedBgt}` : `${formattedBgt.toFixed(4)}`}
              <Tooltip text="Please note: If your accrued BGT Rewards are less than 0.01, your balance will be displayed as '< 0.01'." />
            </div>
          )}

          {isLoading ? (
            <Skeleton className="h-[28px] w-1/4" />
          ) : (
            <DynamicRewardBtn
              claimableBgtRewards={claimableBgtRewards}
              amount={claimAmount}
              setAmount={setClaimAmount}
              disabled={isRewardsLoading || claimableBgtRewards === 0}
              onClaim={() =>
                write({
                  address: process.env
                    .NEXT_PUBLIC_GTOKEN_CONTRACT_ADDRESS as Address,
                  abi: BTOKEN_ABI,
                  functionName: "claimBGT",
                  params: [
                    parseUnits(`${Number(claimAmount ?? 0)}`, 18),
                    account,
                  ],
                })
              }
              size="sm"
            />
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-2">
        <div className="flex w-full flex-col justify-between gap-1 rounded-md border border-border bg-muted px-6 py-4">
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
        <div className="flex w-full flex-col justify-between gap-1 rounded-md border border-border bg-muted px-6 py-4">
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
        <div className="flex w-full flex-col justify-between gap-1 rounded-md border border-border bg-muted px-6 py-4">
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
      <div className="pt-4">
        <p className="pl-2 text-lg font-semibold">Withdrawal Queue</p>
      </div>
      <DataTable
        columns={withdraw_queue_columns}
        data={withdrawQueue ?? []}
        className="h-full min-w-[490px]"
      />
    </div>
  );
};
