import { useMemo } from "react";
import { usePollValidatorBgtStaked } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { ChartConfig, ChartContainer, ChartTooltip } from "@bera/ui/chart";
import { Icons } from "@bera/ui/icons";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "@bera/ui/recharts";
import { Skeleton } from "@bera/ui/skeleton";
import { Address } from "viem";

import { formatValidatorBgtDelegated } from "~/utils/formatted-chart-data";

const CustomBgtDelegatedTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(payload[0].payload.timestamp / 1000);
    return (
      <div className="flex min-w-[8rem] flex-col items-start gap-1.5 rounded-md border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
        <p className="">{date.toISOString().split("T")[0]}</p>
        <p className="">{"BGT Delegated: "}</p>
        <FormattedNumber
          value={payload[0].payload.bgtStaked}
          className="text-sm font-semibold text-foreground"
        />
        <p className="">{"All Time BGT Delegated: "}</p>
        <FormattedNumber
          value={payload[0].payload.allTimeBgtStaked}
          className="text-sm font-semibold text-foreground"
        />
      </div>
    );
  }
};

export const BgtDelegated = ({
  validatorAddress,
  dayRange,
}: {
  validatorAddress: Address;
  dayRange: number;
}) => {
  const chartConfig = {
    bgt: {
      label: "Bgt Delegated",
      color: "hsl(142, 69%, 58%)",
    },
  } satisfies ChartConfig;

  const { data, isLoading } = usePollValidatorBgtStaked(
    validatorAddress,
    dayRange,
  );

  const formattedData = useMemo(
    () => formatValidatorBgtDelegated(data?.validatorBgtStaked ?? [], dayRange),
    [data],
  );

  const lastRecordedUsage = data?.validatorBgtStaked?.[0];
  return (
    <div className="flex w-full flex-col gap-12 p-4">
      <div className="flex items-center gap-1">
        <Icons.bgt className="h-4 w-4" />
        <span className="text-md mr-2 font-semibold">BGT Delegated</span>
        <span className="text-sm text-muted-foreground">{"All Time:"}</span>
        <FormattedNumber
          value={lastRecordedUsage ? lastRecordedUsage?.allTimeBgtStaked : ""}
          className="text-sm text-muted-foreground"
        />
        <span className="text-sm text-muted-foreground">
          {` | Last ${dayRange} Days:`}
        </span>
        <FormattedNumber
          value={
            formattedData?.currentBgtTotal ? formattedData?.currentBgtTotal : ""
          }
          className="text-sm text-muted-foreground"
        />
        {/* TODO: Ask for allTimeUsdValueBgtStaked */}
        {/* <FormattedNumber
          value={
            lastRecordedUsage
              ? lastRecordedUsage?.allTimeUsdValueBgtStaked
              : ""
          }
          prefixText="($"
          suffixText=")"
          className="text-sm text-muted-foreground"
        /> */}
      </div>
      {!formattedData?.data || isLoading ? (
        <Skeleton className="h-80 w-full p-4" />
      ) : (
        <div className="flex w-full gap-4 text-sm font-normal leading-normal text-muted-foreground">
          {
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <BarChart
                accessibilityLayer
                className="w-full"
                data={formattedData?.data}
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
                <YAxis
                  dataKey={(v) => parseInt(v.allTimeBgtStaked)}
                  type="number"
                  padding={{ top: 0, bottom: 0 }}
                />
                <ChartTooltip content={<CustomBgtDelegatedTooltip />} />
                <Bar dataKey={"allTimeBgtStaked"} fill={"var(--color-bgt)"} />
              </BarChart>
            </ChartContainer>
          }
        </div>
      )}
    </div>
  );
};
