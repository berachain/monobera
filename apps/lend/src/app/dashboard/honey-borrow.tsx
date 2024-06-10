import React from "react";
import HoneyBorrowCard from "~/components/honey-borrow-card";

export default function HoneyBorrow() {
  return (
    <>
      <div className="mt-4">
        <div className="text-2xl font-semibold leading-8">Borrow Honey</div>
        <div className="text-sm text-muted-foreground">
          HONEY that can be borrowed against your deposited collateral
        </div>
      </div>
      <HoneyBorrowCard />
    </>
  );
}
