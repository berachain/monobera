"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GetFirstHoneyTxnDate,
  GetSupplyDay,
  GetVolumeDay,
} from "@bera/graphql";
import { FormattedNumber, Spinner } from "@bera/shared-ui";
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

import { getTime } from "~/utils/getTime";
import { fillSupplyDataByDay, fillVolumeDataByDay } from "~/utils/graph-utils";
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
      borderRadius: 18,
      caretSize: 0,

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

enum Chart {
  VOLUME = "volume",
  FEES = "supply",
}

const getData = (data: HoneyEntry[], arcade: boolean) => {
  return {
    labels: data.map((entry: any) => {
      const utcDate = new Date(entry.timestamp * 1000);
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
        data: data.map((entry: any) => Number(entry.amount)),
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
        minBarLength: 2,
      },
    ],
  };
};

function calculatePercentageDifference(entries: HoneyEntry[]): number {
  if (entries.length < 2) {
    return 0; // Not enough numbers to calculate the difference
  }
  let firstNumberIndex = 0;
  while (
    entries[firstNumberIndex] &&
    Number(entries[firstNumberIndex]!.amount) === 0
  ) {
    firstNumberIndex++;
  }

  if (firstNumberIndex >= entries.length) {
    return 0; // All numbers are zero, cannot calculate percentage difference
  }

  const firstNumber = Number(entries[firstNumberIndex]!.amount);
  const lastNumber = Number(entries[entries.length - 1]!.amount);

  const difference = lastNumber - firstNumber;
  const percentageDifference = difference / Math.abs(firstNumber);

  return percentageDifference;
}

export const HoneyChart = ({ arcade = false }: { arcade?: boolean }) => {
  const [timeFrame, setTimeFrame] = useState(HoneyTimeFrame.WEEKLY);
  const calculatedTimestamp = useMemo(() => getTime(timeFrame), [timeFrame]);
  const [chart, setChart] = useState<Chart.VOLUME | Chart.FEES>(Chart.VOLUME);
  const {
    data: graphdata,
    loading,
    error,
  } = useQuery(chart === Chart.VOLUME ? GetVolumeDay : GetSupplyDay, {
    variables: { timestamp_gt: calculatedTimestamp },
  });

  const { data: FirstTxnData } = useQuery(GetFirstHoneyTxnDate);
  const firstDateTimeStamp = Number(FirstTxnData?.honeyTxns[0]?.timestamp) ?? 0;
  const startingTimeStamp = getTime(timeFrame);
  const data =
    chart === Chart.VOLUME
      ? fillVolumeDataByDay(
          graphdata?.honeyVolumeDayDatas ?? [],
          firstDateTimeStamp > startingTimeStamp
            ? firstDateTimeStamp
            : startingTimeStamp,
        )
      : fillSupplyDataByDay(
          graphdata?.honeySupplyDayDatas ?? [],
          firstDateTimeStamp > startingTimeStamp
            ? firstDateTimeStamp
            : startingTimeStamp,
        );

  const chartData = getData(data, arcade);
  const total = data[data.length - 1]?.amount ?? 0;
  const difference = calculatePercentageDifference(data);

  return (
    <section>
      <Card
        className={cn(
          "border-2 p-0",
          arcade
            ? "border-dashed border-foregroundSecondary"
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
                    ? "text-2xl font-normal leading-9 text-foregroundSecondary"
                    : "text-xl font-semibold leading-7",
                )}
              >
                <FormattedNumber value={total} symbol="USD" compact={false} />
              </div>
              <FormattedNumber
                value={difference}
                percent
                compact={false}
                colored
                className="text-xs font-normal leading-none"
              />
            </div>

            <div className="flex w-full flex-row items-center justify-start gap-2 sm:justify-end">
              <TabsList
                className={cn(
                  arcade &&
                    "rounded-md border-2 border-foregroundSecondary bg-blue-100",
                )}
              >
                <TabsTrigger
                  value={Chart.VOLUME}
                  className={cn(
                    arcade &&
                      "text-foregroundSecondary data-[state=active]:bg-foregroundSecondary",
                  )}
                >
                  Volume
                </TabsTrigger>
                <TabsTrigger
                  value={Chart.FEES}
                  className={cn(
                    arcade &&
                      "text-foregroundSecondary data-[state=active]:bg-foregroundSecondary",
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
                    "w-fit justify-start gap-1 rounded-md",
                    arcade
                      ? "border-2 border-foregroundSecondary bg-blue-100 text-foregroundSecondary"
                      : "border border-border bg-muted text-foreground",
                  )}
                >
                  <SelectValue
                    placeholder={HoneyTimeFrame.WEEKLY}
                    defaultValue={HoneyTimeFrame.WEEKLY}
                  />
                </SelectTrigger>
                <SelectContent
                  className={cn(
                    arcade &&
                      "rounded-md border-2 border-blue-900 bg-blue-100 text-blue-900",
                  )}
                >
                  <SelectItem
                    value={HoneyTimeFrame.WEEKLY}
                    className={cn(
                      "cursor-pointer rounded-md",
                      arcade
                        ? "hover:text-boue-100 text-blue-900 hover:bg-blue-900 hover:text-blue-100"
                        : "hover:bg-muted hover:text-foreground focus:text-foreground",
                    )}
                  >
                    7D
                  </SelectItem>
                  <SelectItem
                    value={HoneyTimeFrame.MONTHLY}
                    className={cn(
                      "cursor-pointer rounded-md",
                      arcade
                        ? "hover:text-boue-100 text-blue-900 hover:bg-blue-900 hover:text-blue-100"
                        : "hover:bg-muted hover:text-foreground focus:text-foreground",
                    )}
                  >
                    30D
                  </SelectItem>
                  <SelectItem
                    value={HoneyTimeFrame.QUARTERLY}
                    className={cn(
                      "cursor-pointer rounded-md",
                      arcade
                        ? "hover:text-boue-100 text-blue-900 hover:bg-blue-900 hover:text-blue-100"
                        : "hover:bg-muted hover:text-foreground focus:text-foreground",
                    )}
                  >
                    90D
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="relative flex h-full min-h-[250px] w-full items-center justify-center">
            {loading || error ? (
              <Spinner />
            ) : (
              <BeraChart
                data={chartData}
                options={Options as any}
                type={chart === Chart.VOLUME ? "bar" : "line"}
              />
            )}
          </CardContent>
        </Tabs>
      </Card>
    </section>
  );
};
