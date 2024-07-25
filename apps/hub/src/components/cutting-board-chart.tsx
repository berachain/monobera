"use client";

import React from "react";
import { BeraChart } from "@bera/ui/bera-chart";

export interface IBoardItem {
  weight: number;
  detail: any | undefined;
}

const allocationColors = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
];

type Props = {
  items: IBoardItem[];
};

const CuttingBoardPieChart = ({ items }: Props) => {
  const isSelected = items.some((item) => item.detail !== undefined);
  const selectedLabels = isSelected
    ? items
        .filter((item: IBoardItem) => item.detail !== undefined)
        .map((item: IBoardItem) => item?.detail?.symbol ?? "")
    : ["no token selected"];

  const selectedAllocations = isSelected
    ? items
        .filter((item: IBoardItem) => item.detail !== undefined)
        .map((item: IBoardItem) => item?.weight ?? 0)
    : [100];

  const selectedTokenColors = isSelected
    ? items
        .filter((item: IBoardItem) => item.detail !== undefined)
        .map((_item: IBoardItem, index) => allocationColors[index])
    : ["#756661"];

  const data = {
    labels: selectedLabels,
    datasets: [
      {
        data: selectedAllocations,
        backgroundColor: selectedTokenColors,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
      title: {
        display: false,
      },
    },
  };

  return <BeraChart options={options} data={data} type="pie" />;
};

export default CuttingBoardPieChart;
