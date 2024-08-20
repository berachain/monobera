"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput, SimpleTable, useBaseTable } from "@bera/shared-ui";

import type { IMarket } from "~/types/market";
import { marketTableColumn } from "./market-table-column";

export default function AvailableMarket({ markets }: { markets: IMarket[] }) {
  const [search, searchInput] = useState<string | undefined>(undefined);
  const router = useRouter();

  const filteredMarkets = useMemo(() => {
    return markets?.filter((market) => {
      if (search) {
        return (
          market.name.toLowerCase().includes(search.toLowerCase()) ||
          market?.tokenName?.toLowerCase().includes(search.toLowerCase())
        );
      }
      return true;
    });
  }, [markets, search]);

  const table = useBaseTable({
    data: filteredMarkets ?? [],
    columns: marketTableColumn,
  });

  const handleRowClick = useCallback((row: any) => {
    router.push(`/berpetuals/${row.original.name}`);
  }, []);

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
      <SimpleTable
        table={table}
        flexTable
        onRowClick={handleRowClick}
        showToolbar={false}
      />
    </div>
  );
}
