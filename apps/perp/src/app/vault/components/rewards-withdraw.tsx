"use client";

import { useMemo } from "react";
import Image from "next/image";
import { usePollBHoneyBalance, usePollBalanceOfAssets } from "@bera/berajs";
import {
  FormattedNumber,
  SimpleTable,
  Tooltip,
  useAsyncTable,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Skeleton } from "@bera/ui/skeleton";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { usePollVaultEarnings } from "~/hooks/usePollVaultEarnings";
import { usePollWithdrawQueue } from "~/hooks/usePollWithdrawQueue";
import { withdrawQueueColumns } from "./withdraw-queue-columns";
import { type VaultWithdrawalRequest } from "@bera/proto/src";

interface RewardsWithdrawProps {
  actionType: "deposit" | "withdraw";
}

export interface VaultWithdrawalQueue {
  withdraw_requests: VaultWithdrawalRequest[];
  owner: string;
}

export const RewardsWithdraw = ({ actionType }: RewardsWithdrawProps) => {
  const { isLoading: isGHoneyBalanceLoading, useFormattedBHoneyBalance } =
    usePollBHoneyBalance();

  const { isLoading: isBalanceOfAssetsLoading, useFormattedBalanceOfAssets } =
    usePollBalanceOfAssets();

  const { data: earnings, isLoading: isEarningsLoading } =
    usePollVaultEarnings();

  const ghoneyBalance = useFormattedBHoneyBalance();

  const balanceOfAssets = useFormattedBalanceOfAssets();

  const formattedEarnings = formatFromBaseUnit(earnings ?? 0, 18).toString(10);

  const estimatedEarnings = useMemo(() => {
    return balanceOfAssets + Number(formattedEarnings);
  }, [formattedEarnings, balanceOfAssets]);

  const isLoading =
    isGHoneyBalanceLoading || isBalanceOfAssetsLoading || isEarningsLoading;

  const { data }: { data: VaultWithdrawalQueue } = usePollWithdrawQueue();
  const withdrawQueue =
    data?.withdraw_requests.reduce<VaultWithdrawalRequest[]>((acc, request) => {
      if (request?.shares !== "0") {
        acc.push(request);
      }
      return acc;
    }, []) ?? [];

  const shares = withdrawQueue?.reduce((acc, curr) => {
    return acc + Number(curr.shares);
  }, 0);

  const table = useAsyncTable({
    fetchData: async () => {},
    columns: withdrawQueueColumns,
    data: withdrawQueue ?? [],
  });

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-4">
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
                  value={balanceOfAssets}
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

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:gap-4 mt-2">
        <div className="flex w-full flex-col justify-between gap-1 rounded-md border border-border bg-muted px-6 py-4">
          <div className="text-sm font-medium text-muted-foreground">
            bHONEY Balance
            <Tooltip
              className="mb-1 ml-2"
              text="Total bHONEY including the amount in cooldown"
            />
          </div>
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
          <div className="text-sm font-medium text-muted-foreground">
            {" "}
            Cooldown
            <Tooltip
              className="mb-1 ml-2"
              text="This amount of bHONEY is non-transferable until the withdrawal is processed. You won't be able to transfer it during this time."
            />
          </div>
          {isLoading ? (
            <Skeleton className="h-[28px] w-1/2" />
          ) : (
            <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
              {`${formatFromBaseUnit(shares ?? 0, 18).toString(10)}`}
              <Image
                src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/bhoney.png"
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
      <SimpleTable
        table={table}
        wrapperClassName={cn(
          "grow min-h-[144px] min-w-[350px] overflow-y-auto",
          actionType === "withdraw" && "lg:h-28",
        )}
        flexTable
        dynamicFlex
        showToolbar={false}
      />
    </div>
  );
};
