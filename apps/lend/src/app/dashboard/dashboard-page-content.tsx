"use client";

import React from "react";
import { useBeraJs, usePollAssetWalletBalance } from "@bera/berajs";
import { ConnectWalletBear } from "@bera/shared-ui";

import StatusBanner from "~/components/status-banner";
import { Dashboard } from "./dashboard";

export default function DashboardPageContent() {
  const { isReady } = useBeraJs();

  usePollAssetWalletBalance();
  return (
    <div className="flex flex-col gap-9 md:gap-6">
      <StatusBanner />
      {isReady ? (
        <Dashboard />
      ) : (
        <div className="mt-20">
          <ConnectWalletBear message="Connect your wallet to view your supplies, borrows, and open positions." />
        </div>
      )}
    </div>
  );
}
