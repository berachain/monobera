"use client";

import { OrderHistorHeader } from "./order-history-header";
import { OrderHistorTable } from "./order-history-table";

export function OrderHistory() {
  return (
    <div className="w-full">
      <OrderHistorHeader />
      <OrderHistorTable />
    </div>
  );
}
