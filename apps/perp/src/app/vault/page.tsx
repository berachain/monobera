"use client";

import React from "react";

import { BhoneyStats } from "./bhoney-stats";
import Claim from "./claim";
import DepositWithdraw from "./deposit-withdraw";
import { RewardsWithdraw } from "./rewards-withdraw";

export default function Vault() {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col gap-8 p-8">
      <Claim />
      <BhoneyStats />
      <div>
        <p className="mb-4 text-3xl font-semibold leading-9">Your Stats</p>
        <div className="flex flex-col gap-4 md:flex-row">
          <DepositWithdraw />
          <RewardsWithdraw />
        </div>
      </div>
      {/* <HoneyVault /> */}
    </div>
  );
}
