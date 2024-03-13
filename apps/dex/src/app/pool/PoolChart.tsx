import { useEffect, useState } from "react";
import { getDayStartTimestampDaysAgo } from "@bera/bera-router";
import { formatUsd } from "@bera/berajs";
import { chainId, crocIndexerEndpoint } from "@bera/config";
import { type PoolDayData } from "@bera/graphql";
import { Dropdown, SSRSpinner } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { BigNumber } from "bignumber.js";
import { formatUnits, parseUnits } from "viem";

import { getSafeNumber } from "~/utils/getSafeNumber";

const Options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
    line: {
      tension: 0.4, // smooth lines
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: "Bera Chart",
    },

    tooltip: {
      displayColors: false,
      position: "nearest",
      interaction: {
        intersect: false,
      },
      callbacks: {
        label: (context: {
          dataset: { label: string };
          parsed: { y: number | bigint | null };
        }) => {
          let label = context.dataset.label || "";

          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(context.parsed.y);
          }
          return label;
        },
      },
    },
  },
};

enum TimeFrame {
  WEEKLY = "7d",
  MONTHLY = "30d",
  QUARTERLY = "90d",
}

enum Chart {
  VOLUME = "volume",
  TVL = "TVL",
  FEES = "fees",
}

type TimeFrameToNumber = {
  [K in TimeFrame]: number;
};

const timeFrameToNumber: TimeFrameToNumber = {
  [TimeFrame.WEEKLY]: 7,
  [TimeFrame.MONTHLY]: 30,
  [TimeFrame.QUARTERLY]: 90,
};
function getDateListFromDaysAgo(daysAgo: number): string[] {
  const dateList: string[] = [];
  const today = new Date();

  for (let i = 0; i < daysAgo; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateString = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    dateList.push(dateString);
  }

  return dateList.reverse();
}
const getData = (data: number[], timeFrame: TimeFrame, chart: Chart) => {
  const barLineData = {
    labels: getDateListFromDaysAgo(timeFrameToNumber[timeFrame]),
    datasets: [
      {
        data: data,
        labelColor: false,
        backgroundColor: chart === Chart.VOLUME ? "#e4e4e4" : "#7fc516",
        borderColor: chart === Chart.VOLUME ? "#e4e4e4" : "#7fc516",
        hoverBackgroundColor: "yellow",
        hoverBorderColor: "yellow",
        tension: 0.4,
        borderRadius: 100,
        borderSkipped: false,
        spanGaps: false,
      },
    ],
  };
  return barLineData;
};

// function calculatePercentageDifference(numbers: number[]): number {
//   if (numbers.length < 2) {
//     return 0; // Not enough numbers to calculate the difference
//   }

//   let firstNumberIndex = 0;
//   while (firstNumberIndex < numbers.length && numbers[firstNumberIndex] === 0) {
//     firstNumberIndex++;
//   }

//   if (firstNumberIndex >= numbers.length) {
//     return 0; // All numbers are zero, cannot calculate percentage difference
//   }

//   const firstNumber = numbers[firstNumberIndex] as number;
//   const lastNumber = numbers[numbers.length - 1] as number;

//   const difference = lastNumber - firstNumber;
//   const percentageDifference = (difference / Math.abs(firstNumber)) * 100;

//   return percentageDifference;
// }
const formatHoney = (amountInHoney: number) => {
  const bnAmount = new BigNumber(amountInHoney.toString());
  return getSafeNumber(bnAmount.div(10 ** 18).toString());

  // return getSafeNumber(formatUnits(parseUnits(amountInHoney.toString(), 18), 18));
};

export const PoolChart = ({
  currentTvl,
  historicalData,
  isLoading,
}: {
  currentTvl: number;
  historicalData: PoolDayData[] | undefined;
  isLoading: boolean;
}) => {
  const quarterlyDayStartTimes: number[] = [];
  for (let i = 0; i < 90; i++) {
    quarterlyDayStartTimes.push(getDayStartTimestampDaysAgo(i));
  }

  let weeklyVolumeTotal = 0;
  let monthlyVolumeTotal = 0;
  let quarterlyVolumeTotal = 0;

  let weeklyFeesTotal = 0;
  let monthlyFeesTotal = 0;
  let quarterlyFeesTotal = 0;

  // TODO: fill in gaps back to front instead of front to back
  let latestTvlSeen = 0;
  const completeDailyData: any[] = quarterlyDayStartTimes.map(
    (dayStartTimestamp: number, i) => {
      let poolData: PoolDayData | undefined = historicalData?.find(
        (data) => data.latestTime === dayStartTimestamp,
      );

      if (!poolData) {
        if (i === 0) {
          latestTvlSeen = 0;
          return {
            id: "",
            tvlUsd: currentTvl,
            volumeUsd: "0",
            feesUsd: "0",
            date: dayStartTimestamp,
          };
        }
        return {
          id: "",
          tvlUsd: currentTvl,
          volumeUsd: "0",
          feesUsd: "0",
          date: dayStartTimestamp,
        };
      }

      poolData = {
        ...poolData,
        volumeUsd: `${
          formatHoney(poolData?.baseVolumeInHoney) +
          formatHoney(poolData?.quoteVolumeInHoney)
        }`,
        tvlUsd: `${
          formatHoney(poolData?.baseTvlInHoney) +
            formatHoney(poolData?.quoteTvlInHoney) || latestTvlSeen
        }`,

        feesUsd: `${
          formatHoney(poolData?.baseFeesInHoney) +
          formatHoney(poolData?.quoteFeesInHoney)
        }`,
      };

      latestTvlSeen = poolData?.tvlUsd
        ? Number(poolData?.tvlUsd)
        : latestTvlSeen;

      if (i < 7) {
        weeklyVolumeTotal += Number(poolData?.volumeUsd);
        weeklyFeesTotal += Number(poolData?.feesUsd);
      }
      if (i < 30) {
        monthlyVolumeTotal += Number(poolData?.volumeUsd);
        monthlyFeesTotal += Number(poolData?.feesUsd);
      }
      if (i < 90) {
        quarterlyVolumeTotal += Number(poolData?.volumeUsd);
        quarterlyFeesTotal += Number(poolData?.feesUsd);
      }

      return poolData;
    },
  );

  const extractData = (field: string, numOfDays: number) => {
    return completeDailyData
      .slice(0, numOfDays)
      .map((dayData: any) => {
        return Number(dayData[field]);
      })
      .reverse();
  };

  const [total, setTotal] = useState(weeklyVolumeTotal);
  // const [difference, setDifference] = useState(0);
  const [timeFrame, setTimeFrame] = useState(TimeFrame.WEEKLY);
  const [chart, setChart] = useState(Chart.VOLUME);
  const [data, setData] = useState(
    getData(extractData("volumeUsd", 7), timeFrame, chart),
  );
  useEffect(() => {
    if (timeFrame === TimeFrame.WEEKLY) {
      if (chart === Chart.VOLUME) {
        setData(getData(extractData("volumeUsd", 7), timeFrame, chart));
        // setDifference(calculatePercentageDifference(weeklyVolume));
        setTotal(weeklyVolumeTotal);
      }
      if (chart === Chart.TVL) {
        setData(getData(extractData("tvlUsd", 7), timeFrame, chart));
        // setDifference(calculatePercentageDifference(weeklyTvl));
        setTotal(Number(currentTvl));
      }
      if (chart === Chart.FEES) {
        setData(getData(extractData("feesUsd", 7), timeFrame, chart));
        // setDifference(calculatePercentageDifference(weeklyFees));
        setTotal(weeklyFeesTotal);
      }
    }
    if (timeFrame === TimeFrame.MONTHLY) {
      if (chart === Chart.VOLUME) {
        setData(getData(extractData("volumeUsd", 30), timeFrame, chart));
        // setDifference(calculatePercentageDifference(monthlyVolume));
        setTotal(monthlyVolumeTotal);
      }
      if (chart === Chart.TVL) {
        setData(getData(extractData("tvlUsd", 30), timeFrame, chart));
        // setDifference(calculatePercentageDifference(monthlyTvl));
        setTotal(Number(currentTvl));
      }
      if (chart === Chart.FEES) {
        setData(getData(extractData("feesUsd", 30), timeFrame, chart));
        // setDifference(calculatePercentageDifference(monthlyFees));
        setTotal(monthlyFeesTotal);
      }
    }
    if (timeFrame === TimeFrame.QUARTERLY) {
      if (chart === Chart.VOLUME) {
        setData(getData(extractData("volumeUsd", 90), timeFrame, chart));
        // setDifference(calculatePercentageDifference(quarterlyVolume));
        setTotal(quarterlyVolumeTotal);
      }
      if (chart === Chart.TVL) {
        setData(getData(extractData("tvlUsd", 90), timeFrame, chart));
        // setDifference(calculatePercentageDifference(quarterlyTvl));
        setTotal(Number(currentTvl));
      }
      if (chart === Chart.FEES) {
        setData(getData(extractData("feesUsd", 90), timeFrame, chart));
        // setDifference(calculatePercentageDifference(quarterlyFees));
        setTotal(quarterlyFeesTotal);
      }
    }
  }, [historicalData, timeFrame, chart]);

  return (
    <Card className="bg-muted p-0">
      <Tabs
        defaultValue={Chart.VOLUME}
        onValueChange={(value: string) => setChart(value as Chart)}
      >
        <CardHeader className="flex w-full flex-col items-center justify-start px-6 py-4 sm:flex-row sm:justify-between">
          <div className="flex w-full flex-row items-end gap-3">
            <div className="w-fit text-xl font-semibold">
              {isLoading ? (
                <Skeleton className="h-[32px] w-[150px]" />
              ) : (
                formatUsd(total)
              )}
            </div>
            {/* <div
              className={cn(
                "w-full text-sm font-normal",
                difference >= 0
                  ? "text-success-foreground"
                  : "text-destructive-foreground",
              )}
            >
              {difference.toFixed(2)}%
            </div> */}
          </div>

          <div className="flex w-full flex-row items-center justify-start gap-2 sm:justify-end">
            <TabsList className="border border-border">
              <TabsTrigger value={Chart.VOLUME}>Volume</TabsTrigger>
              <TabsTrigger value={Chart.TVL}>TVL</TabsTrigger>
              <TabsTrigger value={Chart.FEES}>Fees</TabsTrigger>
            </TabsList>
            <Dropdown
              selected={timeFrame}
              onSelect={(value: string) => setTimeFrame(value as TimeFrame)}
              selectionList={Object.values(TimeFrame)}
              sortby={false}
            />
          </div>
        </CardHeader>
        {isLoading ? (
          <div className="relative flex min-h-[250px] w-full items-center justify-center">
            <SSRSpinner size={16} />
          </div>
        ) : (
          <>
            <TabsContent value={Chart.VOLUME}>
              <CardContent className="relative min-h-[250px] w-full">
                <BeraChart data={data} options={Options as any} type="bar" />
              </CardContent>
            </TabsContent>
            <TabsContent value={Chart.TVL}>
              <CardContent className="relative min-h-[250px] w-full">
                <BeraChart data={data} options={Options as any} type="line" />
              </CardContent>
            </TabsContent>
            <TabsContent value={Chart.FEES}>
              <CardContent className="relative min-h-[250px] w-full">
                <BeraChart data={data} options={Options as any} type="bar" />
              </CardContent>
            </TabsContent>
          </>
        )}
      </Tabs>
    </Card>
  );
};
