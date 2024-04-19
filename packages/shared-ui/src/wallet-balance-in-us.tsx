"use client";

import {
  formatUsd,
  handleNativeBera,
  usePollWalletBalances,
  useTokenHoneyPrices,
  useTokens,
  type Token,
} from "@bera/berajs";
import { Skeleton } from "@bera/ui/skeleton";
import { beraJsConfig } from "@bera/wagmi";

export function WalletBalanceInUs() {
  const { data: tokenData } = useTokens({
    config: beraJsConfig,
  });
  const { data: assets } = usePollWalletBalances({
    config: beraJsConfig,
  });
  const { data: pricesArray } = useTokenHoneyPrices({
    config: beraJsConfig,
    args: {
      tokenAddresses: tokenData?.featuredTokenList?.map(
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
