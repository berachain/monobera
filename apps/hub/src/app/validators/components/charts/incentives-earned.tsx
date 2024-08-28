import { useMemo } from "react";
import { usePollValidatorTokenRewards } from "@bera/berajs";
import {
  FormattedNumber,
  SimpleTable,
  TokenIcon,
  useAsyncTable,
} from "@bera/shared-ui";
import { ChartConfig, ChartContainer, ChartTooltip } from "@bera/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "@bera/ui/recharts";
import { Skeleton } from "@bera/ui/skeleton";
import { Address } from "viem";

import { formatValidatorTokenRewardsUsage } from "~/utils/formatted-chart-data";
import { validatorIncentivesColumns } from "~/columns/validator-incentives-columns";

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(payload[0].payload.timestamp / 1000);

    return (
      <div className="flex min-w-[8rem] flex-col items-start gap-1.5 rounded-md border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
        <p className="">{date.toISOString().split("T")[0]}</p>
        {payload[0].payload.tokens.map(
          (token: {
            address: string;
            id: string;
            name: string;
            symbol: string;
            tokenRewarded: string;
            usdValueTokenRewarded: string;
          }) => {
            return (
              <div className="flex w-full items-center">
                <div className="flex w-48 gap-1">
                  <TokenIcon
                    symbol={token.symbol}
                    address={token.address}
                    key={token.address}
                  />
                  <p className="">{`${token.symbol}`}</p>
                </div>

                <div className="flex w-full justify-between gap-6">
                  <FormattedNumber
                    value={token.tokenRewarded}
                    className="flex-start flex text-sm text-muted-foreground"
                  />
                  <FormattedNumber
                    value={token.usdValueTokenRewarded}
                    symbol="USD"
                    className="flex-end flex text-sm text-muted-foreground"
                  />
                </div>
              </div>
            );
          },
        )}
        <p className="font-sm flex items-center font-semibold text-foreground">
          {"Total:"}
          <FormattedNumber
            value={payload[0].payload.totalUsdValueTokenRewardedOnTimestamp}
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
  dayRange,
}: {
  dayRange: number;
  validatorAddress: Address;
}) => {
  const chartConfig = {
    incentives: {
      label: "Incentives Earned",
      color: "hsl(142, 69%, 58%)",
    },
  } satisfies ChartConfig;

  const { data, isLoading } = usePollValidatorTokenRewards(
    validatorAddress,
    dayRange,
  );

  const formattedData = useMemo(
    () =>
      formatValidatorTokenRewardsUsage(
        data?.validatorTokenRewardUsages ?? [],
        dayRange,
      ),
    [data],
  );

  const groupedIncentives = useMemo(
    () =>
      Object.values(formattedData?.groupedTokens)
        .map((group) => group)
        .sort(
          (a, b) => b.totalUsdValueTokenRewarded - a.totalUsdValueTokenRewarded,
        ) ?? [],
    [formattedData],
  );

  const incentivesTable = useAsyncTable({
    fetchData: async () => {},
    columns: validatorIncentivesColumns,
    data: groupedIncentives ?? [],
    additionalTableProps: {
      manualSorting: false,
      meta: {
        loading: isLoading,
        loadingText: "Loading...",
      },
    },
  });

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex w-full flex-col gap-2">
          <div className="flex gap-2">
            <span className="text-md font-semibold">Incentives Earned</span>
            <FormattedNumber
              value={
                data?.validatorUsages[0]?.allTimeUsdValueTokenRewarded ?? ""
              }
              prefixText="Total: $"
              className="text-sm text-muted-foreground"
            />
          </div>

          {/* TODO: Get Backend to add events (cutting board changes) */}
          {/* <div className="ml-auto flex items-center gap-2">
            <Icons.circle className="flex h-3 w-3 items-end rounded-md bg-blue-400 text-blue-400" />
            
            <span className="text-sm text-muted-foreground">
              Cutting Board Changed
            </span>
          </div> */}
        </div>
        {!data || !formattedData || isLoading ? (
          <Skeleton className="h-72 w-full p-4" />
        ) : (
          <div className="flex w-full items-end gap-4 text-sm font-normal leading-normal text-muted-foreground">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto h-[300px] w-full"
            >
              <BarChart
                accessibilityLayer
                className="w-full"
                data={formattedData?.incentives}
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
                  dataKey="totalUsdValueTokenRewardedOnTimestamp"
                  type="number"
                  min={0}
                />
                <ChartTooltip content={<CustomTooltip />} />
                <Bar
                  dataKey={"totalUsdValueTokenRewardedOnTimestamp"}
                  fill={"var(--color-incentives)"}
                />
              </BarChart>
            </ChartContainer>
          </div>
        )}
      </div>
      <div className="flex w-full flex-1 flex-col gap-4 p-4">
        <div className="flex">
          <span className="text-md mr-1 font-semibold">Incentives Earned</span>
          <span className="flex text-sm text-muted-foreground">{`(Last ${dayRange} days)`}</span>
        </div>
        {!data || !formattedData || isLoading ? (
          <Skeleton className="h-72 w-full p-4" />
        ) : (
          <SimpleTable
            table={incentivesTable}
            variant="ghost"
            wrapperClassName={"w-full"}
            flexTable
            dynamicFlex
            showToolbar={false}
          />
        )}
      </div>
    </div>
  );
};
