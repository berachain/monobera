"use client";

import React from "react";
import { DataTable, SearchInput } from "@bera/shared-ui";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { usePositions, type Position } from "~/hooks/usePositions";
import { trading_history_column } from "./components/trading-history-column";

export default function TradingHistory() {
  const { generatepositionData } = usePositions();
  const positions: Position[] = generatepositionData();
  const [voterTypes, setVoterTypes] = React.useState<
    "30D" | "60D" | "90D" | "6M" | "ALL TIME"
  >("30D");
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 p-8">
      <div className="flex w-full flex-col items-end justify-between gap-2 md:flex-row">
        <div className="flex-shrink-0 text-2xl font-semibold leading-loose">
          Trading History
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            {" "}
            Breakdown of your trading History
          </div>
        </div>
        <Tabs defaultValue={voterTypes}>
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
        </Tabs>
      </div>
      <SearchInput
        placeholder="Filter by Pair, Position, Date or Order Type..."
        className="w-full"
      />
      <div className="w-full overflow-x-scroll">
        <DataTable
          columns={trading_history_column}
          data={positions ?? []}
          className="min-w-[1136px]"
        />
      </div>
    </div>
  );
}
