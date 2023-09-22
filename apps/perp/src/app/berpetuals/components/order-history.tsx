"use client";

import { OrderHistorHeader } from "./order-history-header";
import { OrderHistorTable } from "./order-history-table";
import { TotalAmount } from "./total-amount";
export function OrderHistory() {
  return (
    <div className="w-full">
      <OrderHistorHeader />
      <TotalAmount className="flex sm:hidden"/>
      <OrderHistorTable />
      <TotalAmount className="hidden sm:flex"/>
    </div>
  );
}
