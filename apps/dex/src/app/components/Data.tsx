"use client";

import React, { useMemo } from "react";
import { formatUsd, useLatestBlock } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { sumPrices } from "~/utils/sumPrices";
import { usePollPrices } from "~/hooks/usePollPrices";

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
  console.log('DATA CARD VALUE', title, 'reeee',  value)
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
  const { usePrice, usePrices, isLoading } = usePollPrices();

  console.log('TVL', tvl);
  console.log('VOLUME', volume);
  const prices = usePrices();

  console.log('I AM GETTING PRICES')
  const tvlValue = useMemo(() => {
    if (!prices || !tvl || !tvl[0]) return 0;
    return sumPrices(prices, tvl[0].data);
  }, [tvl, prices]);

  console.log(prices, tvlValue);
  const volumeValue = useMemo(() => {
    if (!prices || !volume || !volume[0]) return 0;
    return sumPrices(prices, volume[0].data);
  }, [volume, prices]);

  console.log(volumeValue, tvlValue, prices);
  const block = useLatestBlock();
  const beraPrice = usePrice(process.env.NEXT_PUBLIC_WBERA_ADDRESS as string);
  const isDataReady = useMemo(() => {
    return !isLoading && block !== 0n;
  }, [isLoading, block]);

  return (
    <section className="my-24 flex w-full flex-col items-center">
      <div className="grid w-full grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <DataCard
          title="Total Value Locked"
          isLoading={!isDataReady}
          value={formatUsd(tvlValue)}
          icon={<Icons.lock className="h-3 w-3 md:h-6 md:w-6" />}
        />
        <DataCard
          title="24H Volume"
          isLoading={!isDataReady}
          value={formatUsd(volumeValue)}
          icon={<Icons.candleStick className="h-3 w-3 md:h-6 md:w-6" />}
        />
        <DataCard
          title="BGT Rewards"
          isLoading={!isDataReady}
          value={`${(Number(block) * 0.0042).toFixed(2)} BGT`}
          icon={<Icons.medal className="h-3 w-3 md:h-6 md:w-6" />}
        />
        <DataCard
          title="Bera Price"
          isLoading={!isDataReady}
          value={formatUsd(beraPrice)}
          icon={<Icons.bera className="mt-[2px] h-3 w-3 md:h-6 md:w-6" />}
        />
      </div>
    </section>
  );
}
