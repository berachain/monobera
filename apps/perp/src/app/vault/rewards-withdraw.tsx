"use client";

import Image from "next/image";
import { formatUsd, usePollBHoneyBalance } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import { withdraw_queue_columns } from "./withdraw-queue-columns";

export const RewardsWithdraw = () => {
  const { isLoading, useFormattedBHoneyBalance } = usePollBHoneyBalance();
  const honeyBalance = useFormattedBHoneyBalance();
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex w-full flex-col justify-between gap-1 rounded-xl border border-border bg-muted px-6 py-4">
        <p className="text-sm font-medium text-muted-foreground">
          Est. Rewards
        </p>
        {isLoading ? (
          <Skeleton className="h-[28px] w-1/2" />
        ) : (
          <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
            <Image
              src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/bgt.png"
              alt="Honey"
              width={20}
              height={20}
            />
            {" "}0 
          </div>
        )}
              {isLoading ? (
          <Skeleton className="h-[28px] w-1/2" />
        ) : (
          <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
            <Image
              src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
              alt="Honey"
              width={20}
              height={20}
            />
            {" "}0
          </div>
        )}
      </div>
      <div className="flex w-full flex-col justify-between gap-1 rounded-xl border border-border bg-muted px-6 py-4">
        <p className="text-sm font-medium text-muted-foreground">
          Staked HONEY
        </p>
        {isLoading ? (
          <Skeleton className="h-[28px] w-1/2" />
        ) : (
          <div className="flex flex-row items-center gap-2 text-xl font-semibold leading-7">
            {formatUsd(honeyBalance)}{" "}
            <Image
              src="https://raw.githubusercontent.com/berachain/default-token-list/main/src/assets/honey.png"
              alt="Honey"
              width={20}
              height={20}
            />
          </div>
        )}
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
