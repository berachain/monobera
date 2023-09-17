"use client";

import { DataTable, SearchInput } from "@bera/shared-ui";

import { usePositions, type Position } from "~/hooks/usePositions";
import { market_table_column } from "./components/market-table-column";

export default function AvailableMarket() {
  const { generatepositionData } = usePositions();
  const positions: Position[] = generatepositionData();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full flex-col justify-between md:flex-row">
        <div className="flex-shrink-0 text-lg font-semibold leading-7">
          Available Markets
        </div>
        <SearchInput placeholder="Search..." className="w-full md:w-[400px]" />
      </div>
      <div className="w-full overflow-x-scroll">
        <DataTable
          columns={market_table_column}
          data={positions ?? []}
          className="min-w-[1200px]"
        />
      </div>
    </div>
  );
}
