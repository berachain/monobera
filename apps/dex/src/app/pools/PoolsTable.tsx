"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePoolTable } from "@bera/berajs";
import { DataTable, NotFoundBear, SearchInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { columns } from "~/components/pools-table-columns";
import { usePollUserDeposited } from "~/hooks/usePollUserDeposited";
import MyPool from "./components/pools/my-pool";
import TableViewLoading from "./components/pools/table-view-loading";
import { getPoolUrl } from "./fetchPools";

export const PoolSearch = ({
  poolType,
}: {
  poolType: "allPools" | "userPools";
}) => {
  const [sorting, setSorting] = useState<any>([
    {
      id: "tvl",
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

  const handleNewSort = (newSort: any) => {
    if (newSort === sorting) return;
    setSorting(newSort);
  };

  usePollUserDeposited();
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
            onClick={handleClearSearch}
          >
            <Link href="/pools?pool=allPools">All pools</Link>
          </TabsTrigger>
          <TabsTrigger
            value="userPools"
            className="w-full sm:w-fit"
            variant="ghost"
            onClick={handleClearSearch}
          >
            <Link href="/pools?pool=userPools">My pools</Link>
          </TabsTrigger>
        </TabsList>

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
            id="all-pool-search"
            className="w-full md:w-[400px]"
          />
          {isTyping && (
            <div role="status">
              <svg
                aria-hidden="true"
                className="h-6 w-6 animate-spin fill-green-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>

        <TabsContent value="allPools" className="text-center">
          {isFirstLoading ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <TableViewLoading />
            </div>
          ) : data?.length || (data.length === 0 && isLoadingMore) ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <DataTable
                key={data.length}
                data={data ?? []}
                columns={columns}
                title={`All Pools (${data?.length ?? "0"})`}
                className="min-w-[1000px]"
                onRowClick={(row: any) =>
                  router.replace(getPoolUrl(row.original))
                }
                onCustomSortingChange={(a: any) => handleNewSort(a)}
              />
            </div>
          ) : (
            <NotFoundBear title="No Pools found." />
          )}

          {!isFirstLoading && (
            <Button
              className="mt-8"
              onClick={() => fetchNextPage()}
              disabled={isLoadingMore || isReachingEnd}
              variant="outline"
            >
              {isReachingEnd ? "No more pools" : "View More"}
            </Button>
          )}
        </TabsContent>

        <TabsContent value="userPools">
          <MyPool keyword={keyword} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
