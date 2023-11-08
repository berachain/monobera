"use client";

import React from "react";
import { DataTable } from "@bera/shared-ui";

import { usePollTradingHistory } from "~/hooks/usePollTradingHistory";
import { history_columns } from "../berpetuals/components/columns";
import type { IMarket } from "../berpetuals/page";

export default function TradingHistory({ markets }: { markets: IMarket[] }) {
  // const [voterTypes, setVoterTypes] = React.useState<
  //   "30D" | "60D" | "90D" | "6M" | "ALL TIME"
  // >("30D");
  const { useMarketClosedPositions } = usePollTradingHistory();
  const closedPositions = useMarketClosedPositions(markets);
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 ">
      <div className="flex w-full flex-col items-start justify-between gap-2 md:flex-row">
        <div className="flex-shrink-0 text-2xl font-semibold leading-loose">
          Trading History
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            {" "}
            Breakdown of your trading History
          </div>
        </div>
        {/* <Tabs defaultValue={voterTypes}>
          <TabsList>
            {["30D", "60D", "90D", "6M", "ALL TIME"].map((type) => (
              <TabsTrigger
                value={type}
                key={type}
                onClick={() =>
                  setVoterTypes(
                    type as "30D" | "60D" | "90D" | "6M" | "ALL TIME",
                  )
                }
              >
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs> */}
      </div>
      <div className="w-full overflow-x-scroll">
        <DataTable
          columns={history_columns}
          data={closedPositions ?? []}
          className="min-w-[1136px]"
        />
      </div>
    </div>
  );
}
