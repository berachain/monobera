"use client";

import React, { useMemo } from "react";
import { Timeblock, Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Card } from "@bera/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@bera/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "@bera/ui/recharts";
import { Skeleton } from "@bera/ui/skeleton";
import { type Address } from "viem";

import { createUptimeArray } from "~/utils/mock-data";

const chartConfig = {
  status: {
    label: "Status",
  },
  active: {
    label: "Active",
    color: "hsl(142, 69%, 58%)",
  },
  inactive: {
    label: "Inactive",
    color: "hsl(48, 96%, 53%)",
  },
} satisfies ChartConfig;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex min-w-[8rem] flex-col items-start gap-1.5 rounded-md border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
        <p className="">{`Block ${payload[0].payload.block}`}</p>
        <div className="flex gap-1">
          <div
            className="w-1 shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]"
            style={
              {
                "--color-bg": payload[0].payload.fill,
                "--color-border": payload[0].payload.fill,
              } as React.CSSProperties
            }
          />
          <p className="">{`Status: ${
            payload[0].payload.status ? "Active" : "Inactive"
          }`}</p>
        </div>
      </div>
    );
  }
};

export default function Uptime({ address }: { address: Address }) {
  // TODO: Fetch uptime status from API
  // const { data, isLoading } = useFetchValidatorUptime(address);
  const blocks = useMemo(() => {
    return createUptimeArray(100);
  }, [address]);
  return (
    <div className="mt-4 flex w-full flex-col gap-4 text-lg font-semibold leading-7">
      <Card className="flex flex-col items-center gap-4 p-4">
        <div className="flex w-full justify-between px-3">
          <div className="flex gap-1 text-sm">Uptime (Last 100 blocks)</div>
          <div className="flex gap-1 text-sm text-green-400">
            Currently Active
          </div>
        </div>

        <div className="flex w-full gap-4 text-sm font-normal leading-normal text-muted-foreground">
          {blocks ? (
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[50px] w-full"
            >
              <BarChart
                accessibilityLayer
                className="w-full"
                data={blocks}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <YAxis dataKey="content" type="number" hide />
                <ChartTooltip content={<CustomTooltip />} />
                <Bar dataKey={"content"} />
              </BarChart>
            </ChartContainer>
          ) : (
            <>
              <Skeleton className="h-3 w-3" />
            </>
          )}
        </div>
        <div className="text-right text-sm font-normal leading-normal text-muted-foreground">
          {"99.41% Uptime"}
        </div>
      </Card>
    </div>
  );
}
