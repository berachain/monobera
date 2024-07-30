import { useMemo } from "react";
import { FormattedNumber } from "@bera/shared-ui";
import { ChartConfig, ChartContainer, ChartTooltip } from "@bera/ui/chart";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Address } from "viem";

import { createValidatorRewardsArray } from "~/utils/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex min-w-[8rem] flex-col items-start gap-1 rounded-md border border-border/50 bg-background px-2.5 py-1.5 shadow-xl">
        <p className="">{payload[0].payload.date}</p>
        <p className="flex items-center text-sm text-muted-foreground">
          Rewards Distributed
        </p>
        <div className="text-md text-semibold flex items-center gap-1 text-foreground">
          <FormattedNumber
            value={payload[0].payload.distributed}
            className="text-semibold flex "
          />
          {"BGT"}
        </div>
        <p className="flex items-center text-sm text-muted-foreground">
          Commission Earned
        </p>
        <div className="text-md text-semibold flex items-center gap-1 text-foreground">
          <FormattedNumber
            value={payload[0].payload.earned}
            className="text-semibold flex "
          />
          {"BGT"}
          <span className="text-muted-foreground">{`(${payload[0].payload.percentage}%)`}</span>
        </div>
      </div>
    );
  }
};

export const ValidatorRewards = ({
  validatorAddress,
}: {
  validatorAddress: Address;
}) => {
  const chartConfig = {
    earned: {
      label: "Commission Earned",
      color: "hsl(142, 69%, 58%)",
    },
    distributed: {
      label: "Rewards Distributed",
      color: "hsl(220, 70%, 51%)",
    },
  } satisfies ChartConfig;

  const blocks = useMemo(
    () => createValidatorRewardsArray(30),
    [validatorAddress],
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-col gap-2">
        <span className="text-md font-semibold">
          Rewards Distributed & Commission
        </span>
        {/* TODO */}
        <div className="ml-auto flex items-center gap-2">
          <Icons.circle className="flex h-3 w-3 items-end rounded-md bg-green-400 text-green-400" />
          <span className="text-sm text-muted-foreground">
            Commission Earned
          </span>
          <Icons.circle className="flex h-3 w-3 items-end rounded-md bg-blue-400 text-blue-400" />
          <span className="text-sm text-muted-foreground">
            Rewards Distributed
          </span>
        </div>
      </div>
      <div className="flex w-full items-end gap-4 text-sm font-normal leading-normal text-muted-foreground">
        {blocks ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <LineChart
              accessibilityLayer
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
              <YAxis type="number" />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <Line
                dataKey="earned"
                type="monotone"
                stroke="var(--color-earned)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="distributed"
                type="monotone"
                stroke="var(--color-distributed)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          // <ChartContainer
          //   config={chartConfig}
          //   className="aspect-auto h-[300px] w-full"
          // >
          // </ChartContainer>
          <>
            <Skeleton className="h-3 w-3" />
          </>
        )}
      </div>
    </div>
  );
};
