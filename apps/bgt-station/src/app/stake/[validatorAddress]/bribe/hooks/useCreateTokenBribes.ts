"use client";

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import {
  useCurrentAssetWalletBalances,
  usePollAssetWalletBalance,
  type Token,
} from "@bera/berajs";

export interface ITokenBribe {
  bribe: number;
  token: Token | undefined;
  total: number;
}

export class InvalidInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidInputError";
  }
}

const useCreateTokenWeights = () => {
  const [tokenBribes, setTokenBribes] = useState<ITokenBribe[]>([]);

  const [error, setError] = useState<Error | undefined>(undefined);

  usePollAssetWalletBalance();
  const tokens = useCurrentAssetWalletBalances();

  // track any errors
  useEffect(() => {
    setError(undefined);

    // Check for errors in tokenBribes
    const hasZeroBribe = tokenBribes.some((item) => item.bribe === 0);

    const isUndefinedToken = tokenBribes.some(
      (item) => item.token === undefined,
    );

    const isTotalBribeExceedingBalance =
      tokenBribes && tokenBribes.length > 0
        ? tokenBribes.some((item) => {
            const foundToken = tokens.find(
              (t) => t.address === item?.token?.address,
            );
            return Number(foundToken?.formattedBalance ?? 0) < item.total;
          })
        : false;

    if (hasZeroBribe) {
      setError(new InvalidInputError("Bribe cannot be 0"));
    } else if (isUndefinedToken) {
      setError(new InvalidInputError("Tokens must be selected"));
    } else if (isTotalBribeExceedingBalance) {
      setError(new InvalidInputError("Total bribe greater than balance."));
    } else {
      setError(undefined);
    }
  }, [tokenBribes, tokens]);

  const onAddToken = () => {
    let updatedTokenWeights: ITokenBribe[] = [...tokenBribes];
    updatedTokenWeights = [
      ...updatedTokenWeights,
      { token: undefined, bribe: 0, total: 0 },
    ];
    setTokenBribes(updatedTokenWeights);
  };

  const onRemove = (index: number) => {
    const updatedTokenWeights: ITokenBribe[] = [
      ...tokenBribes.slice(0, index),
      ...tokenBribes.slice(index + 1),
    ];

    setTokenBribes(updatedTokenWeights);
  };

  const onTokenBribeChange = (
    index: number,
    bribe: number,
    numberOfValidators: number,
  ) => {
    const updatedTokenBribes: ITokenBribe[] = [...tokenBribes];
    // @ts-ignore
    updatedTokenWeights[index] = {
      ...updatedTokenBribes[index],

      bribe,
      total: bribe * numberOfValidators,
    };

    setTokenBribes(updatedTokenBribes);
  };

  const onTokenTotalChange = (
    index: number,
    total: number,
    numberOfValidators: number,
  ) => {
    const updatedTokenBribes: ITokenBribe[] = [...tokenBribes];
    // @ts-ignore
    updatedTokenWeights[index] = {
      ...updatedTokenBribes[index],
      bribe: total / numberOfValidators,
      total,
    };

    setTokenBribes(updatedTokenBribes);
  };

  const onTokenSelection = (token: Token, index: number) => {
    const updatedTokenWeights: ITokenBribe[] = [...tokenBribes];
    const selectedTokenIndex = updatedTokenWeights.findIndex(
      (selectedToken) => selectedToken?.token?.address === token.address,
    );

    if (selectedTokenIndex === -1) {
      // @ts-ignore
      updatedTokenWeights[index].token = token;
    } else {
      // @ts-ignore
      updatedTokenWeights[selectedTokenIndex].token = undefined;
      // @ts-ignore
      updatedTokenWeights[index].token = token;
    }

    setTokenBribes(updatedTokenWeights);
  };

  return {
    tokenBribes,
    error,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenBribeChange,
    onTokenTotalChange,
  };
};

export default useCreateTokenWeights;
