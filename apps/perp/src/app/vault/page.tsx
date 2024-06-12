import React from "react";
import type { Metadata } from "next";
import { bhoneyVaultContractAddress, perpsName } from "@bera/config";
import { BgtStationBanner } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";

import { BhoneyStats } from "./components/bhoney-stats";
import Claim from "./components/claim";
import { RewardsDepositsWrapper } from "./components/rewards-deposits-wrapper";

export function generateMetadata(): Metadata {
  return {
    title: `Vault | ${perpsName}`,
  };
}
export default async function Vault() {
  const depositText = (
    <div className="flex flex-col items-start pr-4">
      <div className="text-muted-foregorund font-medium">
        Deposit your Receipt Tokens
      </div>
      <div className="text-sm text-muted-foreground">
        After adding liquidity, deposit your receipt tokens (bHONEY) to start
        earning{" "}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            verticalAlign: "middle",
          }}
        >
          <Icons.bgt className="h-4 w-4" />
        </span>{" "}
        BGT rewards
      </div>
    </div>
  );

  return (
    <div className="mt-8 flex w-full flex-col gap-8">
      <Claim />
      <BhoneyStats />
      <div>
        <p className="mb-4 pl-2 text-3xl font-semibold leading-9">Your Stats</p>
        <BgtStationBanner
          className="mb-4"
          receiptTokenAddress={bhoneyVaultContractAddress}
          text={depositText}
        />
        <div className="flex flex-col gap-4 lg:flex-row ">
          <RewardsDepositsWrapper />
        </div>
      </div>
    </div>
  );
}
