"use client";

import React from "react";
import { formatUsd } from "@bera/berajs";
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
        "flex flex-col rounded-2xl bg-card p-6",
        arcade
          ? "border-[4px] border-dashed border-blue-900 text-blue-900"
          : "border-2 border-border",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 text-sm",
          !arcade && "text-muted-foreground",
        )}
      >
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
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
    </section>
  );
}
