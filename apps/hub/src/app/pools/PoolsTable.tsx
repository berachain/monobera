"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePoolTable, useTotalPoolCount } from "@bera/berajs";
import {
  DataTable,
  NotFoundBear,
  SearchInput,
  SimpleTable,
  useBaseTable,
} from "@bera/shared-ui";
import { DataTableLoading } from "@bera/shared-ui/src/table/legacy/data-table";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bera/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { columns } from "~/components/pools-table-columns";
import MyPool from "./components/pools/my-pool";
import { getPoolUrl } from "./fetchPools";

export const PoolSearch = ({
  poolType = "allPools",
}: {
  poolType: "allPools" | "userPools";
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const sort = searchParams.get("sort");
  const direction = searchParams.get("direction");

  const [sorting, setSorting] = useState([
    {
      id: sort === null ? "tvlUsd" : sort,
      desc: direction === null ? true : direction === "desc" ? true : false,
    },
  ]);

  useEffect(() => {}, [sorting]);

  // const handleSortingChange = (newSorting: any) => {
  //   if (newSorting !== sorting) {

  //   }
  // };

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

  const table = useBaseTable({
    data,
    columns,
    additionalTableProps: {
      state: { sorting },
      initialState: { sorting },
      manualPagination: true,
      onSortingChange: (sorting) => setSorting(sorting),
    },
    enablePagination: true,
    enableRowSelection: false,
  });

  return (
    <div
      className="w-full flex-row items-center justify-center"
      id="poolstable"
    >
      <Tabs className="flex flex-col gap-4" value={poolType}>
        <div className="flex w-full flex-col items-start justify-between  gap-2 lg:flex-row lg:items-center">
          <TabsList className="w-full  justify-start p-0" variant="ghost">
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

          <TabsContent value="allPools" className="w-full text-center">
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
                className="flex h-[40px] w-fit flex-row items-center gap-1 whitespace-nowrap bg-transparent sm:w-fit"
                onClick={() => router.push("/pools/create")}
              >
                <Icons.droplet className="h-4 w-4" />
                Create new pool
              </Button>
            </div>
          </TabsContent>
        </div>

        <TabsContent value="allPools" className="mt-4 text-center">
          {isLoading ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <DataTableLoading
                columns={columns.length}
                rowCount={parseFloat(pageSize ?? "10")}
              />
            </div>
          ) : data?.length || data ? (
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <SimpleTable
                table={table}
                flexTable
                onRowClick={(row: any) => router.push(getPoolUrl(row.original))}
                wrapperClassName="bg-transparent border-none"
                showToolbar={true}
                // toolbarContent={
                //   <Select>
                //     <SelectTrigger>
                //       <SelectValue placeholder="Select a pool" />
                //       <SelectContent>
                //         <SelectItem value="tvlUsd">
                //           TVL
                //         </SelectItem>
                //       </SelectContent>
                //     </SelectTrigger>
                //   </Select>
                // }
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
