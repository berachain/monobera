"use client";

import React from "react";
import { usePollDelegatorUnbonding } from "@bera/berajs";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";

import UnbondingQueueTable from "~/components/unbonding-queue-table";
import { DelegateEnum } from "./types";

export default function DemandBasedQueue({ action }: { action: DelegateEnum }) {
  const getActionText = (action: DelegateEnum) => {
    switch (action) {
      case DelegateEnum.DELEGATE:
        return "staking";
      case DelegateEnum.REDELEGATE:
        return "restaking";
      case DelegateEnum.UNBOND:
        return "redeem";
    }
  };

  const { useDelegatorUnbondingQueue } = usePollDelegatorUnbonding();

  const unbondingQueue = useDelegatorUnbondingQueue();

  return (
    <div className="container mx-auto flex w-full max-w-[800px] flex-col gap-8 pb-20 lg:w-[800px]">
      <Card className="flex flex-col gap-3 p-6">
        <div className="text-lg font-semibold capitalize leading-7 text-foreground">
          Demand based {getActionText(action)}
        </div>
        <div className="flex flex-col gap-1 text-sm">
          Berachain’s Unstaking process takes a novel “Demand Based Unstaking”
          Approach where the Unstaking Period is based primarily on the Demand
          of Staking, Restaking and Unstaking
        </div>
        <div className="flex flex-row justify-between gap-2 text-sm ">
          <div className="text-md flex w-[380px] flex-col items-start justify-center gap-1 rounded-md border p-2">
            <div className="align-start text-md font-semibold text-muted-foreground">
              Current {action} Time
            </div>
            <div className="items-start text-lg font-bold text-foreground">
              1 Day
            </div>
          </div>
          <div className="text-md flex w-[380px] flex-col items-start justify-center gap-1 rounded-md border border-dashed bg-muted p-2">
            <div className="text-md items-start font-semibold text-muted-foreground">
              Estimated future {action} Time
            </div>
            <div className="items-start text-lg font-bold italic text-muted-foreground">
              30 Mins
            </div>
          </div>
        </div>
      </Card>
      {action === DelegateEnum.UNBOND && (
        <>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z"
                  stroke="#292524"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7 10.9999V6.99991C6.99875 5.75996 7.45828 4.56378 8.28937 3.64358C9.12046 2.72338 10.2638 2.14481 11.4975 2.0202C12.7312 1.89558 13.9671 2.23381 14.9655 2.96922C15.9638 3.70463 16.6533 4.78476 16.9 5.99991"
                  stroke="#292524"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div className="text-lg font-semibold capitalize leading-7 text-foreground">
                My Un-Stake Queue
              </div>
            </div>
            <Card className="flex flex-col gap-3 p-6">
              {unbondingQueue?.length ? (
                <UnbondingQueueTable unbondingQueue={unbondingQueue} />
              ) : (
                <Skeleton className="h-10 w-full" />
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
