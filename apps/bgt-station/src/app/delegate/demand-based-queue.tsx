"use client";

import React from "react";
import { usePollDelegatorUnbonding } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
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

  const useDelegatorUnbondingQueue = usePollDelegatorUnbonding();

  const { unbondingQueue, isLoading } = useDelegatorUnbondingQueue;

  return (
    <div className="container mx-auto flex w-full max-w-[800px] flex-col gap-8 pb-20">
      <Card className="flex flex-col gap-3 bg-muted p-6">
        <div className="flex flex-row items-start">
          <Icons.bgt className="h-[32px] w-[32px]" />
          <Icons.chevronRight className="h-[32px] w-[32px]" />
          <Icons.bera className="h-[32px] w-[32px]" />
          <div className="ml-3 text-lg font-semibold capitalize leading-7 text-foreground">
            Demand based {getActionText(action)}
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm">
          Berachain’s Unstaking process takes a novel “Demand Based Unstaking”
          Approach where the Unstaking Period is based primarily on the Demand
          of Staking, Restaking and Unstaking
        </div>
        <div className="flex flex-row justify-between gap-2 text-sm ">
          <div className="text-md flex w-[380px] flex-col items-start justify-between gap-1 rounded-md border bg-info p-2">
            <div className="xs:flex-col flex w-full flex-row items-stretch justify-between">
              <div className="text-md items-start font-semibold text-info-foreground ">
                Current {action} Time
              </div>
              {/* TODO: add tooltip text */}
              <Tooltip text="current unbond time" />
            </div>
            <div className="items-start text-lg font-bold text-info-foreground">
              1 Day
            </div>
          </div>
          <div className="text-md flex w-[380px] flex-col items-start justify-center gap-1 rounded-md border border-dashed bg-muted p-2">
            <div className="xs:flex-col flex w-full flex-row items-stretch justify-between">
              <div className="text-md items-start font-semibold text-muted-foreground">
                Estimated future {action} Time
              </div>
              {/* TODO: add tooltip text */}
              <Tooltip text="future unbond time" />
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
              <Icons.unlock className="h-[24px] w-[24px]" />
              <div className="text-lg font-semibold capitalize leading-7 text-foreground">
                My Un-Stake Queue
              </div>
            </div>

            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <UnbondingQueueTable unbondingQueue={unbondingQueue} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
