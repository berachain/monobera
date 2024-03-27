"use client";

import Link from "next/link";
import {
  usePollAssetWalletBalance,
  usePollReservesDataList,
  useTokens,
} from "@bera/berajs";
import { Icons } from "@bera/ui/icons";
import { type Address } from "viem";

import InterestRateOvertime from "./components/interest-rate-overtime";
import TokenInfoCard from "./components/token-info-card";
import TotalBorrowed from "./components/total-borrowed";
import { TotalSupplied } from "./components/total-supplied";
import UserInfo from "./components/user-info";

export default function IndividualMarketAnalytics({
  address,
}: {
  address: Address;
}) {
  usePollAssetWalletBalance();
  const { tokenDictionary } = useTokens();
  const { useSelectedReserveData } = usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(address);

  return (
    <div className="w-full">
      <div className="mb-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 hover:cursor-pointer">
        <Icons.arrowLeft className="relative h-4 w-4" />
        <Link className="text-sm font-medium leading-normal" href="/dashboard">
          Go Back
        </Link>
      </div>

      <TokenInfoCard
        {...{
          token: tokenDictionary?.[address],
          reserve:
            Number(reserveData?.totalLiquidity) *
            Number(reserveData?.formattedPriceInMarketReferenceCurrency),
          liquidity:
            Number(reserveData?.totalLiquidity) *
            Number(reserveData?.formattedPriceInMarketReferenceCurrency) *
            Number(1 - reserveData?.borrowUsageRatio),
          utilization: Number(reserveData?.borrowUsageRatio),
          oraclePrice: Number(
            reserveData?.formattedPriceInMarketReferenceCurrency,
          ),
        }}
      />

      <div className="mt-9 flex flex-col gap-8 xl:flex-row">
        <UserInfo token={tokenDictionary?.[address]} />
        <div className="flex w-full flex-col gap-8 overflow-hidden">
          <TotalSupplied reserveData={reserveData} />
          <TotalBorrowed reserveData={reserveData} />
          <InterestRateOvertime reserveData={reserveData} />
        </div>
      </div>
    </div>
  );
}
