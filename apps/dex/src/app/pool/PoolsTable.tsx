import { DataTable, SearchInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { columns } from "~/components/pools-table-columns";
import { PoolCard } from "./PoolCard";
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
        "border-border bg-muted font-medium text-muted-foreground hover:bg-sky-50",
        active ? "opacity-100" : "opacity-50",
      )}
      onClick={onClick}
    >
      {text}
    </Badge>
  );
};

const Toggle = ({
  icon,
  active,
  onClick,
}: {
  icon: any;
  active: boolean;
  onClick: any;
}) => {
  return (
    <div
      className={cn("", active ? "text-foreground" : "text-muted-foreground")}
      onClick={onClick}
    >
      {icon}
    </div>
  );
};

export const PoolSearch = () => {
  const {
    data,
    userPools,
    allDataSize,
    setAllDataSize,
    isAllDataLoadingMore,
    // isAllDataEmpty,
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
  } = usePoolTable();
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
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or address"
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
                icon={<Icons.list />}
                active={isList}
                onClick={() => setIsList(!isList)}
              />
              <Toggle
                icon={<Icons.layoutDashboard />}
                active={!isList}
                onClick={() => setIsList(!isList)}
              />
            </div>
          </div>
          <TabsContent value="allPools">
            {!isList && (
              <div className="mt-12 flex w-full flex-col items-center justify-center gap-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {data.map((pool: any) => {
                    return <PoolCard pool={pool} key={"search" + pool?.pool} />;
                  })}
                </div>
              </div>
            )}
            {isList && (
              <div className="mt-12 flex w-full flex-col items-center justify-center gap-4">
                <DataTable
                  data={data ?? []}
                  columns={columns}
                  onRowClick={(state: any) => console.log(state)}
                />
              </div>
            )}
            <Button
              className="mt-12"
              onClick={() => setAllDataSize(allDataSize + 1)}
              disabled={isAllDataLoadingMore || isAllDataReachingEnd}
              variant="outline"
            >
              {isAllDataLoadingMore
                ? "Loading..."
                : isAllDataReachingEnd
                ? "No more pools"
                : "View More"}
            </Button>
          </TabsContent>
          <TabsContent value="userPools">
            {!isList && (
              <div className="mt-12 flex w-full flex-col items-center justify-center gap-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  {userPools?.map((pool: any) => {
                    return <PoolCard pool={pool} key={"search" + pool?.pool} />;
                  })}
                </div>
              </div>
            )}
            {isList && (
              <div className="mt-12 flex w-full flex-col items-center justify-center gap-4">
                <DataTable
                  data={userPools ?? []}
                  columns={columns}
                  onRowClick={(state: any) => console.log(state)}
                />
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
