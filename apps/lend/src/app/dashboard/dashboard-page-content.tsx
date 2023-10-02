"use client";

import React, { useEffect } from "react";
import { useBeraJs, usePollAssetWalletBalance, useTokens } from "@bera/berajs";

import { dictionaryToExternalTokenList } from "~/utils/lendTokenHelper";
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
    <>
      {isReady ? (
        <Dashboard tableView={tableView} setUseTableView={setUseTableView} />
      ) : (
        <div>not connect or wrong network</div>
      )}
    </>
  );
}
