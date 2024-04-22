"use client";

import React from "react";
import {
  usePollWalletBalances,
  useTokenHoneyPrice,
  type Token,
} from "@bera/berajs";
import { bgtTokenAddress, blockExplorerUrl } from "@bera/config";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { FormattedNumber } from "./formatted-number";
import { TokenIcon } from "./token-icon";

function TokenRow({ asset, isLoading }: { asset: Token; isLoading: boolean }) {
  const { data: tokenPrice } = useTokenHoneyPrice({
    tokenAddress: asset.address,
  });

  return (
    <div
      className="flex items-center justify-between gap-5"
      key={asset.address}
    >
      <div className="flex gap-4">
        <TokenIcon address={asset.address} size="2xl" />
        <div className="font-medium">
          <div className="flex-1 truncate text-sm font-medium leading-6">
            <FormattedNumber
              value={asset.formattedBalance ?? 0}
              symbol={asset.symbol}
            />
            <a
              target="_blank"
              href={`${blockExplorerUrl}/address/${asset.address}`}
              rel="noreferrer"
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
          <FormattedNumber
            value={Number(tokenPrice ?? "0") * Number(asset.formattedBalance)}
            symbol="USD"
          />
        )}
      </div>
    </div>
  );
}
export function TokenList() {
  const { useCurrentWalletBalances, isLoading } = usePollWalletBalances();
  const assets = useCurrentWalletBalances();

  return (
    <div className="grid gap-4">
      {assets?.length ? (
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
            <div>No recent activity</div>
          </div>
        </div>
      )}
    </div>
  );
}
