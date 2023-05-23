import React from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@bera/ui/card";

import { generateDataForPast90Days } from "~/utils/generateData";

const DynamicChart = dynamic(() => import("~/components/chart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function PoolPage({ params }: { params: { poolId: string } }) {
  return (
    <div className="m-auto flex w-full flex-col gap-5">
      <h1 className="text-left text-2xl font-semibold">{params.poolId}</h1>
      <Card>
        <CardContent className="p-4">
          <DynamicChart chartData={generateDataForPast90Days()} type="bar" />
        </CardContent>
      </Card>
    </div>
  );
}
