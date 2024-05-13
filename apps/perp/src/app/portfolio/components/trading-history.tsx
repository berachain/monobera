"use client";

import React, { useContext } from "react";
import { DataTable } from "@bera/shared-ui";
import { TableContext } from "~/context/table-context";

import { historyColumns } from "~/app/components/table-columns/history";
import { usePollMarketOrders } from "~/hooks/usePollMarketOrders";
import type { IMarket } from "~/types/market";

export default function TradingHistory({ markets }: { markets: IMarket[] }) {
  const { tableState } = useContext(TableContext);
  const { useMarketOrders } = usePollMarketOrders(tableState);
  const marketOrders = useMarketOrders(markets);
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 ">
      <div className="flex w-full flex-col items-start justify-between gap-2 pl-2 md:flex-row">
        <div className="flex-shrink-0 text-2xl font-semibold leading-loose">
          Trading History
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            {" "}
            Breakdown of your trading History
          </div>
        </div>
      </div>
      <DataTable
        enablePagination
        columns={historyColumns}
        data={marketOrders ?? []}
        className="min-w-[1136px]"
      />
    </div>
  );
}
