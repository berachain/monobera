import React from "react";
import type { Metadata } from "next";
import { perpsName } from "@bera/config";

import { BhoneyStats } from "./bhoney-stats";
import Claim from "./claim";
import DepositWithdraw from "./deposit-withdraw";
import { RewardsWithdraw } from "./rewards-withdraw";

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
      {/* <HoneyVault /> */}
    </div>
  );
}
