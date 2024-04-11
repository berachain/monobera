"use client";

import {
  formatUsd,
  handleNativeBera,
  usePollAssetWalletBalance,
  useTokenHoneyPrices,
  useTokens,
  type Token,
} from "@bera/berajs";
import { Skeleton } from "@bera/ui/skeleton";
import { beraJsConfig } from "@bera/wagmi";

export function WalletBalanceInUs() {
  const { featuredTokenList } = useTokens();
  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { data: assets } = useCurrentAssetWalletBalances();
  const { data: pricesArray } = useTokenHoneyPrices({
    config: beraJsConfig,
    args: {
      tokenAddresses: featuredTokenList?.map(
        (featuredToken: Token) => featuredToken.address,
      ),
    },
  });
  const total =
    assets && pricesArray
      ? assets?.reduce((acc: number, curr: Token) => {
          const address = handleNativeBera(curr.address);
          const price = pricesArray[address];
          const total = Number(curr.formattedBalance ?? 0) * Number(price ?? 0);
          return acc + total;
        }, 0)
      : 0;
  return (
    <div className="flex h-9 w-full items-center justify-center text-3xl font-semibold">
      {assets && pricesArray ? (
        formatUsd(total)
      ) : (
        <Skeleton className="h-9 w-40" />
      )}
    </div>
  );
}
