"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { formatUsd, useLatestBlock } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { sumPrices } from "~/utils/sumPrices";
import { usePollPrices } from "~/hooks/usePollPrices";
import { DataCard } from "../components/Data";
import { PoolSearch } from "./PoolsTable";

export default function PoolPageHeader({
  tvl,
  volume,
}: {
  tvl: any;
  volume: any;
}) {
  const router = useRouter();
  const { usePrices, isLoading } = usePollPrices();

  const prices = usePrices();
  const tvlValue = useMemo(() => {
    if (!prices || !tvl || !tvl[0]) return 0;
    return sumPrices(prices, tvl[0].data);
  }, [tvl, prices]);

  const volumeValue = useMemo(() => {
    if (!prices || !volume || !volume[0]) return 0;
    return sumPrices(prices, volume[0].data);
  }, [volume, prices]);

  const block = useLatestBlock();

  const isDataReady = useMemo(() => {
    return !isLoading && block !== 0n;
  }, [isLoading, block]);

  console.log(tvl);
  console.log(volume);
  console.log(tvlValue, volumeValue, block);
  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-6">
      <h1 className="text-center text-5xl font-bold">
        <span className="bg-gradient-to-r from-[#FFC738] to-[#FF8A00F5] bg-clip-text text-transparent">
          Create
        </span>{" "}
        a Pool
        <br /> Or{" "}
        <span className="bg-gradient-to-r from-[#FFC738] to-[#FF8A00F5] bg-clip-text text-transparent">
          Add Liquidity
        </span>
      </h1>
      <div className="flex flex-row gap-2 self-center">
        <Button
          onClick={() => router.push("/pool/create")}
          className="text-md mb-10 self-center"
        >
          Create a Pool
        </Button>
        <Button
          variant={"outline"}
          className="text-md mb-10 self-center"
          onClick={() => {
            const poolSearchElement = document.getElementById("poolSearch");
            if (poolSearchElement) {
              poolSearchElement.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          View Pools
        </Button>
      </div>
      <div className="flex w-full max-w-[980px] flex-col items-center justify-center gap-6 self-center md:flex-row">
        <DataCard
          icon={<Icons.lock />}
          title={"Total Value Locked"}
          isLoading={!isDataReady}
          value={formatUsd(tvlValue)}
        />
        <DataCard
          icon={<Icons.candleStick />}
          title={"24H Volume"}
          isLoading={!isDataReady}
          value={formatUsd(volumeValue)}
        />
        <DataCard
          icon={<Icons.medal />}
          title={"BGT Rewards Distributed"}
          isLoading={!isDataReady}
          value={`${(Number(block) * 0.0042).toFixed(2)} BGT`}
        />
      </div>
      <div id="poolSearch" className="mt-[72px] w-full max-w-[980px]">
        <PoolSearch />
      </div>
    </div>
  );
}
