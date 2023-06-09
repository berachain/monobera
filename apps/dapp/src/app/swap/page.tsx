"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { getTokens, usePollAssetWalletBalance, type Token } from "@bera/berajs";
import { Card, CardContent } from "@bera/ui/card";

import { generateDataForPast24Hours } from "~/utils/generateData";
import { SwapCard } from "~/components/swap-card";

const DynamicChart = dynamic(() => import("~/components/chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Swap() {
  const tokens = getTokens();
  usePollAssetWalletBalance();
  const bera = tokens?.find((token) => token.symbol === "TK") as Token;
  const honey = tokens?.find((token) => token.symbol === "TK") as Token;
  const [selectedFrom, setSelectedFrom] = useState(honey);
  const [selectedTo, setSelectedTo] = useState(bera);

  return (
    <div className="grid grid-cols-8 gap-5">
      <div className="max-xl:hidden xl:col-span-2"></div>
      <div className="col-span-8 lg:col-span-5 xl:col-span-4">
        <SwapCard
          selectedFrom={selectedFrom}
          setSelectedFrom={setSelectedFrom}
          selectedTo={selectedTo}
          setSelectedTo={setSelectedTo}
        />
      </div>
      <div className="col-span-8 lg:col-span-3 xl:col-span-2">
        <Card>
          <CardContent className="p-4">
            <DynamicChart
              chartData={generateDataForPast24Hours()}
              pool={`${selectedFrom?.symbol}/${selectedTo?.symbol}`}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
