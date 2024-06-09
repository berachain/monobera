"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  // bTokenAbi,
  // TransactionActionType,
  // formatter,
  // useBeraJs,
  usePollBHoneyBalance,
  usePollBHoneyPrice,
  usePollBalanceOfAssets,
  // usePollPerpsBgtRewards,
} from "@bera/berajs";
import { bhoneyVaultContractAddress } from "@bera/config";
import {
  BgtStationBanner,
  DataTable,
  DynamicRewardBtn,
  FormattedNumber,
  Tooltip,
  useTxn,
} from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";
import BigNumber from "bignumber.js";
import { parseUnits } from "ethers";
import { type Address } from "viem";

import { usePollWithdrawQueue } from "~/hooks/usePollWithdrawQueue";
import { withdrawQueueColumns } from "./withdraw-queue-columns";

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
    return Math.abs(stakedHoney - balanceOfAssets);
  }, [stakedHoney, balanceOfAssets]);

  const isLoading =
    isGHoneyBalanceLoading || isBHoneyPriceLoading || isBalanceOfAssetsLoading;

  const { useWithdrawQueue } = usePollWithdrawQueue();
  const withdrawQueue = useWithdrawQueue();

  // const {
  //   isLoading: isRewardsLoading,
  //   useBgtRewards,
  //   refetch,
  // } = usePollPerpsBgtRewards();
  // const claimableBgtRewards = useBgtRewards();
  // const [claimAmount, setClaimAmount] = useState<number | undefined>(0);

  // const { account } = useBeraJs();
  // const { write, ModalPortal } = useTxn({
  //   message: "Claiming BGT",
  //   actionType: TransactionActionType.CLAIMING_REWARDS,
  //   onSuccess: () => {
  //     void refetch();
  //   },
  // });

  // const bgtRewardsBN = BigNumber(claimableBgtRewards ?? 0);
  // let formattedBgt = "0.00";
  // if (bgtRewardsBN.isFinite()) {
  //   formattedBgt = bgtRewardsBN.lt(0.01)
  //     ? "< 0.01"
  //     : `${bgtRewardsBN.dp(4).toString()}`;
  // }

  return (
    <div className="flex w-full flex-col gap-2">
      {/* {ModalPortal} */}
      <BgtStationBanner receiptTokenAddress={bhoneyVaultContractAddress} />
      <div className="flex w-full flex-col gap-4 pt-2 sm:flex-row sm:gap-2">
        <div className="flex w-full flex-col justify-between gap-1 rounded-md border border-border bg-muted px-6 py-4">
          <p className="text-sm font-medium text-muted-foreground">
            bHONEY Balance
          </p>
          {isLoading ? (
            <Skeleton className="h-[28px] w-1/2" />
          ) : (
            <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
              {
                <FormattedNumber
                  value={ghoneyBalance}
                  compact={false}
                  compactThreshold={999}
                  visibleDecimals={2}
                />
              }
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
              {
                <FormattedNumber
                  value={stakedHoney}
                  compact={false}
                  compactThreshold={999}
                  visibleDecimals={2}
                />
              }
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
              {
                <FormattedNumber
                  value={estimatedEarnings}
                  compact={false}
                  compactThreshold={999}
                  visibleDecimals={2}
                />
              }
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
      <div className="">
        <p className="pl-2 text-lg font-semibold">Withdrawal Queue</p>
      </div>
      <DataTable
        columns={withdrawQueueColumns}
        data={withdrawQueue ?? []}
        className="h-full min-w-[350px]"
      />
    </div>
  );
};
