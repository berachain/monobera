"use client";

import { useEffect, useState } from "react";
import { usePollAllowances, type Token, useBeraConfig } from "@bera/berajs";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import { type Address } from "wagmi";

const useCreatePool = (tokenWeights: ITokenWeight[]) => {
  const [needsApproval, setNeedsApproval] = useState<Token[]>([]);
  const { networkConfig } = useBeraConfig();

  const tokens: Token[] = tokenWeights
    .filter((tokenWeight: ITokenWeight) => tokenWeight.token !== undefined)
    .map((tokenWeight) => tokenWeight.token) as Token[];

  const { useCurrentAllowancesForContract } = usePollAllowances({
    contract: networkConfig.precompileAddresses.erc20ModuleAddress as Address,
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
            Number(allowance.formattedAllowance) <
              (token?.initialLiquidity ?? 0)
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
  };
};

export default useCreatePool;
