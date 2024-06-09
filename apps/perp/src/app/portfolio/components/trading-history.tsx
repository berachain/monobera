"use client";

import React, { useCallback, useContext, useMemo } from "react";
import { usePollOrdersLiqFeePrices } from "@bera/berajs";
import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import {
  TableState,
  type PaginationState,
  type Updater,
} from "@tanstack/react-table";

import { HISTORY_SORTING_MAP } from "~/utils/constants";
import { generateMarketOrders } from "~/utils/generateMarketOrders";
import { generateHistoryColumns } from "~/app/components/table-columns/history";
import { TableContext } from "~/context/table-context";
import { usePollMarketOrders } from "~/hooks/usePollMarketOrders";
import type { IMarket } from "~/types/market";
import type { IMarketOrder } from "~/types/order-history";
import type { FilterableTableState } from "~/types/table";
import { TotalAmount } from "../../components/total-amount";

export default function TradingHistory({ markets }: { markets: IMarket[] }) {
  const { tableState, setTableState } = useContext(TableContext);
  const { data, pagination, isLoading, isValidating } =
    usePollMarketOrders(tableState);
  const { data: historyLiqFeesData } = usePollOrdersLiqFeePrices(
    data?.result
      ? data.result.reduce((acc: number[], order: IMarketOrder) => {
          if (order.trade_open) {
            acc.push(Number(order.index));
          }
          return acc;
        }, [])
      : [],
  );
  let marketOrders = generateMarketOrders(data, markets);

  let liqFeeCounter = 0;
  marketOrders = marketOrders.map((position: any) => {
    if (position.trade_open) {
      const result = {
        ...position,
        borrowing_fee:
          Array.isArray(historyLiqFeesData) &&
          historyLiqFeesData[1] &&
          historyLiqFeesData[1][liqFeeCounter] !== undefined
            ? historyLiqFeesData[1][liqFeeCounter].toString()
            : "0",
      };
      liqFeeCounter = liqFeeCounter + 1;
      return result;
    }
    return position;
  });

  const handlePaginationChange = (updater: Updater<PaginationState>) => {
    setTableState((prev) => {
      const newPaginationState =
        typeof updater === "function"
          ? updater({
              pageIndex: (prev.history.page ?? 1) - 1,
              pageSize: prev.history.perPage ?? 10,
            })
          : updater;
      return {
        ...prev,
        history: {
          ...prev.history,
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
        sortDir: "desc",
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
