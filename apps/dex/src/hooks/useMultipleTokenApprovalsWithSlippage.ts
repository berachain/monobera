"use client";

import { useEffect, useState } from "react";
import { usePollAllowances, type Token } from "@bera/berajs";
import { beraTokenAddress } from "@bera/config";
import { useSlippage } from "@bera/shared-ui";
import { Address, parseUnits } from "viem";

import { type TokenInput } from "./useMultipleTokenInput";

const useMultipleTokenApprovalsWithSlippage = (
  tokenInput: TokenInput[],
  spender: Address,
) => {
  const [needsApproval, setNeedsApproval] = useState<Token[]>([]);

  const tokens = tokenInput
    .filter((token: TokenInput) => token !== undefined)
    .map((token) => token);

  const { data: allowances, refresh } = usePollAllowances({
    spender: spender,
    tokens,
  });

  const slippage = useSlippage();

  useEffect(() => {
    if (allowances) {
      const needsApproval = allowances
        ?.map((allowance) => {
          const token = tokens.find(
            (token: TokenInput) => token?.address === allowance.address,
          );
          const sI = parseUnits(token?.amount as string, token?.decimals ?? 18);
          const s = parseUnits(
            ((slippage ?? 0) + 0.001).toString(),
            token?.decimals ?? 18,
          );
          const maxAmountIn =
            (sI ?? 0n) +
            ((sI ?? 0n) * s) / BigInt(100 * 10 ** (token?.decimals ?? 18));

          if (allowance.allowance === 0n || allowance.allowance < maxAmountIn) {
            return allowance;
          }
        })
        .filter((token) => token !== undefined) as Token[];
      setNeedsApproval(needsApproval);
    }
  }, [allowances, slippage, tokenInput]);

  return {
    needsApproval,
    needsApprovalNoBera: needsApproval.filter(
      (token) => token.address.toLowerCase() !== beraTokenAddress.toLowerCase(),
    ),
    slippage,
    refresh,
  };
};

export default useMultipleTokenApprovalsWithSlippage;
