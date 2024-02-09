"use client";

import { useState } from "react";
import { useEffectOnce } from "usehooks-ts";

import Link from "next/link";
import { DataTable, NotFoundBear } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { columns } from "~/components/pools-table-columns";
import MyPool from "./components/pools/my-pool";
import TableViewLoading from "./components/pools/table-view-loading";
import { usePoolTable } from "./usePoolTable";
import { getPoolUrl } from "./fetchPools";
import { usePollUserDeposited } from "~/hooks/usePollUserDeposited";

export const PoolSearch = ({
  poolType,
}: {
  poolType: "allPools" | "userPools";
}) => {
  const [sorting, onCustomSorting] = useState<any>([
    {
      id: "tvl",
      desc: true,
    },
  ]);

  const [isFirstLoading, setIsLoading] = useState(true);

  useEffectOnce(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  });

  const {
    data,
    allDataSize,
    setAllDataSize,
    isAllDataLoadingMore,
    isAllDataReachingEnd,
  } = usePoolTable(sorting);

  const handleNewSort = (newSort: any) => {
    void setAllDataSize(1);
    onCustomSorting(newSort);
  };

  console.log({ data });
  usePollUserDeposited();
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
            <Link href="/pools?pool=allPools">All pools</Link>
          </TabsTrigger>
          <TabsTrigger
            value="userPools"
            className="w-full sm:w-fit"
            variant="ghost"
          >
            <Link href="/pools?pool=userPools">My pools</Link>
          </TabsTrigger>
        </TabsList>

        <div className="justsify-center flex w-full flex-col items-center gap-2 lg:flex-row lg:items-center lg:justify-between">
          {/* <SearchInput
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
          /> */}
        </div>

        <TabsContent value="allPools" className="text-center">
          {isFirstLoading ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <TableViewLoading />
            </div>
          ) : data?.length || (data.length === 0 && isAllDataLoadingMore) ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <DataTable
                key={data.length}
                data={data ?? []}
                columns={columns}
                title={`All Pools (${data.length})`}
                className="min-w-[1000px] min-h-[300px]"
                onRowClick={(row: any) =>
                  window.open(getPoolUrl(row.original), "_self")
                }
                customSorting={sorting}
                onCustomSortingChange={(a: any) => handleNewSort(a)}
              />
            </div>
          ) : (
            <NotFoundBear title="No Pools found." />
          )}

          {!isFirstLoading && (
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
          <MyPool isList />
        </TabsContent>
      </Tabs>
    </div>
  );
};
