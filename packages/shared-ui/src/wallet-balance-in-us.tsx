"use client";

import {
  type Token,
  formatUsd,
  usePollAssetWalletBalance,
  usePollPrices,
  useTokens
} from "@bera/berajs";
import { beraTokenAddress, nativeTokenAddress } from "@bera/config";
import { Skeleton } from "@bera/ui/skeleton";
import { useTokenHoneyPrices } from "./hooks/useTokenHoneyPrices";

export function WalletBalanceInUs() {
  const {featuredTokenList} = useTokens()
  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { data: assets } = useCurrentAssetWalletBalances();
  const pricesArray = useTokenHoneyPrices(featuredTokenList?.map((featuredToken: Token) => featuredToken.address))

  const total = (assets && pricesArray)  ? assets?.reduce((acc: number, curr: Token) => {
    const address = curr.address === nativeTokenAddress ? beraTokenAddress.toLowerCase() : curr.address.toLowerCase()

    const price = pricesArray?.find((price: any) =>  price.id.toLowerCase() === address)
    const total = Number(curr.formattedBalance ?? 0) * Number(price.price ?? 0)
    return acc + total
  }, 0) : 0
  return (
    <div className="flex h-9 w-full items-center justify-center text-3xl font-semibold">
      {assets && pricesArray ? formatUsd(total) : <Skeleton className="h-9 w-40" />}
    </div>
  );
}
