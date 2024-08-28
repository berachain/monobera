import { useMemo } from "react";
import { usePollValidatorBgtStaked } from "@bera/berajs";
import { FormattedNumber } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { ChartConfig, ChartContainer, ChartTooltip } from "@bera/ui/chart";
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

import { formatValidatorBgtDelegatedDelta } from "~/utils/formatted-chart-data";

const DELEGATION_IN_COLOR = "#4ADE80";
const DELEGATION_OUT_COLOR = "#F87171";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="flex min-w-[8rem] flex-col items-start gap-1.5 rounded-md border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
        <p className="">{payload[0].payload.date}</p>
        <div className="font-sm flex w-full items-center gap-1 font-semibold text-muted-foreground">
          {"Net Delegation:"}
          <FormattedNumber
            value={payload[0].payload.bgtStaked}
            className="ml-auto flex text-sm text-foreground"
          />
        </div>
      </div>
    );
  }
};

export const StakeFlow = ({
  validatorAddress,
  dayRange,
}: {
  dayRange: number;
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

  const { data, isLoading } = usePollValidatorBgtStaked(
    validatorAddress,
    dayRange,
  );

  const formattedData = useMemo(
    () =>
      formatValidatorBgtDelegatedDelta(
        data?.validatorBgtStaked ?? [],
        dayRange,
      ),
    [data],
  );

  const dataP = useMemo(() => {
    return {
      labels: ["Delegation-In", "Delegation-Out"],
      datasets: [
        {
          hoverBorderWidth: 10,
          borderRadius: 8,
          spacing: 5,
          borderWidth: 0,
          backgroundColor: [DELEGATION_IN_COLOR, DELEGATION_OUT_COLOR],
          hoverBorderColor: [
            `${DELEGATION_IN_COLOR}52`,
            `${DELEGATION_OUT_COLOR}52`,
          ],
          data: [formattedData?.delegationIn, formattedData?.delegationOut],
        },
      ],
    };
  }, [formattedData]);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-md font-semibold">Stake Flow</span>
          </div>
        </div>
        {!formattedData?.data || isLoading ? (
          <Skeleton className="h-80 w-full p-4" />
        ) : (
          <div className="flex w-full items-end gap-4 text-sm font-normal leading-normal text-muted-foreground">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <BarChart accessibilityLayer data={formattedData?.data}>
                <CartesianGrid vertical={false} />
                <ChartTooltip cursor={false} content={<CustomTooltip />} />
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
                <YAxis type="number" dataKey={(v) => parseInt(v.bgtStaked)} />
                <Bar dataKey="bgtStaked">
                  {formattedData?.data.map((item) => (
                    <Cell
                      key={item.timestamp}
                      fill={
                        Number(item.bgtStaked) > 0
                          ? "hsl(142, 69%, 58%)"
                          : "hsl(0, 91%, 71%)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex">
          <span className="text-md mr-1 font-semibold">Stake Flow</span>
          <span className="flex text-sm text-muted-foreground">{`(Last ${dayRange} days)`}</span>
        </div>
        {!formattedData?.data || isLoading ? (
          <Skeleton className="h-80 w-full p-4" />
        ) : (
          <div className="flex w-full flex-col items-center gap-8 text-sm font-normal leading-normal text-muted-foreground lg:flex-row">
            <div className="flex w-full flex-1 flex-col gap-4">
              <div className="flex justify-between">
                <span className="text-md font-semibold">Delegation-In</span>
                <FormattedNumber
                  compactThreshold={999_999_999}
                  value={formattedData?.delegationIn}
                  className="text-md font-semibold text-green-400"
                  prefixText="+"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-md font-semibold ">Delegation-Out</span>
                <FormattedNumber
                  compactThreshold={999_999_999}
                  value={formattedData?.delegationOut}
                  className="text-md font-semibold text-red-400"
                />
              </div>
              <div className="flex justify-between">
                <span className="text-md font-semibold ">Net Delegation</span>
                <FormattedNumber
                  compactThreshold={999_999_999}
                  value={formattedData?.netDelegation}
                  className={cn("text-md font-semibold", {
                    "text-green-400": formattedData?.netDelegation > 0,
                    "text-red-400": formattedData?.netDelegation < 0,
                  })}
                />
              </div>
            </div>
            <div className="relative mx-auto h-[200px] w-[200px]">
              {/* @ts-ignore */}
              <BeraChart
                data={dataP}
                options={{
                  responsive: true,
                  // @ts-ignore
                  cutout: "70%",
                  radius: "95%",
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
                type="doughnut"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
