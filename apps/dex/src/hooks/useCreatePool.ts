"use client";

import { useEffect, useState } from "react";
import { usePollAllowances, type Token } from "@bera/berajs";

import { getSafeNumber } from "~/utils/getSafeNumber";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import { crocDexAddress } from "@bera/config";
import { parseUnits } from "viem";

const useCreatePool = (tokenWeights: ITokenWeight[]) => {
  const [needsApproval, setNeedsApproval] = useState<Token[]>([]);

  const tokens: Token[] = tokenWeights
    .filter((tokenWeight: ITokenWeight) => tokenWeight.token !== undefined)
    .map((tokenWeight) => tokenWeight.token) as Token[];

  const { useCurrentAllowancesForContract, refresh: refreshAllowances } =
    usePollAllowances({
      contract: crocDexAddress,
      tokens,
    });

  const allowances = useCurrentAllowancesForContract();

  useEffect(() => {
    if (allowances) {
      const needsApproval = allowances
        ?.map((allowance) => {
          const token = tokenWeights.find(
            (tokenWeight: ITokenWeight) =>
              tokenWeight.token?.address === allowance.address,
          );
          if (
            allowance.formattedAllowance === "0" ||
            allowance.allowance <
              parseUnits(
                token?.initialLiquidity ?? "0",
                token?.token?.decimals ?? 18,
              )
          ) {
            return allowance;
          }
        })
        .filter((token) => token !== undefined) as Token[];
      setNeedsApproval(needsApproval);
    }
  }, [allowances]);

  return {
    needsApproval,
    refreshAllowances,
  };
};

export default useCreatePool;
