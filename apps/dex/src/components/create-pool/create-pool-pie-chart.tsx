"use client";

import React from "react";
import { BeraChart } from "@bera/ui/bera-chart";
import { Card, CardContent } from "@bera/ui/card";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  tokenWeights: ITokenWeight[];
};

// Pick
const tokenSplitColors = [
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

const CreatePoolPieChart = ({ tokenWeights }: Props) => {
  const isSelected = tokenWeights.some(
    (tokenWeight) => tokenWeight.token !== undefined,
  );
  const selectedLabels = isSelected
    ? tokenWeights
        .filter((tokenWeight: ITokenWeight) => tokenWeight.token !== undefined)
        .map((tokenWeight: ITokenWeight) => tokenWeight?.token?.symbol ?? "")
    : ["no token selected"];

  const selectedTokenWeights = isSelected
    ? tokenWeights
        .filter((tokenWeight: ITokenWeight) => tokenWeight.token !== undefined)
        .map((tokenWeight: ITokenWeight) => tokenWeight?.weight ?? 0)
    : [100];

  const selectedTokenColors = isSelected
    ? tokenWeights
        .filter((tokenWeight: ITokenWeight) => tokenWeight.token !== undefined)
        .map((_tokenWeight: ITokenWeight, index) => tokenSplitColors[index])
    : ["#756661"];

  const data = {
    labels: selectedLabels,
    datasets: [
      {
        data: selectedTokenWeights,
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

  return (
    <Card className="flex justify-center md:h-fit md:w-fit">
      <CardContent className="p-4">
        <BeraChart type="doughnut" options={options} data={data} />
      </CardContent>
    </Card>
  );
};

export default CreatePoolPieChart;
