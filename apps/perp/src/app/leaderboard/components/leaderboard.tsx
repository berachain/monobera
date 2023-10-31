"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

export default function LeaderBoard() {
  const [leaderboardType, setLeaderboardType] = React.useState<
    "profit" | "liquidation" | "volume"
  >("profit");

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-4 ">
      <div className="flex w-full flex-col items-end justify-between gap-2 md:flex-row">
        <div className="flex-shrink-0 text-2xl font-semibold leading-loose">
          Leaderboard
          <div className="text-xs font-medium leading-tight text-muted-foreground">
            {" "}
            See the top winners & losers on Berps
          </div>
        </div>
      </div>
      <Tabs defaultValue={leaderboardType} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger
            value={"profit"}
            key={"profit"}
            className="w-full rounded-lg"
            onClick={() => setLeaderboardType("profit")}
          >
            💰 Most Profitable
          </TabsTrigger>
          <TabsTrigger
            value={"liquidation"}
            key={"liquidation"}
            className="w-full rounded-lg"
            onClick={() => setLeaderboardType("liquidation")}
          >
            🔥 Top Liquidations
          </TabsTrigger>
          <TabsTrigger
            value={"volume"}
            key={"volume"}
            className="w-full rounded-lg"
            onClick={() => setLeaderboardType("volume")}
          >
            📈 Most Volume
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="w-full overflow-x-scroll">
        {/* <DataTable
          columns={history_columns}
          data={closedPositions ?? []}
          className="min-w-[1136px]"
        /> */}
      </div>
    </div>
  );
}
