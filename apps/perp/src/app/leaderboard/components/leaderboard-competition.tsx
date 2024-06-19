"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useBeraJs } from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { SimpleTable, Tooltip, useAsyncTable } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bera/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import {
  type PaginationState,
  type TableState,
  type Updater,
} from "@tanstack/react-table";
import moment from "moment";
import { isAddress } from "viem";

import { LEADERBOARD_TABS } from "~/utils/constants";
import { useLeaderboardCompetition } from "~/hooks/useLeaderboardCompetition";
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
      <div key={`${key}${value}`}>
        <span>{`${criterion} ${
          key === "volume" || key === "pnl" ? "$" : ""
        }${value} ${
          humanReadableKeys?.[key as keyof typeof humanReadableKeys] ?? ""
        }`}</span>{" "}
        <br />
      </div>
    );
  });

  // Remove the trailing comma and space
  humanizedQualifications.unshift(
    <div key="qualify">
      <span>To qualify:</span>
      <br />
    </div>,
  );
  return humanizedQualifications;
};

export default function LeaderBoardCompetition() {
  const [leaderboardQuery, setLeaderboardQuery] = useState({
    sortBy: LEADERBOARD_TABS[0].index,
    page: 1,
    perPage: 10,
    wallet: "",
  });

  const [value, setValue] = useState<string>("");
  const [isValidSearch, setIsValidSearch] = useState<boolean>(false);

  const {
    isLoading,
    isValidating,
    leaderboardData,
    leaderboardPagination: pagination,
    leaderboardDetails,
  } = useLeaderboardCompetition(leaderboardQuery);

  // The competition details dont appear during searches
  const [competitionDetails, setCompDetails] = useState(leaderboardDetails);

  useEffect(() => {
    if (leaderboardDetails && Object.keys(leaderboardDetails).length !== 0) {
      setCompDetails(leaderboardDetails);
    }
  }, [leaderboardDetails]);

  const { isConnected, account } = useBeraJs();
  const { useIsQualifiedAddress } = useQualifiedAddress({
    wallet: account ?? "",
  });
  const validAddress = useIsQualifiedAddress();

  const startTime = useMemo(() => {
    return competitionDetails?.start_time !== undefined
      ? Number(competitionDetails?.start_time)
      : 0;
  }, [competitionDetails?.start_time]);

  const endTime = useMemo(() => {
    return competitionDetails?.end_time !== undefined
      ? Number(competitionDetails?.end_time)
      : 0;
  }, [competitionDetails?.end_time]);

  const competitionState = useMemo(() => {
    return startTime > moment().unix()
      ? "upcoming"
      : endTime === 0 || endTime < moment().unix()
        ? "ended"
        : "ongoing";
  }, [startTime, endTime]);

  const columns = useMemo(() => {
    return (
      getColumns(
        LEADERBOARD_TABS[Number(leaderboardQuery.sortBy) - 1].header,
      ) ?? []
    );
  }, [leaderboardQuery]);

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

  const handleTabChange = useCallback(
    (evt: React.MouseEvent<HTMLElement>) => {
      const tab = LEADERBOARD_TABS.find(
        (tab) => tab.title === evt.currentTarget.textContent,
      );
      if (tab) {
        setLeaderboardQuery((prev) => ({
          ...prev,
          sortBy: tab.index,
          page: 1,
        }));
      }
    },
    [setLeaderboardQuery],
  );

  const handleSearchValueChange = useCallback(
    (e: any) => {
      if (isAddress(e.target.value)) {
        setIsValidSearch(true);
        setLeaderboardQuery((prev) => ({
          ...prev,
          wallet: e.target.value,
        }));
      } else {
        setIsValidSearch(false);
        if (leaderboardQuery.wallet) {
          setLeaderboardQuery((prev) => ({
            ...prev,
            wallet: "",
          }));
        }
      }
      setValue(e.target.value);
    },
    [value, setValue],
  );

  const handlePaginationChange = useCallback(
    (updater: Updater<PaginationState>) => {
      setLeaderboardQuery((prev) => {
        const newPaginationState =
          typeof updater === "function"
            ? updater({
                pageIndex: (prev.page ?? 1) - 1,
                pageSize: prev.perPage ?? 10,
              })
            : updater;
        return {
          ...prev,
          page: newPaginationState.pageIndex + 1,
          perPage: newPaginationState.pageSize,
        };
      });
    },
    [],
  );

  const table = useAsyncTable({
    data: leaderboardData
      ? Array.isArray(leaderboardData)
        ? leaderboardData
        : [leaderboardData]
      : [],
    columns: columns,
    fetchData: async () => {},
    enablePagination: true,
    additionalTableProps: {
      state: {
        pagination: {
          pageIndex: (pagination?.page ?? 1) - 1,
          pageSize: pagination?.per_page ?? 10,
        },
      },
      manualPagination: true,
      manualSorting: true,
      autoResetPageIndex: false,
      pageCount: pagination?.total_pages ?? 1,
      onPaginationChange: handlePaginationChange,
      meta: {
        loading: isLoading,
        loadingText: "Loading...",
        validating: isValidating,
        selectVisibleRows: true,
      },
    },
  });

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
      <div className="mt-4 flex h-56 w-full items-center justify-between rounded-[18px] border bg-gradient-to-tr from-[rgba(255,193,7,0.30)] to-[rgba(255,235,59,0.05)] p-8 dark:bg-gradient-to-tr  dark:from-[rgba(255,235,59,0.05)] dark:to-[rgba(255,100,7,0.30)] sm:h-44">
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-start sm:flex-row sm:items-center">
            <div className="foreground font-['IBM Plex Sans'] min-w-[240px] text-start text-3xl font-semibold leading-9">
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
              className="rounded-m mt-4 min-w-[105px] cursor-pointer justify-center px-2 py-1 font-medium sm:ml-4 sm:mt-1 sm:self-center"
            >
              {competitionDetails?.qualifications && (
                <Tooltip
                  key="qualifications"
                  className="mr-1"
                  text={
                    humanizeQualifications(
                      competitionDetails?.qualifications,
                    ) as any
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
          defaultValue={leaderboardQuery.sortBy.toString()}
          className="mb-4 hidden w-full rounded-md border sm:block lg:mb-0"
        >
          <TabsList className="w-full bg-background">
            {LEADERBOARD_TABS.map((tab, index) => (
              <TabsTrigger
                value={tab.index.toString()}
                key={tab.index}
                className="w-full rounded-sm"
                onClick={handleTabChange}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Select
          onValueChange={(value: string) =>
            setLeaderboardQuery((prev) => ({
              ...prev,
              sortBy: Number(value),
              page: 1,
            }))
          }
        >
          <SelectTrigger
            className={
              "flex-0 mb-4 flex items-center justify-between rounded-md border border-border sm:hidden"
            }
          >
            <SelectValue
              placeholder={LEADERBOARD_TABS[0].title}
              defaultValue={LEADERBOARD_TABS[0].index.toString()}
            />
          </SelectTrigger>
          <SelectContent>
            {LEADERBOARD_TABS.map((tab) => (
              <SelectItem
                value={tab.index.toString()}
                key={tab.index}
                className={"cursor-pointer hover:bg-muted"}
              >
                {tab.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="hidden w-full lg:flex" />
        <Input
          className={cn(
            "flex w-full shrink-0 bg-muted pl-9 text-foreground lg:mt-0 lg:min-w-[400px]",
            !isValidSearch &&
              value &&
              "border-destructive-foreground text-destructive-foreground focus:border-destructive-foreground",
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
      <SimpleTable table={table} flexTable className="w-full" />
    </div>
  );
}
