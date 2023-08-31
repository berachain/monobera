"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@bera/ui/icons";
import { isAddress } from "viem";

import InterestRateOvertime from "./components/interest-rate-overtime";
import TokenInfoCard from "./components/token-info-card";
import TotalBorrowed from "./components/total-borrowed";
import TotalSupplied from "./components/total-supplied";
import UserInfo from "./components/user-info";

export default function IndividualMarketAnalytics({
  address,
}: {
  address: `0x${string}`;
}) {
  const router = useRouter();
  useEffect(() => {
    if (!address || !isAddress(address)) {
      router.push("/404");
      // console.log("404");
    }
  }, []);

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

      <TokenInfoCard />

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
