"use client";

import { useEffect, useState } from "react";
import { usePollAllowances, type Token } from "@bera/berajs";
import { crocDexAddress } from "@bera/config";
import { parseUnits } from "viem";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

const useCreatePool = ({
  baseToken,
  quoteToken,
  baseAmount,
  quoteAmount,
}: {
  baseToken: Token;
  quoteToken: Token;
  baseAmount: string;
  quoteAmount: string;
}) => {
  const [needsApproval, setNeedsApproval] = useState<Token[]>([]);

  const tokenWeights: ITokenWeight[] = [
    {
      token: baseToken,
      initialLiquidity: baseAmount,
      weight: 50,
      locked: false,
    },
    {
      token: quoteToken,
      initialLiquidity: quoteAmount,
      weight: 50,
      locked: false,
    },
  ];

  const tokens = [baseToken, quoteToken];

  const { data: allowances, refetch: refreshAllowances } = usePollAllowances({
    args: {
      spender: crocDexAddress,
      tokens,
    },
  });

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
