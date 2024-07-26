import { useMemo } from "react";
import { FormattedNumber } from "@bera/shared-ui";
import { ChartConfig, ChartContainer, ChartTooltip } from "@bera/ui/chart";
import { Icons } from "@bera/ui/icons";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
} from "@bera/ui/recharts";
import { Skeleton } from "@bera/ui/skeleton";
import { Address } from "viem";

import { createStakeFlowArray } from "~/utils/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex min-w-[8rem] flex-col items-start gap-1.5 rounded-md border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
        <p className="">{payload[0].payload.date}</p>
        {/* TODO */}
        <div className="font-sm flex items-center gap-1 w-full font-semibold text-muted-foreground">
          <Icons.circle className="flex h-3 w-3 items-end rounded-md bg-green-400 text-green-400" />
          {"In:"}
          <FormattedNumber
            value={payload[0].payload.in}
            className="flex text-sm text-foreground ml-auto"
          />
        </div>
        <div className="font-sm flex items-center gap-1 w-full font-semibold text-muted-foreground">
          <Icons.circle className="flex h-3 w-3 items-end rounded-md bg-red-400 text-red-400" />
          {"Out:"}
          <FormattedNumber
            value={payload[0].payload.out}
            className="flex text-sm ml-auto text-foreground"
          />
        </div>
        <div className="font-sm flex items-center gap-1 font-semibold w-full text-muted-foreground">
          {"Net:"}
          <FormattedNumber
            value={payload[0].payload.net}
            className="flex text-sm text-foreground ml-auto"
          />
        </div>
      </div>
    );
  }
};

export const StakeFlow = ({
  validatorAddress,
}: {
  validatorAddress: Address;
}) => {
  const chartConfig = {
    delegation: {
      label: "Incentives Earned",
      color: "hsl(142, 69%, 58%)",
    },
    positive: {
      label: "Positive",
      color: "hsl(142, 69%, 58%)",
    },
    negative: {
      label: "Negative",
      color: "hsl(0, 91%, 71%)",
    },
    net: {
      color: "hsl(0, 91%, 71%)",
    },
  } satisfies ChartConfig;

  const blocks = useMemo(() => createStakeFlowArray(30), [validatorAddress]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex w-full flex-col gap-2">
        <div className="flex gap-2">
          <span className="text-md font-semibold">Stake Flow</span>
        </div>
      </div>
      <div className="flex w-full items-end gap-4 text-sm font-normal leading-normal text-muted-foreground">
        {blocks ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <BarChart accessibilityLayer data={blocks}>
              <CartesianGrid vertical={false} />
              <ChartTooltip cursor={false} content={<CustomTooltip />} />
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
              <YAxis dataKey="net" type="number" />
              <Bar dataKey="net">
                {blocks.map((item) => (
                  <Cell
                    key={item.date}
                    fill={
                      Number(item.net) > 0
                        ? "hsl(142, 69%, 58%)"
                        : "hsl(0, 91%, 71%)"
                    }
                  />
                ))}
              </Bar>
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
