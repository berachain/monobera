"use client";

import React from "react";
import { formatUsd, usePollReservesDataList } from "@bera/berajs";
import { Skeleton } from "@bera/ui/skeleton";

import BGTApy from "./bgt-apy";

function DataCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-sm border border-border bg-muted py-2">
      <div className="flex items-center gap-3 text-sm"> {title}</div>
      {value ? (
        <div className="text-2xl font-bold leading-8">{formatUsd(value)}</div>
      ) : (
        <Skeleton className="h-8 w-full" />
      )}
    </div>
  );
}

export default function Data() {
  const { useReservesDataList } = usePollReservesDataList();
  const { data } = useReservesDataList();

  let displayMarketSize = 0;
  let displayBorrowed = 0;
  Object.keys(data ?? {}).forEach((key) => {
    displayMarketSize += Number(data[key].totalLiquidity);
    displayBorrowed += Number(data[key].totalDebt);
  });

  return (
    <section className="m-auto max-w-[600px] py-24">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DataCard title="Total Market Size" value={displayMarketSize} />
        <DataCard title="Total borrows" value={displayBorrowed} />
      </div>
      <div className="bg-bg mt-4 flex w-full flex-col items-center gap-4 rounded-sm border border-accent border-opacity-20 py-4">
        <BGTApy />
        <div className="flex flex-col items-center gap-1">
          <div className="text font-semibold leading-7 text-foreground sm:text-xl">
            Honey boosted borrow rates
          </div>
          <div className="text-xs leading-6 text-muted-foreground sm:text-sm">
            Earn BGT by helping the protocol bootstrap Liquidity.
          </div>
        </div>
      </div>
    </section>
  );
}
