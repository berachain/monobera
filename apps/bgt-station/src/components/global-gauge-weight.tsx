import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@bera/ui/avatar";
import { BeraChart } from "@bera/ui/bera-chart";
import { Checkbox } from "@bera/ui/checkbox";

import { getColors } from "~/utils/colors";
import { global_gauge_weight_columns } from "~/columns/global-gauge-weight";
import RT from "./react-table";

const options = {
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
      backgroundColor: "#FAFAF9",
      borderColor: "#E7E5E4",
      borderRadius: 18,
      borderWidth: 1,
      padding: {
        top: 8,
        right: 8,
        bottom: 0,
        left: 8,
      },
      caretSize: 0,
      titleFontSize: 12,
      titleColor: "#78716C",
      bodyColor: "#78716C",
      callbacks: {
        label: function (context: {
          dataset: { label: string };
          parsed: { y: number | bigint | null };
        }) {
          return context.dataset.label || "";
        },
      },
    },
  },
};

export default function GlobalGaugeWeight() {
  const mockData = [
    { label: "ETH-10/BERA-20", amount: 12 },
    { label: "BTC-10/BERA-20", amount: 19 },
    { label: "USDC-10/BERA-20", amount: 3 },
    { label: "USDT-10/BERA-20", amount: 5 },
    { label: "ATOM-10/BERA-20", amount: 2 },
  ];

  const dataT = React.useMemo(() => {
    return mockData.map((data, index: number) => ({
      poolOrAddress: (
        <div className="flex h-full w-[150px] items-center gap-1">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{data.label}</AvatarFallback>
          </Avatar>
          {data.label}
        </div>
      ),
      bgtIncentive: (
        <div className="flex h-full w-[100px] items-center">69.12K (6.9%)</div>
      ),
      tvl: <div className="flex h-full w-[53px] items-center">69.42M%</div>,
      hide: (
        <div className="flex w-[27px] justify-center">
          {" "}
          <Checkbox id={`dashboard-checkbox-${index}`} className="mx-auto" />
        </div>
      ),
    }));
  }, [mockData]);

  const pieData = React.useMemo(() => {
    return mockData.map((data) => {
      return data;
    });
  }, [mockData]);

  const dataP = {
    labels: pieData.map((d) => d.label),
    datasets: [
      {
        data: pieData.map((d) => d.amount),
        backgroundColor: getColors(pieData.length),
        borderColor: getColors(pieData.length),
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-16 md:flex-row ">
      <div className="flex w-[350px] items-center justify-center">
        <BeraChart data={dataP} options={options as any} type="pie" />
      </div>
      <div className="w-full">
        <RT
          columns={global_gauge_weight_columns}
          data={dataT}
          className="min-w-[490px]"
        />
      </div>
    </div>
  );
}
