"use client";

import React from "react";
import { Card, CardContent } from "@bera/ui/card";
import { type ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  tokenWeights: ITokenWeight[];
};

const CreatePoolPieChart = ({ tokenWeights }: Props) => {
  const isSelected = tokenWeights.some(
    (tokenWeight) => tokenWeight.token !== undefined,
  );
  const options: ApexOptions = {
    labels: isSelected
      ? tokenWeights
          .filter(
            (tokenWeight: ITokenWeight) => tokenWeight.token !== undefined,
          )
          .map((tokenWeight: ITokenWeight) => tokenWeight?.token?.symbol ?? "")
      : ["no token selected"],
    series: isSelected
      ? tokenWeights
          .filter(
            (tokenWeight: ITokenWeight) => tokenWeight.token !== undefined,
          )
          .map((tokenWeight: ITokenWeight) => tokenWeight?.weight ?? 0)
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
    <Card className="flex h-fit max-w-[250px] justify-center">
      <CardContent className="p-2">
        <Chart
          options={options}
          series={options.series}
          type="donut"
          height={250}
          width={250}
        />
      </CardContent>
    </Card>
  );
};

export default CreatePoolPieChart;
