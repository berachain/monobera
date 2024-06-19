"use client";

import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { SimpleTable, useAsyncTable } from "@bera/shared-ui";
import { cn } from "@bera/ui";
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
import { type PaginationState, type Updater } from "@tanstack/react-table";
import { isAddress } from "viem";

import {
  DAILY,
  LEADERBOARD_TABS,
  MONTHLY,
  QUARTERLY,
  WEEKLY,
} from "~/utils/constants";
import { useLeaderboard } from "~/hooks/useLeaderboard";
import { getColumns } from "./leaderboard-columns";

const leaderboardTimeFrame = [DAILY, WEEKLY, MONTHLY, QUARTERLY].map(
  (timeFrame) => timeFrame.slice(0, -1),
);

export interface LeaderBoardQuery {
  sortBy: string;
  days: string;
  filters?: string | undefined;
  page: number;
  perPage: number;
  wallet?: string;
}

export default function LeaderBoard() {
  const [leaderboardQuery, setLeaderboardQuery] = useState<LeaderBoardQuery>({
    sortBy: LEADERBOARD_TABS[0].value,
    days: leaderboardTimeFrame[3],
    filters: undefined,
    page: 1,
    perPage: 10,
    wallet: "",
  });

  const [isValidSearch, setIsValidSearch] = useState<boolean>(false);
  const [value, setValue] = useState("");

  const {
    data: leaderboardData,
    isLoading,
    isValidating,
  } = useLeaderboard(leaderboardQuery);

  const columns = useMemo(() => {
    const tab = LEADERBOARD_TABS.find(
      (tab) => tab.value === leaderboardQuery.sortBy,
    );
    return getColumns(
      tab?.header ?? LEADERBOARD_TABS[0].header,
      leaderboardQuery.page,
      leaderboardQuery.perPage,
    );
  }, [leaderboardQuery, getColumns]);

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
    [value, setValue, setIsValidSearch],
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

  const handleTabChange = useCallback(
    (evt: React.MouseEvent<HTMLElement>) => {
      const tab = LEADERBOARD_TABS.find(
        (tab) => tab.title === evt.currentTarget.textContent,
      );
      if (tab) {
        setLeaderboardQuery((prev) => ({
          ...prev,
          sortBy: tab.value,
          page: 1,
        }));
      }
    },
    [setLeaderboardQuery],
  );

  const table = useAsyncTable({
    data: leaderboardData?.result
      ? Array.isArray(leaderboardData?.result)
        ? leaderboardData?.result
        : [leaderboardData?.result]
      : [],
    columns: columns,
    fetchData: async () => {},
    enablePagination: true,
    additionalTableProps: {
      state: {
        pagination: {
          pageIndex: (leaderboardData?.pagination?.page ?? 1) - 1,
          pageSize: leaderboardData?.pagination?.per_page ?? 10,
        },
      },
      manualPagination: true,
      autoResetPageIndex: false,
      pageCount: leaderboardData?.pagination?.total_pages ?? 1,
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
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
        <Tabs
          defaultValue={leaderboardQuery.sortBy}
          className="hidden w-full sm:block"
        >
          <TabsList className="w-full">
            {LEADERBOARD_TABS.map((tab) => (
              <TabsTrigger
                value={tab.value}
                key={tab.value}
                className="w-full rounded-sm"
                onClick={handleTabChange}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="hidden w-full lg:flex" />
        <Select
          onValueChange={(value: string) =>
            setLeaderboardQuery((prev) => ({ ...prev, sortBy: value, page: 1 }))
          }
        >
          <SelectTrigger
            className={
              "flex w-[180pxpx] items-center justify-between rounded-md border border-border sm:hidden"
            }
          >
            <SelectValue
              placeholder={LEADERBOARD_TABS[0].title}
              defaultValue={LEADERBOARD_TABS[0].value}
            />
          </SelectTrigger>
          <SelectContent>
            {LEADERBOARD_TABS.map((tab) => (
              <SelectItem
                value={tab.value}
                key={tab.value}
                className={"cursor-pointer hover:bg-muted"}
              >
                {tab.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
      <SimpleTable
        table={table}
        flexTable
        className="w-full"
        toolbarContent={
          <Select
            onValueChange={(value: string) =>
              setLeaderboardQuery((prev) => ({
                ...prev,
                days: value,
                page: 1,
              }))
            }
          >
            <SelectTrigger
              className={
                "flex h-9 w-[70px] justify-center gap-1 rounded-md border border-border"
              }
            >
              <SelectValue placeholder={QUARTERLY} defaultValue={QUARTERLY} />
            </SelectTrigger>
            <SelectContent>
              {leaderboardTimeFrame.map((timeFrame) => (
                <SelectItem
                  value={timeFrame}
                  className="cursor-pointer hover:bg-muted"
                >
                  {`${timeFrame}d`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />
    </div>
  );
}
