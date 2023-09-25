"use client";

import React from "react";
import { Dropdown, Tooltip } from "@bera/shared-ui";
import { BeraChart } from "@bera/ui/bera-chart";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { Options, chartColor } from "./components/chat-options";
import { UserGeneralInfo } from "./components/user-general-info";

const getData = (data: any[], light: boolean) => {
  const mockData = [
    6, 5, 4, 2, 1, 0.5, 1, 0.5, 2, 5, 4, 6, 6, 5, 4, 2, 1, 0.5, 1, 0.5, 2, 5, 4,
    6, 6, 5, 4, 2, 1, 0.5, 1, 0.5, 2, 5, 4, 6,
  ];
  return {
    labels: mockData.map((_: any) => ["text"]),
    datasets: [
      {
        data: mockData,
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

enum TimeFrame {
  WEEKLY = "7d",
  MONTHLY = "30d",
  QUARTERLY = "90d",
}

export default function Portfolio() {
  const data = getData([], true);
  const [tabType, setTabType] = React.useState<"Volume" | "PnL">("Volume");
  const [timeFrame, setTimeFrame] = React.useState(TimeFrame.QUARTERLY);
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <UserGeneralInfo />
      <div className="flex w-full flex-col justify-between rounded-xl border border-border bg-muted px-4 py-6">
        <div className="flex w-full flex-col-reverse justify-between gap-9 sm:flex-row sm:gap-0">
          <div className="text-xl font-semibold leading-7">
            $6.9M
            <span className="ml-1 text-sm leading-tight text-success-foreground">
              4.38%
            </span>
          </div>
          <div className="flex gap-2">
            <Tabs
              defaultValue={tabType}
              onValueChange={(value) => setTabType(value as "Volume" | "PnL")}
              className="w-full sm:w-fit"
            >
              <TabsList className="w-full sm:w-fit">
                {["Volume", "PnL"].map((status) => (
                  <TabsTrigger
                    value={status}
                    key={status}
                    className="w-full flex-1 capitalize sm:w-fit"
                    onClick={() => setTabType(status as "Volume" | "PnL")}
                  >
                    {status} <Tooltip text="tooltip text" />
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
        <div className="relative h-[200px] w-full">
          <BeraChart data={data} options={Options as any} type={"bar"} />
        </div>
      </div>
    </div>
  );
}
