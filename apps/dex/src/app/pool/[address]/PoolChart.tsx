import { useEffect, useState } from "react";
import { formatUsd } from "@bera/berajs";
import { Dropdown } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

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
        label: function (context: {
          dataset: { label: string };
          parsed: { y: number | bigint | null };
        }) {
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

interface IPoolChart {
  currentTvl: number;
  weeklyTvl: number[];
  weeklyVolume: number[];
  weeklyFees: number[];
  weeklyVolumeTotal: number;
  weeklyFeesTotal: number;
  monthlyTvl: number[];
  monthlyVolume: number[];
  monthlyFees: number[];
  monthlyVolumeTotal: number;
  monthlyFeesTotal: number;
  quarterlyTvl: number[];
  quarterlyVolume: number[];
  quarterlyFees: number[];
  quarterlyVolumeTotal: number;
  quarterlyFeesTotal: number;
}

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
      },
    ],
  };
  return barLineData;
};

function calculatePercentageDifference(numbers: number[]): number {
  if (numbers.length < 2) {
    return 0; // Not enough numbers to calculate the difference
  }

  let firstNumberIndex = 0;
  while (firstNumberIndex < numbers.length && numbers[firstNumberIndex] === 0) {
    firstNumberIndex++;
  }

  if (firstNumberIndex >= numbers.length) {
    return 0; // All numbers are zero, cannot calculate percentage difference
  }

  const firstNumber = numbers[firstNumberIndex] as number;
  const lastNumber = numbers[numbers.length - 1] as number;

  const difference = lastNumber - firstNumber;
  const percentageDifference = (difference / Math.abs(firstNumber)) * 100;

  return percentageDifference;
}

export const PoolChart = ({
  currentTvl,
  weeklyTvl,
  weeklyVolume,
  weeklyFees,
  weeklyVolumeTotal,
  weeklyFeesTotal,
  monthlyTvl,
  monthlyVolume,
  monthlyFees,
  monthlyVolumeTotal,
  monthlyFeesTotal,
  quarterlyTvl,
  quarterlyVolume,
  quarterlyFees,
  quarterlyVolumeTotal,
  quarterlyFeesTotal,
}: IPoolChart) => {
  const [total, setTotal] = useState(weeklyVolumeTotal);
  const [difference, setDifference] = useState(0);
  const [timeFrame, setTimeFrame] = useState(TimeFrame.WEEKLY);
  const [chart, setChart] = useState(Chart.VOLUME);
  const [data, setData] = useState(getData(weeklyVolume, timeFrame, chart));
  useEffect(() => {
    if (timeFrame === TimeFrame.WEEKLY) {
      if (chart === Chart.VOLUME) {
        setData(getData(weeklyVolume, timeFrame, chart));
        setDifference(calculatePercentageDifference(weeklyVolume));
        setTotal(weeklyVolumeTotal);
      }
      if (chart === Chart.TVL) {
        setData(getData(weeklyTvl, timeFrame, chart));
        setDifference(calculatePercentageDifference(weeklyTvl));
        setTotal(currentTvl);
      }
      if (chart === Chart.FEES) {
        setData(getData(weeklyFees, timeFrame, chart));
        setDifference(calculatePercentageDifference(weeklyFees));
        setTotal(weeklyFeesTotal);
      }
    }
    if (timeFrame === TimeFrame.MONTHLY) {
      if (chart === Chart.VOLUME) {
        setData(getData(monthlyVolume, timeFrame, chart));
        setDifference(calculatePercentageDifference(monthlyVolume));
        setTotal(monthlyVolumeTotal);
      }
      if (chart === Chart.TVL) {
        setData(getData(monthlyTvl, timeFrame, chart));
        setDifference(calculatePercentageDifference(monthlyTvl));
        setTotal(currentTvl);
      }
      if (chart === Chart.FEES) {
        setData(getData(monthlyFees, timeFrame, chart));
        setDifference(calculatePercentageDifference(monthlyFees));
        setTotal(monthlyFeesTotal);
      }
    }
    if (timeFrame === TimeFrame.QUARTERLY) {
      if (chart === Chart.VOLUME) {
        setData(getData(quarterlyVolume, timeFrame, chart));
        setDifference(calculatePercentageDifference(quarterlyVolume));
        setTotal(quarterlyVolumeTotal);
      }
      if (chart === Chart.TVL) {
        setData(getData(quarterlyTvl, timeFrame, chart));
        setDifference(calculatePercentageDifference(quarterlyTvl));
        setTotal(currentTvl);
      }
      if (chart === Chart.FEES) {
        setData(getData(quarterlyFees, timeFrame, chart));
        setDifference(calculatePercentageDifference(quarterlyFees));
        setTotal(quarterlyFeesTotal);
      }
    }
  }, [timeFrame, chart]);

  return (
    <Card className="p-0">
      <Tabs
        defaultValue={Chart.VOLUME}
        onValueChange={(value: string) => setChart(value as Chart)}
      >
        <CardHeader className="flex w-full flex-col items-center justify-start px-6 py-4 sm:flex-row sm:justify-between">
          <div className="flex w-full flex-row items-end gap-3">
            <div className="w-fit text-xl font-semibold">
              {formatUsd(total)}
            </div>
            <div
              className={cn(
                "w-full text-sm font-normal",
                difference >= 0
                  ? "text-success-foreground"
                  : "text-destructive-foreground",
              )}
            >
              {difference.toFixed(2)}%
            </div>
          </div>

          <div className="flex w-full flex-row items-center justify-start gap-2 sm:justify-end">
            <TabsList>
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
      </Tabs>
    </Card>
  );
};
