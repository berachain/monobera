"use client";

import { useEffect, useState } from "react";
import { usePollAllowances, type Token } from "@bera/berajs";
import { beraTokenAddress } from "@bera/config";
import { useSlippage } from "@bera/shared-ui";
import { beraJsConfig } from "@bera/wagmi";
import { parseUnits } from "viem";

import { type TokenInput } from "./useMultipleTokenInput";

const useMultipleTokenApprovalsWithSlippage = (
  tokenInput: TokenInput[],
  spender: string,
) => {
  const [needsApproval, setNeedsApproval] = useState<Token[]>([]);

  const tokens = tokenInput
    .filter((token: TokenInput) => token !== undefined)
    .map((token) => token);

  const { useCurrentAllowancesForContract, refresh } = usePollAllowances({
    args: {
      contract: spender,
      tokens,
    },
    config: beraJsConfig,
  });

  const allowances = useCurrentAllowancesForContract();

  const slippage = useSlippage();

  useEffect(() => {
    if (allowances) {
      const needsApproval = allowances
        ?.map((allowance) => {
          const token = tokens.find(
            (token: TokenInput) => token?.address === allowance.address,
          );
          const sI = parseUnits(token?.amount as string, token?.decimals ?? 18);
          const s = BigInt(((slippage ?? 0) + 0.001) * 10 ** 18);
          const maxAmountIn =
            (sI ?? 0n) + ((sI ?? 0n) * s) / BigInt(100 * 10 ** 18);

          if (allowance.allowance === 0n || allowance.allowance < maxAmountIn) {
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
    slippage,
    refresh,
  };
};

export default useMultipleTokenApprovalsWithSlippage;
