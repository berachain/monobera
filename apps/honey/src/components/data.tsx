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
    <div className="flex flex-col rounded-2xl border-2 bg-[#FAFAF9] p-6">
      <div className="flex items-center gap-3 text-sm">
        <div className="text-muted-foreground">{icon}</div>
        <div className="text-muted-foreground">{title}</div>
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
    </div>
  );
}

export default function Data() {
  return (
    <section className="py-24">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
        <DataCard title="Honey Price" value="$1.00" icon={<Icons.honey />} />
      </div>
    </section>
  );
}
