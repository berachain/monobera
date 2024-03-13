"use client";

import React, { useState } from "react";
import { type GlobalParams } from "@bera/proto/src";
import { type RowSelectionState } from "@tanstack/react-table";

import { OrderChart } from "../components/order-chart";
import { OrderHistory } from "../components/order-history";
import { CreatePosition, type ICreatePosition } from "../create-position";
import { type IMarket } from "../page";

export type BerpTabTypes = "positions" | "orders" | "history" | "pnl";

type Props = {
  markets: IMarket[];
  defaultMarket: IMarket;
  params: GlobalParams;
};
export default function OrderWrapper({
  markets,
  defaultMarket,
  params,
}: Props) {
  const [tabType, setTabType] = useState<BerpTabTypes>("positions");
  const [selection, setSelection] = useState<RowSelectionState>({});
  const [showOrderLines, setShowOrderLines] = useState(true);

  const handleTabTypes = (tab: BerpTabTypes) => {
    setSelection({});
    setTabType(tab);
  };

  return (
    <>
      <span className="block lg:hidden">
        <OrderChart
          setSelection={setSelection}
          showOrderLines={showOrderLines}
          selection={selection}
          tabType={tabType}
          markets={markets}
          marketName={defaultMarket?.name}
        />
      </span>
      <div className="flex w-full flex-col lg:flex-row">
        <CreatePosition market={defaultMarket} params={params} />
        <div className="h-full w-full pb-[34px] lg:w-screen-w-400">
          <span className="hidden lg:block">
            <OrderChart
              setSelection={setSelection}
              showOrderLines={showOrderLines}
              markets={markets}
              marketName={defaultMarket.name}
              selection={selection}
              tabType={tabType}
            />
          </span>
          <OrderHistory
            showOrderLines={showOrderLines}
            setShowOrderLines={setShowOrderLines}
            selection={selection}
            setSelection={setSelection}
            tabType={tabType}
            setTabType={handleTabTypes}
            markets={markets}
          />
        </div>
      </div>
    </>
  );
}
