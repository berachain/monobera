"use client";

import React, { useRef, useState } from "react";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  type ActiveElement,
} from "chart.js";
import { Chart, type ChartProps } from "react-chartjs-2";

export function BeraChart({
  data,
  type,
  options,
  showDataOnHover,
}: ChartProps & { showDataOnHover?: boolean }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
  );
  if (type === "bar") {
    ChartJS.register(BarElement);
  }
  if (type === "line") {
    ChartJS.register(LineElement);
  }
  if (type === "pie" || type === "doughnut") {
    ChartJS.register(ArcElement, DoughnutController);
  }
  const [dataPoint, setDataPoint] = useState<number>(0);
  const chartRef = useRef<ChartJS>(null);
  return (
    <>
      {showDataOnHover && (
        <div className="">
          <p>{dataPoint}</p>
        </div>
      )}
      <Chart
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
