"use client";

import React, { useContext, useCallback, useMemo } from "react";
import { useAsyncTable, SimpleTable } from "@bera/shared-ui";
import {
  TableState,
  type PaginationState,
  type Updater,
} from "@tanstack/react-table";
import { TableContext } from "~/context/table-context";
import type { FilterableTableState } from "~/types/table";
import { TotalAmount } from "../../components/total-amount";

import { HISTORY_SORTING_MAP } from "~/utils/constants";

import { generateHistoryColumns } from "~/app/components/table-columns/history";
import { usePollMarketOrders } from "~/hooks/usePollMarketOrders";
import type { IMarket } from "~/types/market";
import { generateMarketOrders } from "~/utils/generateMarketOrders";
import type { IMarketOrder } from "~/types/order-history";

export default function TradingHistory({ markets }: { markets: IMarket[] }) {
  const { tableState, setTableState } = useContext(TableContext);
  const { data, pagination, isLoading, isValidating } =
    usePollMarketOrders(tableState);
  const marketOrders = generateMarketOrders(data, markets);

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    setTableState((prev) => {
      const newPaginationState =
        typeof updater === "function"
          ? updater({
              pageIndex: (prev[prev.tabType].page ?? 1) - 1,
              pageSize: prev[prev.tabType].perPage ?? 10,
            })
          : updater;
      return {
        ...prev,
        [prev.tabType]: {
          ...prev[prev.tabType],
          page: newPaginationState.pageIndex + 1,
          perPage: newPaginationState.pageSize,
        },
      };
    });
  };

  const fetchData = useCallback(
    async (state: TableState) => {
      const filters: FilterableTableState = {
        filters: undefined,
        pairIndex: undefined,
        sortBy: undefined,
        sortDir: "asc",
      };
      // Filters
      if (state.columnFilters.length > 0) {
        const pairIndex = state.columnFilters.find(
          (filter) => filter.id === "market",
        );
        if (pairIndex) {
          filters.filters = `pair_index=${pairIndex.value}`;
        }
      }
      // Sorting
      if (state.sorting.length > 0) {
        const sort = state.sorting[0];
        if (tableState.tabType === "history") {
          filters.sortBy =
            HISTORY_SORTING_MAP[sort.id as keyof typeof HISTORY_SORTING_MAP];
        }
        filters.sortDir = sort.desc ? "desc" : "asc";
      }
      setTableState((prev) => ({
        ...prev,
        history: {
          ...prev.history,
          ...filters,
        },
      }));
    },
    [setTableState, tableState],
  );

  const table = useAsyncTable({
    data: (marketOrders as IMarketOrder[]) ?? [],
    columns: markets ? generateHistoryColumns(markets) : [],
    fetchData: fetchData,
    enablePagination: true,
    enableRowSelection: false,
    additionalTableProps: {
      state: {
        pagination: {
          pageIndex: (tableState.history?.page ?? 1) - 1,
          pageSize: tableState.history?.perPage ?? 10,
        },
      },
      manualPagination: true,
      autoResetPageIndex: false,
      pageCount: pagination?.total_pages ?? 1,
      onPaginationChange: handlePaginationChange,
      meta: {
        loading: isLoading,
        loadingText: "Loading...",
        validating: isValidating,
        selectVisibleRows: true,
      },
    },
  });

  const totalAmount = useMemo(
    () => (
      <TotalAmount
        className="hidden flex-shrink-0 p-0 sm:flex"
        markets={markets}
        tabType="history"
        spacer
      />
    ),
    [markets, tableState.tabType],
  );

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 ">
      <div className="flex w-full flex-col items-start justify-between gap-2 pl-2 md:flex-row">
        <div className="flex-shrink-0 text-2xl font-semibold leading-loose">
          Trading History
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            {" "}
            Breakdown of your trading History
          </div>
        </div>
      </div>
      <SimpleTable
        table={table}
        wrapperClassName="flex rounded-md"
        flexTable
        toolbarContent={totalAmount}
      />
    </div>
  );
}
