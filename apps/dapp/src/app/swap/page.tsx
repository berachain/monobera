"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@bera/ui/card";

import { generateDataForPast24Hours } from "~/utils/generateDataForPast24Hours";
import { SwapCard } from "~/components/swap-card";
import { tokens, type Token } from "~/assets/tokens";

export const runtime = "edge";

const DynamicChart = dynamic(() => import("~/components/chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Swap() {
  const bera = tokens.find((token) => token.name === "Bera") as Token;
  const honey = tokens.find((token) => token.name === "Honey") as Token;
  const [selectedFrom, setSelectedFrom] = useState(honey);
  const [selectedTo, setSelectedTo] = useState(bera);
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
            <DynamicChart
              chartData={generateDataForPast24Hours()}
              pool={"DAI/ETH"}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
