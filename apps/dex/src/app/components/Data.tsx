"use client";

import React, { useMemo } from "react";
import { formatUsd, formatter, useLatestBlock } from "@bera/berajs";
import { beraTokenAddress } from "@bera/config";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { useTokenHoneyPrice } from "~/hooks/usePool";

export function DataCard({
  icon,
  title,
  value,
  isLoading,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  isLoading?: boolean;
}) {
  return (
    <div className="flex w-full flex-col rounded-2xl border bg-background p-4 md:p-6">
      <div className="flex items-center gap-2 text-xs md:text-sm">
        <div className="text-muted-foreground">{icon}</div>
        <div className="whitespace-nowrap text-muted-foreground">{title}</div>
      </div>
      {!isLoading ? (
        <div className="mt-2 text-base font-bold md:text-2xl">{value}</div>
      ) : (
        <Skeleton className="mt-2 h-8 w-[200px] rounded-lg" />
      )}
    </div>
  );
}

export default function Data({ tvl, volume }: { tvl: any; volume: any }) {
  const block = useLatestBlock();
  const beraPrice = useTokenHoneyPrice(beraTokenAddress);

  const isDataReady = useMemo(() => {
    return beraPrice && block !== 0n;
  }, [block]);

  return (
    <section className="my-24 flex w-full flex-col items-center">
      <div className="grid w-full grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <DataCard
          title="Total Value Locked"
          isLoading={!isDataReady}
          value={formatUsd(tvl)}
          icon={<Icons.lock className="h-3 w-3 md:h-6 md:w-6" />}
        />
        <DataCard
          title="24H Volume"
          isLoading={!isDataReady}
          value={formatUsd(volume)}
          icon={<Icons.candleStick className="h-3 w-3 md:h-6 md:w-6" />}
        />
        <DataCard
          title="BGT Rewards"
          isLoading={!isDataReady}
          value={`${formatter.format(Number(block) * 0.1)} BGT`}
          icon={<Icons.medal className="h-3 w-3 md:h-6 md:w-6" />}
        />
        <DataCard
          title="Bera Price"
          isLoading={!isDataReady}
          value={formatUsd(beraPrice ?? "0")}
          icon={<Icons.bera className="mt-[2px] h-3 w-3 md:h-6 md:w-6" />}
        />
      </div>
    </section>
  );
}
