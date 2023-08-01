import React from "react";
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
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-5 shadow-lg">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center rounded-full bg-blue-100 p-3">
          {icon}
        </div>
        <div className="mt-4 text-2xl font-bold">{title}</div>
      </div>
      <div className="mt-4 text-4xl font-bold">{value}</div>
    </div>
  );
}

export default function Data() {
  return (
    <section className="my-24">
      <div className="grid grid-cols-4 gap-4">
        <DataCard
          title="Total Value Locked"
          value="$0.00"
          icon={<Icons.lock />}
        />
        <DataCard
          title="24H Volume"
          value="$0.00"
          icon={<Icons.candleStick />}
        />
        <DataCard
          title="BGT Rewards Distributed"
          value="$0.00"
          icon={<Icons.medal />}
        />
        <DataCard title="Bera Price" value="$0.00" icon={<Icons.bera />} />
      </div>
    </section>
  );
}
