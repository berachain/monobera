import { useMemo } from "react";
import { FormattedNumber } from "@bera/shared-ui";
import { ChartConfig, ChartContainer, ChartTooltip } from "@bera/ui/chart";
import { Icons } from "@bera/ui/icons";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "@bera/ui/recharts";
import { Skeleton } from "@bera/ui/skeleton";
import { Address } from "viem";

import { createIncentivesEarnedArray } from "~/utils/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex min-w-[8rem] flex-col items-start gap-1.5 rounded-md border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
        <p className="">{payload[0].payload.date}</p>
        {/* TODO */}
        {payload[0].payload.tokens.map(
          (
            token: { amount: number; symbol: string; value: number },
            index: number,
          ) => {
            return (
              <div className="flex w-full items-center">
                <div className="flex w-48 gap-1">
                  {index === 0 ? (
                    <Icons.bgt className="h-4 w-4 " />
                  ) : index === 1 ? (
                    <Icons.honey className="h-4 w-4" />
                  ) : (
                    <Icons.bera className="h-4 w-4" />
                  )}
                  <p className="">{`${token.symbol}`}</p>
                </div>

                <div className="flex w-full justify-between gap-6">
                  <FormattedNumber
                    value={token.amount}
                    className="flex-start flex text-sm text-muted-foreground"
                  />
                  <FormattedNumber
                    value={token.value}
                    symbol="USD"
                    className="flex-end flex text-sm text-muted-foreground"
                  />
                </div>
              </div>
            );
          },
        )}
        <p className="font-sm flex items-center font-semibold text-foreground">
          {`Total:`}
          <FormattedNumber
            value={payload[0].payload.incentives}
            symbol="USD"
            className="ml-2 flex text-sm text-muted-foreground"
          />
        </p>
      </div>
    );
  }
};

export const IncentivesEarned = ({
  validatorAddress,
}: {
  validatorAddress: Address;
}) => {
  const chartConfig = {
    incentives: {
      label: "Incentives Earned",
      color: "hsl(142, 69%, 58%)",
    },
  } satisfies ChartConfig;

  const blocks = useMemo(
    () => createIncentivesEarnedArray(30),
    [validatorAddress],
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-col gap-2">
        <div className="flex gap-2">
          <span className="text-md font-semibold">Incentives Earned</span>
          {/* TODO */}
          <span className="text-sm text-muted-foreground">
            {"Total: ($15,125,121)"}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Icons.circle className="flex h-3 w-3 items-end rounded-md bg-blue-400 text-blue-400" />
          <span className="text-sm text-muted-foreground">
            Cutting Board Changed
          </span>
        </div>
      </div>
      <div className="flex w-full items-end gap-4 text-sm font-normal leading-normal text-muted-foreground">
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
              <YAxis dataKey="incentives" type="number" />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar dataKey={"incentives"} fill={`var(--color-incentives)`} />
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
