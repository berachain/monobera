import { useMemo } from "react";
import { usePollValidatorBlockRewardStats } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { ChartConfig, ChartContainer, ChartTooltip } from "@bera/ui/chart";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Address } from "viem";

import { formatValidatorRewardsData } from "~/utils/formatted-chart-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(payload[0].payload.timestamp / 1000);
    return (
      <div className="flex min-w-[8rem] flex-col items-start gap-1 rounded-md border border-border/50 bg-background px-2.5 py-1.5 shadow-xl">
        <p className="">{date.toISOString().split("T")[0]}</p>
        <p className="flex items-center text-sm text-muted-foreground">
          Rewards Distributed
        </p>
        <div className="text-md text-semibold flex items-center gap-1 text-foreground">
          <FormattedNumber
            value={payload[0].payload.rewardRate}
            className="text-semibold flex "
          />
          {"BGT"}
        </div>
        <p className="flex items-center text-sm text-muted-foreground">
          Commission Earned
        </p>
        <div className="text-md text-semibold flex items-center gap-1 text-foreground">
          <FormattedNumber
            value={payload[0].payload.commissionRate}
            className="text-semibold flex "
          />
          {"BGT"}
        </div>
      </div>
    );
  }
};

export const ValidatorRewards = ({
  validatorAddress,
  dayRange,
}: {
  validatorAddress: Address;
  dayRange: number;
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

  const { data, isLoading } = usePollValidatorBlockRewardStats(
    validatorAddress,
    dayRange,
  );

  const formattedData = useMemo(
    () =>
      formatValidatorRewardsData(
        data?.blockRewardStatsByValidators ?? [],
        dayRange,
      ),
    [data],
  );

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex w-full flex-col gap-2">
        <span className="text-md font-semibold">
          Rewards Distributed & Commission
        </span>
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
      {!data || !formattedData || isLoading ? (
        <Skeleton className="h-72 w-full p-4" />
      ) : (
        <div className="flex w-full items-end gap-4 text-sm font-normal leading-normal text-muted-foreground">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={formattedData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value / 1000);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    timeZone: "UTC",
                  });
                }}
              />
              <YAxis type="number" dataKey={(v) => parseInt(v.rewardRate)} />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
              <Line
                dataKey="commissionRate"
                type="monotone"
                stroke="var(--color-earned)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="rewardRate"
                type="monotone"
                stroke="var(--color-distributed)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      )}
    </div>
  );
};
