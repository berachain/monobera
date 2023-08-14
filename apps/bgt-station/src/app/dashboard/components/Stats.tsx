import React from "react";
import { Card } from "@bera/ui/card";

import { CircleStat } from "./circle-stat";

export function Stats({
  stats,
}: {
  stats: {
    totalStaked: {
      label: string;
      percent: number;
      valueLabel: string;
      value: string;
    };
    projectedSupplyGrowth: {
      label: string;
      percent: number;
      valueLabel: string;
      value: string;
    };
    projectedIssurance: {
      label: string;
      percent: number;
      valueLabel: string;
      value: string;
    };
  };
}) {
  return (
    <Card className="px-16 py-8">
      <div className="flex justify-evenly gap-5">
        {Object.entries(stats).map(([key, object]) => (
          <CircleStat key={key} {...object} />
        ))}
      </div>
    </Card>
  );
}
