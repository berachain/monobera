"use client";

import { useEffect, useState } from "react";
import { usePollAllowances, type Token } from "@bera/berajs";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

const useCreatePool = (tokenWeights: ITokenWeight[]) => {
  const [needsApproval, setNeedsApproval] = useState<Token[]>([]);
  const tokens: Token[] = tokenWeights
    .filter((tokenWeight: ITokenWeight) => tokenWeight.token !== undefined)
    .map((tokenWeight) => tokenWeight.token) as Token[];
  const { useCurrentAllowancesForContract } = usePollAllowances({
    contract: "0x9D0FbF9349f646F1435072F2b0212084752EF460",
    tokens,
  });

  const allowances = useCurrentAllowancesForContract();

  useEffect(() => {
    if (allowances) {
      const uniqueNeedsApproval = new Set(needsApproval);

      allowances.forEach((allowance) => {
        const token = tokenWeights.find(
          (tokenWeight: ITokenWeight) =>
            tokenWeight.token?.address === allowance.address,
        );
        if (
          allowance.formattedAllowance === "0" ||
          Number(allowance.formattedAllowance) < (token?.initialLiquidity ?? 0)
        ) {
          uniqueNeedsApproval.add(allowance);
        }
      });

      setNeedsApproval(Array.from(uniqueNeedsApproval));
    }
  }, [allowances]);

  return {
    needsApproval,
  };
};

export default useCreatePool;
