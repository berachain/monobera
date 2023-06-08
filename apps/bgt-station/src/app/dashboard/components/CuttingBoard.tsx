import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@bera/ui/card";

const DynamicChart = dynamic(() => import("~/components/cutting-board-chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export const items = [
  {
    weight: 10,
    detail: {
      symbol: "ETH",
    },
  },
  {
    weight: 20,
    detail: {
      symbol: "BTC",
    },
  },
  {
    weight: 30,
    detail: {
      symbol: "USDT",
    },
  },
  {
    weight: 40,
    detail: {
      symbol: "USDC",
    },
  },
];

export function CuttingBoard() {
  return (
    <Card>
      <CardHeader>
        <h3>Average weight</h3>
      </CardHeader>
      <CardContent className="flex justify-center">
        <DynamicChart items={items} />
      </CardContent>
    </Card>
  );
}
