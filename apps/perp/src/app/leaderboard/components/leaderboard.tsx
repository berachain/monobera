"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { DataTable } from "@bera/shared-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bera/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { useLeaderboard } from "~/hooks/useLeaderboard";
import { getColumns } from "./leaderboard-columns";

export default function LeaderBoard() {
  enum LeaderboardType {
    PROFIT = 1,
    LIQUIDATION = 2,
    VOLUME = 3,
  }

  const [leaderboardType, setLeaderboardType] = React.useState<LeaderboardType>(
    LeaderboardType.PROFIT,
  );

  enum TimeFrame {
    HOURLY = "1d",
    WEEKLY = "7D",
    MONTHLY = "30D",
    QUARTERLY = "90D",
  }
  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>(
    TimeFrame.QUARTERLY,
  );

  const { useLeaderBoardData } = useLeaderboard({
    sort: leaderboardType,
    interval: timeFrame as any,
  });

  const leaderBoardData = useLeaderBoardData();
  return (
    <div className="mx-auto mt-8 flex w-full flex-col gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-2 lg:flex-row lg:justify-start">
        <Image
          src={`${cloudinaryUrl}/BERPS/leaderboardAvatar_iuq8wu`}
          width={64}
          height={64}
          alt="logo"
        />
        <div className="flex-shrink-0 text-center text-2xl font-semibold leading-loose lg:text-left">
          Leaderboard
        </div>
      </div>
      <div className="flex w-full flex-row justify-between gap-2">
        <Tabs defaultValue={leaderboardType as any} className="hidden w-full sm:block">
          <TabsList className="w-full">
            <TabsTrigger
              value={LeaderboardType.PROFIT as any}
              key={LeaderboardType.PROFIT}
              className="w-full rounded-sm"
              onClick={() => setLeaderboardType(LeaderboardType.PROFIT)}
            >
              💰 Most Profitable
            </TabsTrigger>
            <TabsTrigger
              value={"liquidation"}
              key={"liquidation"}
              className="w-full rounded-sm"
              onClick={() => setLeaderboardType(LeaderboardType.LIQUIDATION)}
            >
              🔥 Top Liquidations
            </TabsTrigger>
            <TabsTrigger
              value={"volume"}
              key={"volume"}
              className="w-full rounded-sm"
              onClick={() => setLeaderboardType(LeaderboardType.VOLUME)}
            >
              📈 Most Volume
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Select
          onValueChange={(value: string) => setTimeFrame(value as TimeFrame)}
        >
          <SelectTrigger
            className={
              "flex w-[180pxpx] items-center justify-start justify-between rounded-2xs sm:hidden"
            }
          >
            <SelectValue
              placeholder="💰 Most Profitable"
              defaultValue={LeaderboardType.PROFIT}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={LeaderboardType.PROFIT as any}
              className={"cursor-pointer  hover:bg-muted"}
            >
              💰 Most Profitable
            </SelectItem>
            <SelectItem
              value={LeaderboardType.LIQUIDATION as any}
              className={"cursor-pointer hover:bg-muted"}
            >
              🔥 Top Liquidations
            </SelectItem>
            <SelectItem
              value={LeaderboardType.VOLUME as any}
              className={"cursor-pointer hover:bg-muted"}
            >
              📈 Most Volume
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: string) => setTimeFrame(value as TimeFrame)}
        >
          <SelectTrigger className={"w-[80px] justify-start gap-1 rounded-md"}>
            <SelectValue
              placeholder={TimeFrame.QUARTERLY}
              defaultValue={TimeFrame.QUARTERLY}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={TimeFrame.HOURLY}
              className={"cursor-pointer  hover:bg-muted"}
            >
              1d
            </SelectItem>
            <SelectItem
              value={TimeFrame.WEEKLY}
              className={"cursor-pointer hover:bg-muted"}
            >
              7d
            </SelectItem>
            <SelectItem
              value={TimeFrame.MONTHLY}
              className={"cursor-pointer hover:bg-muted"}
            >
              30d
            </SelectItem>
            <SelectItem
              value={TimeFrame.QUARTERLY}
              className={"cursor-pointer hover:bg-muted"}
            >
              90d
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full ">
        <DataTable
          columns={getColumns(leaderboardType as any)}
          data={leaderBoardData ?? []}
          className="w-full"
        />
      </div>
    </div>
  );
}
