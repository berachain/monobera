"use client";

import React from "react";
import { usePollAssetWalletBalance } from "@bera/berajs";
import { honeyAddress } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export function HoneyControls() {
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const token = useSelectedAssetWalletBalance(honeyAddress ?? "0x");
  const tokenBalance = Number(token?.formattedBalance ?? "0");
  return (
    <div className="flex flex-row items-center gap-5">
      <Button variant="outline">
        <Icons.honey className="h-4 w-4" />
        <span className="ml-3">{tokenBalance}</span>
      </Button>
    </div>
  );
}
