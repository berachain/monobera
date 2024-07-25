import { useMemo } from "react";
import { FormattedNumber } from "@bera/shared-ui";
import { ChartConfig, ChartContainer, ChartTooltip } from "@bera/ui/chart";
import { Icons } from "@bera/ui/icons";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "@bera/ui/recharts";
import { Skeleton } from "@bera/ui/skeleton";
import { Address } from "viem";

import { createBgtDelegatedArray } from "~/utils/mock-data";

export const BgtDelegated = ({
  validatorAddress,
}: {
  validatorAddress: Address;
}) => {
  const chartConfig = {
    bgt: {
      label: "Bgt Delegated",
      color: "hsl(142, 69%, 58%)",
    },
  } satisfies ChartConfig;

  const blocks = useMemo(() => createBgtDelegatedArray(30), [validatorAddress]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="flex min-w-[8rem] flex-col items-start gap-1.5 rounded-md border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
          <p className="">{payload[0].payload.date}</p>
          <p className="">{"BGT Delegated:"}</p>
          <FormattedNumber
            value={payload[0].payload.bgt}
            className="text-sm font-semibold text-foreground"
          />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Icons.bgt className="h-4 w-4" />
        <span className="text-md font-semibold">BGT Delegated</span>
        {/* TODO */}
        <span className="text-sm text-muted-foreground">
          {"Total: 11,240,512 ($15,125,121)"}
        </span>
      </div>
      <div className="flex w-full gap-4 text-sm font-normal leading-normal text-muted-foreground">
        {blocks ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
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
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis dataKey="bgt" type="number" />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar dataKey={"bgt"} fill={`var(--color-bgt)`} />
            </BarChart>
          </ChartContainer>
        ) : (
          <>
            <Skeleton className="h-3 w-3" />
          </>
        )}
      </div>
    </div>
  );
};
