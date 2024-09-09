"use client";

import { useCallback, useContext, useEffect, useMemo } from "react";
import { useBeraJs, usePrevious } from "@bera/berajs";
import { SimpleTable, TableFooter, useAsyncTable } from "@bera/shared-ui";
import {
  TableState,
  type PaginationState,
  type RowSelectionState,
  type Updater,
} from "@tanstack/react-table";

import {
  CLOSED_TRADES_SORTING_MAP,
  HISTORY_SORTING_MAP,
  OPEN_ORDERS_SORTING_MAP,
  POSITIONS_SORTING_MAP,
} from "~/utils/constants";
import { TableContext } from "~/context/table-context";
import { type IMarket } from "~/types/market";
import type { ICards } from "~/types/order-history";
import type { FilterableTableState } from "~/types/table";
import { AsesetCardMobile } from "../../components/asset-card-mobile";
import { TotalAmount } from "../../components/total-amount";

export function OrderHistoryTable({
  markets,
  size,
  columns,
  data,
  totalPages,
  isLoading,
  isValidating,
  assetCardItems,
}: {
  data: any[];
  markets: IMarket[];
  columns: any[];
  size: "sm" | "md" | "lg";
  totalPages: number;
  isLoading: boolean;
  isValidating: boolean;
  assetCardItems: {
    marketList: ICards[];
    limitList: ICards[];
    historyList: ICards[];
    pnlList: ICards[];
  };
}) {
  const { setTableState, tableState } = useContext(TableContext);
  const prevTableState = usePrevious(tableState);

  const { isConnected } = useBeraJs();
  const handleRowSelectionChange = (updater: Updater<RowSelectionState>) => {
    setTableState((prev) => {
      const newSelection =
        typeof updater === "function" ? updater(prev.selection ?? {}) : updater;
      return { ...prev, selection: { ...newSelection } };
    });
  };

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
        sortDir: "desc",
      };
      // Filters
      if (state.columnFilters.length > 0) {
        if (
          tableState.tabType === "positions" ||
          tableState.tabType === "orders"
        ) {
          const pairIndex = state.columnFilters.find(
            (filter) => filter.id === "assets",
          );
          if (pairIndex) {
            filters.pairIndex = Number(pairIndex.value);
          }
        } else {
          const pairIndex = state.columnFilters.find(
            (filter) => filter.id === "market" || filter.id === "assets",
          );
          if (pairIndex) {
            filters.filters = `pair_index=${pairIndex.value}`;
          }
        }
      }
      // Sorting
      if (state.sorting.length > 0) {
        const sort = state.sorting[0];
        if (tableState.tabType === "history") {
          filters.sortBy =
            HISTORY_SORTING_MAP[sort.id as keyof typeof HISTORY_SORTING_MAP];
        } else if (tableState.tabType === "positions") {
          filters.sortBy =
            POSITIONS_SORTING_MAP[
              sort.id as keyof typeof POSITIONS_SORTING_MAP
            ];
        } else if (tableState.tabType === "orders") {
          filters.sortBy =
            OPEN_ORDERS_SORTING_MAP[
              sort.id as keyof typeof OPEN_ORDERS_SORTING_MAP
            ];
        } else if (tableState.tabType === "pnl") {
          filters.sortBy =
            CLOSED_TRADES_SORTING_MAP[
              sort.id as keyof typeof CLOSED_TRADES_SORTING_MAP
            ];
        }
        filters.sortDir = sort.desc ? "desc" : "asc";
      }
      setTableState((prev) => ({
        ...prev,
        [prev.tabType]: {
          ...prev[prev.tabType],
          ...filters,
        },
      }));
    },
    [setTableState, tableState],
  );

  const table = useAsyncTable({
    data: data ?? [],
    columns: columns,
    fetchData: fetchData,
    enablePagination: true,
    enableRowSelection: true,
    additionalTableProps: {
      state: {
        rowSelection: tableState.selection,
        pagination: {
          pageIndex: (tableState[tableState.tabType]?.page ?? 1) - 1,
          pageSize: tableState[tableState.tabType]?.perPage ?? 10,
        },
      },
      manualPagination: true,
      autoResetPageIndex: false,
      pageCount: totalPages,
      onPaginationChange: handlePaginationChange,
      onRowSelectionChange: handleRowSelectionChange,
      meta: {
        loading: isLoading,
        loadingText: "Loading...",
        validating: isValidating,
        selectVisibleRows: true,
        emptyDataText: !isConnected ? "No wallet connected" : undefined,
      },
    },
  });

  useEffect(() => {
    if (prevTableState?.tabType !== tableState.tabType) {
      table.resetSorting();
      table.resetColumnFilters();
    }
  }, [prevTableState, tableState.tabType, table]);

  const totalAmount = useMemo(
    () => (
      <TotalAmount
        className="hidden flex-shrink-0 p-0 sm:flex"
        markets={markets}
        tabType={tableState.tabType ?? "positions"}
        spacer
      />
    ),
    [markets, tableState.tabType],
  );

  return (
    <div className="relative h-full w-full overflow-auto sm:border-t sm:border-border">
      <SimpleTable
        table={table}
        wrapperClassName="hidden sm:flex rounded-none"
        flexTable
        toolbarContent={totalAmount}
        showSelection={false}
      />
      {size === "sm" && (
        <div className="mx-2 flex h-[calc(100%+32px)] w-[calc(100%-16px)] flex-col gap-4">
          {tableState.tabType === "positions" &&
            assetCardItems.marketList.length > 0 && (
              <>
                {assetCardItems.marketList.map((item, index) => (
                  <AsesetCardMobile card={item} key={index} />
                ))}
                <div />
              </>
            )}
          {tableState.tabType === "orders" &&
            assetCardItems.limitList.length > 0 && (
              <>
                {assetCardItems.limitList.map((item, index) => (
                  <AsesetCardMobile card={item} key={index} />
                ))}
                <div />
              </>
            )}
          {tableState.tabType === "history" &&
            assetCardItems.historyList.length > 0 && (
              <>
                {assetCardItems.historyList.map((item, index) => (
                  <AsesetCardMobile card={item} key={index} />
                ))}
                <div />
              </>
            )}
          {tableState.tabType === "pnl" &&
            assetCardItems.pnlList.length > 0 && (
              <>
                {assetCardItems.pnlList.map((item, index) => (
                  <AsesetCardMobile card={item} key={index} />
                ))}
                <div />
              </>
            )}
          <TableFooter table={table} showSelection={false} />
        </div>
      )}
    </div>
  );
}
