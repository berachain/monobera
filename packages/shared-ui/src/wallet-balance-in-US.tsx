"use client";

import {
  formatUsd,
  usePollAssetWalletBalance,
  usePollPrices,
} from "@bera/berajs";
import { beraTokenAddress, nativeTokenAddress } from "@bera/config";
import { Skeleton } from "@bera/ui/skeleton";

export function WalletBalanceInUs() {
  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { data: assets } = useCurrentAssetWalletBalances();
  const { usePrices } = usePollPrices();
  const { data: prices } = usePrices();

  const total =
    assets && prices
      ? assets.reduce(
          (acc: number, obj: any) =>
            acc +
            Number(
              prices[
                obj.address === nativeTokenAddress
                  ? beraTokenAddress
                  : obj.address
              ] ?? "0",
            ) *
              Number(obj.formattedBalance ?? "0"),
          0,
        )
      : 0;
  return (
    <div className="flex h-9 w-full items-center justify-center text-3xl font-semibold">
      {assets && prices ? formatUsd(total) : <Skeleton className="h-9 w-40" />}
    </div>
  );
}
