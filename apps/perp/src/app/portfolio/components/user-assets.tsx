"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePollPositionsLiqFeePrices, usePrevious } from "@bera/berajs";
import type { OpenTrade } from "@bera/proto/src";
import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import {
  TableState,
  type PaginationState,
  type RowSelectionState,
  type Updater,
} from "@tanstack/react-table";

import { POSITIONS_SORTING_MAP } from "~/utils/constants";
import { generateMarketOrders } from "~/utils/generateMarketOrders";
import { CloseAllOrders } from "~/app/components/close-all-orders";
import { ClosePositionModal } from "~/app/components/close-position-modal";
import { generatePositionColumns } from "~/app/components/table-columns/positions";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
import { TableContext } from "~/context/table-context";
import { usePollMarketOrders } from "~/hooks/usePollMarketOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import type { IMarket } from "~/types/market";
import type { IOpenTrade, IOpenTradeCalculated } from "~/types/order-history";
import { FilterableTableState } from "~/types/table";
import { TotalAmount } from "../../components/total-amount";

export default function UserOpenPositions({ markets }: { markets: IMarket[] }) {
  const { tableState, setTableState } = useContext(TableContext);
  const {
    data,
    pagination,
    isLoading,
    isValidating,
    refresh: refetchPositions,
  } = usePollOpenPositions(tableState);
  const { data: openPositionsLiqFeesData } = usePollPositionsLiqFeePrices(
    data?.result
      ? data.result.map((position: OpenTrade) => Number(position.index))
      : [],
  );

  const { refresh: refetchMarketHistory } = usePollMarketOrders(tableState);

  let openPositions = generateMarketOrders(data, markets) as IOpenTrade[];
  openPositions = openPositions.map((position, index) => {
    return {
      ...position,
      borrowing_fee:
        Array.isArray(openPositionsLiqFeesData) &&
        openPositionsLiqFeesData[1] &&
        openPositionsLiqFeesData[1][index] !== undefined
          ? openPositionsLiqFeesData[1][index].toString()
          : "0",
      liq_price:
        Array.isArray(openPositionsLiqFeesData) &&
        openPositionsLiqFeesData[0] &&
        openPositionsLiqFeesData[0][index] !== undefined
          ? openPositionsLiqFeesData[0][index].toString()
          : "0",
    };
  });

  const [updateOpen, setUpdateOpen] = useState<boolean | IOpenTradeCalculated>(
    false,
  );
  const [deleteOpen, setDeleteOpen] = useState<boolean | IOpenTradeCalculated>(
    false,
  );

  const prevPositionLength = usePrevious(openPositions?.length ?? 0);
  useEffect(() => {
    if ((openPositions?.length ?? 0) !== prevPositionLength) {
      setTableState((prev) => ({ ...prev, selection: {} }));
    }
  }, [tableState.tabType, openPositions, setTableState]);

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

  const handleRowSelectionChange = (updater: Updater<RowSelectionState>) => {
    setTableState((prev) => {
      const newSelection =
        typeof updater === "function" ? updater(prev.selection ?? {}) : updater;
      return { ...prev, selection: { ...newSelection } };
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
          (filter) => filter.id === "assets",
        );
        if (pairIndex) {
          filters.pairIndex = Number(pairIndex.value);
        }
      }
      // Sorting
      if (state.sorting.length > 0) {
        const sort = state.sorting[0];
        if (tableState.tabType === "positions") {
          filters.sortBy =
            POSITIONS_SORTING_MAP[
              sort.id as keyof typeof POSITIONS_SORTING_MAP
            ];
        }
        filters.sortDir = sort.desc ? "desc" : "asc";
      }
      setTableState((prev) => ({
        ...prev,
        positions: {
          ...prev.positions,
          ...filters,
        },
      }));
    },
    [setTableState, tableState],
  );

  const table = useAsyncTable({
    data: (openPositions as IOpenTradeCalculated[]) ?? [],
    columns: markets
      ? generatePositionColumns(markets, setUpdateOpen, setDeleteOpen)
      : [],
    fetchData: fetchData,
    enablePagination: true,
    enableRowSelection: true,
    additionalTableProps: {
      state: {
        rowSelection: tableState.selection,
        pagination: {
          pageIndex: (tableState.positions?.page ?? 1) - 1,
          pageSize: tableState.positions?.perPage ?? 10,
        },
      },
      manualPagination: true,
      autoResetPageIndex: false,
      pageCount: pagination?.total_pages ?? 1,
      onPaginationChange: handlePaginationChange,
      onRowSelectionChange: handleRowSelectionChange,
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
        tabType="positions"
        spacer
      />
    ),
    [markets, tableState.tabType],
  );

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col">
      <div className="mb-4 flex w-full items-start justify-between gap-2 pl-2 md:flex-row">
        <div className="flex-shrink-0 text-2xl font-semibold leading-loose">
          Open Positions
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            {" "}
            Breakdown of your Open Positions
          </div>
        </div>
        <div className="flex flex-grow-0 self-end">
          <CloseAllOrders
            tableState={tableState}
            setTableState={setTableState}
            orders={openPositions}
            refetchMarketHistory={refetchMarketHistory}
            refetchPositions={refetchPositions}
          />
        </div>
      </div>
      <UpdatePositionModal
        openPosition={updateOpen as IOpenTradeCalculated}
        controlledOpen={!!updateOpen}
        onOpenChange={setUpdateOpen}
      />
      <ClosePositionModal
        openPosition={deleteOpen as IOpenTradeCalculated}
        controlledOpen={!!deleteOpen}
        onOpenChange={setDeleteOpen}
      />
      <SimpleTable
        table={table}
        showSelection={false}
        wrapperClassName="flex rounded-md"
        flexTable
        toolbarContent={totalAmount}
      />
    </div>
  );
}
