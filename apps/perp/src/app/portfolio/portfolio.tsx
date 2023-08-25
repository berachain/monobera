"use client";

import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";

import LineChart from "~/components/line-chart";
import UserAssets from "./userAssets";

export default function Portfolio() {
  const portfolio = {
    total_amount: 4206.9,
    p_and_l: -26.71,
    data: [
      {
        subtitle: "Current PnL",
        amount: formatUsd(6942069.01),
      },
      {
        subtitle: "30 Day Vol.",
        amount: formatUsd(6942069.01),
      },
      {
        subtitle: "Open Positions",
        amount: 69,
      },
      {
        subtitle: "Open Orders",
        amount: 11,
      },
    ],
  };
  return (
    <div>
      <div className="flex justify-between rounded-2xl border border-border p-6">
        <div className="flex flex-col justify-end">
          <div>
            <div className="text-3xl font-semibold leading-9 text-foreground">
              {formatUsd(portfolio.total_amount)}
            </div>
            <div
              className={cn(
                "text-base font-medium leading-normal",
                portfolio.p_and_l < 0
                  ? "text-destructive-foreground"
                  : "text-success-foreground",
              )}
            >
              {formatUsd(portfolio.p_and_l)} (
              {(portfolio.p_and_l / portfolio.total_amount).toFixed(2)})%
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-6">
            {portfolio.data.map((item, index) => (
              <div key={index}>
                <div className="text-sm font-normal leading-tight text-muted-foreground">
                  {item.subtitle}
                </div>
                <div className="text-base font-medium leading-normal text-success-foreground">
                  {item.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full max-w-[800px]">
          <LineChart
            labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
            data={[
              {
                data: [-60, -20, -60, 60, 0, 20, -20],
                title: "Supply APR",
                color: "#059669",
              },
            ]}
          />
        </div>
      </div>
      <UserAssets />
    </div>
  );
}
