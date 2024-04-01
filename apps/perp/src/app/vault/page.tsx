import React from "react";
import type { Metadata } from "next";
import { perpsName } from "@bera/config";

import { BhoneyStats } from "./components/bhoney-stats";
import Claim from "./components/claim";
import DepositWithdraw from "./components/deposit-withdraw";
import { RewardsWithdraw } from "./components/rewards-withdraw";

export function generateMetadata(): Metadata {
  return {
    title: `Vault | ${perpsName}`,
  };
}
export default async function Vault() {
  return (
    <div className="mt-8 flex w-full flex-col gap-8">
      <Claim />
      <BhoneyStats />
      <div>
        <p className="mb-4 pl-2 text-3xl font-semibold leading-9">Your Stats</p>
        <div className="flex flex-col gap-4 lg:flex-row ">
          <DepositWithdraw />
          <RewardsWithdraw />
        </div>
      </div>
    </div>
  );
}
