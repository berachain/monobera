"use client";

import {
  formatUsd,
  handleNativeBera,
  usePollWalletBalances,
  useTokenHoneyPrices,
  useTokens,
  type BalanceToken,
  type Token,
} from "@bera/berajs";
import { Skeleton } from "@bera/ui/skeleton";

export function WalletBalanceInUs() {
  const { data: tokenData } = useTokens();
  const { data: assets } = usePollWalletBalances();
  const { data: pricesArray } = useTokenHoneyPrices({
    tokenAddresses: tokenData?.featuredTokenList?.map(
      (featuredToken: Token) => featuredToken.address,
    ),
  });
  const total =
    assets && pricesArray
      ? assets?.reduce((acc: number, curr: BalanceToken) => {
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
