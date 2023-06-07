import React from "react";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Separator } from "@bera/ui/separator";

import { CircleStat } from "./CircleStat";

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
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex gap-7">
          <h3>Time frame</h3>
          <div className="flex gap-3">
            <div>1 day</div>
            <div>1 week</div>
            <div>1 month</div>
            <div>1 year</div>
          </div>
        </div>
        <div className="flex gap-4">
          <div>BGT</div>
          <div>
            <Separator orientation="vertical" />
          </div>
          <div>USD</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-evenly gap-5">
          {Object.entries(stats).map(([key, object]) => (
            <CircleStat key={key} {...object} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
