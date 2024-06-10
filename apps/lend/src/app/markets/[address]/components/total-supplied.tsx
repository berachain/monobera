"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { TimeFrame, getTime, type TimeFrame as TimeFrameT } from "@bera/berajs";
import { GetHistoryDayRates, GetHistoryHourRates } from "@bera/graphql";
import { FormattedNumber, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { fillAPYDataByDay, fillAPYDataByHour } from "~/utils/graph-utils";
import { Card } from "@bera/ui/card";
import DonutChart from "~/components/donut-chart";
import LineChart from "~/components/line-chart";

export const TotalSupplied = ({ reserveData }: { reserveData: any }) => {
  const ticker = reserveData?.symbol;
  const color = "#059669";
  const info = [
    {
      title: "Max LTV",
      value: reserveData ? (
        <FormattedNumber
          value={reserveData?.formattedBaseLTVasCollateral}
          compact={false}
          percent
        />
      ) : (
        <Skeleton className="h-7 w-20" />
      ),
      tooltip: (
        <Tooltip>
          <div className="max-w-[350px]">
            The Maximum LTV ratio represents the maximum borrowing power of a{" "}
            specific collateral. For example, if a collateral has an LTV of 75%,{" "}
            the user can borrow up to 0.75 worth of ETH in the principal
            currency for every 1 ETH worth of collateral.
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Liquidation Threshold",
      value: reserveData ? (
        <FormattedNumber
          value={reserveData?.formattedReserveLiquidationThreshold}
          compact={false}
          percent
        />
      ) : (
        <Skeleton className="h-7 w-20" />
      ),
      tooltip: (
        <Tooltip>
          <div className="max-w-[350px]">
            This represents the threshold at which a borrow position will be
            considered undercollateralized and subject to liquidation for each
            collateral. For example, if a collateral has a liquidation threshold
            of 80%, it means that the position will be liquidated when the debt
            value is worth 80% of the collateral value.
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Liquidation Penalty",
      value: reserveData ? (
        <FormattedNumber
          value={reserveData?.formattedReserveLiquidationBonus}
          compact={false}
          percent
        />
      ) : (
        <Skeleton className="h-7 w-20" />
      ),
      tooltip: (
        <Tooltip>
          <div className="max-w-[350px]">
            When a liquidation occurs, liquidators repay up to 50% of the
            outstanding borrowed amount on behalf of the borrower. In return,
            they can buy the collateral at a discount and keep the difference as
            a bonus.
          </div>
        </Tooltip>
      ),
    },
  ];

  const [timeframe, setTimeframe] = useState<TimeFrameT>(TimeFrame.HOURLY);
  const timestamp_gt = useMemo(() => getTime(timeframe), [timeframe]);
  const { data: graphdata, loading } = useQuery(
    timeframe === (TimeFrame.HOURLY || TimeFrame.WEEKLY)
      ? GetHistoryHourRates
      : GetHistoryDayRates,
    {
      variables: { timestamp_gt },
    },
  );

  const gData =
    timeframe === (TimeFrame.HOURLY || TimeFrame.WEEKLY)
      ? fillAPYDataByHour(
          graphdata?.historyHourRates ?? [],
          getTime(timeframe),
          "supplyRates",
        )
      : fillAPYDataByDay(
          graphdata?.historyDayRates ?? [],
          getTime(timeframe),
          "supplyRates",
        );

  return (
    <div>
      <div className="text-2xl font-semibold leading-loose">
        Total Supplied {ticker}
      </div>
      <Card className="flex flex-col gap-8 p-4 sm:p-6 md:p-9">
        <div className="flex justify-between md:justify-start md:gap-8">
          <DonutChart
            percentage={
              Number(reserveData?.supplyCap) !== 0
                ? (Number(reserveData?.totalLiquidity) /
                    Number(reserveData?.supplyCap)) *
                  100
                : 0
            }
            color={color}
          />

          <div className="flex flex-col gap-[6px]">
            <div className="text-xs font-normal leading-normal text-muted-foreground md:text-sm">
              Total Supplied
            </div>
            {reserveData ? (
              <div className="font-semibold leading-7 md:text-xl">
                <FormattedNumber value={reserveData?.totalLiquidity} /> of{" "}
                <FormattedNumber value={reserveData?.supplyCap} />
              </div>
            ) : (
              <Skeleton className="h-7 w-[150px]" />
            )}
            {reserveData ? (
              <div className="text-xs font-medium leading-tight text-muted-foreground">
                <FormattedNumber
                  value={reserveData?.totalLiquidityUSD}
                  symbol="USD"
                />{" "}
                of{" "}
                <FormattedNumber
                  value={reserveData?.supplyCapUSD}
                  symbol="USD"
                />
              </div>
            ) : (
              <Skeleton className="h-4 w-[100px]" />
            )}
          </div>

          <div className="flex flex-col gap-[6px]">
            <div className="text-xs font-normal leading-normal text-muted-foreground md:text-sm">
              APY
            </div>
            {reserveData ? (
              <div className="font-semibold leading-7 md:text-xl">
                <FormattedNumber value={reserveData?.supplyAPY} percent />
              </div>
            ) : (
              <Skeleton className="h-7 w-20" />
            )}
          </div>
        </div>

        <div>
          <LineChart
            attribute="supplyRates"
            time={timeframe}
            setTime={setTimeframe}
            data={gData}
            isLoading={loading}
            color={color}
            title={"Supply APR"}
          />
        </div>

        <div>
          <div className="mb-4 font-medium">
            Collateral Usage
            <span className="text-xs font-medium leading-tight text-success-foreground">
              <Icons.check className="ml-3 mr-1 inline h-4 w-4" />
              Can be used as collateral
            </span>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            {info.map((item) => (
              <Card
                className="flex flex-1 justify-between bg-muted px-4 py-2 md:flex-col"
                key={item.title}
              >
                <div className="flex items-center gap-[6px] text-xs text-muted-foreground md:text-sm">
                  {item.title} {item.tooltip}
                </div>
                <div className=" text-lg font-semibold leading-7 md:mt-[6px]">
                  {item.value}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
