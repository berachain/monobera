"use client";

import React, { useEffect, useRef } from "react";
import { usePollAssetWalletBalance, useTokens } from "@bera/berajs";
import { DataTable, Dropdown, SearchInput } from "@bera/shared-ui";
import { Switch } from "@bera/ui/switch";

import StatusBanner from "~/components/status-banner";
import TokenCard from "~/components/token-card";
import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";
import { usePollReservesPrices } from "~/hooks/usePollReservesPrices";
import { market_table_columns } from "./market-table-column";

export default function MarketsPageContent() {
  usePollAssetWalletBalance();
  const [tableView, setUseTableView] = React.useState(false);
  const sortOptions = ["Deposit-APY", "Total-Borrows", "Systems"];
  const [sortBy, setSortBy] = React.useState<string>(sortOptions[2]!);
  const ref = useRef(null);
  const [keywords, setKeywords] = React.useState<string>("");
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

  const { tokenDictionary } = useTokens();
  const { useReservesPrices } = usePollReservesPrices();
  const { data: reservesPrices } = useReservesPrices();
  const isTokenDictionaryLoading =
    !tokenDictionary || Object.keys(tokenDictionary).length === 0;
  const { useReservesDataList } = usePollReservesDataList();
  const { data: reservesDictionary, isLoading: isReservesDictionaryLoading } =
    useReservesDataList();

  const reservesList = React.useMemo(() => {
    return !isReservesDictionaryLoading && !isTokenDictionaryLoading
      ? Object.keys(reservesDictionary)
          .map((key) => ({
            ...reservesDictionary[key as any],
            ...tokenDictionary[key as any],
            ...reservesPrices[key as any],
          }))
          .filter((reserve) => {
            if (!reserve.address) return false;
            if (!keywords || keywords === "") return true;
            else
              return Object.values(reserve).some((value) =>
                typeof value !== "string"
                  ? String(value).toLowerCase().includes(keywords.toLowerCase())
                  : value.toLowerCase().includes(keywords.toLowerCase()),
              );
          })
          .sort((a, b) => {
            switch (sortBy) {
              case "Deposit-APY":
                return Number(
                  BigInt(b.currentLiquidityRate - a.currentLiquidityRate),
                );
              case "Total-Borrows":
                return (b.borrowed ?? 1) - (a.borrowed ?? 0);
              case "Systems":
                return b.address.localeCompare(a.address);
              default:
                return 0;
            }
          })
      : [];
  }, [
    reservesDictionary,
    tokenDictionary,
    keywords,
    sortOptions,
    reservesPrices,
  ]);

  return (
    <>
      <div className="mb-12">
        <StatusBanner />
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="mb-2 text-5xl font-bold">All Markets</h2>
          <p className="text-muted-foreground">
            You must supply collateral in order to borrow funds.
          </p>
        </div>
        <div className="hidden items-center gap-4 lg:flex ">
          <p className="text-sm text-muted-foreground">Switch to table view</p>
          <Switch
            id="use-tableview"
            checked={tableView}
            onCheckedChange={(checked: boolean) => setUseTableView(checked)}
            ref={ref}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-4">
        <SearchInput
          placeholder="Search for BEND Markets..."
          className="w-full"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <Dropdown
          selected={sortBy}
          selectionList={sortOptions}
          onSelect={setSortBy}
          className="hidden md:block"
        />
      </div>
      {!isTokenDictionaryLoading && !isReservesDictionaryLoading ? (
        <div className="mt-6">
          {tableView ? (
            <DataTable columns={market_table_columns} data={reservesList} />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {reservesList.map((reserve: any) => (
                <TokenCard reserveData={reserve} key={reserve.address} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
