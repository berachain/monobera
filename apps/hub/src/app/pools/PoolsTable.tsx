"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePoolTable } from "@bera/berajs";
import { DataTable, NotFoundBear, SearchInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { columns } from "~/components/pools-table-columns";
import MyPool from "./components/pools/my-pool";
import TableViewLoading from "./components/pools/table-view-loading";
import { getPoolUrl } from "./fetchPools";
import { useTotalPoolCount } from "~/hooks/useTotalPoolCount";
import { Icons } from "@bera/ui/icons";

export const PoolSearch = ({
  poolType,
}: {
  poolType: "allPools" | "userPools";
}) => {
  const [sorting, setSorting] = useState<any>([
    {
      id: "tvlUsd",
      desc: true,
    },
  ]);

  const [isFirstLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  const {
    search,
    keyword,
    setKeyword,
    setSearch,
    data,
    fetchNextPage,
    isLoadingMore,
    isReachingEnd,
  } = usePoolTable(sorting);

  const { data: poolCount } = useTotalPoolCount();

  const handleNewSort = (newSort: any) => {
    if (newSort === sorting) return;
    setSorting(newSort);
  };

  const [isTyping, setIsTyping] = useState(false);

  let typingTimer: NodeJS.Timeout;

  useEffect(() => {
    if (isTyping) return;
    setKeyword(search);
  }, [isTyping, search]);

  const handleClearSearch = () => {
    setKeyword("");
    setSearch("");
  };

  const router = useRouter();

  const isLoading = useMemo(
    () => isLoadingMore && (data.length === 0 || !data),
    [isLoadingMore, data],
  );
  return (
    <div
      className="w-full flex-row items-center justify-center max-w-[1020px]"
      id="poolstable"
    >
      <Tabs className="flex flex-col gap-4" value={poolType}>
        <div className="flex flex-col lg:flex-row w-full justify-between  items-start lg:items-center">
          <TabsList className="w-fit" variant="ghost">
            <TabsTrigger
              value="allPools"
              className="w-full sm:w-fit"
              variant="ghost"
              onClick={handleClearSearch}
            >
              <Link href="/pools?pool=allPools">All Pools</Link>
            </TabsTrigger>
            <TabsTrigger
              value="userPools"
              className="w-full sm:w-fit"
              variant="ghost"
              onClick={handleClearSearch}
            >
              <Link href="/pools?pool=userPools">My Pools</Link>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="allPools" className="text-center">
            <div className="flex w-fit flex-row items-center gap-2 lg:flex-row lg:items-center ">
              <SearchInput
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setIsTyping?.(true);
                  clearTimeout(typingTimer);
                  typingTimer = setTimeout(() => {
                    setIsTyping?.(false);
                  }, 1000);
                  return;
                }}
                placeholder="Search..."
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    setKeyword(search);
                    clearTimeout(typingTimer);
                    setIsTyping?.(false);
                  }
                }}
                isLoading={isTyping || (isLoadingMore && keyword !== "")}
                id="all-pool-search"
                className="w-full md:w-[400px]"
              />
              <Button
                size="md"
                variant="secondary"
                className="bg-transparent w-fit whitespace-nowrap flex flex-row items-center h-[40px] gap-1"
              >
                <Icons.droplet className="h-4 w-4" />
                Create new pool
              </Button>
            </div>
          </TabsContent>
        </div>

        <TabsContent value="allPools" className="text-center mt-4">
          {isLoading ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <TableViewLoading />
            </div>
          ) : data?.length || data ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <DataTable
                key={data.length}
                data={data ?? []}
                columns={columns}
                // title={`All Pools (${poolCount ?? data?.length ?? "0"})`}
                className="min-w-[1000px]"
                onRowClick={(row: any) => router.push(getPoolUrl(row.original))}
                onCustomSortingChange={(a: any) => handleNewSort(a)}
                additionalTableProps={{ state: { sorting } }}
              />
            </div>
          ) : (
            <NotFoundBear title="No Pools found." />
          )}
          <Button
            className="mt-8"
            onClick={() => fetchNextPage()}
            disabled={isLoadingMore || isReachingEnd}
            variant="outline"
          >
            {isLoadingMore
              ? "Loading..."
              : isReachingEnd
                ? "No more pools"
                : "View More"}
          </Button>
        </TabsContent>

        <TabsContent value="userPools">
          <MyPool keyword={keyword} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
