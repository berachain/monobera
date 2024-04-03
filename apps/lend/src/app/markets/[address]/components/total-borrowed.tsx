import { useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { TimeFrame, getTime, type TimeFrame as TimeFrameT } from "@bera/berajs";
import { blockExplorerUrl } from "@bera/config";
import { GetHistoryDayRates, GetHistoryHourRates } from "@bera/graphql";
import { FormattedNumber, Tooltip } from "@bera/shared-ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";

import { fillAPYDataByDay, fillAPYDataByHour } from "~/utils/graph-utils";
import Card from "~/components/card";
import DonutChart from "~/components/donut-chart";
import LineChart from "~/components/line-chart";

export default function TotalBorrowed({ reserveData }: { reserveData: any }) {
  const ticker = reserveData?.symbol;
  const color = "#FCD34D ";
  const info = [
    {
      title: "Reserve factor",
      value: reserveData ? (
        <FormattedNumber
          value={reserveData?.reserveFactor}
          compact={false}
          percent
        />
      ) : (
        <Skeleton className="h-7 w-20" />
      ),
      tooltip: (
        <>
          The Maximum LTV ratio represents the maximum borrowing power of a
          <br />
          specific collateral. For example, if a collateral has an LTV of 75%,
          <br />
          the user can borrow up to 0.75 worth of ETH in the principal currency
          <br />
          for every 1 ETH worth of collateral.
        </>
      ),
    },
    {
      title: "Collector contract",
      value: (
        <Link
          href={`${blockExplorerUrl}/address/${reserveData?.underlyingAsset}`}
          target="_blank"
          className="hover:underline"
        >
          View Contract{" "}
          <Icons.external className="inline h-4 w-4 text-muted-foreground hover:cursor-pointer" />
        </Link>
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
          "borrowRates",
        )
      : fillAPYDataByDay(
          graphdata?.historyDayRates ?? [],
          getTime(timeframe),
          "borrowRates",
        );

  return (
    <div className="w-full">
      <div className="text-2xl font-semibold leading-loose">
        Total Borrowed {ticker}
      </div>
      <Card className="flex flex-col gap-8 p-9">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="flex gap-8">
            <DonutChart
              percentage={
                Number(reserveData?.borrowCap) !== 0
                  ? (Number(reserveData?.totalDebt) /
                      Number(reserveData?.borrowCap)) *
                    100
                  : 0
              }
              color={color}
            />

            <div className="flex flex-col gap-[6px]">
              <div className="text-sm font-normal leading-normal text-muted-foreground">
                Total Borrowed
              </div>
              {reserveData ? (
                <div className=" font-semibold leading-7 md:text-xl">
                  <FormattedNumber value={reserveData?.totalDebt} /> of{" "}
                  <FormattedNumber value={reserveData?.borrowCap} />
                </div>
              ) : (
                <Skeleton className="h-7 w-[150px]" />
              )}
              {reserveData ? (
                <div className="text-xs font-medium leading-tight text-muted-foreground">
                  <FormattedNumber
                    value={reserveData?.totalDebtUSD}
                    symbol="USD"
                  />{" "}
                  of{" "}
                  <FormattedNumber
                    value={reserveData?.borrowCapUSD}
                    symbol="USD"
                  />
                </div>
              ) : (
                <Skeleton className="h-4 w-[150px]" />
              )}
            </div>
          </div>

          <div className="flex gap-8">
            <div className="flex flex-col gap-[6px]">
              <div className="text-sm font-normal leading-normal text-muted-foreground">
                Available to Borrow
              </div>
              {reserveData ? (
                <div className="font-semibold leading-7 md:text-xl">
                  <FormattedNumber
                    value={
                      Number(reserveData?.totalLiquidity) *
                      Number(1 - reserveData?.borrowUsageRatio)
                    }
                  />
                </div>
              ) : (
                <Skeleton className="h-7 w-[100px]" />
              )}
              {reserveData ? (
                <div className="text-xs font-medium leading-tight text-muted-foreground">
                  <FormattedNumber
                    value={
                      Number(reserveData?.totalLiquidity) *
                      Number(
                        reserveData?.formattedPriceInMarketReferenceCurrency,
                      ) *
                      Number(1 - reserveData?.borrowUsageRatio)
                    }
                    symbol="USD"
                  />
                </div>
              ) : (
                <Skeleton className="h-4 w-[100px]" />
              )}
            </div>

            <div className="flex flex-col gap-[6px]">
              <div className="text-sm font-normal leading-normal text-muted-foreground">
                APY, variable
                <Tooltip
                  text={
                    <>
                      Variable interest rate will fluctuate based on the market{" "}
                      <br />
                      conditions. Recommended for short-term positions.
                    </>
                  }
                />
              </div>
              {reserveData ? (
                <div className="font-semibold leading-7 md:text-xl">
                  <FormattedNumber
                    value={reserveData?.variableBorrowAPY}
                    percent
                  />
                </div>
              ) : (
                <Skeleton className="h-7 w-20" />
              )}
            </div>
          </div>
        </div>

        <div>
          <LineChart
            attribute="borrowRates"
            time={timeframe}
            setTime={setTimeframe}
            data={gData}
            isLoading={loading}
            color={color}
            title="Borrow APY, Variable"
          />
        </div>

        <div>
          <div className="mb-4 font-medium">Collateral Usage</div>
          <div className="flex flex-col gap-4 md:flex-row">
            {info.map((item) => (
              <Card
                className="flex flex-1 justify-between bg-muted px-4 py-2 md:flex-col"
                key={item.title}
              >
                <div className="flex items-center gap-[6px] text-xs text-muted-foreground md:text-sm">
                  {item.title}
                  {item.tooltip && <Tooltip text={item.tooltip} />}
                </div>
                <div className="text-lg font-semibold leading-7 md:mt-[6px]">
                  {item.value}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
