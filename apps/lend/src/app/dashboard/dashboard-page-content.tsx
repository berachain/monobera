"use client";

import React, { useEffect } from "react";
import { useBeraJs, usePollAssetWalletBalance, useTokens } from "@bera/berajs";
import { ConnectWalletBear } from "@bera/shared-ui";

import { dictionaryToExternalTokenList } from "~/utils/lendTokenHelper";
import StatusBanner from "~/components/status-banner";
import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";
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

  const { useReservesDataList } = usePollReservesDataList();
  const { data: reservesDictionary } = useReservesDataList();
  const { tokenDictionary } = useTokens();

  usePollAssetWalletBalance(
    dictionaryToExternalTokenList(
      reservesDictionary ?? {},
      tokenDictionary ?? {},
    ),
  );

  return (
    <div className="flex flex-col gap-9 md:gap-6">
      <StatusBanner />
      {isReady ? (
        <Dashboard
          tableView={tableView}
          setUseTableView={setUseTableView}
        />
      ) : (
        <ConnectWalletBear message="Connect your wallet to view your supplies, borrows, and open positions." />
      )}
    </div>
  );
}
