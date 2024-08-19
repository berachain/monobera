"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePoolTable, useTotalPoolCount } from "@bera/berajs";
import { DataTable, NotFoundBear, SearchInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { columns } from "~/components/pools-table-columns";
import MyPool from "./components/pools/my-pool";
import { getPoolUrl } from "./fetchPools";
import { Icons } from "@bera/ui/icons";
import { DataTableLoading } from "@bera/shared-ui/src/table/legacy/data-table";

export const PoolSearch = ({
  poolType,
}: {
  poolType: "allPools" | "userPools";
}) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const sort = searchParams.get("sort");
  const direction = searchParams.get("direction");

  const sorting = [
    {
      id: sort === null ? "tvlUsd" : sort,
      desc: direction === null ? true : direction === "desc" ? true : false,
    },
  ];

  const { search, keyword, setKeyword, setSearch, data, isLoadingMore } =
    usePoolTable(
      sorting,
      parseFloat(page ?? "1"),
      parseFloat(pageSize ?? "10"),
    );

  const { data: poolCount } = useTotalPoolCount();

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
        <div className="flex flex-col lg:flex-row w-full justify-between  items-start lg:items-center gap-2">
          <TabsList className="w-full  p-0 justify-start" variant="ghost">
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

          <TabsContent value="allPools" className="text-center w-full">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
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
                className="w-full sm:w-[400px]"
              />
              <Button
                size="md"
                variant="secondary"
                className="bg-transparent w-fit sm:w-fit whitespace-nowrap flex flex-row items-center h-[40px] gap-1"
                onClick={() => router.push("/pools/create")}
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
              <DataTableLoading
                columns={columns.length}
                rowCount={parseFloat(pageSize ?? "10")}
              />
            </div>
          ) : data?.length || data ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <DataTable
                key={data.length}
                data={data ?? []}
                columns={columns}
                className="min-w-[1000px]"
                onRowClick={(row: any) => router.push(getPoolUrl(row.original))}
                additionalTableProps={{ state: { sorting } }}
                enablePagination
                totalCount={parseFloat(poolCount ?? "0")}
                page={parseFloat(page ?? "1")}
                pageSize={parseFloat(pageSize ?? "10")}
                useQueryParamSearch
              />
            </div>
          ) : (
            <NotFoundBear title="No Pools found." />
          )}
        </TabsContent>

        <TabsContent value="userPools">
          <MyPool keyword={keyword} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
