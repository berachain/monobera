"use client";

import Link from "next/link";
import { usePollReservesDataList, useTokens } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";
import { type Address } from "viem";

import InterestRateOvertime from "./components/interest-rate-overtime";
import TokenInfoCard from "./components/token-info-card";
import TotalBorrowed from "./components/total-borrowed";
import { TotalSupplied } from "./components/total-supplied";
import UserInfo from "./components/user-info";
import { beraJsConfig } from "@bera/wagmi";

export default function IndividualMarketAnalytics({
  address,
}: {
  address: Address;
}) {
  const { tokenDictionary } = useTokens({
    config: beraJsConfig,
  });
  const { useSelectedReserveData } = usePollReservesDataList({
    config: beraJsConfig,
  });
  const reserve = useSelectedReserveData(address);

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
            Number(reserve?.totalLiquidity) *
            Number(reserve?.formattedPriceInMarketReferenceCurrency),
          liquidity:
            Number(reserve?.totalLiquidity) *
            Number(reserve?.formattedPriceInMarketReferenceCurrency) *
            Number(1 - Number(reserve?.borrowUsageRatio)),
          utilization: Number(reserve?.borrowUsageRatio),
          oraclePrice: Number(reserve?.formattedPriceInMarketReferenceCurrency),
        }}
      />

      <div className="mt-9 flex flex-col gap-8 xl:flex-row">
        <UserInfo />
        <div className="flex w-full flex-col gap-8 overflow-hidden">
          <TotalSupplied reserveData={reserve} />
          <TotalBorrowed reserveData={reserve} />
          <InterestRateOvertime reserveData={reserve} />
        </div>
      </div>
    </div>
  );
}
