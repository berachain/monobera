"use client";

import React, { useState } from "react";
import { type ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface Props {
  value1: number;
  value2: number;
}

const PercentageDifference: React.FC<Props> = ({ value1, value2 }) => {
  const percentageDiff = ((value1 - value2) / value2) * 100;
  const isNegative = percentageDiff < 0;
  const textColor = isNegative ? "text-red-500" : "text-green-500";

  return (
    <div className="flex items-center">
      <div className="mt-1">
        <span className={`text-sm ${textColor}`}>
          {!isNegative && "+"}
          {percentageDiff.toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

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
  pool?: string;
  type?: "line" | "bar";
  showYAxis?: boolean;
  showXAxis?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  chartData,
  pool,
  type = "line",
  showYAxis = false,
}) => {
  const [selectedXIndex, setSelectedXIndex] = useState<number>(23);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDataPointHover = (event: any, chartContext: any, config: any) => {
    const selectedXIndex: number = config.dataPointIndex as number;
    if (selectedXIndex === -1) {
      setSelectedXIndex(23);
      return;
    }
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
      show: showYAxis,
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
      mode: "light",
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
      {pool && (
        <h4 className="flex gap-1 align-middle font-medium leading-none">
          {pool}
        </h4>
      )}
      <h4 className="mt-1 flex gap-1 align-middle text-2xl font-medium leading-none text-muted-foreground">
        {(
          chartData?.data[selectedXIndex] || chartData?.data[23]
        )?.toLocaleString()}
      </h4>
      {selectedXIndex !== 23 && (
        <PercentageDifference
          value1={chartData.data[23] || 1}
          value2={chartData.data[selectedXIndex] || 1}
        />
      )}
      {selectedXIndex === 23 && (
        <PercentageDifference
          value1={chartData.data[23] || 1}
          value2={chartData.data[0] || 1}
        />
      )}
      <Chart
        options={options}
        series={[chartData]}
        type={type}
        height={type === "line" ? 100 : 385}
      />
    </>
  );
};

export default LineChart;
