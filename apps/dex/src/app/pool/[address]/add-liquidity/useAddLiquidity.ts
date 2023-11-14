"use client";

import { useEffect, useMemo, useState } from "react";
import { type Pool } from "@bera/bera-router";
import {
  useBeraConfig,
  useBeraJs,
  usePollAllowance,
  usePollPreviewBurnShares,
  usePollPreviewSharesForLiquidity,
  usePollPreviewSharesForSingleSidedLiquidityRequest,
  useTokens,
  type Token,
} from "@bera/berajs";
import { formatUnits, parseUnits } from "viem";
import { type Address } from "wagmi";

import { getSafeNumber } from "~/utils/getSafeNumber";
import useMultipleTokenApprovals from "~/hooks/useMultipleTokenApprovals";
import useMultipleTokenInput from "~/hooks/useMultipleTokenInput";

export const useAddLiquidity = (pool: Pool | undefined, prices: any) => {
  const { account = undefined } = useBeraJs();
  const { networkConfig } = useBeraConfig();
  const [error, setError] = useState<string | undefined>("");
  const [singleSidedError, setSingleSidedError] = useState<string | undefined>(
    "",
  );

  const [expectedShares, setExpectedShares] = useState<string | undefined>(
    undefined,
  );
  const [singleSidedExpectedShares, setSingleSidedExpectedShares] = useState<
    string | undefined
  >(undefined);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [singleSidedTotalValue, setSingleSidedTotalValue] = useState<number>(0);

  const [singleSharesExceeding, setSingleSharesExceeding] =
    useState<boolean>(false);
  const [selectedSingleToken, setSelectedSingleToken] = useState<
    Token | undefined
  >(undefined);
  const [selectedSingleTokenAmount, setSelectedSingleTokenAmount] =
    useState<string>("");
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [singleTokenPreviewOpen, setSingleTokenSetPreviewOpen] =
    useState<boolean>(false);

  const {
    tokenInputs,
    updateTokenAmount,
    updateTokenExceeding,
    areNoInputsExceeding,
    areAllInputsPopulated,
    areSomeInputsUnpopulated,
    areAllInputsEmpty,
  } = useMultipleTokenInput(pool?.tokens ?? []);

  const { needsApproval } = useMultipleTokenApprovals(
    tokenInputs,
    networkConfig.precompileAddresses.erc20DexAddress as Address,
  );

  const { useAllowance } = usePollAllowance({
    contract: networkConfig.precompileAddresses.erc20DexAddress as Address,
    token: selectedSingleToken,
  });

  const allowance = useAllowance();

  const { tokenDictionary } = useTokens();

  const reset = () => {
    setPreviewOpen(false);
    setSingleTokenSetPreviewOpen(false);
    setSelectedSingleToken(undefined);
    setSelectedSingleTokenAmount("");
    setExpectedShares(undefined);
    setTotalValue(0);
    setSingleSidedExpectedShares(undefined);
    setSingleSidedTotalValue(0);
    pool?.tokens.forEach((_, i) => {
      updateTokenAmount(i, "");
    });
  };

  const payload = [
    pool?.pool,
    account,
    tokenInputs.map((tokenInput) => tokenInput?.address),
    tokenInputs.map((tokenInput) =>
      parseUnits(
        `${getSafeNumber(tokenInput.amount)}`,
        tokenInput?.decimals ?? 18,
      ),
    ),
  ];

  const singleSidedPayload = [
    pool?.pool,
    account,
    [selectedSingleToken?.address],
    [
      parseUnits(
        `${getSafeNumber(selectedSingleTokenAmount)}`,
        selectedSingleToken?.decimals ?? 18,
      ),
    ],
  ];
  // const {useTotalSupply} = usePollTotalSupply(pool?.shareAddress)

  // const totalSupply = useTotalSupply()

  const {
    usePreviewSharesForLiquidity,
    isLoading: isSharesLoading,
    isValidating: isSharesValidating,
  } = usePollPreviewSharesForLiquidity(
    pool?.pool,
    tokenInputs,
    tokenInputs.map((tokenInput) => getSafeNumber(tokenInput.amount)),
  );
  const shares = usePreviewSharesForLiquidity();

  const {
    usePreviewSharesForSingleSidedLiquidityRequest,
    isLoading: isSingleSidedLoading,
    isValidating: isSingleSidedValidating,
  } = usePollPreviewSharesForSingleSidedLiquidityRequest(
    pool?.pool,
    selectedSingleToken,
    getSafeNumber(selectedSingleTokenAmount),
  );
  const singleSidedShares = usePreviewSharesForSingleSidedLiquidityRequest();

  const { usePreviewBurnShares } = usePollPreviewBurnShares(
    singleSidedShares ? singleSidedShares[1][0] : 0n,
    pool?.pool,
    pool?.poolShareDenomHex,
  );

  useEffect(() => {
    if (isSingleSidedLoading || isSingleSidedValidating) {
      return;
    }
    if (singleSidedShares && singleSidedShares[1][0]) {
      setSingleSidedExpectedShares(formatUnits(singleSidedShares[1][0], 18));
    }
    if (singleSidedShares === undefined) {
      setSingleSidedExpectedShares(undefined);
    }
  }, [singleSidedShares]);

  const burnShares: Record<string, bigint> = usePreviewBurnShares();

  useEffect(() => {
    if (burnShares) {
      const totalValue = pool?.tokens.reduce((acc, token) => {
        const formattedAmount = burnShares
          ? Number(formatUnits(burnShares[token.address] ?? 0n, token.decimals))
          : 0;

        return acc + formattedAmount * (prices[token.address] ?? 0);
      }, 0);
      setSingleSidedTotalValue(totalValue ?? 0);
    }
  }, [burnShares]);
  useEffect(() => {
    if (tokenInputs && tokenInputs.length) {
      const totalValue = tokenInputs.reduce((acc, tokenInput) => {
        return (
          acc +
          getSafeNumber(tokenInput.amount) * (prices[tokenInput?.address] ?? 0)
        );
      }, 0);
      setTotalValue(totalValue);
    }
  }, [tokenInputs]);

  useEffect(() => {
    if (isSingleSidedLoading || isSingleSidedValidating) {
      return;
    }
    if (selectedSingleToken && selectedSingleTokenAmount) {
      setTotalValue(
        getSafeNumber(selectedSingleTokenAmount) *
          (prices[selectedSingleToken?.address] ?? 0),
      );
    }
  }, [selectedSingleToken, selectedSingleTokenAmount]);

  useEffect(() => {
    if (isSharesLoading || isSharesValidating) {
      return;
    }
    if (shares !== undefined && areAllInputsPopulated) {
      const formattedShares = formatUnits(shares[1][0], 18);
      setExpectedShares(formattedShares);
    }
    if (shares === undefined) {
      setExpectedShares(undefined);
    }
  }, [shares, areAllInputsPopulated]);

  useMemo(() => {
    if (isSharesLoading || isSharesValidating) {
      return;
    }
    if (
      shares === undefined &&
      areAllInputsPopulated &&
      !isSharesLoading &&
      !isSharesValidating
    ) {
      setError(
        "Unable to perform transaction. This transaction will cause the pool to become unbalanced.",
      );
    } else if (!areNoInputsExceeding) {
      setError("Input exceeds balance");
    } else if (areSomeInputsUnpopulated && !areAllInputsEmpty) {
      setError("Missing token input");
    }

    if (shares !== undefined && areAllInputsPopulated && areNoInputsExceeding) {
      setError(undefined);
    }
  }, [
    shares,
    areAllInputsPopulated,
    areNoInputsExceeding,
    isSharesLoading,
    isSharesValidating,
    shares,
  ]);

  useMemo(() => {
    if (isSingleSidedLoading || isSingleSidedValidating) {
      return;
    }
    if (
      singleSidedShares === undefined &&
      getSafeNumber(selectedSingleTokenAmount) !== 0 &&
      selectedSingleToken !== undefined &&
      !isSingleSidedLoading &&
      !isSingleSidedValidating
    ) {
      setSingleSidedError(
        "Unable to perform transaction. This transaction will cause the pool to become unbalanced.",
      );
    } else if (selectedSingleToken === undefined) {
      setSingleSidedError("Please select a token");
    } else if (getSafeNumber(selectedSingleTokenAmount) === 0) {
      setSingleSidedError("Please input token");
    } else if (singleSharesExceeding) {
      setSingleSidedError("Input exceeds balance");
    }

    if (
      singleSidedShares !== undefined &&
      selectedSingleToken !== undefined &&
      getSafeNumber(selectedSingleTokenAmount) !== 0 &&
      !singleSharesExceeding
    ) {
      setSingleSidedError(undefined);
    }
  }, [
    singleSidedShares,
    areAllInputsPopulated,
    areNoInputsExceeding,
    isSingleSidedLoading,
    isSingleSidedValidating,
    shares,
  ]);

  return {
    expectedShares,
    error,
    singleSidedError,
    isMultipleInputDisabled: error !== undefined,
    isSingleInputDisabled: singleSidedError !== undefined,
    singleSidedExpectedShares,
    totalValue,
    burnShares,
    singleSidedTotalValue,
    setSingleSharesExceeding,
    selectedSingleToken,
    selectedSingleTokenAmount,
    tokenDictionary,
    previewOpen,
    singleTokenPreviewOpen,
    tokenInputs,
    needsApproval,
    allowance,
    reset,
    payload,
    singleSidedPayload,
    updateTokenAmount,
    updateTokenExceeding,
    setSelectedSingleToken,
    setSelectedSingleTokenAmount,
    setPreviewOpen,
    setSingleTokenSetPreviewOpen,
  };
};
