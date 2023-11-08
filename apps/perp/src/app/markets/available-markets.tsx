"use client";

import { useState } from "react";
import { DataTable, SearchInput } from "@bera/shared-ui";

import { type IMarket } from "../berpetuals/page";
import { market_table_column } from "./components/market-table-column";

export default function AvailableMarket({ markets }: { markets: IMarket[] }) {
  const [search, searchInput] = useState<string | undefined>(undefined);
  const filteredMarkets = markets.filter((market) => {
    if (search) {
      return (
        market.name.toLowerCase().includes(search.toLowerCase()) ||
        market?.tokenName?.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
        <div className="w-full flex-shrink-0 text-lg font-semibold leading-7 lg:w-[400px]">
          Available Markets
        </div>
        <div className="w-full lg:w-[400px]">
          <SearchInput
            value={search}
            onChange={(e) => searchInput(e.target.value)}
            placeholder="Search..."
            className="w-full md:w-[400px]"
          />
        </div>
      </div>
      <DataTable
        columns={market_table_column}
        data={filteredMarkets ?? []}
        className="min-w-[1200px]"
      />
    </div>
  );
}
