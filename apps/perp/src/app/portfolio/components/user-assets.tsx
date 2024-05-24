"use client";

import React, { useCallback, useContext, useMemo, useState } from "react";
import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import {
  TableState,
  type PaginationState,
  type Updater,
} from "@tanstack/react-table";

import { POSITIONS_SORTING_MAP } from "~/utils/constants";
import { generateMarketOrders } from "~/utils/generateMarketOrders";
import { ClosePositionModal } from "~/app/components/close-position-modal";
import { generatePositionColumns } from "~/app/components/table-columns/positions";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
import { TableContext } from "~/context/table-context";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import type { IMarket } from "~/types/market";
import type { IOpenTrade } from "~/types/order-history";
import { FilterableTableState } from "~/types/table";
import { TotalAmount } from "../../components/total-amount";

export default function UserOpenPositions({ markets }: { markets: IMarket[] }) {
  const { tableState, setTableState } = useContext(TableContext);
  const { data, pagination, isLoading, isValidating } =
    usePollOpenPositions(tableState);
  const openPositions = generateMarketOrders(data, markets);
  const [updateOpen, setUpdateOpen] = useState<boolean | IOpenTrade>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean | IOpenTrade>(false);

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
    data: (openPositions as IOpenTrade[]) ?? [],
    columns: markets
      ? generatePositionColumns(markets, setUpdateOpen, setDeleteOpen)
      : [],
    fetchData: fetchData,
    enablePagination: true,
    enableRowSelection: false,
    additionalTableProps: {
      state: {
        pagination: {
          pageIndex: (tableState.positions?.page ?? 1) - 1,
          pageSize: tableState.positions?.perPage ?? 10,
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
        tabType="positions"
        spacer
      />
    ),
    [markets, tableState.tabType],
  );

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 ">
      <div className="flex w-full flex-col items-start justify-between gap-2 pl-2 md:flex-row">
        <div className="flex-shrink-0 text-2xl font-semibold leading-loose">
          Open Positions
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            {" "}
            Breakdown of your Open Positions
          </div>
        </div>
      </div>
      <UpdatePositionModal
        openPosition={updateOpen as IOpenTrade}
        controlledOpen={!!updateOpen}
        onOpenChange={setUpdateOpen}
      />
      <ClosePositionModal
        openPosition={deleteOpen as IOpenTrade}
        controlledOpen={!!deleteOpen}
        onOpenChange={setDeleteOpen}
      />
      <SimpleTable
        table={table}
        wrapperClassName="flex rounded-md"
        flexTable
        toolbarContent={totalAmount}
      />
    </div>
  );
}
