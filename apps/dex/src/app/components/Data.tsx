import React from "react";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export function DataCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex min-w-[200px] flex-col rounded-2xl border-2 bg-muted p-6">
      <div className="flex items-center gap-2 text-sm">
        <div className="h-6 w-6 text-muted-foreground">{icon}</div>
        <div className="text-muted-foreground">{title}</div>
      </div>
      <div className="mt-2 text-xl font-bold">{value}</div>
    </div>
  );
}

export default function Data() {
  return (
    <section className="my-24 flex w-full flex-col items-center">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DataCard
          title="Total Value Locked"
          value="$842,886,669"
          icon={<Icons.lock />}
        />
        <DataCard
          title="24H Volume"
          value="$69,420,702"
          icon={<Icons.candleStick />}
        />
        <DataCard
          title="BGT Rewards Distributed"
          value="1,690,420 BGT"
          icon={<Icons.medal />}
        />
        <DataCard
          title="Bera Price"
          value="$69.426969"
          icon={<Icons.bera className="mt-[2px]" />}
        />
      </div>
      <Button variant="outline" className="mt-4">
        View Analytics
      </Button>
    </section>
  );
}
