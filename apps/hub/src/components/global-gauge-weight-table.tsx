"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { usePollGauges, type Gauge } from "@bera/berajs";
import {
  SimpleTable,
  getRewardsVaultUrl,
  useAsyncTable,
} from "@bera/shared-ui";
import type {
  ColumnDef,
  PaginationState,
  SortingState,
  TableState,
  Updater,
} from "@tanstack/react-table";

import { GlobalGaugeWeightColumns } from "~/columns/global-gauge-weight-columns";

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

  const { gaugeCounts, gaugeList, isLoading, isValidating } = usePollGauges(
    {
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
    },
    { opts: { keepPreviousData: true } },
  );

  const fetchData = useCallback(
    (state: TableState) => {
      setPage(state?.pagination?.pageIndex);
      setSorting(state?.sorting);
    },
    [setPage],
  );

  const handleSortingChange = useCallback(
    (updater: Updater<SortingState>) => {
      setSorting((prev: SortingState) => {
        return typeof updater === "function" ? updater(prev ?? []) : updater;
      });
    },
    [setSorting],
  );

  const handlePaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      setPage((prev: number) => {
        const newPaginationState =
          typeof updater === "function"
            ? updater({
                pageIndex: prev ?? 0,
                pageSize: GAUGE_PAGE_SIZE,
              })
            : updater;
        return newPaginationState.pageIndex ?? 0;
      });
    },
    [setPage],
  );

  const allGaugeTable = useAsyncTable({
    fetchData: fetchData,
    columns: GlobalGaugeWeightColumns as ColumnDef<Gauge>[],
    data: myGauge ? [] : gaugeList ?? [],
    enablePagination: true,
    additionalTableProps: {
      meta: {
        loading: isLoading,
        loadingText: "Loading...",
        validating: isValidating,
      },
      state: {
        pagination: {
          pageIndex: page,
          pageSize: GAUGE_PAGE_SIZE,
        },
        sorting,
      },
      manualSorting: true,
      manualPagination: true,
      autoResetPageIndex: false,
      pageCount: Math.ceil(gaugeCounts / GAUGE_PAGE_SIZE),
      onPaginationChange: handlePaginationChange,
      onSortingChange: handleSortingChange,
    },
  });

  return (
    <SimpleTable
      table={allGaugeTable}
      className="min-h-[200px] w-full min-w-[800px] shadow"
      wrapperClassName="min-h-[200px] w-full min-w-[800px]"
      variant="ghost"
      flexTable
      onRowClick={(row: any) =>
        router.push(getRewardsVaultUrl(row.original.vaultAddress, myGauge))
      }
    />
  );
}
