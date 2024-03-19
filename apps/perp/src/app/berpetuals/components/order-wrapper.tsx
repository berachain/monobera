"use client";

import React, { useState } from "react";
import { type GlobalParams } from "@bera/proto/src";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@bera/ui/resizable";
import {
  type PaginationState,
  type RowSelectionState,
} from "@tanstack/react-table";

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
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [showOrderLines, setShowOrderLines] = useState(true);

  const handleTabTypes = (tab: BerpTabTypes) => {
    setSelection({});
    setTabType(tab);
  };

  return (
    <>
      <div className="h-[500px] mx-2 block rounded-md border border-border lg:hidden">
        <OrderChart
          setSelection={setSelection}
          showOrderLines={false}
          selection={selection}
          pagination={pagination}
          tabType={tabType}
          markets={markets}
          marketName={defaultMarket?.name}
        />
      </div>
      <div className="flex h-full w-full flex-col lg:flex-row lg:overflow-auto">
        <CreatePosition market={defaultMarket} params={params} />
        <div className="flex h-full w-full flex-col overflow-auto">
          <ResizablePanelGroup
            className="lg:!h-[calc(100%-8px)] hidden lg:flex"
            direction="vertical"
          >
            <ResizablePanel>
              <div className="h-[calc(100%-8px)] mr-2 hidden flex-shrink-0 rounded-md border border-border lg:block">
                <OrderChart
                  pagination={pagination}
                  setSelection={setSelection}
                  showOrderLines={showOrderLines}
                  markets={markets}
                  marketName={defaultMarket.name}
                  selection={selection}
                  tabType={tabType}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle className="!w-[calc(100%-24px)] mx-2 mb-2 hidden lg:flex" />
            <ResizablePanel>
              <OrderHistory
                showOrderLines={showOrderLines}
                setShowOrderLines={setShowOrderLines}
                selection={selection}
                setSelection={setSelection}
                pagination={pagination}
                setPagination={setPagination}
                tabType={tabType}
                setTabType={handleTabTypes}
                markets={markets}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
          <div className="block lg:hidden">
            <OrderHistory
              showOrderLines={showOrderLines}
              setShowOrderLines={setShowOrderLines}
              selection={selection}
              setSelection={setSelection}
              pagination={pagination}
              setPagination={setPagination}
              tabType={tabType}
              setTabType={handleTabTypes}
              markets={markets}
            />
          </div>
        </div>
      </div>
    </>
  );
}
