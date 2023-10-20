"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatUsd } from "@bera/berajs";
import { cloudinaryUrl, dexUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";

function DataCard({
  icon,
  title,
  value,
  arcade,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  arcade: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl bg-card",
        arcade
          ? "border-[3px] border-dashed border-blue-900 px-6 py-4 text-blue-900"
          : "border-2 border-white bg-opacity-20 p-6 backdrop-blur-xl",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 text-sm",
          arcade ? "text-xs" : "text-muted-foreground",
        )}
      >
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      <div
        className={
          arcade
            ? "mt-2 text-2xl leading-7"
            : "mt-2 text-3xl font-semibold leading-9"
        }
      >
        {value}
      </div>
    </div>
  );
}

export default function Data({
  tvl,
  dailyVolume,
  arcade,
}: {
  tvl: string;
  dailyVolume: string;
  arcade: boolean;
}) {
  return (
    <section className="py-4 lg:py-16">
      {arcade ? (
        <div className="flex gap-8">
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
              className="absolute -right-10 bottom-0 w-[431px]"
              src={`${cloudinaryUrl}/shared/qmtxbqw1lgjsnlszftow`}
              alt="honey-jar"
              width={431}
              height={360}
            />
          </div>
          <div className="flex w-full flex-1 flex-col gap-4">
            <DataCard
              title="Total Honey Supply"
              value={formatUsd(tvl)}
              icon={<Icons.lock className="h-5 w-5" />}
              arcade={arcade}
            />
            <DataCard
              title="24H Volume"
              value={formatUsd(dailyVolume)}
              icon={<Icons.candleStick className="h-5 w-5" />}
              arcade={arcade}
            />
            <DataCard
              title="Honey Price"
              value="$1.00"
              icon={<Icons.honey className="h-5 w-5" />}
              arcade={arcade}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <DataCard
            title="Total Honey Supply"
            value={formatUsd(tvl)}
            icon={<Icons.lock />}
            arcade={arcade}
          />
          <DataCard
            title="24H Volume"
            value={formatUsd(dailyVolume)}
            icon={<Icons.candleStick />}
            arcade={arcade}
          />
          <DataCard
            title="Honey Price"
            value="$1.00"
            icon={<Icons.honey />}
            arcade={arcade}
          />
        </div>
      )}
    </section>
  );
}
