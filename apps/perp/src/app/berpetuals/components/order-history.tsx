"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { useBeraJs } from "@bera/berajs";
import { usePrevious } from "@bera/shared-ui";
import { ColumnDef } from "@tanstack/react-table";

import { generateMarketOrders } from "~/utils/generateMarketOrders";
import { ClosePositionModal } from "~/app/components/close-position-modal";
import { generateHistoryColumns } from "~/app/components/table-columns/history";
import { generateOrdersColumns } from "~/app/components/table-columns/orders";
import { generatePnlColumns } from "~/app/components/table-columns/pnl";
import { generatePositionColumns } from "~/app/components/table-columns/positions";
import { UpdatePositionModal } from "~/app/components/update-position-modal";
import { TableContext } from "~/context/table-context";
import { usePollClosedTrades } from "~/hooks/usePollClosedTrades";
import { usePollMarketOrders } from "~/hooks/usePollMarketOrders";
import { usePollOpenLimitOrders } from "~/hooks/usePollOpenLimitOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import type { IMarket } from "~/types/market";
import type {
  IClosedTrade,
  ILimitOrder,
  IMarketOrder,
  IOpenTrade,
} from "~/types/order-history";
import { getAssetCardList } from "./asset-cards/getAssetCards";
import { OrderHistoryHeader } from "./order-history-header";
import { OrderHistoryTable } from "./order-history-table";
import { TotalAmount } from "../../components/total-amount";

export function OrderHistory({
  markets,
  size,
}: {
  markets: IMarket[];
  size: "sm" | "md" | "lg";
}) {
  const [updateOpen, setUpdateOpen] = useState<boolean | IOpenTrade>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean | IOpenTrade>(false);

  const { tableState, setTableState } = useContext(TableContext);
  const { isConnected } = useBeraJs();

  // data fetching
  const {
    data: openPositionData,
    pagination: openPositionsPagination,
    isLoading: isPositionsLoading,
    isValidating: isPositionsValidating,
  } = usePollOpenPositions(tableState);
  const {
    data: openOrdersData,
    pagination: openOrdersPagination,
    isLoading: isOpenOrdersLoading,
    isValidating: isOpenOrdersValidation,
  } = usePollOpenLimitOrders(tableState);
  const {
    data: marketOrdersData,
    pagination: marketOrdersPagination,
    isLoading: isMarketOrdersLoading,
    isValidating: isMarketOrdersValidation,
  } = usePollMarketOrders(tableState);
  const {
    data: closedTradesData,
    pagination: closedTradesPagination,
    isLoading: isClosedTradesLoading,
    isValidating: isClosedTradesValidation,
  } = usePollClosedTrades(tableState);

  const openMarketPositions = useMemo(
    () => generateMarketOrders(openPositionData, markets) ?? [],
    [markets, openPositionData],
  );
  const openMarketOrders = useMemo(
    () => generateMarketOrders(openOrdersData, markets) ?? [],
    [markets, openOrdersData],
  );
  const marketOrders = useMemo(
    () => generateMarketOrders(marketOrdersData, markets) ?? [],
    [markets, marketOrdersData],
  );
  const closedMarketTrades = useMemo(
    () => generateMarketOrders(closedTradesData, markets) ?? [],
    [markets, closedTradesData],
  );

  // edge case for selection when new orders are opened or closed
  const prevPositionLength = usePrevious(openPositionData?.length ?? 0);
  useEffect(() => {
    if (
      tableState.tabType === "positions" &&
      (openPositionData?.length ?? 0) !== prevPositionLength
    ) {
      setTableState((prev) => ({ ...prev, selection: {} }));
    }
  }, [tableState.tabType, openPositionData, setTableState]);
  const prevOrderLength = usePrevious(openOrdersData?.length ?? 0);
  useEffect(() => {
    if (
      tableState.tabType === "orders" &&
      (openOrdersData?.length ?? 0) !== prevOrderLength
    ) {
      setTableState((prev) => ({ ...prev, selection: {} }));
    }
  }, [tableState.tabType, openOrdersData]);

  // props generation
  const tableProps = useMemo(() => {
    let data: (IOpenTrade | ILimitOrder | IMarketOrder | IClosedTrade)[] = [];
    let columns:
      | ColumnDef<IOpenTrade>[]
      | ColumnDef<ILimitOrder>[]
      | ColumnDef<IMarketOrder>[]
      | ColumnDef<IClosedTrade>[] = [];
    let totalPages = 1;
    let isLoading = false;
    let isValidating = false;

    switch (tableState.tabType) {
      case "positions":
        data = openMarketPositions;
        columns = markets
          ? generatePositionColumns(markets, setUpdateOpen, setDeleteOpen)
          : [];
        totalPages = openPositionsPagination?.total_pages ?? 1;
        isLoading = isPositionsLoading || !isConnected;
        isValidating = isPositionsValidating;
        break;
      case "orders":
        data = openMarketOrders;
        columns = markets ? generateOrdersColumns(markets) : [];
        totalPages = openOrdersPagination?.total_pages ?? 1;
        isLoading = isOpenOrdersLoading || !isConnected;
        isValidating = isOpenOrdersValidation;
        break;
      case "history":
        data = marketOrders;
        columns = markets ? generateHistoryColumns(markets) : [];
        totalPages = marketOrdersPagination?.total_pages ?? 1;
        isLoading = isMarketOrdersLoading || !isConnected;
        isValidating = isMarketOrdersValidation;
        break;
      case "pnl":
        data = closedMarketTrades;
        columns = markets ? generatePnlColumns(markets) : [];
        totalPages = closedTradesPagination?.total_pages ?? 1;
        isLoading = isClosedTradesLoading || !isConnected;
        isValidating = isClosedTradesValidation;
        break;
      default:
        data = [];
        columns = [];
        totalPages = 1;
        isLoading = false;
        isValidating = false;
    }

    return {
      data,
      columns,
      totalPages,
      isLoading,
      isValidating,
    };
  }, [
    tableState.tabType,
    openMarketPositions,
    openPositionsPagination,
    isPositionsLoading,
    isPositionsValidating,
    openMarketOrders,
    openOrdersPagination,
    isOpenOrdersLoading,
    isOpenOrdersValidation,
    marketOrders,
    marketOrdersPagination,
    isMarketOrdersLoading,
    isMarketOrdersValidation,
    closedMarketTrades,
    closedTradesPagination,
    isClosedTradesLoading,
    isClosedTradesValidation,
    isConnected,
  ]);

  const assetCardItems = useMemo(() => {
    return getAssetCardList({
      openPositionsItems: openMarketPositions as IOpenTrade[],
      openOrderItems: openMarketOrders as ILimitOrder[],
      marketOrdersItems: marketOrders as IMarketOrder[],
      closedTradesItems: closedMarketTrades as IClosedTrade[],
      markets,
    });
  }, [
    openMarketPositions,
    openMarketOrders,
    marketOrders,
    closedMarketTrades,
    markets,
  ]);

  return (
    <div className="mx-2 mb-10 flex h-full w-[calc(100%-16px)] flex-col overflow-auto rounded-md border border-border lg:mb-2 lg:ml-0 lg:w-[calc(100%-8px)]">
      <OrderHistoryHeader markets={markets} />
      <TotalAmount
        className="flex sm:hidden"
        markets={markets}
        tabType={tableState.tabType ?? "positions"}
      />
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
      <OrderHistoryTable
        {...tableProps}
        assetCardItems={assetCardItems}
        markets={markets}
        size={size}
      />
    </div>
  );
}
