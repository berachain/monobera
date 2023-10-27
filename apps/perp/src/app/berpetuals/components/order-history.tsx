"use client";

import { useState } from "react";
import { ClosedTrade, OpenLimitOrder, OpenTrade } from "@bera/proto/src";

import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { usePollTradingHistory } from "~/hooks/usePollTradingHistory";
import { IMarket } from "../page";
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

  const openPositions = useMarketOpenPositions(markets);

  const closedPositions = useMarketClosedPositions(markets);

  const headers = [
    {
      title: "Positions",
      counts: openPositions?.length ?? 0,
      type: "positions",
    },
    {
      title: "Open Orders",
      counts: 2,
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

  return (
    <div className="w-full">
      <OrderHistoryHeader {...{ headers, tabType, setTabType }} />
      <TotalAmount className="flex sm:hidden" />
      <OrderHistoryTable
        tab={tabType}
        openPositons={openPositions}
        openOrders={[]}
        history={closedPositions}
      />
      <TotalAmount className="hidden sm:flex" />
    </div>
  );
}
