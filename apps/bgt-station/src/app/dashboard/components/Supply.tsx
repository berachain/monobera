import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@bera/ui/card";

const DynamicChart = dynamic(() => import("~/components/chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export const generateDataForPast24Hours = () => {
  const timeIntervals = 24; // Number of data points
  const data = [];

  let value = Math.floor(Math.random() * 100); // Initial random value
  data.push(value);

  for (let i = 1; i < timeIntervals; i++) {
    const increment = Math.random() * 30; // Random increment between 0 and 30
    value += increment;
    data.push(Math.floor(value));
  }

  return {
    name: "Price",
    data: data,
  };
};

export function Supply() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-md font-semibold text-backgroundSecondary">
          BGT Supply
        </h3>
      </CardHeader>
      <CardContent>
        <DynamicChart
          chartData={generateDataForPast24Hours()}
          pool={`BGT`}
          showXAxis
          showHeader={false}
          height={200}
        />
      </CardContent>
    </Card>
  );
}
