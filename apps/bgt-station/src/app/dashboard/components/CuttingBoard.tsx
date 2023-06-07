import React from "react";
import { Card, CardContent, CardHeader } from "@bera/ui/card";

import CuttingBoardPieChart from "~/components/cutting-board-chart";

const items = [
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
        <CuttingBoardPieChart items={items} />
      </CardContent>
    </Card>
  );
}
