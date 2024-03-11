"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { formatUsd, formatter } from "@bera/berajs";
import { cloudinaryUrl, dexUrl } from "@bera/config";
import { GetGlobalData } from "@bera/graphql";
import { Icons } from "@bera/ui/icons";

import DataCard from "./data-card";

export default function Data({ arcade }: { arcade: boolean }) {
  const { loading, data } = useQuery(GetGlobalData);
  const dailyVolume = data?.honeyVolumeDayDatas[0].amount ?? "0";
  const totalHoneySupply = data?.honeySupplyHourDatas[0].amount ?? "0";
  return (
    <section className="py-4 lg:py-16" id="stats">
      {arcade ? (
        <div className="flex gap-8">
          <ArcadeData />
          <div className="flex w-full flex-1 flex-col gap-4">
            <DataCard
              title="Total Honey Supply"
              value={formatUsd(totalHoneySupply)}
              icon={<Icons.lock className="h-5 w-5" />}
              arcade={arcade}
              isLoading={loading}
            />
            <DataCard
              title="24H Volume"
              value={formatUsd(dailyVolume)}
              icon={<Icons.candleStick className="h-5 w-5" />}
              arcade={arcade}
              isLoading={loading}
            />
            <DataCard
              title="Honey Price"
              value="$1.00"
              icon={<Icons.honey className="h-5 w-5" />}
              arcade={arcade}
              isLoading={loading}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DataCard
            title="Total Honey Supply"
            value={formatter.format(totalHoneySupply)}
            icon={<Icons.lock />}
            arcade={arcade}
            isLoading={loading}
          />
          <DataCard
            title="24H Volume"
            value={formatUsd(dailyVolume)}
            icon={<Icons.candleStick />}
            arcade={arcade}
            isLoading={loading}
          />
          <DataCard
            title="Honey Price"
            value="$1.00"
            icon={<Icons.honey className="w-6 h-6"/>}
            arcade={arcade}
            isLoading={loading}
          />
        </div>
      )}
    </section>
  );
}

const ArcadeData = () => {
  return (
    <div className="relative flex w-[700px] flex-shrink-0 flex-col justify-center rounded-2xl border-[3px] border-dashed border-yellow-900 bg-yellow-50 p-8 text-yellow-900">
      <div className="leading-12 mb-1 text-4xl">
        Add Honey <br />
        to Liquidity Pools
      </div>
      <div className="leading-12">
        Become an LP to earn trading fees <br /> and BGT Incentives
      </div>
      <Link
        className="mt-4 flex h-11 w-20 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-yellow-900 px-3 py-2 text-xl text-yellow-50"
        href={`${dexUrl}/pool`}
        target="_blank"
      >
        Add
        <Icons.externalLink className="relative h-4 w-4" />
      </Link>
      <Image
        className="absolute bottom-0 right-0 w-[400px]"
        src={`${cloudinaryUrl}/honey/honeyjar_ewr2fo`}
        alt="honey-jar"
        width={420}
        height={360}
      />
    </div>
  );
};
