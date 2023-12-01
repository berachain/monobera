"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  usePollAssetWalletBalance,
  usePollReservesDataList,
  useTokens,
} from "@bera/berajs";
import { honeyAddress } from "@bera/config";
import { Icons } from "@bera/ui/icons";
import { isAddress } from "viem";
import { type Address } from "wagmi";

import { type RateItem } from "~/utils/getServerSideData";
import InterestRateOvertime from "./components/interest-rate-overtime";
import TokenInfoCard from "./components/token-info-card";
import TotalBorrowed from "./components/total-borrowed";
import TotalSupplied from "./components/total-supplied";
import UserInfo from "./components/user-info";

export default function IndividualMarketAnalytics({
  address,
  supplyAPR1D,
  supplyAPR7D,
  supplyAPR30D,
  supplyAPRALL,
  borrowVariableAPR1D,
  borrowVariableAPR7D,
  borrowVariableAPR30D,
  borrowVariableAPRALL,
}: {
  address: Address;
  supplyAPR1D: RateItem[];
  supplyAPR7D: RateItem[];
  supplyAPR30D: RateItem[];
  supplyAPRALL: RateItem[];
  borrowVariableAPR1D: RateItem[];
  borrowVariableAPR7D: RateItem[];
  borrowVariableAPR30D: RateItem[];
  borrowVariableAPRALL: RateItem[];
}) {
  // console.log(
  //   supplyAPR1D,
  //   supplyAPR7D,
  //   supplyAPR30D,
  //   supplyAPRALL,
  //   borrowVariableAPR1D,
  //   borrowVariableAPR7D,
  //   borrowVariableAPR30D,
  //   borrowVariableAPRALL
  // );
  usePollAssetWalletBalance();
  const { tokenDictionary } = useTokens();
  const { useSelectedReserveData } = usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(address);
  console.log("reserveData", reserveData);
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
          onClick={() => router.push("/dashboard")}
        >
          Go Back
        </div>
      </div>

      <TokenInfoCard
        {...{
          token: tokenDictionary && tokenDictionary[address],
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

      <div className="mt-9 flex flex-col gap-8 lg:flex-row">
        <UserInfo token={tokenDictionary && tokenDictionary[address]} />
        <div className="flex w-full flex-col gap-8">
          <TotalSupplied
            reserveData={reserveData}
            graphData={{
              "24H": supplyAPR1D,
              "7D": supplyAPR7D,
              "30D": supplyAPR30D,
              ALL_TIME: supplyAPRALL,
            }}
          />
          {address === honeyAddress && (
            <TotalBorrowed
              reserveData={reserveData}
              graphData={{
                "24H": borrowVariableAPR1D,
                "7D": borrowVariableAPR7D,
                "30D": borrowVariableAPR30D,
                ALL_TIME: borrowVariableAPRALL,
              }}
            />
          )}
          {address === honeyAddress && (
            <InterestRateOvertime reserveData={reserveData} />
          )}
        </div>
      </div>
    </div>
  );
}
