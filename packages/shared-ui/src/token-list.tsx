"use client";

import React from "react";
import {
  formatter,
  usePollAssetWalletBalance,
  usePollPrices,
} from "@bera/berajs";
import {
  beraTokenAddress,
  blockExplorerUrl,
  nativeTokenAddress,
} from "@bera/config";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { TokenIcon } from "./token-icon";

export function TokenList() {
  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { data: assets } = useCurrentAssetWalletBalances();
  const { usePrices, isLoading } = usePollPrices();
  const { data: prices } = usePrices();

  return (
    <div className="grid gap-4">
      {assets && assets.length ? (
        assets.map((asset: any) => (
          <div
            className="flex items-center justify-between gap-5"
            key={asset.address}
          >
            <div className="flex gap-4">
              <TokenIcon token={asset} size="2xl" />
              <div className="font-medium">
                <div className="flex-1 truncate text-sm font-medium leading-6">
                  {formatter.format(Number(asset.formattedBalance))}{" "}
                  {asset.symbol}
                  <a
                    target="_blank"
                    href={`${blockExplorerUrl}/address/${asset.address}`}
                  >
                    <Icons.external className="inline h-3 w-3" />{" "}
                  </a>
                </div>
                <div className="text-sm font-medium leading-6 text-muted-foreground">
                  {asset.name}
                </div>
              </div>
            </div>
            <div className="whitespace-nowrap text-sm font-medium">
              {isLoading || !prices ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                "$" +
                formatter.format(
                  Number(
                    prices[
                      asset.address === nativeTokenAddress
                        ? beraTokenAddress
                        : asset.address
                    ] ?? "0",
                  ) * Number(asset.formattedBalance),
                )
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-24 justify-center align-middle">
          <div className="flex flex-col items-center justify-center ">
            <Icons.empty className="h-4 w-4" />
            <div className="">No recent activity</div>
          </div>
        </div>
      )}
    </div>
  );
}
