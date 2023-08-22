import React from "react";
import {
  usePollActiveValidators,
  usePollBgtSupply,
  usePollTotalSupply,
} from "@bera/berajs";
import { Card } from "@bera/ui/card";

import { SemiCircleProgress } from "./circle-stat";

export function Stats() {
  const { usePercentOfStakedBGT } = usePollActiveValidators();
  const percentOfStakedBGT = usePercentOfStakedBGT();

  const { useBgtSupply } = usePollBgtSupply();
  const bgtSupply = useBgtSupply();
  const { useTotalSupply } = usePollTotalSupply("abera");
  const beraSupply = useTotalSupply();
  const beraToBgtRatio = (beraSupply / bgtSupply) * 100;
  return (
    <Card className="px-4 py-8 sm:px-16">
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <SemiCircleProgress
          percentage={80}
          size={{
            width: 200,
            height: 200,
          }}
          strokeWidth={10}
          hasBackground={true}
          strokeColor="#FBBF24"
          label="avg validator uptime"
        />

        <SemiCircleProgress
          percentage={percentOfStakedBGT}
          size={{
            width: 200,
            height: 200,
          }}
          strokeWidth={10}
          hasBackground={true}
          strokeColor="#FBBF24"
          label="of BGT staked"
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
          label="BERA to BGT ratio"
        />
      </div>
    </Card>
  );
}
