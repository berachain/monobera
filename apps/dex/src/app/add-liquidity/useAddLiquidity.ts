"use client";

import { useMemo, useState } from "react";
import { useBeraJs, useTokens, type PoolV2 } from "@bera/berajs";
import { crocDexAddress } from "@bera/config";
import { beraToken, wBeraToken } from "@bera/wagmi";
import { type Address } from "viem";

import { isBeratoken } from "~/utils/isBeraToken";
import { useCrocPoolPrice } from "~/hooks/useCrocPoolPrice";
import useMultipleTokenApprovalsWithSlippage from "~/hooks/useMultipleTokenApprovalsWithSlippage";
import useMultipleTokenInput from "~/hooks/useMultipleTokenInput";

export const useAddLiquidity = (pool: PoolV2 | undefined) => {
  const { account: _account } = useBeraJs();
  const [error, setError] = useState<string | undefined>("");

  const [totalValue, setTotalValue] = useState<number>(0);

  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [isBaseInput, setIsBaseInput] = useState<boolean>(true);

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
    setPreviewOpen(false);
    setTotalValue(0);
    pool?.tokens.forEach((_, i) => {
      updateTokenAmount(i, "");
    });
  };

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
    needsApprovalNoBera,
    poolTokens,
    error,
    isMultipleInputDisabled: error !== undefined,
    totalValue,
    tokenDictionary: tokenData?.tokenDictionary,
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
    isBaseInput,
    setIsBaseInput,
  };
};
