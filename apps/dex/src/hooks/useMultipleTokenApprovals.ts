"use client";

import { useEffect, useState } from "react";
import { usePollAllowances, type Token } from "@bera/berajs";

import { getSafeNumber } from "~/utils/getSafeNumber";
import { type TokenInput } from "./useMultipleTokenInput";

const useMultipleTokenApprovals = (
  tokenInput: TokenInput[],
  spender: string,
) => {
  const [needsApproval, setNeedsApproval] = useState<Token[]>([]);

  const tokens = tokenInput
    .filter((token: TokenInput) => token !== undefined)
    .map((token) => token);

  const { useCurrentAllowancesForContract } = usePollAllowances({
    contract: spender,
    tokens,
  });

  const allowances = useCurrentAllowancesForContract();

  useEffect(() => {
    if (allowances) {
      const needsApproval = allowances
        ?.map((allowance) => {
          const token = tokens.find(
            (token: TokenInput) => token?.address === allowance.address,
          );
          if (
            allowance.formattedAllowance === "0" ||
            Number(allowance.formattedAllowance) <
              (getSafeNumber(token?.amount) ?? 0)
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

export default useMultipleTokenApprovals;
