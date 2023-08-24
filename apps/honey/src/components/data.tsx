"use client";

import React from "react";
import { formatUsd } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";
import { formatUnits } from "viem";

import { honey } from "~/config/tokens";

function DataCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl border-2 bg-card p-6">
      <div className="flex items-center gap-3 text-sm">
        <div className="text-muted-foreground">{icon}</div>
        <div className="text-muted-foreground">{title}</div>
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}

export default function Data({
  tvl,
  dailyVolume,
}: {
  tvl: string;
  dailyVolume: string;
}) {
  const displayTvl = formatUsd(
    Number(formatUnits(BigInt(tvl) ?? 0n, honey.decimals)),
  );

  const displayDailyVolume = formatUsd(
    Number(formatUnits(BigInt(dailyVolume) ?? 0n, honey.decimals)),
  );
  return (
    <section className="py-4 lg:py-24">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DataCard
          title="Total Value Locked"
          value={displayTvl}
          icon={<Icons.lock />}
        />
        <DataCard
          title="24H Volume"
          value={displayDailyVolume}
          icon={<Icons.candleStick />}
        />
        <DataCard title="Honey Price" value="$1.00" icon={<Icons.honey />} />
      </div>
    </section>
  );
}
