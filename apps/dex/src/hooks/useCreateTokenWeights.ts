"use client";

import { useEffect, useMemo, useState } from "react";
import { usePollWalletBalances, type Token } from "@bera/berajs";

import { getSafeNumber } from "~/utils/getSafeNumber";
import { isBeratoken } from "~/utils/isBeraToken";
import { useCrocPoolFromTokens, useCrocToken } from "./useCrocPoolFromTokens";

export interface ITokenWeight {
  weight: number;
  locked: boolean;
  token: Token | undefined;
  initialLiquidity: string;
}

class InvalidInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidInputError";
  }
}

export enum Steps {
  SET_TOKEN_WEIGHTS = 0,
  SET_SWAP_FEES = 1,
  SET_INITIAL_LIQUIDITY = 2,
  CREATE_POOL_PREVIEW = 3,
}

export enum POOLID {
  AMBIENT = "36000",
  STABLE = "36001",
}

export const SWAPFEE = {
  [POOLID.AMBIENT]: 0.3,
  [POOLID.STABLE]: 0.01,
};

/**
 *
 * @brief A state management hook for preparing the creation of a new pool
 */

const useCreateTokenWeights = () => {
  const [error, setError] = useState<Error | undefined>(undefined);

  const [poolName, setPoolName] = useState<string>("");

  const [poolId, setPoolId] = useState<POOLID>(POOLID.AMBIENT);

  const [step, setStep] = useState<Steps>(Steps.SET_TOKEN_WEIGHTS);

  const [initialPrice, setInitialPrice] = useState<string>("");
  const [isPriceBase, setIsPriceBase] = useState<boolean>(true);
  const { useSelectedWalletBalance } = usePollWalletBalances();

  const [isBaseTokenInput, setIsBaseTokenInput] = useState<boolean>(true);

  const [tokenA, setTokenA] = useState<Token | undefined>(undefined);
  const [tokenB, setTokenB] = useState<Token | undefined>(undefined);

  const [baseAmount, setBaseAmount] = useState<string>("");
  const [quoteAmount, setQuoteAmount] = useState<string>("");

  const tokenACrocToken = useCrocToken(tokenA);
  const tokenBCrocToken = useCrocToken(tokenB);
  const crocPool = useCrocPoolFromTokens(tokenACrocToken, tokenBCrocToken);

  const baseToken = useMemo(() => {
    return tokenA?.address === crocPool?.baseToken.tokenAddr ? tokenA : tokenB;
  }, [JSON.stringify(crocPool)]);

  const quoteToken = useMemo(() => {
    return tokenB?.address === crocPool?.quoteToken.tokenAddr ? tokenB : tokenA;
  }, [JSON.stringify(crocPool)]);

  const baseTokenBalance = useSelectedWalletBalance(baseToken?.address ?? "0x");
  const quoteTokenBalance = useSelectedWalletBalance(
    quoteToken?.address ?? "0x",
  );

  // track any errors
  useEffect(() => {
    setError(undefined);

    // Check for errors in tokenWeights
    const isUndefinedToken = !tokenA || !tokenB;
    const isInvalidInitialLiquidity =
      step === 2 &&
      (getSafeNumber(baseAmount ?? "0") === 0 ||
        getSafeNumber(quoteAmount ?? "0") === 0);

    const isBaseTokenExceedingBalance =
      baseTokenBalance !== undefined
        ? getSafeNumber(baseTokenBalance.formattedBalance) <
          getSafeNumber(baseAmount)
        : false;
    const isQuoteTokenExceedingBalance =
      quoteTokenBalance !== undefined
        ? getSafeNumber(quoteTokenBalance.formattedBalance) <
          getSafeNumber(quoteAmount)
        : false;

    const isInitialLiquidityExceedingBalance =
      step === 2 &&
      (isBaseTokenExceedingBalance || isQuoteTokenExceedingBalance);

    const isBothBeras = isBeratoken(tokenA) && isBeratoken(tokenB);
    if (isUndefinedToken) {
      setError(new InvalidInputError("Tokens must be selected"));
    } else if (isInvalidInitialLiquidity) {
      setError(new InvalidInputError("Must add initial liquidity."));
    } else if (isInitialLiquidityExceedingBalance) {
      setError(
        new InvalidInputError("Initial liquidity greater than balance."),
      );
    } else if (isBothBeras) {
      setError(
        new InvalidInputError("Cannot create a pool with both BERA tokens."),
      );
    } else {
      setError(undefined);
    }
  }, [baseToken, quoteToken, baseAmount, quoteAmount, step]);

  const quoteBasedInitialPrice = useMemo(() => {
    if (poolId === POOLID.STABLE) {
      return "1";
    }
    return isPriceBase
      ? initialPrice
      : (1 / getSafeNumber(initialPrice)).toString();
  }, [initialPrice, isPriceBase, poolId]);

  return {
    error,
    poolName,
    step,
    initialPrice,
    isBaseTokenInput,
    tokenA,
    tokenB,
    baseToken,
    quoteToken,
    baseAmount,
    quoteAmount,
    poolId,
    isPriceBase,
    quoteBasedInitialPrice,
    setIsPriceBase,
    setPoolId,
    setBaseAmount,
    setQuoteAmount,
    setTokenA,
    setTokenB,
    setIsBaseTokenInput,
    setInitialPrice,
    setPoolName,
    setStep,
  };
};

export default useCreateTokenWeights;
