"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { SimpleTable, useBaseTable } from "@bera/shared-ui";
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
import { HOURLY, WEEKLY, MONTHLY, QUARTERLY } from "~/utils/constants";

export default function LeaderBoard() {
  enum LeaderboardType {
    PROFIT = 1,
    LIQUIDATION = 2,
    VOLUME = 3,
  }

  const [leaderboardType, setLeaderboardType] = React.useState<LeaderboardType>(
    LeaderboardType.PROFIT,
  );

  type LeaderboardTimeFrame = "1d" | "7d" | "30d" | "90d";

  const [timeFrame, setTimeFrame] =
    React.useState<LeaderboardTimeFrame>(QUARTERLY);

  const { useLeaderBoardData } = useLeaderboard({
    sort: leaderboardType as any,
    interval: timeFrame as any,
  });

  const leaderBoardData = useLeaderBoardData();

  const table = useBaseTable({
    data: leaderBoardData ?? [],
    columns: getColumns(leaderboardType.toString()),
  });

  return (
    <div className="mx-auto flex w-full flex-col gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:justify-start">
        <Image
          className="mt-6"
          src={`${cloudinaryUrl}/BERPS/leaderboardAvatar_iuq8wu`}
          width={64}
          height={64}
          alt="logo"
        />
        <div className="inline-flex h-14 w-full flex-1 flex-col items-center justify-center sm:items-start sm:justify-start">
          <div className="flex-shrink-0 text-center text-2xl font-semibold leading-loose lg:text-left">
            Global Leaderboard
          </div>
          <div className="font-['IBM Plex Sans'] text-sm font-normal leading-tight text-foreground">
            Top 10 traders
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between gap-2">
        <Tabs
          defaultValue={leaderboardType as any}
          className="hidden w-full sm:block"
        >
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
        <div className="hidden w-full lg:flex" />
        <Select
          onValueChange={(value: string) => setLeaderboardType(Number(value))}
        >
          <SelectTrigger
            className={
              "flex w-[180pxpx] items-center justify-between rounded-md border border-border sm:hidden"
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
          onValueChange={(value: string) =>
            setTimeFrame(value as LeaderboardTimeFrame)
          }
        >
          <SelectTrigger
            className={
              "w-[80px] justify-start gap-1 rounded-md border border-border"
            }
          >
            <SelectValue placeholder={QUARTERLY} defaultValue={QUARTERLY} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value={HOURLY}
              className={"cursor-pointer  hover:bg-muted"}
            >
              1d
            </SelectItem>
            <SelectItem
              value={WEEKLY}
              className={"cursor-pointer hover:bg-muted"}
            >
              7d
            </SelectItem>
            <SelectItem
              value={MONTHLY}
              className={"cursor-pointer hover:bg-muted"}
            >
              30d
            </SelectItem>
            <SelectItem
              value={QUARTERLY}
              className={"cursor-pointer hover:bg-muted"}
            >
              90d
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SimpleTable
        table={table}
        flexTable
        showToolbar={false}
        className="w-full"
      />
    </div>
  );
}
