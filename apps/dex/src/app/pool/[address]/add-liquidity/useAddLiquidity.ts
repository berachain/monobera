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
import BigNumber from "bignumber.js";
import { parseUnits } from "ethers";
import lodash from "lodash";
import { formatUnits } from "viem";
import { type Address } from "wagmi";

import { getSafeNumber } from "~/utils/getSafeNumber";
import { isBera, isBeratoken } from "~/utils/isBeraToken";
import useMultipleTokenApprovals from "~/hooks/useMultipleTokenApprovals";
import useMultipleTokenInput, {
  type TokenInput,
} from "~/hooks/useMultipleTokenInput";

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

  const { needsApproval } = useMultipleTokenApprovals(
    tokenInputs,
    networkConfig.precompileAddresses.erc20ModuleAddress as Address,
  );

  const { useAllowance } = usePollAllowance({
    contract: networkConfig.precompileAddresses.erc20ModuleAddress as Address,
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

  // const {useTotalSupply} = usePollTotalSupply(pool?.shareAddress)

  // const totalSupply = useTotalSupply()

  const {
    usePreviewSharesForLiquidity,
    isLoading: isSharesLoading,
    isValidating: isSharesValidating,
  } = usePollPreviewSharesForLiquidity(
    pool?.pool,
    tokenInputs,
    tokenInputs.map((tokenInput) => tokenInput.amount),
  );
  const shares = usePreviewSharesForLiquidity();

  const {
    usePreviewSharesForSingleSidedLiquidityRequest,
    isLoading: isSingleSidedLoading,
    isValidating: isSingleSidedValidating,
  } = usePollPreviewSharesForSingleSidedLiquidityRequest(
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
        // @ts-ignore
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

  const { beraToken, wBeraToken } = useTokens();

  const [isNativeBera, setIsNativeBera] = useState(true);

  const hasBeraTokens = pool?.tokens.some((token) => isBeratoken(token));

  const poolTokens = hasBeraTokens
    ? [...(pool?.tokens ?? []), beraToken]
    : pool?.tokens;

  const payloadTokens = tokenInputs.map((tokenInput) => {
    if (isNativeBera && isBeratoken(tokenInput)) {
      return beraToken?.address;
    } else {
      return tokenInput?.address;
    }
  });
  const payload = [
    pool?.pool,
    account,
    payloadTokens,
    tokenInputs.map((tokenInput) =>
      parseUnits(
        tokenInput.amount === "" ? "0" : tokenInput.amount,
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
        selectedSingleTokenAmount === "" ? "0" : selectedSingleTokenAmount,
        selectedSingleToken?.decimals ?? 18,
      ),
    ],
  ];

  const beraValue = isNativeBera
    ? tokenInputs.find((tokenInput) => isBeratoken(tokenInput))?.amount
    : "0";

  const singleSidedBeraValue = isBera(selectedSingleToken)
    ? selectedSingleTokenAmount
    : "0";

  const totalTokens = useMemo(() => {
    if (pool && pool.tokens && pool.liquidity) {
      const totalTokens = pool?.tokens.reduce((prev: bigint, curr: any) => {
        return prev + parseUnits(curr.balance, 18);
      }, 0n);
      return new BigNumber(totalTokens.toString());
    } else {
      return undefined;
    }
  }, [pool]);

  const liquidityMap: Record<string, BigNumber> | undefined = useMemo(() => {
    const map: Record<string, BigNumber> = {};
    if (pool && pool.tokens && pool.liquidity && totalTokens) {
      pool?.tokens.forEach((token: any) => {
        const bnTotal = new BigNumber(totalTokens.toString());
        const bnBalance = new BigNumber(
          parseUnits(token.balance, 18).toString(),
        );
        const ratio = bnBalance.div(bnTotal).times(new BigNumber(100));
        lodash.set(map, token.address, ratio);
      });
      return map;
    } else {
      return undefined;
    }
  }, [totalTokens]);

  useMemo(() => {
    if (
      activeInput !== undefined &&
      liquidityMap !== undefined &&
      totalTokens !== undefined
    ) {
      try {
        const amount = activeAmount === "" ? "0" : activeAmount;
        const bnAmount = new BigNumber(
          parseUnits(amount ?? "0", 18).toString(),
        );
        const selectedToken = tokenInputs[activeInput];
        const totalSelectedTokenType = (
          liquidityMap[selectedToken?.address ?? ""] ?? new BigNumber(0)
        ).times(totalTokens);
        const amountRatio = bnAmount.div(totalSelectedTokenType);
        tokenInputs.forEach((tokenInput: TokenInput, i: number) => {
          if (i === activeInput) return;

          const totalTokenType = (
            liquidityMap[tokenInput.address] ?? new BigNumber(0)
          )
            .times(totalTokens)
            .div(new BigNumber(10).pow(18));
          const newAmount = amountRatio.times(totalTokenType);
          const parsedNewAmount =
            Number(newAmount) === 0
              ? ""
              : newAmount.toString(10).slice(0, tokenInput.decimals);
          updateTokenAmount(i, parsedNewAmount);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      return;
    }
  }, [activeAmount, activeInput, liquidityMap, totalTokens]);

  return {
    beraToken,
    singleSidedBeraValue,
    wBeraToken,
    beraValue,
    isNativeBera,
    setIsNativeBera,
    poolTokens,
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
    setActiveInput,
    setActiveAmount,
  };
};
