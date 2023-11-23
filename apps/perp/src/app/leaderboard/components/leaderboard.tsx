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
    PROFIT = "pnl",
    LIQUIDATION = "liquidation",
    VOLUME = "volume",
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
  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>(TimeFrame.HOURLY);

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
          <div className="text-sm font-medium leading-tight text-muted-foreground">
            {" "}
            Trade competitively, winner gets HONEY or a bear every week.
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between gap-2">
        <Tabs defaultValue={leaderboardType} className="hidden w-full sm:block">
          <TabsList className="w-full">
            <TabsTrigger
              value={LeaderboardType.PROFIT}
              key={LeaderboardType.PROFIT}
              className="w-full rounded-lg"
              onClick={() => setLeaderboardType(LeaderboardType.PROFIT)}
            >
              💰 Most Profitable
            </TabsTrigger>
            <TabsTrigger
              value={"liquidation"}
              key={"liquidation"}
              className="w-full rounded-lg"
              onClick={() => setLeaderboardType(LeaderboardType.LIQUIDATION)}
            >
              🔥 Top Liquidations
            </TabsTrigger>
            <TabsTrigger
              value={"volume"}
              key={"volume"}
              className="w-full rounded-lg"
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
              "flex w-[180pxpx] items-center justify-start justify-between rounded-xl sm:hidden"
            }
          >
            <SelectValue
              placeholder="💰 Most Profitable"
              defaultValue={LeaderboardType.PROFIT}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={LeaderboardType.PROFIT}
              className={"cursor-pointer  hover:bg-muted"}
            >
              💰 Most Profitable
            </SelectItem>
            <SelectItem
              value={LeaderboardType.LIQUIDATION}
              className={"cursor-pointer hover:bg-muted"}
            >
              🔥 Top Liquidations
            </SelectItem>
            <SelectItem
              value={LeaderboardType.VOLUME}
              className={"cursor-pointer hover:bg-muted"}
            >
              📈 Most Volume
            </SelectItem>
          </SelectContent>
        </Select>
        <Select
          onValueChange={(value: string) => setTimeFrame(value as TimeFrame)}
        >
          <SelectTrigger className={"w-[80px] justify-start gap-1 rounded-xl"}>
            <SelectValue
              placeholder={TimeFrame.HOURLY}
              defaultValue={TimeFrame.HOURLY}
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
          columns={getColumns(leaderboardType)}
          data={leaderBoardData ?? []}
          className="w-full"
        />
      </div>
    </div>
  );
}
