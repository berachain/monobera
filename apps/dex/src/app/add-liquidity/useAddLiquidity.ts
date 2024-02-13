"use client";

import { useState, useMemo } from "react";
import { useBeraJs, useTokens } from "@bera/berajs";
import { type Address } from "wagmi";

import { isBeratoken } from "~/utils/isBeraToken";
import useMultipleTokenApprovals from "~/hooks/useMultipleTokenApprovals";
import useMultipleTokenInput from "~/hooks/useMultipleTokenInput";
import { type PoolV2 } from "../pools/fetchPools";
import { useCrocPoolPrice } from "~/hooks/useCrocPoolPrice";
import { crocDexAddress } from "@bera/config";

export const useAddLiquidity = (pool: PoolV2 | undefined) => {
  const { account: _account } = useBeraJs();
  const [error, setError] = useState<string | undefined>("");

  const [totalValue, setTotalValue] = useState<number>(0);

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const [activeInput, setActiveInput] = useState<number | undefined>(undefined);
  const [activeAmount, setActiveAmount] = useState<string | undefined>(
    undefined,
  );

  const {
    tokenInputs,
    updateTokenAmount,
    updateTokenExceeding,
    areNoInputsExceeding,
    areAllInputsPopulated,
    areSomeInputsUnpopulated,
    areAllInputsEmpty,
  } = useMultipleTokenInput(pool?.tokens ?? []);

  console.log("tokenInputs", tokenInputs);
  const { needsApproval, refresh: refreshAllowances } =
    useMultipleTokenApprovals(tokenInputs, crocDexAddress as Address);
  console.log("needsApproval", needsApproval);

  const { tokenDictionary } = useTokens();

  const reset = () => {
    setPreviewOpen(false);
    setTotalValue(0);
    pool?.tokens.forEach((_, i) => {
      updateTokenAmount(i, "");
    });
  };

  const { beraToken, wBeraToken } = useTokens();

  const [isNativeBera, setIsNativeBera] = useState(true);

  const hasBeraTokens = pool?.tokens.some((token) => isBeratoken(token));

  const poolTokens = hasBeraTokens
    ? [...(pool?.tokens ?? []), beraToken]
    : pool?.tokens;

  const beraValue = isNativeBera
    ? tokenInputs.find((tokenInput) => isBeratoken(tokenInput))?.amount
    : "0";

  const { usePoolPrice } = useCrocPoolPrice(pool);
  const poolPrice = usePoolPrice();

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
    poolPrice,
    beraToken,
    wBeraToken,
    beraValue,
    isNativeBera,
    setIsNativeBera,
    poolTokens,
    error,
    isMultipleInputDisabled: error !== undefined,
    totalValue,
    tokenDictionary,
    previewOpen,
    tokenInputs,
    areAllInputsEmpty,
    needsApproval,
    reset,
    refreshAllowances,
    updateTokenAmount,
    updateTokenExceeding,
    setPreviewOpen,
    activeInput,
    setActiveInput,
    activeAmount,
    setActiveAmount,
  };
};
