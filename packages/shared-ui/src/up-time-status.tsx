"use client";

import React from "react";
import { useGasData } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";
import { BigNumber } from "bignumber.js";

export function UpTimeStatus() {
  const { feesPerGasEstimate } = useGasData(); // 1 Bwei = 10^9 wei

  return (
    <div className="fixed bottom-0 flex w-full justify-between border-y border-border bg-background px-4 py-2">
      <div className="flex items-center gap-2">
        {/* <div className={cn("h-3 w-3 rounded-full", getStatusColor(status))} />
        <div className="text-xs font-medium leading-3 text-muted-foreground">
          {status}
        </div> */}
      </div>
      {feesPerGasEstimate?.maxFeePerGas ? (
        <div className="flex cursor-pointer items-center gap-2 text-xs font-medium leading-3 text-muted-foreground">
          <div className=" text-success-foreground">{`${BigNumber(
            feesPerGasEstimate?.maxFeePerGas.toString(10),
          )
            .div(10 ** 9)
            .dp(4)
            .toString(10)}`}</div>
          <Icons.fuel className="h-4 w-4" />
          Bwei
        </div>
      ) : null}
    </div>
  );
}
