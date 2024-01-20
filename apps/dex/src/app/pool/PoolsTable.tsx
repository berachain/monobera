"use client";

import Link from "next/link";
import { DataTable, NotFoundBear, SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { columns } from "~/components/pools-table-columns";
import { PoolCard } from "./components/pools/PoolCard";
import CardViewLoading from "./components/pools/card-view-loading";
import MyPool from "./components/pools/my-pool";
import TableViewLoading from "./components/pools/table-view-loading";
import { usePoolTable } from "./usePoolTable";

const FilterBadge = ({
  text,
  active,
  onClick,
}: {
  text: string;
  active: boolean;
  onClick: any;
}) => {
  return (
    <Badge
      className={cn(
        "border-border bg-muted font-medium text-muted-foreground hover:cursor-pointer hover:bg-info",
        active ? "border-info-foreground bg-info text-info-foreground" : "",
      )}
      onClick={onClick}
    >
      {text}
    </Badge>
  );
};

const Toggle = ({
  icon,
  onClick,
  className,
}: {
  icon: any;
  className?: string;
  onClick: any;
}) => {
  return (
    <div
      className={cn(
        "cursor-pointer rounded-full p-2 text-muted-foreground hover:bg-hover",
        className,
      )}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export const PoolSearch = ({
  poolType,
}: {
  poolType: "allPools" | "userPools";
}) => {
  const {
    data,
    allDataSize,
    setAllDataSize,
    isAllDataLoadingMore,
    isAllDataReachingEnd,
    search,
    setSearch,
    hasBgtRewards,
    setHasBgtRewards,
    isNewPool,
    setIsNewPool,
    isHotPool,
    setIsHotPool,
    isList,
    setIsList,
    handleEnter,
    setKeyword,
  } = usePoolTable();

  return (
    <div
      className="w-full flex-col items-center justify-center"
      id="poolstable"
    >
      <Tabs className="flex flex-col gap-4" value={poolType}>
        <TabsList className="w-fit" variant="ghost">
          <TabsTrigger
            value="allPools"
            className="w-full sm:w-fit"
            variant="ghost"
          >
            <Link href="/pool?pool=allPools">All pools</Link>
          </TabsTrigger>
          <TabsTrigger
            value="userPools"
            className="w-full sm:w-fit"
            variant="ghost"
          >
            <Link href="/pool?pool=userPools">My pools</Link>
          </TabsTrigger>
        </TabsList>

        <div className="flex w-full flex-col items-center justify-center gap-2 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput
            value={search}
            onChange={(e) => {
              if (e.target.value === "") {
                setKeyword("");
                setSearch("");
              } else {
                setSearch(e.target.value);
              }
            }}
            placeholder="Search..."
            onKeyDown={handleEnter}
            id="all-pool-search"
            className="w-full md:w-[400px]"
          />

          <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2 lg:justify-end">
            <FilterBadge
              text={"🚀 New Pools"}
              active={isNewPool}
              onClick={() => setIsNewPool(!isNewPool)}
            />
            <FilterBadge
              text={"🔥 Hot Pools"}
              active={isHotPool}
              onClick={() => setIsHotPool(!isHotPool)}
            />
            <FilterBadge
              text={"🐝 BGT Rewards"}
              active={hasBgtRewards}
              onClick={() => setHasBgtRewards(!hasBgtRewards)}
            />
            <Toggle
              icon={!isList ? <Icons.list /> : <Icons.layoutDashboard />}
              onClick={() => setIsList(!isList)}
            />
          </div>
        </div>

        <TabsContent value="allPools" className="text-center">
          {isAllDataLoadingMore && data?.length === 0 ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              {isList ? <TableViewLoading /> : <CardViewLoading />}
            </div>
          ) : data && data.length ? (
            isList ? (
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <DataTable
                  key={data.length}
                  data={data ?? []}
                  columns={columns}
                  title={`All Pools (${data.length})`}
                  className="min-w-[1000px]"
                  onRowClick={(
                    row, //@ts-ignore
                  ) => window.open(`/pool/${row.original.pool}`, "_self")}
                />
              </div>
            ) : (
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {data &&
                    data[0] &&
                    data.map((pool: any) => {
                      return (
                        <PoolCard pool={pool} key={"search" + pool?.pool} />
                      );
                    })}
                </div>
              </div>
            )
          ) : (
            <NotFoundBear title="No Pools found." />
          )}

          {!isAllDataLoadingMore && data && data?.length > 0 && (
            <Button
              className="mt-8"
              onClick={() => setAllDataSize(allDataSize + 1)}
              disabled={isAllDataLoadingMore || isAllDataReachingEnd}
              variant="outline"
            >
              {isAllDataReachingEnd ? "No more pools" : "View More"}
            </Button>
          )}
        </TabsContent>

        <TabsContent value="userPools">
          <MyPool isList={false} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
