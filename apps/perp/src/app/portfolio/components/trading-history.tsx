"use client";

import React from "react";
import { DataTable } from "@bera/shared-ui";

import { historyColumns } from "~/app/components/table-columns/history";
import { usePollTradingHistory } from "~/hooks/usePollTradingHistory";
import type { IMarket } from "~/types/market";

export default function TradingHistory({ markets }: { markets: IMarket[] }) {
  const { useMarketClosedPositions } = usePollTradingHistory();
  const closedPositions = useMarketClosedPositions(markets);
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
        data={closedPositions ?? []}
        className="min-w-[1136px]"
      />
    </div>
  );
}
