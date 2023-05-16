"use client";

import { type ApexOptions } from "apexcharts";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import Chart from "react-apexcharts";

const generateTimestampsForPast24Hours = () => {
  const timestamps = [];
  const currentTime = new Date();

  for (let i = 23; i >= 0; i--) {
    const timestamp = new Date(currentTime);
    timestamp.setMinutes(0, 0, 0); // Reset minutes, seconds, and milliseconds to 0
    timestamp.setHours(timestamp.getHours() - i); // Subtract i hours to get the previous rounded hour
    const year = timestamp.getFullYear();
    const month = String(timestamp.getMonth() + 1).padStart(2, "0");
    const day = String(timestamp.getDate()).padStart(2, "0");
    const hours = String(timestamp.getHours()).padStart(2, "0");
    const minutes = String(timestamp.getMinutes()).padStart(2, "0");

    const formattedTimestamp = `${year}/${month}/${day} ${hours}:${minutes}`;
    timestamps.push(formattedTimestamp);
  }

  return timestamps;
};

interface ChartData {
  name: string;
  data: number[];
}

interface LineChartProps {
  chartData: ChartData;
  pool: string;
}

const LineChart: React.FC<LineChartProps> = ({ chartData, pool }) => {
  const { theme } = useTheme();
  const [selectedXIndex, setSelectedXIndex] = useState<number>(23);
  const handleDataPointHover = (event: any, chartContext: any, config: any) => {
    const selectedXIndex: number = config.dataPointIndex as number;
    setSelectedXIndex(selectedXIndex);
  };

  const options: ApexOptions = {
    chart: {
      animations: {
        enabled: false,
      },
      events: {
        mouseMove: handleDataPointHover,
        mouseLeave: function () {
          setSelectedXIndex(23);
        },
      },
      background: "transparent",
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
    },
    labels: generateTimestampsForPast24Hours(),
    stroke: {
      curve: "smooth",
      colors: ["#4bde80"],
      width: 2,
    },
    yaxis: {
      show: false,
    },
    colors: ["#4bde80"],
    grid: {
      padding: {
        top: 10,
        right: 5,
        bottom: 10,
        left: 5,
      },
    },
    theme: {
      mode: theme === "dark" ? "dark" : "light",
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: true,
      },
      y: {
        title: {
          formatter() {
            return `${pool}: `;
          },
        },
      },
      marker: {
        show: true,
      },
    },
  };
  return (
    <>
      <h4 className="font-medium leading-none flex gap-1 align-middle">
        {pool}
      </h4>
      <h4 className="font-medium leading-none flex gap-1 align-middle">
        {(
          chartData?.data[selectedXIndex] || chartData?.data[23]
        )?.toLocaleString()}
      </h4>
      <Chart
        options={options}
        series={[chartData]}
        type="line"
        height={75}
        width={250}
      />
    </>
  );
};

export default LineChart;
