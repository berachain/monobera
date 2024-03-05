"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@bera/ui";
import Image from "next/image";
import { isAddress } from "viem";
import { cloudinaryUrl } from "@bera/config";
import { useBeraJs } from "@bera/berajs";
import { DataTable, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Badge } from "@bera/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bera/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { type TableState } from "@tanstack/react-table";
import moment from "moment";

import { useLeaderboard } from "~/hooks/useLeaderboardCompetition";
import { useQualifiedAddress } from "~/hooks/useQualifiedAddress";
import { getColumns } from "./leaderboard-columns";

const humanReadableKeys = {
  volume: "in volume",
  num_trades: "trades completed",
  pnl: "in realized PnL",
};

const humanizeQualifications = (qualifications: string[]) => {
  const humanizedQualifications = qualifications.map((qualification) => {
    let criterion = "";
    let key = "" as string | undefined;
    let value = "" as string | undefined;
    if (qualification.includes(">=")) {
      [key, value] = qualification.split(">=");
      criterion = "You must have at least";
    } else if (qualification.includes("<=")) {
      [key, value] = qualification.split("<=");
      criterion = "You must have at most";
    } else if (qualification.includes("=")) {
      [key, value] = qualification.split("=");
      criterion = "You must have exactly";
    } else if (qualification.includes(">")) {
      [key, value] = qualification.split(">");
      criterion = "You must have more than";
    } else if (qualification.includes("<")) {
      [key, value] = qualification.split("<");
      criterion = "You must have less than";
    }

    return (
      <>
        <span>{`${criterion} ${
          key === "volume" || key === "pnl" ? "$" : ""
        }${value} ${
          humanReadableKeys?.[key as keyof typeof humanReadableKeys] ?? ""
        }`}</span>{" "}
        <br />
      </>
    );
  });

  // Remove the trailing comma and space
  humanizedQualifications.unshift(
    <>
      <span>To qualify:</span>
      <br />
    </>,
  );
  return humanizedQualifications;
};

export default function LeaderBoard({ mobile }: { mobile: boolean }) {
  enum LeaderboardType {
    PROFIT = 1,
    LIQUIDATION = 2,
    VOLUME = 3,
  }

  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>(
    LeaderboardType.PROFIT,
  );

  const [value, setValue] = useState<string>("");
  const [pageIndex, setPageIndex] = useState<number>(0);
  const [isValidSearch, setIsValidSearch] = useState<boolean>(false);

  const {
    isLoading,
    isValidating,
    useLeaderBoardData,
    useLeaderBoardPagination,
    useLeaderBoardDetails,
    refetch,
  } = useLeaderboard({
    sort: leaderboardType as any,
    page: pageIndex + 1,
    wallet: isValidSearch ? value : "",
  });
  const { isConnected, account } = useBeraJs();
  const { useIsQualifiedAddress } = useQualifiedAddress({
    wallet: account ?? "",
  });
  const leaderBoardData = useLeaderBoardData();
  const pagination = useLeaderBoardPagination();
  const competitionDetails = useLeaderBoardDetails();
  const validAddress = useIsQualifiedAddress();
  const [compDetails, setCompDetails] = useState(competitionDetails);

  useEffect(() => {
    if (competitionDetails && !Array.isArray(competitionDetails)) {
      setCompDetails(competitionDetails);
    }
  }, [competitionDetails]);

  const data = useMemo(() => {
    if (leaderBoardData) {
      return Array.isArray(leaderBoardData)
        ? leaderBoardData
        : [leaderBoardData];
    }
    return [];
  }, [leaderBoardData]);

  const startTime = useMemo(() => {
    return compDetails?.start_time !== undefined
      ? Number(compDetails?.start_time)
      : 0;
  }, [compDetails?.start_time]);

  const endTime = useMemo(() => {
    return compDetails?.end_time !== undefined
      ? Number(compDetails?.end_time)
      : 0;
  }, [compDetails?.end_time]);

  const competitionState = useMemo(() => {
    return startTime > moment().unix()
      ? "upcoming"
      : endTime === 0 || endTime < moment().unix()
        ? "ended"
        : "ongoing";
  }, [startTime, endTime]);

  const columns = useMemo(
    () => getColumns(leaderboardType as any, mobile) ?? [],
    [leaderboardType, mobile],
  );

  const calculateDifferenceInDaysAndHours = useCallback(
    (unixTimestamp1: number, unixTimestamp2: number) => {
      // Convert Unix timestamps to Moment.js date objects
      const date1 = moment.unix(unixTimestamp1);
      const date2 = moment.unix(unixTimestamp2);

      // Calculate the difference in days
      const differenceInDays = Math.floor(
        moment.duration(date2.diff(date1)).asDays(),
      );
      // To calculate hours, first get the total difference in hours, then subtract the days converted to hours
      const totalHours = moment.duration(date2.diff(date1)).asHours();
      const hoursAfterDays = Math.floor(totalHours - differenceInDays * 24);
      return `${differenceInDays} days ${hoursAfterDays} hours`;
    },
    [competitionState],
  );

  const timeDisplay = useMemo(() => {
    return competitionState === "upcoming"
      ? calculateDifferenceInDaysAndHours(moment().unix(), startTime)
      : competitionState === "ongoing"
        ? calculateDifferenceInDaysAndHours(moment().unix(), endTime)
        : "";
  }, [startTime, endTime, competitionState]);

  useEffect(() => {
    setPageIndex(0);
  }, [leaderboardType]);

  useEffect(() => {
    refetch();
  }, [pageIndex, isValidSearch]);

  const pageCount = useMemo(() => {
    return pagination?.total_pages;
  }, [pagination]);

  const fetchData = useCallback(
    (state: TableState) => {
      setPageIndex(state?.pagination?.pageIndex);
    },
    [setPageIndex],
  );

  const handleSearchValueChange = useCallback(
    (e: any) => {
      if (isAddress(e.target.value)) {
        setIsValidSearch(true);
      } else {
        setIsValidSearch(false);
      }
      setValue(e.target.value);
    },
    [value, setValue],
  );

  return (
    <div className="mx-auto mt-2 flex w-full flex-col gap-4">
      {/* Header */}
      <div className="flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:items-start">
        <Image
          className="mt-4 h-16 w-16 gap-1"
          src={`${cloudinaryUrl}/BERPS/leaderboardAvatar_iuq8wu`}
          width={64}
          height={64}
          alt="logo"
        />
        <div className="inline-flex h-14 w-full flex-1 flex-col items-center justify-center sm:mt-2 sm:items-start sm:justify-start">
          <div className="flex-shrink-0 text-center text-2xl font-semibold leading-loose lg:text-left">
            Leaderboard
          </div>
          <div className="font-['IBM Plex Sans'] text-sm font-normal leading-tight text-foreground">
            Trade competitively, winner gets 50,000 points boost.
          </div>
        </div>
        <div className="flex-0 inline-flex h-12 flex-col items-center justify-center gap-1 sm:mt-6 sm:items-end sm:justify-end">
          <div className="inline-flex items-center justify-center gap-1">
            <Icons.clock className="block h-4 w-4" />
            <div className="font-['IBM Plex Sans'] text-sm font-medium leading-[14px] text-muted-foreground">
              {competitionState === "upcoming"
                ? "Competition Begins In:"
                : competitionState === "ended"
                  ? "Competition Ended"
                  : "Competition Ends In:"}
            </div>
          </div>
          <div className="font-['IBM Plex Sans'] text-lg font-semibold leading-7 text-foreground">
            {timeDisplay}
          </div>
        </div>
      </div>
      {/* Header Card */}
      <div className="mt-4 flex h-44 w-full items-center justify-between rounded-[18px] border bg-gradient-to-tr from-[rgba(255,193,7,0.30)] to-[rgba(255,235,59,0.05)] p-8  dark:bg-gradient-to-tr dark:from-[rgba(255,235,59,0.05)] dark:to-[rgba(255,100,7,0.30)]">
        <div className="flex w-full flex-col">
          <div className="flex items-center">
            <div className="foreground font-['IBM Plex Sans'] text-start text-3xl font-semibold leading-9">
              👑 Battle Royale
            </div>
            <Badge
              variant={
                isConnected
                  ? validAddress
                    ? "success"
                    : "destructive"
                  : "secondary"
              }
              className="cursor-pointer rounded-m py-1 px-2 font-medium ml-4 mt-1 self-center"
            >
              {compDetails?.qualifications && (
                <Tooltip
                  className="mr-1"
                  text={
                    humanizeQualifications(compDetails?.qualifications) as any
                  }
                />
              )}
              {isConnected
                ? validAddress
                  ? "You Qualify"
                  : "Not Qualified"
                : "Connect Wallet"}
            </Badge>
          </div>
          <div className="mt-4 flex flex-col justify-start md:flex-row">
            <div className="flex flex-1 flex-col">
              <div className="foreground font-['IBM Plex Sans'] text-lg font-semibold leading-7">
                20k Points
              </div>
              <div className="font-['IBM Plex Sans'] text-xs font-medium leading-tight text-neutral-400">
                Awarded to winner
              </div>
            </div>
            <div className="mt-2 flex flex-[2_2_0%] flex-col items-start md:mt-0">
              <div className="foreground font-['IBM Plex Sans'] text-lg font-semibold leading-7">
                {startTime || endTime
                  ? `${moment.unix(startTime).format("MM/DD/YYYY")} - ${moment
                      .unix(endTime)
                      .format("MM/DD/YYYY")}`
                  : "TBD"}
              </div>
              <div className="font-['IBM Plex Sans'] text-xs font-medium leading-tight text-neutral-400">
                Start and end date
              </div>
            </div>
          </div>
        </div>
        <div className="hidden shrink-0 md:flex">
          <Image
            className="h-[174px] w-[220px]"
            src={`${cloudinaryUrl}/BERPS/anc1p5i1z9hd61at3fd0`}
            width={220}
            height={174}
            alt="King Bear"
          />
        </div>
      </div>
      {/* Tabs and Search */}
      <div className="flex w-full flex-col justify-between lg:flex-row ">
        <Tabs
          defaultValue={leaderboardType as any}
          className="mb-4 hidden w-full rounded-md border sm:block lg:mb-0"
        >
          <TabsList className="w-full bg-background">
            <TabsTrigger
              value={LeaderboardType.PROFIT as any}
              className="w-full rounded-sm"
              onClick={() => setLeaderboardType(LeaderboardType.PROFIT)}
            >
              💰 Most Profitable
            </TabsTrigger>
            <TabsTrigger
              value={"liquidation"}
              className="w-full rounded-sm"
              onClick={() => setLeaderboardType(LeaderboardType.LIQUIDATION)}
            >
              🔥 Top Liquidations
            </TabsTrigger>
            <TabsTrigger
              value={"volume"}
              className="w-full rounded-sm"
              onClick={() => setLeaderboardType(LeaderboardType.VOLUME)}
            >
              📈 Most Volume
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Select
          onValueChange={(value: string) => setLeaderboardType(Number(value))}
        >
          <SelectTrigger
            className={
              "flex-0 mb-4 flex items-center justify-between rounded-md border border-border sm:hidden"
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
        <div className="hidden w-full lg:flex" />
        <Input
          className={cn(
            "flex w-full shrink-0 bg-muted pl-9 text-foreground lg:mt-0 lg:min-w-[400px]",
            !isValidSearch &&
              value &&
              "text-destructive-foreground border-destructive-foreground focus:border-destructive-foreground",
          )}
          type="text"
          id="wallet-search-input"
          placeholder="0x0000...0000"
          value={value}
          startAdornment={<Icons.search className="h-4 w-4" />}
          onChange={handleSearchValueChange}
        />
      </div>
      {/* Table */}
      <div className="w-full ">
        <DataTable
          key={`${leaderboardType}-leaderboard`}
          columns={columns}
          data={data}
          fetchData={fetchData}
          className="w-full"
          enablePagination
          loading={isLoading || isValidating}
          additionalTableProps={{
            pageCount: pageCount,
            manualFiltering: true,
            manualSorting: true,
            manualPagination: true,
            autoResetPageIndex: isValidSearch,
          }}
        />
      </div>
    </div>
  );
}
