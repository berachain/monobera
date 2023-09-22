"use client";

import { useState } from "react";

import { OrderHistorHeader } from "./order-history-header";
import { OrderHistorTable } from "./order-history-table";
import { TotalAmount } from "./total-amount";

export function OrderHistory() {
  const [tabType, setTabType] = useState<
    "positions" | "orders" | "history" | "pnl"
  >("positions");
  const headers = [
    {
      title: "Positions",
      counts: 5,
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
      <OrderHistorHeader {...{ headers, tabType, setTabType }} />
      <TotalAmount className="flex sm:hidden" />
      <OrderHistorTable tab={tabType} />
      <TotalAmount className="hidden sm:flex" />
    </div>
  );
}
