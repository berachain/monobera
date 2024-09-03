"use client";

import { useEffect, useState } from "react";
import { usePollAllowances, type Token } from "@bera/berajs";

import { getSafeNumber } from "~/utils/getSafeNumber";
import { type TokenInput } from "./useMultipleTokenInput";
import { beraTokenAddress } from "@bera/config";

const useMultipleTokenApprovals = (
  tokenInput: TokenInput[],
  spender: string,
) => {
  const [needsApproval, setNeedsApproval] = useState<Token[]>([]);

  const tokens = tokenInput
    .filter((token: TokenInput) => token !== undefined)
    .map((token) => token);

  const { data: allowances, refresh } = usePollAllowances({
    spender: spender,
    tokens,
  });

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
    needsApprovalNoBera: needsApproval.filter(
      (token) => token.address.toLowerCase() !== beraTokenAddress.toLowerCase(),
    ),
    refresh,
  };
};

export default useMultipleTokenApprovals;
