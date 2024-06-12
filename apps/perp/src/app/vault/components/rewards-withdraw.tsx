"use client";

import { useMemo } from "react";
import Image from "next/image";
import { usePollBHoneyBalance, usePollBalanceOfAssets } from "@bera/berajs";
import { SimpleTable, useAsyncTable, FormattedNumber } from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { usePollVaultEarnings } from "~/hooks/usePollVaultEarnings";
import { usePollWithdrawQueue } from "~/hooks/usePollWithdrawQueue";
import { withdrawQueueColumns } from "./withdraw-queue-columns";

import { cn } from "@bera/ui";

interface RewardsWithdrawProps {
  actionType: "deposit" | "withdraw";
  setActionType: (actionType: "deposit" | "withdraw") => void;
}

export const RewardsWithdraw = ({
  actionType,
  setActionType,
}: RewardsWithdrawProps) => {
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

  const { useWithdrawQueue } = usePollWithdrawQueue();
  const withdrawQueue = useWithdrawQueue();

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
      <div className="">
        <p className="pl-2 pt-2 text-lg font-semibold">Withdrawal Queue</p>
      </div>
      <SimpleTable
        table={table}
        wrapperClassName={cn(
          "grow min-h-[144px] min-w-[350px] overflow-y-auto",
          actionType === "withdraw" && "h-[144px]",
        )}
        flexTable
        dynamicFlex
        showToolbar={false}
      />
      {shares ? (
        <Alert variant="warning" className="rounded-md mt-2">
          <AlertTitle>
            {" "}
            <Icons.info className="inline-block h-4 w-4" />{" "}
            {`${formatFromBaseUnit(shares ?? 0, 18).toString(
              10,
            )} bHONEY is locked`}
          </AlertTitle>
          <AlertDescription>
            This amount of bHONEY is locked until the withdrawal queue is
            processed. You won&apos;t be able to transfer it in the meantime.
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
};
