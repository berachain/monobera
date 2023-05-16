"use client";

import { Card, CardContent } from "@bera/ui/card";
import dynamic from "next/dynamic";
import { useState } from "react";
import { type Token, tokens } from "~/assets/tokens";
import { SwapCard } from "~/components/swap-card";

const generateDataForPast24Hours = () => {
  // Generate data for the past 24 hours
  const timeIntervals = 24; // Number of data points

  const data = [];
  for (let i = timeIntervals - 1; i >= 0; i--) {
    const value = Math.floor(Math.random() * 100); // Random value for demonstration
    data.push(value);
  }

  return {
    name: "Price",
    data: data,
  };
};

export const tempPriceData = generateDataForPast24Hours();

export const runtime = "edge";

const DynamicChart = dynamic(() => import("~/components/chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Swap() {
  const bera = tokens.find((token) => token.name === "Bera") as Token;
  const honey = tokens.find((token) => token.name === "Honey") as Token;
  const [selectedFrom, setSelectedFrom] = useState(bera);
  const [selectedTo, setSelectedTo] = useState(honey);
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
      <div className="col-span-1"></div>
      <div className="col-span-3">
        <SwapCard
          selectedFrom={selectedFrom}
          setSelectedFrom={setSelectedFrom}
          selectedTo={selectedTo}
          setSelectedTo={setSelectedTo}
        />
      </div>
      <div className="col-span-2">
        <Card>
          <CardContent className="p-4">
            <DynamicChart chartData={tempPriceData} pool={"DAI/ETH"} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
