"use client";

import React from "react";
import { formatUsd } from "@bera/berajs";
import { Icons } from "@bera/ui/icons";

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
  totalMarketSize = 1900000000,
  totalBorrowed = 1000000000,
}: {
  totalMarketSize?: number;
  totalBorrowed?: number;
}) {
  const displayMarketSize = formatUsd(totalMarketSize);

  const displayBorrowed = formatUsd(Number(totalBorrowed));

  return (
    <section className="m-auto max-w-[800px] py-24">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DataCard
          title="Total Market Size"
          value={displayMarketSize}
          icon={<Icons.lineChart />}
        />
        <DataCard
          title="Total borrows"
          value={displayBorrowed}
          icon={<Icons.helpingHand />}
        />
      </div>
    </section>
  );
}
