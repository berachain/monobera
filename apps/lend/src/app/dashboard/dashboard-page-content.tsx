"use client";

import React, { useEffect } from "react";
import { useBeraJs, usePollAssetWalletBalance } from "@bera/berajs";
import { ConnectWalletBear } from "@bera/shared-ui";

import StatusBanner from "~/components/status-banner";
import { Dashboard } from "./dashboard";

export default function DashboardPageContent() {
  const { isReady } = useBeraJs();
  const [tableView, setUseTableView] = React.useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (tableView && window.innerWidth < 1024) {
        setUseTableView(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tableView]);

  usePollAssetWalletBalance();
  return (
    <div className="flex flex-col gap-9 md:gap-6">
      <StatusBanner />
      {isReady ? (
        <Dashboard tableView={tableView} setUseTableView={setUseTableView} />
      ) : (
        <ConnectWalletBear message="Connect your wallet to view your supplies, borrows, and open positions." />
      )}
    </div>
  );
}
