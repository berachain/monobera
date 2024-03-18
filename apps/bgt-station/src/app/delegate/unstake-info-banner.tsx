"use client";

import React from "react";
import { Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

export function UnstakeInfoBanner() {
  return (
    <div className="mt-6 flex w-full flex-row rounded-md border border-warning-foreground bg-warning p-2 max-w-[600px]">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center justify-between">
          <Icons.bgt className="h-4 w-4 md:h-6 md:w-6" />
          <Icons.chevronRight className="h-4 w-4 md:h-6 md:w-6" />
          <Icons.bera className="h-4 w-4 md:h-6 md:w-6" />
        </div>
        <div className="text-xs sm:text-xs md:text-lg items-center font-semibold leading-7 text-foreground">
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
