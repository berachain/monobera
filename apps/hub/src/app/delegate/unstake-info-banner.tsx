"use client";

import React from "react";
import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export function UnstakeInfoBanner() {
  return (
    <div className="mt-6 flex w-full flex-row rounded-md border border-warning-foreground bg-warning p-2">
      <div className="flex flex-row items-center justify-between gap-2">
        <div className="flex flex-row items-center justify-between">
          <Icons.bgt className="h-[32px] w-[32px]" />
          <Icons.chevronRight className="h-[32px] w-[32px]" />
          <Icons.bera className="h-[32px] w-[32px]" />
        </div>
        <div className="text-md items-center font-semibold leading-7 text-foreground">
          BGT Redeems To BERA When Unstaked
        </div>
        <Tooltip
          text={
            "When a Unstake/Withdrawal/Redemption Request is initiatied BGT is converted to BERA based on the Conversion Ratio."
          }
        />
      </div>
    </div>
  );
}
