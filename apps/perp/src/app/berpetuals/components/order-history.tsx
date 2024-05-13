import { useMemo, useContext } from "react";
import type { PaginationState, RowSelectionState } from "@tanstack/react-table";

import { TableContext } from "~/context/table-context";
import { usePollOpenLimitOrders } from "~/hooks/usePollOpenLimitOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePollClosedTrades } from "~/hooks/usePollClosedTrades";
import type { IMarket } from "~/types/market";
import type { CloseOrderPayload } from "~/types/order-history";
import type { TableTabTypes } from "~/types/table";
import { OrderHistoryHeader } from "./order-history-header";
import { OrderHistoryTable } from "./order-history-table";
import { TotalAmount } from "./total-amount";
import { usePollMarketOrders } from "~/hooks/usePollMarketOrders";

export function OrderHistory({
  markets,
  tabType,
  setTabType,
  selection,
  setSelection,
  pagination,
  setPagination,
  size,
}: {
  markets: IMarket[];
  tabType: TableTabTypes;
  setTabType: (tab: TableTabTypes) => void;
  selection: RowSelectionState;
  setSelection: (selection: RowSelectionState) => void;
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
  size: "sm" | "md" | "lg";
}) {
  const { tableState } = useContext(TableContext);

  const {
    useMarketOpenPositions,
    openPositionsPagination,
    refresh: refetchPositions,
  } = usePollOpenPositions(tableState);
  const openPositions = useMarketOpenPositions(markets);

  const {
    useMarketOpenLimitOrders,
    openLimitOrdersPagination,
    refresh: refetchOrders,
  } = usePollOpenLimitOrders(tableState);
  const openOrders = useMarketOpenLimitOrders(markets);

  const { useMarketClosedPositions } = usePollClosedTrades(tableState);
  const closedPositions = useMarketClosedPositions(markets);

  const { useMarketOrders, marketOrdersPagination } =
    usePollMarketOrders(tableState);
  const marketOrders = useMarketOrders(markets);

  const headers = [
    {
      title: "Positions",
      counts: openPositionsPagination?.total_items ?? 0,
      type: "positions",
    },
    {
      title: "Open Orders",
      counts: openLimitOrdersPagination?.total_items ?? 0,
      type: "orders",
    },
    {
      title: "History",
      type: "history",
    },
    {
      title: "Realized PnL",
      type: "pnl",
    },
  ];

  const closePositionsPayload = useMemo(() => {
    return openPositions?.reduce<CloseOrderPayload[]>(
      (acc, position, index) => {
        if (selection && Object.keys(selection).length !== 0) {
          if (selection[index] === true) {
            acc.push({
              pairIndex: BigInt(position.market?.pair_index ?? 0),
              index: BigInt(position?.index ?? 0),
            });
          }
        } else {
          acc.push({
            pairIndex: BigInt(position.market?.pair_index ?? 0),
            index: BigInt(position?.index ?? 0),
          });
        }
        return acc;
      },
      [],
    );
  }, [openPositions, selection]);

  const closeOrdersPayload = useMemo(() => {
    return openOrders?.reduce<CloseOrderPayload[]>((acc, position, index) => {
      if (selection && Object.keys(selection).length !== 0) {
        if (selection[index] === true) {
          acc.push({
            pairIndex: BigInt(position.market.pair_index),
            index: BigInt(position.index),
          });
        }
      } else {
        acc.push({
          pairIndex: BigInt(position.market.pair_index),
          index: BigInt(position.index),
        });
      }
      return acc;
    }, []);
  }, [openOrders, selection]);

  return (
    <div className="mx-2 mb-10 flex h-full w-[calc(100%-16px)] flex-col overflow-auto rounded-md border border-border lg:mb-2 lg:ml-0 lg:w-[calc(100%-8px)]">
      <OrderHistoryHeader
        closePositionsPayload={closePositionsPayload}
        closeOrdersPayload={closeOrdersPayload}
        selection={selection}
        refetchPositions={refetchPositions}
        refetchOrders={refetchOrders}
        {...{ headers, tabType, setTabType }}
      />
      <TotalAmount
        className="flex sm:hidden"
        markets={markets}
        tabType={tabType}
      />
      <OrderHistoryTable
        tab={tabType}
        selection={selection}
        setSelection={setSelection}
        pagination={pagination}
        setPagination={setPagination}
        openPositions={openPositions}
        openOrders={openOrders}
        marketOrders={marketOrders}
        history={closedPositions}
        markets={markets}
        size={size}
      />
    </div>
  );
}
