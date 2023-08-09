"use client";

import React from "react";
import { useRouter as useNextRouter } from "next/navigation";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";
import { DataTable } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import useSWRInfinite from "swr/infinite";

import { getWBeraPriceDictForPoolTokens } from "~/app/pool/api/getPrice";
import { useRouter } from "~/context/routerContext";
import { columns } from "./pools-table-columns";

const STEP = 1;
export default function PoolsTable({ pools }: { pools: Pool[] }) {
  const nextRouter = useNextRouter();
  const { router } = useRouter();
  console.log('POOLS', pools)
  const { data, size, setSize } = useSWRInfinite(
    (index) => [index + 1],
    async (page: number[]) => {
      try {
        const pools = await router.fetchPaginatedPools(page[0] ?? 1, STEP);
        await getWBeraPriceDictForPoolTokens(pools ?? [], router);
        return pools;
      } catch (e) {
        console.error(e);
      }
    },
    {
      fallbackData: pools as any[],
      initialSize: 1,
      persistSize: false,
    },
  );

  const onRowClick = (state: any) => {
    const poolAddress = state.original.pool;
    nextRouter.push(`/pool/${poolAddress}`);
  };

  const poolTableData = data ? [].concat(...data) : [];

  return (
    <Tabs defaultValue="allPools">
      <TabsList>
        <TabsTrigger value="allPools">All pools</TabsTrigger>
        <TabsTrigger value="userPools">My pools</TabsTrigger>
      </TabsList>
      <TabsContent value="allPools" className="flex w-full flex-col">
        <div className="rounded-lg border border-border shadow-lg">
          <DataTable
            data={poolTableData ?? []}
            columns={columns}
            onRowClick={(state: any) => onRowClick(state)}
          />
        </div>
        <Button
          className="mt-5 self-center"
          variant={"outline"}
          onClick={() => setSize(size + 1)}
        >
          Load More
        </Button>
      </TabsContent>
    </Tabs>
  );
}
