"use client";

import { useEffect, useMemo, useState } from "react";
import { usePollAssetWalletBalance, type Token } from "@bera/berajs";
import { useCrocPoolFromTokens, useCrocToken } from "./useCrocPoolFromTokens";
import { isBeratoken } from "~/utils/isBeraToken";
import { getSafeNumber } from "~/utils/getSafeNumber";

export interface ITokenWeight {
  weight: number;
  locked: boolean;
  token: Token | undefined;
  initialLiquidity: string;
}

export class InvalidInputError extends Error {
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
  FIVE_BPS = "36000",
  THIRTY_BPS = "36001",
  HUNDRED_BPS = "36002",
}

export const SWAPFEE = {
  [POOLID.FIVE_BPS]: 0.05,
  [POOLID.THIRTY_BPS]: 0.3,
  [POOLID.HUNDRED_BPS]: 1,
};

/**
 *
 * @brief A state management hook for preparing the creation of a new pool
 */

const useCreateTokenWeights = () => {
  const [error, setError] = useState<Error | undefined>(undefined);

  const [poolName, setPoolName] = useState<string>("");

  const [poolId, setPoolId] = useState<POOLID>(POOLID.FIVE_BPS);

  const [step, setStep] = useState<Steps>(Steps.SET_TOKEN_WEIGHTS);

  const [initialPrice, setInitialPrice] = useState<string>("");
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();

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

  const { data: baseTokenBalance } = useSelectedAssetWalletBalance(
    baseToken?.address ?? "",
  );
  const { data: quoteTokenBalance } = useSelectedAssetWalletBalance(
    quoteToken?.address ?? "",
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
