"use client";

import React from "react";
import { formatUsd } from "@bera/berajs";
import { Dropdown, Tooltip } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { useTheme } from "next-themes";

import { PNL_TOOLTIP_TEXT, VOLUME_TOOLTIP_TEXT } from "~/utils/tooltip-text";
import { useTradingSummaryChart } from "~/hooks/useTradingSummaryChart";
import type { IMarket } from "~/types/market";
import { TimeFrame } from "~/types/time";
import { Options, chartColor } from "./chat-options";
import { UserGeneralInfo } from "./user-general-info";

const getData = (data: any[], type: string, light: boolean) => {
  return {
    labels: data?.map((sumary: any) =>
      new Date(sumary.time * 1000).toLocaleDateString(),
    ),
    datasets: [
      {
        data:
          type === "Volume"
            ? data?.map((sumary: any) => sumary.volume)
            : data?.map((sumary: any) => sumary.pnl),
        labelColor: false,
        backgroundColor: light
          ? chartColor.default.light
          : chartColor.default.dark,
        borderColor: light ? chartColor.default.light : chartColor.default.dark,
        hoverBackgroundColor: light
          ? chartColor.hover.light
          : chartColor.hover.dark,
        hoverBorderColor: light
          ? chartColor.hover.light
          : chartColor.hover.dark,
        tension: 0.4,
        borderRadius: 100,
        borderSkipped: false,
        maxBarThickness: 12,
      },
    ],
  };
};

export default function Stats({ markets }: { markets: IMarket[] }) {
  const [tabType, setTabType] = React.useState<"Volume" | "PnL">("PnL");
  const [timeFrame, setTimeFrame] = React.useState(TimeFrame.QUARTERLY);

  const { theme } = useTheme();
  const isLight = theme === "light";
  const { useChart, useTotalPnl, useTotalVolume } = useTradingSummaryChart({
    interval: timeFrame,
  });
  const chart = useChart();
  const data = getData(chart, tabType, isLight);
  const totalVolume = useTotalVolume();
  const totalPnl = useTotalPnl();
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <UserGeneralInfo markets={markets} />
      <div className="flex w-full flex-col justify-between rounded-md border border-border bg-muted px-4 py-6">
        <div className="flex w-full flex-col-reverse justify-between sm:flex-row sm:gap-0">
          <div className="my-2 text-xl font-semibold leading-7 sm:my-0">
            {tabType === "Volume"
              ? formatUsd(Number(totalVolume))
              : formatUsd(Number(totalPnl))}
          </div>
          <div className="flex gap-2">
            <Tabs
              defaultValue={tabType}
              onValueChange={(value) => setTabType(value as "Volume" | "PnL")}
              className="w-full sm:w-fit"
            >
              <TabsList className="w-full border sm:w-fit">
                {["Volume", "PnL"].map((status) => (
                  <TabsTrigger
                    value={status}
                    key={status}
                    className="w-full flex-1 capitalize sm:w-fit"
                    onClick={() => setTabType(status as "Volume" | "PnL")}
                  >
                    {status}{" "}
                    <Tooltip
                      text={
                        status === "Volume"
                          ? VOLUME_TOOLTIP_TEXT
                          : PNL_TOOLTIP_TEXT
                      }
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Dropdown
              selected={timeFrame}
              onSelect={(value: string) => setTimeFrame(value as TimeFrame)}
              selectionList={Object.values(TimeFrame)}
              sortby={false}
            />
          </div>
        </div>
        <div className="h-full w-full lg:w-[calc(100%-5px)]">
          <BeraChart data={data} options={Options as any} type={"bar"} />
          <div />
        </div>
      </div>
    </div>
  );
}
