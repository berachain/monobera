"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTokens } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";
import { isAddress } from "viem";
import { type Address } from "wagmi";

import { type AmountItem, type RateItem } from "~/utils/getServerSideData";
import InterestRateOvertime from "./components/interest-rate-overtime";
import TokenInfoCard from "./components/token-info-card";
import TotalBorrowed from "./components/total-borrowed";
import TotalSupplied from "./components/total-supplied";
import UserInfo from "./components/user-info";

export default function IndividualMarketAnalytics({
  address,
  assetInfo,
}: {
  address: Address;
  assetInfo: {
    supplied: AmountItem;
    borrowed: AmountItem;
    volume: AmountItem;
    utilization: RateItem;
    supplyAPR: RateItem;
    borrowVariableAPR: RateItem;
    supplyAPR1D: RateItem[];
    supplyAPR7D: RateItem[];
    supplyAPR30D: RateItem[];
    borrowVariableAPR1D: RateItem[];
    borrowVariableAPR7D: RateItem[];
    borrowVariableAPR30D: RateItem[];
  };
}) {
  const { tokenDictionary } = useTokens();
  const router = useRouter();
  useEffect(() => {
    if (!address || !isAddress(address)) {
      router.push("/404");
    }
  }, []);

  useEffect(() => {
    if (
      tokenDictionary &&
      Object.keys(tokenDictionary).length > 0 &&
      !tokenDictionary[address]
    ) {
      router.push("/404");
    }
  }, [tokenDictionary]);

  return (
    <div>
      <div className="mb-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 hover:cursor-pointer">
        <Icons.arrowLeft className="relative h-4 w-4" />
        <div
          className="text-sm font-medium leading-normal"
          onClick={() => router.push("/markets")}
        >
          Go Back
        </div>
      </div>

      {tokenDictionary && tokenDictionary[address] ? (
        <TokenInfoCard
          {...{
            token: tokenDictionary[address]!,
            reserve: 1,
            liquidity: Number(assetInfo.supplied.amount),
            utilization: Number(assetInfo.utilization.rate),
            oraclePrice: 2,
          }}
        />
      ) : (
        <div>loading...</div>
      )}

      <div className="mt-9 flex flex-col gap-8 lg:flex-row">
        <UserInfo />
        <div className="flex w-full flex-col gap-8">
          <TotalSupplied />
          <TotalBorrowed />
          <InterestRateOvertime />
        </div>
      </div>
    </div>
  );
}
