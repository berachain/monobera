"use client";

import React from "react";
import {
  formatter,
  usePollAssetWalletBalance,
  useTokenHoneyPrice,
  type Token,
} from "@bera/berajs";
import { bgtTokenAddress, blockExplorerUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { TokenIcon } from "./token-icon";

export function TokenRow({
  asset,
  isLoading,
}: {
  asset: Token;
  isLoading: boolean;
}) {
  const { data: tokenPrice } = useTokenHoneyPrice(asset.address);
  return (
    <div
      className="flex items-center justify-between gap-5"
      key={asset.address}
    >
      <div className="flex gap-4">
        <TokenIcon token={asset} size="2xl" />
        <div className="font-medium">
          <div className="flex-1 truncate text-sm font-medium leading-6">
            {formatter.format(Number(asset.formattedBalance))} {asset.symbol}
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
        {isLoading || !tokenPrice ? (
          <Skeleton className="h-8 w-16" />
        ) : (
          "$" +
          formatter.format(Number(tokenPrice) * Number(asset.formattedBalance))
        )}
      </div>
    </div>
  );
}
export function TokenList() {
  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { data: assets, isLoading } = useCurrentAssetWalletBalances();

  return (
    <div className="grid gap-4">
      {assets && assets.length ? (
        assets
          .filter(
            (token: Token) =>
              token.address !== bgtTokenAddress &&
              token.tags?.includes("featured"),
          )
          .map((asset: Token) => (
            <TokenRow asset={asset} isLoading={isLoading} key={asset.address} />
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
