"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBeraJs } from "@bera/berajs";
import { ConnectWalletBear, DataTable, SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { columns } from "~/components/pools-table-columns";
import { cloudinaryUrl } from "~/config";
import { PoolCard, PoolCardLoading } from "./PoolCard";
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
}: {
  icon: any;
  active: boolean;
  onClick: any;
}) => {
  return (
    <div
      className={
        "cursor-pointer rounded-full p-2 text-foreground hover:bg-hover"
      }
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

const TableViewLoading = () => (
  <div className="flex flex-col items-center gap-4">
    <Skeleton className="h-[150px] w-[238px]" />
    <Skeleton className="h-7 w-[300px]" />
    <Skeleton className="h-7 w-[451px]" />
    <Skeleton className="h-7 w-[130px]" />
  </div>
);

const CardViewLoading = () => (
  <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {[0, 0, 0].map((_, index) => (
      <PoolCardLoading key={index} />
    ))}
  </div>
);

export const PoolSearch = () => {
  const {
    data,
    userPools,
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
    isUserPoolsLoading,
    handleEnter,
    setKeyword,
  } = usePoolTable();

  const { isConnected } = useBeraJs();
  const router = useRouter();
  return (
    <div
      className="w-full flex-col items-center justify-center"
      id="poolstable"
    >
      <Tabs defaultValue="allPools">
        <div className="w-full text-center ">
          <p className="text-5xl font-extrabold">🔍 Search All Pools</p>
          <p className="text-lg font-semibold text-muted-foreground">
            Leverage our boosted yields to increase your rewards
          </p>

          <div className="mt-12 flex w-full flex-col items-center justify-center gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full flex-row items-center gap-2">
              <TabsList>
                <TabsTrigger value="allPools">All pools</TabsTrigger>
                <TabsTrigger value="userPools">My pools</TabsTrigger>
              </TabsList>
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
                placeholder="Search by name or address"
                onKeyDown={handleEnter}
                id="all-pool-search"
              />
            </div>
            <div className="flex w-full flex-row items-center justify-start gap-2 sm:justify-end">
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
                text={"📈 BGT Rewards"}
                active={hasBgtRewards}
                onClick={() => setHasBgtRewards(!hasBgtRewards)}
              />
              <Toggle
                icon={!isList ? <Icons.list /> : <Icons.layoutDashboard />}
                active={isList}
                onClick={() => setIsList(!isList)}
              />
            </div>
          </div>
          <TabsContent value="allPools">
            {isAllDataLoadingMore ? (
              <div className="mt-12 flex w-full flex-col items-center justify-center gap-4">
                {isList ? <TableViewLoading /> : <CardViewLoading />}
              </div>
            ) : data && data.length ? (
              isList ? (
                <div className="mt-12 flex w-full flex-col items-center justify-center gap-4">
                  <DataTable
                    key={data.length}
                    data={data ?? []}
                    columns={columns}
                    onRowClick={(state: any) =>
                      router.push(`/pool/${state.original.pool}`)
                    }
                  />
                </div>
              ) : (
                <div className="mt-12 flex w-full flex-col items-center justify-center gap-4">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              <Nothing />
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
            {!isConnected ? (
              <ConnectWalletBear
                message="You need to connect your wallet to see deposited pools and
            rewards"
              />
            ) : isUserPoolsLoading ? (
              isList ? (
                <TableViewLoading />
              ) : (
                <CardViewLoading />
              )
            ) : userPools === undefined || userPools.length === 0 ? (
              <Nothing />
            ) : isList ? (
              <div className="mt-12 flex w-full flex-col items-center justify-center gap-4">
                <DataTable
                  data={userPools ?? []}
                  columns={columns}
                  onRowClick={(state: any) =>
                    router.push(`/pool/${state.original.pool}`)
                  }
                />
              </div>
            ) : (
              <div className="mt-12 flex w-full flex-col items-center justify-center gap-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {userPools &&
                    userPools[0] &&
                    userPools.map((pool: any) => {
                      return (
                        <PoolCard pool={pool} key={"search" + pool?.pool} />
                      );
                    })}
                </div>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

const Nothing = () => (
  <div className="mx-auto w-fit">
    <Image
      src={`${cloudinaryUrl}/bears/e6monhixzv21jy0fqes1`}
      alt="not found bear"
      width={345.35}
      height={200}
    />
    <div className="mt-4 w-full text-center text-xl font-semibold leading-7 text-muted-foreground">
      No Pools found.
    </div>
  </div>
);
