import { useEffect, useState } from "react";
import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bera/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { format } from "date-fns";

import { type HoneyEntry } from "~/app/type";

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
      borderRadius: 18,
      caretSize: 0,

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

interface IHoneyChart {
  hourlySupply: number[];
  hourlyVolume: number[];
  weeklyVolume: number[];
  weeklyFees: number[];
  weeklyVolumeTotal: number;
  weeklyFeesTotal: number;
  monthlyVolume: number[];
  monthlyFees: number[];
  monthlyVolumeTotal: number;
  monthlyFeesTotal: number;
  quarterlyVolume: number[];
  quarterlyFees: number[];
  quarterlyVolumeTotal: number;
  quarterlyFeesTotal: number;
  arcade: boolean;
}

enum TimeFrame {
  HOURLY = "24H",
  WEEKLY = "7d",
  MONTHLY = "30d",
  QUARTERLY = "90d",
}

enum Chart {
  VOLUME = "volume",
  FEES = "fees",
}

type TimeFrameToNumber = {
  [K in TimeFrame]: number;
};

function isHoneyData(data: any): data is HoneyEntry {
  if (typeof data !== "object") return false;
  return "amount" in data && "UTCTime" in data;
}

const timeFrameToNumber: TimeFrameToNumber = {
  [TimeFrame.HOURLY]: 24,
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
  if (isHoneyData(data[0])) {
    return {
      labels: data.map((entry: any) => {
        const utcDate = new Date(entry.UTCTime * 1000);
        return format(utcDate, "eeee HH:mm");
      }),

      datasets: [
        {
          data: data.map((entry: any) => entry),
          // data: data.map((entry: any) => entry.amount),
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
  }
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

export const HoneyChart = ({
  // hourlySupply,
  hourlyVolume,
  weeklyVolume,
  weeklyFees,
  weeklyVolumeTotal,
  weeklyFeesTotal,
  monthlyVolume,
  monthlyFees,
  monthlyVolumeTotal,
  monthlyFeesTotal,
  quarterlyVolume,
  quarterlyFees,
  quarterlyVolumeTotal,
  quarterlyFeesTotal,
  arcade,
}: IHoneyChart) => {
  const [total, setTotal] = useState(weeklyVolumeTotal);
  const [difference, setDifference] = useState(0);
  const [timeFrame, setTimeFrame] = useState(TimeFrame.HOURLY);
  const [chart, setChart] = useState(Chart.VOLUME);
  const [data, setData] = useState(getData(hourlyVolume, timeFrame, chart));

  useEffect(() => {
    if (timeFrame === TimeFrame.HOURLY) {
      if (chart === Chart.VOLUME) {
        setData(getData(hourlyVolume, timeFrame, chart));
        setDifference(calculatePercentageDifference(hourlyVolume));
        setTotal(
          hourlyVolume.reduce(
            (a, b) => a + b,

            0,
          ),
        );
      }
      if (chart === Chart.FEES) {
        setData(getData(weeklyFees, timeFrame, chart));
        setDifference(calculatePercentageDifference(weeklyFees));
        setTotal(weeklyFeesTotal);
      }
    }
    if (timeFrame === TimeFrame.WEEKLY) {
      if (chart === Chart.VOLUME) {
        setData(getData(weeklyVolume, timeFrame, chart));
        setDifference(calculatePercentageDifference(weeklyVolume));
        setTotal(weeklyVolumeTotal);
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
      if (chart === Chart.FEES) {
        setData(getData(quarterlyFees, timeFrame, chart));
        setDifference(calculatePercentageDifference(quarterlyFees));
        setTotal(quarterlyFeesTotal);
      }
    }
  }, [timeFrame, chart]);

  return (
    <Card
      className={cn(
        "border-2 p-0",
        arcade
          ? "border-dashed border-blue-500"
          : "border-border bg-background",
      )}
    >
      <Tabs
        defaultValue={Chart.VOLUME}
        onValueChange={(value: string) => setChart(value as Chart)}
      >
        <CardHeader className="flex w-full flex-col items-center justify-start px-6 py-4 sm:flex-row sm:justify-between">
          <div
            className={cn(
              "flex w-full gap-1",
              arcade ? "flex-col items-start" : "flex-row items-center",
            )}
          >
            <div
              className={cn(
                arcade
                  ? "text-2xl font-normal leading-9 text-blue-900"
                  : "text-xl font-semibold leading-7",
              )}
            >
              {formatUsd(total)}
            </div>
            <div
              className={cn(
                "text-xs font-normal leading-none",
                difference >= 0
                  ? "text-success-foreground"
                  : "text-destructive-foreground",
              )}
            >
              {difference.toFixed(2)}%
            </div>
          </div>

          <div className="flex w-full flex-row items-center justify-start gap-2 sm:justify-end">
            <TabsList
              className={cn(
                arcade && "rounded-xl border-2 border-blue-900 bg-blue-100",
              )}
            >
              <TabsTrigger
                value={Chart.VOLUME}
                className={cn(
                  arcade && "text-blue-900 data-[state=active]:bg-blue-900",
                )}
              >
                Volume
              </TabsTrigger>
              <TabsTrigger
                value={Chart.FEES}
                className={cn(
                  arcade && "text-blue-900 data-[state=active]:bg-blue-900",
                )}
              >
                Supply
              </TabsTrigger>
            </TabsList>
            <Select
              onValueChange={(value: string) =>
                setTimeFrame(value as TimeFrame)
              }
            >
              <SelectTrigger
                className={cn(
                  "w-fit justify-start gap-1 rounded-xl",
                  arcade
                    ? "border-2 border-blue-900 bg-blue-100 text-blue-900"
                    : "border border-border bg-muted text-foreground",
                )}
              >
                <SelectValue
                  placeholder={TimeFrame.HOURLY}
                  defaultValue={TimeFrame.HOURLY}
                />
              </SelectTrigger>
              <SelectContent
                className={cn(
                  arcade &&
                    "rounded-xl border-2 border-blue-900 bg-blue-100 text-blue-900",
                )}
              >
                <SelectItem
                  value={TimeFrame.HOURLY}
                  className={cn(
                    "cursor-pointer rounded-xl",
                    arcade
                      ? "hover:text-boue-100 text-blue-900 hover:bg-blue-900 focus:text-blue-100"
                      : "hover:bg-muted hover:text-foreground focus:text-foreground",
                  )}
                >
                  24H
                </SelectItem>
                <SelectItem
                  value={TimeFrame.WEEKLY}
                  className={cn(
                    "cursor-pointer rounded-xl",
                    arcade
                      ? "hover:text-boue-100 text-blue-900 hover:bg-blue-900 focus:text-blue-100"
                      : "hover:bg-muted hover:text-foreground focus:text-foreground",
                  )}
                >
                  7D
                </SelectItem>
                <SelectItem
                  value={TimeFrame.MONTHLY}
                  className={cn(
                    "cursor-pointer rounded-xl",
                    arcade
                      ? "hover:text-boue-100 text-blue-900 hover:bg-blue-900 focus:text-blue-100"
                      : "hover:bg-muted hover:text-foreground focus:text-foreground",
                  )}
                >
                  30D
                </SelectItem>
                <SelectItem
                  value={TimeFrame.QUARTERLY}
                  className={cn(
                    "cursor-pointer rounded-xl",
                    arcade
                      ? "hover:text-boue-100 text-blue-900 hover:bg-blue-900 focus:text-blue-100"
                      : "hover:bg-muted hover:text-foreground focus:text-foreground",
                  )}
                >
                  90D
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="relative min-h-[250px] w-full">
          <BeraChart data={data} options={Options as any} type="bar" />
        </CardContent>
      </Tabs>
    </Card>
  );
};
