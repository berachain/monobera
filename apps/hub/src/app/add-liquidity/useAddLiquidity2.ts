"use client";

import { useMemo, useState } from "react";
import {
  ADDRESS_ZERO,
  Token,
  useBeraJs,
  useTokens,
  type PoolV2,
} from "@bera/berajs";
import { beraTokenAddress, crocDexAddress } from "@bera/config";
import { beraToken, wBeraToken } from "@bera/wagmi";
import { type Address } from "viem";

import { isBeratoken } from "~/utils/isBeraToken";
import { useCrocPoolPrice } from "~/hooks/useCrocPoolPrice";
import useMultipleTokenApprovalsWithSlippage from "~/hooks/useMultipleTokenApprovalsWithSlippage";
import useMultipleTokenInput from "~/hooks/useMultipleTokenInput";
import { usePoolState } from "~/hooks/usePoolState";

export const useAddLiquidity2 = (poolId: string) => {
  const { account: _account } = useBeraJs();
  const [error, setError] = useState<string | undefined>("");

  const [activeInput, setActiveInput] = useState<number | undefined>(undefined);
  const [activeAmount, setActiveAmount] = useState<string | undefined>(
    undefined,
  );

  const { data: pool } = usePoolState(poolId);

  const {
    tokenInputs,
    updateTokenAmount,
    updateTokenExceeding,
    areNoInputsExceeding,
    areAllInputsPopulated,
    areSomeInputsUnpopulated,
    areAllInputsEmpty,
  } = useMultipleTokenInput((pool?.tokens  ?? undefined) as Token[] | undefined);

  const {
    needsApproval,
    needsApprovalNoBera,
    refresh: refreshAllowances,
  } = useMultipleTokenApprovalsWithSlippage(
    tokenInputs,
    crocDexAddress as Address,
  );

  const { data: tokenData } = useTokens();

  const reset = () => {
    pool?.tokens.forEach((_, i) => {
      updateTokenAmount(i, "");
    });
  };

  const [isNativeBera, setIsNativeBera] = useState(true);

  const hasBeraTokens = pool?.tokens.some((token) => isBeratoken(token as any));

  const poolTokens = hasBeraTokens
    ? [...(pool?.tokens ?? []), beraToken]
    : pool?.tokens;

  const beraValue = isNativeBera
    ? tokenInputs.find((tokenInput) => isBeratoken(tokenInput))?.amount
    : "0";


  useMemo(() => {
    if (!areNoInputsExceeding) {
      setError("Input exceeds balance");
    } else if (areSomeInputsUnpopulated && !areAllInputsEmpty) {
      setError("Missing token input");
    } else if (areAllInputsPopulated && areNoInputsExceeding) {
      setError(undefined);
    }
  }, [
    areNoInputsExceeding,
    areAllInputsPopulated,
    areSomeInputsUnpopulated,
    areAllInputsEmpty,
  ]);

  return {
    beraToken,
    wBeraToken,
    beraValue,
    isNativeBera,
    setIsNativeBera,
    needsApprovalNoBera,
    poolTokens,
    error,
    isMultipleInputDisabled: error !== undefined,
    tokenDictionary: tokenData?.tokenDictionary,
    tokenInputs,
    areAllInputsEmpty,
    needsApproval,
    reset,
    refreshAllowances,
    updateTokenAmount,
    updateTokenExceeding,
    activeInput,
    setActiveInput,
    activeAmount,
    setActiveAmount,
  };
};
