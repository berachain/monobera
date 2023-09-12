"use client";

import { useEffect, useState } from "react";
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

import useMultipleTokenApprovals from "~/hooks/useMultipleTokenApprovals";
import useMultipleTokenInput from "~/hooks/useMultipleTokenInput";

export const useAddLiquidity = (pool: Pool | undefined, prices: any) => {
  const { account = undefined } = useBeraJs();
  const { networkConfig } = useBeraConfig();
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
    useState<number>(0);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [singleTokenPreviewOpen, setSingleTokenSetPreviewOpen] =
    useState<boolean>(false);

  const {
    tokenInputs,
    updateTokenAmount,
    areAllInputsEmpty,
    updateTokenExceeding,
    areNoInputsExceeding,
    areAllInputsPopulated,
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
    setSelectedSingleTokenAmount(0);
    setExpectedShares(undefined);
    setTotalValue(0);
    setSingleSidedExpectedShares(undefined);
    setSingleSidedTotalValue(0);
    pool?.tokens.forEach((_, i) => {
      updateTokenAmount(i, 0);
    });
  };

  const payload = [
    pool?.pool,
    account,
    tokenInputs.map((tokenInput) => tokenInput?.address),
    tokenInputs.map((tokenInput) =>
      parseUnits(`${tokenInput.amount}`, tokenInput?.decimals ?? 18),
    ),
  ];

  const singleSidedPayload = [
    pool?.pool,
    account,
    [selectedSingleToken?.address],
    [
      parseUnits(
        `${selectedSingleTokenAmount}`,
        selectedSingleToken?.decimals ?? 18,
      ),
    ],
  ];
  // const {useTotalSupply} = usePollTotalSupply(pool?.shareAddress)

  // const totalSupply = useTotalSupply()

  const { usePreviewSharesForLiquidity } = usePollPreviewSharesForLiquidity(
    pool?.pool,
    tokenInputs,
    tokenInputs.map((tokenInput) => tokenInput.amount),
  );
  const shares = usePreviewSharesForLiquidity();

  console.log("AHSARSA", shares);
  const { usePreviewSharesForSingleSidedLiquidityRequest } =
    usePollPreviewSharesForSingleSidedLiquidityRequest(
      pool?.pool,
      selectedSingleToken,
      selectedSingleTokenAmount,
    );
  const singleSidedShares = usePreviewSharesForSingleSidedLiquidityRequest();

  const { usePreviewBurnShares } = usePollPreviewBurnShares(
    singleSidedShares ? singleSidedShares[1][0] : 0n,
    pool?.pool,
    pool?.poolShareDenomHex,
  );

  useEffect(() => {
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
        return acc + tokenInput.amount * (prices[tokenInput?.address] ?? 0);
      }, 0);
      setTotalValue(totalValue);
    }
  }, [tokenInputs]);

  useEffect(() => {
    if (selectedSingleToken && selectedSingleTokenAmount) {
      setTotalValue(
        selectedSingleTokenAmount * (prices[selectedSingleToken?.address] ?? 0),
      );
    }
  }, [selectedSingleToken, selectedSingleTokenAmount]);

  useEffect(() => {
    if (shares !== undefined) {
      const formattedShares = formatUnits(shares[1][0], 18);
      setExpectedShares(formattedShares);
    }
    if (shares === undefined) {
      setExpectedShares(undefined);
    }
  }, [shares]);

  return {
    expectedShares,
    isMultipleInputDisabled:
      areAllInputsEmpty ||
      expectedShares === undefined ||
      areNoInputsExceeding === false ||
      areAllInputsPopulated === false,
    isSingleInputDisabled:
      selectedSingleToken === undefined ||
      selectedSingleTokenAmount === 0 ||
      singleSidedExpectedShares === undefined ||
      singleSharesExceeding === true ||
      (burnShares !== undefined && Object.keys(burnShares).length === 0),
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
