"use client";

import { useEffect, useState } from "react";
import { usePollAssetWalletBalance, type Token } from "@bera/berajs";
import { beraTokenAddress, nativeTokenAddress } from "@bera/config";
import { getAddress } from "viem";

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

const defaultTokenWeight: ITokenWeight[] = [
  {
    weight: 50,
    locked: false,
    token: undefined,
    initialLiquidity: "",
  },
  {
    weight: 50,
    locked: false,
    token: undefined,
    initialLiquidity: "",
  },
];

function getTotalWeightOfLockedItems(tokenWeights: ITokenWeight[]): number {
  return tokenWeights.reduce((totalWeight, item) => {
    if (item.locked) {
      return totalWeight + item.weight;
    }
    return totalWeight;
  }, 0);
}

function getTotalUnlockedItemsCount(tokenWeights: ITokenWeight[]): number {
  return tokenWeights.reduce((count, item) => {
    if (!item.locked) {
      return count + 1;
    }
    return count;
  }, 0);
}

export enum Steps {
  SET_TOKEN_WEIGHTS = 0,
  SET_SWAP_FEES = 1,
  SET_INITIAL_LIQUIDITY = 2,
  CREATE_POOL_PREVIEW = 3,
}

/**
 *
 * @brief A state management hook for preparing the creation of a new pool
 */
const useCreateTokenWeights = () => {
  const [tokenWeights, setTokenWeights] =
    useState<ITokenWeight[]>(defaultTokenWeight);

  const [totalWeight, setTotalWeight] = useState(100);

  const [error, setError] = useState<Error | undefined>(undefined);

  const [poolName, setPoolName] = useState<string>("");

  const [swapFee, setSwapFee] = useState<number>(0.4);

  const [step, setStep] = useState<Steps>(Steps.SET_TOKEN_WEIGHTS);

  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { data: tokens } = useCurrentAssetWalletBalances();

  // track any errors
  useEffect(() => {
    setError(undefined);

    // Check for errors in tokenWeights
    const hasZeroWeight = tokenWeights.some((item) => item.weight === 0);
    const isInvalidTotalWeight = totalWeight !== 100 || totalWeight > 100;
    const isUndefinedToken = tokenWeights.some(
      (item) => item.token === undefined,
    );
    const isInvalidTokenListLength = tokenWeights.length < 2;
    const isInvalidInitialLiquidity =
      step === 2 &&
      !tokenWeights.every((item) => getSafeNumber(item.initialLiquidity) !== 0);

    const isInitialLiquidityExceedingBalance =
      step === 2 &&
      tokenWeights.some((item) => {
        const foundToken = tokens?.find(
          (t: any) =>
            getAddress(t.address) === getAddress(item?.token?.address ?? ""),
        );

        return (
          Number(foundToken?.formattedBalance ?? 0) <
          getSafeNumber(item.initialLiquidity)
        );
      });
    const isInvalidSwapFee = (step === 1 && swapFee > 100) || swapFee < 0;

    const isBothBeras =
      tokenWeights.some((item) => item.token?.address === nativeTokenAddress) &&
      tokenWeights.some((item) => item.token?.address === beraTokenAddress);
    if (hasZeroWeight) {
      setError(new InvalidInputError("Weight cannot be 0"));
    } else if (isInvalidTotalWeight) {
      setError(new InvalidInputError("The total weight must be 100%"));
    } else if (isUndefinedToken) {
      setError(new InvalidInputError("Tokens must be selected"));
    } else if (isInvalidTokenListLength) {
      setError(new InvalidInputError("At least 2 tokens must be selected"));
    } else if (isInvalidInitialLiquidity) {
      setError(new InvalidInputError("Must add initial liquidity."));
    } else if (isInitialLiquidityExceedingBalance) {
      setError(
        new InvalidInputError("Initial liquidity greater than balance."),
      );
    } else if (isInvalidSwapFee) {
      setError(new InvalidInputError("Invalid swap fee."));
    } else if (isBothBeras) {
      setError(
        new InvalidInputError("Cannot create a pool with both BERA tokens."),
      );
    } else {
      setError(undefined);
    }
  }, [tokenWeights, totalWeight, step, tokens, swapFee]);

  // track total weight
  useEffect(() => {
    const weight = tokenWeights.reduce((acc, { weight }) => acc + weight, 0);

    if (weight !== totalWeight) {
      setTotalWeight(weight);
    }
  }, [tokenWeights, totalWeight, setTotalWeight]);

  // update weights
  useEffect(() => {
    const updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    const lockedValueWeights = getTotalWeightOfLockedItems(updatedTokenWeights);
    const remainingWeight =
      100 - lockedValueWeights < 0 ? 0 : 100 - lockedValueWeights;

    const numberOfUnlockedItems =
      getTotalUnlockedItemsCount(updatedTokenWeights);

    const outstandingWeightPerItem = Math.floor(
      remainingWeight / numberOfUnlockedItems,
    );

    let updated = false; // Track if any changes were made to tokenWeights

    if (
      numberOfUnlockedItems === tokenWeights.length &&
      tokenWeights.length === 3
    ) {
      updatedTokenWeights.forEach((item: ITokenWeight, i: number) => {
        if (!item.locked && item.weight !== outstandingWeightPerItem) {
          if (i === 0) {
            // @ts-ignore
            updatedTokenWeights[i].weight = 34;
            return;
          }
          // @ts-ignore
          updatedTokenWeights[i].weight =
            outstandingWeightPerItem > 0 ? outstandingWeightPerItem : 0;
          updated = true;
        }
      });
    } else if (
      numberOfUnlockedItems === tokenWeights.length &&
      tokenWeights.length === 6
    ) {
      updatedTokenWeights.forEach((item: ITokenWeight, i: number) => {
        if (i < 4) {
          // @ts-ignore
          updatedTokenWeights[i].weight = 17;
          return;
        }
        if (!item.locked && item.weight !== outstandingWeightPerItem) {
          // @ts-ignore
          updatedTokenWeights[i].weight =
            outstandingWeightPerItem > 0 ? outstandingWeightPerItem : 0;
          updated = true;
        }
      });
    } else if (
      numberOfUnlockedItems === tokenWeights.length &&
      tokenWeights.length === 7
    ) {
      updatedTokenWeights.forEach((item: ITokenWeight, i: number) => {
        if (i < 2) {
          // @ts-ignore
          updatedTokenWeights[i].weight = 15;
          return;
        }
        if (!item.locked && item.weight !== outstandingWeightPerItem) {
          // @ts-ignore
          updatedTokenWeights[i].weight =
            outstandingWeightPerItem > 0 ? outstandingWeightPerItem : 0;
          updated = true;
        }
      });
    } else if (
      numberOfUnlockedItems === tokenWeights.length &&
      tokenWeights.length === 8
    ) {
      updatedTokenWeights.forEach((item: ITokenWeight, i: number) => {
        if (i < 4) {
          // @ts-ignore
          updatedTokenWeights[i].weight = 13;
          return;
        }
        if (!item.locked && item.weight !== outstandingWeightPerItem) {
          // @ts-ignore
          updatedTokenWeights[i].weight =
            outstandingWeightPerItem > 0 ? outstandingWeightPerItem : 0;
          updated = true;
        }
      });
    } else {
      updatedTokenWeights.forEach((item: ITokenWeight, i: number) => {
        if (!item.locked && item.weight !== outstandingWeightPerItem) {
          // @ts-ignore
          updatedTokenWeights[i].weight =
            outstandingWeightPerItem > 0 ? outstandingWeightPerItem : 0;
          updated = true;
        }
      });
    }
    if (updated) {
      setTokenWeights(updatedTokenWeights);
    }
  }, [tokenWeights, setTokenWeights]);

  // update pool name as tokens are selected & changed
  useEffect(() => {
    const formattedString = tokenWeights
      .map(
        (tokenWeight) =>
          `${tokenWeight.weight}${tokenWeight.token?.symbol || ""}`,
      )
      .join("-");

    setPoolName((prevPoolName) => {
      if (prevPoolName !== formattedString) {
        return formattedString;
      }
      return prevPoolName;
    });
  }, [tokenWeights]);

  const onAddToken = () => {
    if (tokenWeights.length >= 8) {
      return;
    }
    let updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    updatedTokenWeights = [
      ...updatedTokenWeights,
      { token: undefined, locked: false, weight: 0, initialLiquidity: "" },
    ];
    setTokenWeights(updatedTokenWeights);
  };

  const onRemove = (index: number) => {
    if (tokenWeights.length <= 2) {
      return;
    }
    const updatedTokenWeights: ITokenWeight[] = [
      ...tokenWeights.slice(0, index),
      ...tokenWeights.slice(index + 1),
    ];

    setTokenWeights(updatedTokenWeights);
  };

  const onTokenWeightChange = (index: number, weight: number) => {
    const updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    // @ts-ignore
    updatedTokenWeights[index] = {
      ...updatedTokenWeights[index],
      locked: true,
      weight: weight,
    };

    setTokenWeights(updatedTokenWeights);
  };

  const onTokenBalanceChange = (index: number, amount: string) => {
    const updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    // @ts-ignore
    updatedTokenWeights[index].initialLiquidity = amount;

    setTokenWeights(updatedTokenWeights);
  };

  const onLock = (index: number) => {
    const updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    // @ts-ignore
    updatedTokenWeights[index].locked = true;

    setTokenWeights(updatedTokenWeights);
  };

  const onUnlock = (index: number) => {
    const updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    // @ts-ignore
    updatedTokenWeights[index].locked = false;

    setTokenWeights(updatedTokenWeights);
  };

  const onTokenSelection = (token: Token | undefined, index: number) => {
    const updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    const selectedTokenIndex = updatedTokenWeights.findIndex(
      (selectedToken) => selectedToken?.token?.address === token?.address,
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

    setTokenWeights(updatedTokenWeights);
  };

  return {
    tokenWeights,
    totalWeight,
    error,
    swapFee,
    poolName,
    step,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenWeightChange,
    onTokenBalanceChange,
    onLock,
    onUnlock,
    setSwapFee,
    setPoolName,
    setStep,
  };
};

export default useCreateTokenWeights;
