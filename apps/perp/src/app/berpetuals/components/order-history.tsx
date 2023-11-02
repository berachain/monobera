"use client";

import { useMemo, useState } from "react";
import type { ClosedTrade, OpenLimitOrder, OpenTrade } from "@bera/proto/src";

import { usePollOpenOrders } from "~/hooks/usePollOpenOrders";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePollTradingHistory } from "~/hooks/usePollTradingHistory";
import { type IMarket } from "../page";
import { OrderHistoryHeader } from "./order-history-header";
import { OrderHistoryTable } from "./order-history-table";
import { TotalAmount } from "./total-amount";

export interface IMarketOrder extends OpenTrade {
  market: IMarket;
}

export interface ILimitOrder extends OpenLimitOrder {
  market: IMarket;
}

export interface IClosedTrade extends ClosedTrade {
  market: IMarket;
}

export function OrderHistory({ markets }: { markets: IMarket[] }) {
  const [tabType, setTabType] = useState<
    "positions" | "orders" | "history" | "pnl"
  >("positions");

  const { useMarketOpenPositions } = usePollOpenPositions();

  const { useMarketClosedPositions } = usePollTradingHistory();

  const { useMarketOpenOrders } = usePollOpenOrders();

  const openPositions = useMarketOpenPositions(markets);

  const closedPositions = useMarketClosedPositions(markets);

  const openOrders = useMarketOpenOrders(markets);

  const headers = [
    {
      title: "Positions",
      counts: openPositions?.length ?? 0,
      type: "positions",
    },
    {
      title: "Open Orders",
      counts: openOrders?.length ?? 0,
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
    return openPositions?.map((position) => ({
      pairIndex: BigInt(position.market.pair_index),
      index: BigInt(position.index),
    }));
  }, [openPositions]);

  const closeOrdersPayload = useMemo(() => {
    return openOrders?.map((position) => ({
      pairIndex: BigInt(position.market.pair_index),
      index: BigInt(position.index),
    }));
  }, [openPositions]);

  return (
    <div className="w-full">
      <OrderHistoryHeader
        closePositionsPayload={closePositionsPayload}
        closeOrdersPayload={closeOrdersPayload}
        {...{ headers, tabType, setTabType }}
      />
      <TotalAmount className="flex sm:hidden" markets={markets} />
      <OrderHistoryTable
        tab={tabType}
        openPositons={openPositions}
        openOrders={openOrders}
        history={closedPositions}
      />
      <TotalAmount className="hidden sm:flex" markets={markets} />
    </div>
  );
}
