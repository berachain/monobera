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
import { formatEther } from "viem";

import { HoneyTimeFrame, barColors, type HoneyEntry } from "~/app/type";

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
  supply24H: HoneyEntry[];
  volume24H: HoneyEntry[];
  supply7D: HoneyEntry[];
  volume7D: HoneyEntry[];
  supply30D: HoneyEntry[];
  volume30D: HoneyEntry[];
  supply90D: HoneyEntry[];
  volume90D: HoneyEntry[];
  arcade: boolean;
}

enum Chart {
  VOLUME = "volume",
  FEES = "supply",
}

const getData = (data: HoneyEntry[], arcade: boolean) => {
  return {
    labels: data.map((entry: any) => {
      const utcDate = new Date(entry.UTCTime * 1000);
      return [
        format(utcDate, "eeee HH:mm"),
        utcDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      ];
    }),
    datasets: [
      {
        data: data.map((entry: any) =>
          Number(formatEther(BigInt(entry.amount))),
        ),
        labelColor: false,
        backgroundColor: arcade ? barColors.arcade : barColors.pro,
        borderColor: arcade ? barColors.arcade : barColors.pro,
        hoverBackgroundColor: arcade
          ? barColors.arcadeHover
          : barColors.proHover,
        hoverBorderColor: arcade ? barColors.arcadeHover : barColors.proHover,
        tension: 0.4,
        borderRadius: 100,
        borderSkipped: false,
        maxBarThickness: 20,
      },
    ],
  };
};

function calculatePercentageDifference(entries: HoneyEntry[]): number {
  if (entries.length < 2) {
    return 0; // Not enough numbers to calculate the difference
  } else {
    let firstNumberIndex = 0;
    while (
      entries[firstNumberIndex] &&
      Number(formatEther(BigInt(entries[firstNumberIndex]!.amount))) === 0
    ) {
      firstNumberIndex++;
    }

    if (firstNumberIndex >= entries.length) {
      return 0; // All numbers are zero, cannot calculate percentage difference
    }

    const firstNumber = Number(
      formatEther(BigInt(entries[firstNumberIndex]!.amount)),
    );
    const lastNumber = Number(
      formatEther(BigInt(entries[entries.length - 1]!.amount)),
    );

    const difference = lastNumber - firstNumber;
    const percentageDifference = (difference / Math.abs(firstNumber)) * 100;

    return percentageDifference;
  }
}

const getTotalAmount = (data: HoneyEntry[]): number =>
  data.reduce(
    (acc, entry) => acc + Number(formatEther(BigInt(entry.amount))),
    0,
  );

export const HoneyChart = ({
  supply24H,
  volume24H,
  supply7D,
  volume7D,
  supply30D,
  volume30D,
  supply90D,
  volume90D,
  arcade,
}: IHoneyChart) => {
  const DATA = {
    supply24H,
    volume24H,
    supply7D,
    volume7D,
    supply30D,
    volume30D,
    supply90D,
    volume90D,
  };
  console.log("DATA", DATA);
  const [difference, setDifference] = useState(0);
  const [total, setTotal] = useState(getTotalAmount(DATA.volume24H));
  const [timeFrame, setTimeFrame] = useState(HoneyTimeFrame.HOURLY);
  const [chart, setChart] = useState(Chart.VOLUME);
  const [data, setData] = useState(getData(DATA.volume24H, arcade));

  useEffect(() => {
    setData(getData(DATA[`${chart}${timeFrame}`], arcade));
    setDifference(calculatePercentageDifference(DATA[`${chart}${timeFrame}`]));
    setTotal(getTotalAmount(DATA[`${chart}${timeFrame}`]));
  }, [timeFrame, chart, arcade]);

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
                setTimeFrame(value as HoneyTimeFrame)
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
                  placeholder={HoneyTimeFrame.HOURLY}
                  defaultValue={HoneyTimeFrame.HOURLY}
                />
              </SelectTrigger>
              <SelectContent
                className={cn(
                  arcade &&
                    "rounded-xl border-2 border-blue-900 bg-blue-100 text-blue-900",
                )}
              >
                <SelectItem
                  value={HoneyTimeFrame.HOURLY}
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
                  value={HoneyTimeFrame.WEEKLY}
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
                  value={HoneyTimeFrame.MONTHLY}
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
                  value={HoneyTimeFrame.QUARTERLY}
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
