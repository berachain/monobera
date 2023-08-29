"use client";

import React from "react";
import {
  usePollAssetWalletBalance,
  useSelectedAssetWalletBalance,
} from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export function HoneyControls() {
  usePollAssetWalletBalance();
  const tokenBalance = Number(
    useSelectedAssetWalletBalance(process.env.NEXT_PUBLIC_HONEY_ADDRESS ?? "")
      ?.formattedBalance ?? "0",
  );
  return (
    <div className="flex flex-row items-center gap-5">
      <Button variant="outline">
        <Icons.honey className="h-4 w-4" />
        <span className="ml-3">{tokenBalance}</span>
      </Button>
    </div>
  );
}
