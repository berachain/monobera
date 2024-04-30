import React from "react";
import dynamic from "next/dynamic";
import { Card } from "@bera/ui/card";
import { Skeleton } from "@bera/ui/skeleton";

const SemiCircleProgress = dynamic(
  () => import("./circle-stat").then((mod) => mod.SemiCircleProgress),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[200px] w-[200px]" />,
  },
);

export function Stats() {
  const percentOfStakedBGT = 0;

  const beraToBgtRatio = 0.1;
  return (
    <Card className="px-4 py-8 sm:px-16">
      <div className="flex flex-col items-center justify-around sm:flex-row">
        {/* <SemiCircleProgress
          percentage={Number(avgValidatorUptime)}
          size={{
            width: 200,
            height: 200,
          }}
          strokeWidth={10}
          hasBackground={true}
          strokeColor="#FBBF24"
          label="Avg Validator Uptime"
        /> */}

        <SemiCircleProgress
          percentage={percentOfStakedBGT}
          size={{
            width: 200,
            height: 200,
          }}
          strokeWidth={10}
          hasBackground={true}
          strokeColor="#FBBF24"
          label="% of BGT Staked"
        />
        <SemiCircleProgress
          percentage={Number.isNaN(beraToBgtRatio) ? 0 : beraToBgtRatio}
          size={{
            width: 200,
            height: 200,
          }}
          strokeWidth={10}
          hasBackground={true}
          strokeColor="#FBBF24"
          label="BERA to BGT Ratio"
        />
      </div>
    </Card>
  );
}
