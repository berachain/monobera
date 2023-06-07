"use client";

import React from "react";
import { type ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

export interface IBoardItem {
  weight: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  detail: any | undefined;
}

type Props = {
  items: IBoardItem[];
};

const CuttingBoardPieChart = ({ items }: Props) => {
  const isSelected = items.some((item) => item.detail !== undefined);
  const options: ApexOptions = {
    labels: isSelected
      ? items
          .filter((item: IBoardItem) => item.detail !== undefined)
          .map((item: IBoardItem) => item?.detail?.symbol ?? "")
      : ["no token selected"],
    series: isSelected
      ? items
          .filter((item: IBoardItem) => item.detail !== undefined)
          .map((item: IBoardItem) => item?.weight ?? 0)
      : [100],
    colors: isSelected ? undefined : ["#756661"],
    legend: {
      show: isSelected ? true : false,
      position: "bottom",
      labels: {
        colors: "inherit",
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: false,
    },
    states: {
      active: {
        filter: {
          type: "lighten",
          value: 0.15,
        },
      },
      hover: {
        filter: {
          type: "lighten",
          value: 0.15,
        },
      },
    },
    stroke: {
      show: false,
    },
  };

  return (
    <Chart
      options={options}
      series={options.series}
      type="pie"
      height={350}
      width={350}
    />
  );
};

export default CuttingBoardPieChart;
