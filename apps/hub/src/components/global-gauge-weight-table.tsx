"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { usePollGauges, type Gauge } from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import { getRewardsVaultUrl } from "@bera/shared-ui/src/utils/getRewardsVaultUrl";
import { TableState, type ColumnDef } from "@tanstack/react-table";

import { global_gauge_weight_columns } from "~/columns/global-gauge-weight-columns";

const GAUGE_PAGE_SIZE = 10;

export default function GlobalGaugeWeightTable({
  myGauge = false,
  keywords = "",
  markets = [],
  isTyping = false,
}: {
  myGauge?: boolean;
  keywords?: string;
  markets?: string[];
  isTyping?: boolean;
}) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [sorting, setSorting] = useState([
    { id: "activeIncentivesInHoney", desc: true },
  ]);
  const handleNewSort = (newSort: any) => {
    if (newSort === sorting) return;
    setSorting(newSort);
  };
  const { gaugeCounts, gaugeList, isLoading, isValidating } = usePollGauges({
    sortBy: sorting[0]?.id as
      | "activeIncentivesInHoney"
      | "amountstaked"
      | "bgtInflationCapture"
      | undefined,
    sortOrder: sorting[0]?.desc ? "desc" : "asc",
    page: page + 1,
    filterByProduct: markets,
    pageSize: GAUGE_PAGE_SIZE,
    query: isTyping ? "" : keywords,
  });
  const fetchData = useCallback(
    (state: TableState) => setPage(state?.pagination?.pageIndex),
    [setPage],
  );
  return (
    <DataTable
      loading={isLoading}
      validating={isValidating}
      fetchData={fetchData}
      enablePagination
      columns={global_gauge_weight_columns as ColumnDef<Gauge>[]}
      data={myGauge ? [] : gaugeList ?? []}
      className="min-h-[200px] w-full min-w-[800px] shadow"
      additionalTableProps={{
        initialState: { pagination: { pageSize: GAUGE_PAGE_SIZE } },
        pageCount: Math.ceil(gaugeCounts / GAUGE_PAGE_SIZE),
        state: { sorting },
        manualPagination: true,
      }}
      onRowClick={(row: any) =>
        router.push(getRewardsVaultUrl(row.original.vaultAddress, myGauge))
      }
      onCustomSortingChange={(a: any) => handleNewSort(a)}
    />
  );
}
