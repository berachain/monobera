"use client";

import React, { useRef, useState } from "react";
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  Title,
  Tooltip,
  type ActiveElement,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { Chart, type ChartProps } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  DoughnutController,
  PieController,
  LineController,
  BarController,
  annotationPlugin,
);

export function BeraChart({
  data,
  type,
  options,
  showDataOnHover,
  ...props
}: ChartProps & { showDataOnHover?: boolean }) {
  const [dataPoint, setDataPoint] = useState<number>(0);
  const chartRef = useRef<ChartJS>(null);
  return (
    <>
      {showDataOnHover && (
        <div className="">
          <p>{dataPoint} testing</p>
        </div>
      )}
      <Chart
        {...props}
        ref={chartRef}
        options={{
          ...options,
          onHover(_event, elements, _chart) {
            if (showDataOnHover) {
              if (elements.length) {
                const { index } = elements[0] as ActiveElement;
                const dataSet = data.datasets[0];
                if (dataSet) {
                  const dataPoint = dataSet.data[index];
                  if (typeof dataPoint === "number") {
                    setDataPoint(dataPoint);
                  }
                }
              }
            }
          },
        }}
        data={data}
        type={type}
      />
    </>
  );
}
