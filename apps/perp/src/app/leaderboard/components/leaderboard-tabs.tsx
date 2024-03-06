"use client";

import { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import Leaderboard from "./leaderboard";
import LeaderboardCompetition from "./leaderboard-competition";

export default function Home() {
  enum LeaderboardType {
    COMPETITION = 1,
    GLOBAL = 2,
  }

  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>(
    LeaderboardType.COMPETITION,
  );

  return (
    <div className="flex w-full justify-between flex-col mt-4">
      <Tabs
        defaultValue={leaderboardType as any}
        className="mb-4 w-full rounded-md border sm:block lg:mb-0"
      >
        <TabsList className="w-full bg-background">
          <TabsTrigger
            value={LeaderboardType.COMPETITION as any}
            className="w-full rounded-sm"
            onClick={() => setLeaderboardType(LeaderboardType.COMPETITION)}
          >
            🏆 Competition
          </TabsTrigger>
          <TabsTrigger
            value={LeaderboardType.GLOBAL as any}
            className="w-full rounded-sm"
            onClick={() => setLeaderboardType(LeaderboardType.GLOBAL)}
          >
            🌎 Global
          </TabsTrigger>
        </TabsList>
      </Tabs>
      {leaderboardType === LeaderboardType.COMPETITION ? (
        <LeaderboardCompetition />
      ) : (
        <Leaderboard />
      )}
    </div>
  );
}
