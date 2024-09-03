"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BalanceToken,
  getSafeNumber,
  POOLID,
  usePollWalletBalances,
  type Token,
} from "@bera/berajs";
import { nativeTokenAddress, beraTokenAddress } from "@bera/config";
import { isAddress } from "viem";

export interface ITokenWeight {
  weight: number;
  locked: boolean;
  token: Token | undefined;
  initialLiquidity: string;
  rateProvider?: string;
  cacheTime?: number;
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
    rateProvider: undefined,
    cacheTime: undefined,
  },
  {
    weight: 50,
    locked: false,
    token: undefined,
    initialLiquidity: "",
    rateProvider: undefined,
    cacheTime: undefined,
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

export const SWAPFEE = {
  [POOLID.WEIGHTED]: 0.01,
  [POOLID.STABLE]: 0.01,
  [POOLID.METASTABLE]: 0.01,
};

export enum WeightedPoolType {
  EQUAL = "Equal",
  EIGHTY_TWENTY = "80/20",
}

/**
 *
 * @brief A state management hook for preparing the creation of a new pool
 */
export const useCreateBalancerPool = () => {
  const [tokenWeights, setTokenWeights] =
    useState<ITokenWeight[]>(defaultTokenWeight);

  const [totalWeight, setTotalWeight] = useState(100);

  const [selectionError, setSelectionError] = useState<Error | undefined>(
    undefined,
  );
  const [liquidityError, setLiquidityError] = useState<Error | undefined>(
    undefined,
  );

  const [weightedPoolType, setWeightedPoolType] = useState<WeightedPoolType>(
    WeightedPoolType.EQUAL,
  );

  const [poolName, setPoolName] = useState<string>("");
  const [poolSymbol, setPoolSymbol] = useState<string>("");

  const [poolId, setPoolId] = useState<number>(POOLID.WEIGHTED);

  useEffect(() => {
    setTokenWeights(defaultTokenWeight);
    setWeightedPoolType(WeightedPoolType.EQUAL);
  }, [poolId]);

  // select token errors
  useEffect(() => {
    const someTokensNotSelected = tokenWeights.some(
      (tw) => tw.token === undefined,
    );

    const hasZeroWeight = tokenWeights.some((item) => item.weight === 0);

    const isInvalidTotalWeight = totalWeight !== 100 || totalWeight > 100;

    const isInvalidTokenListLength = tokenWeights.length < 2;

    const isBothBeras =
      tokenWeights.some((item) => item.token?.address === nativeTokenAddress) &&
      tokenWeights.some((item) => item.token?.address === beraTokenAddress);

    const isInvalidRateProvider = tokenWeights.some(
      (tw) => tw.rateProvider !== undefined && !isAddress(tw.rateProvider),
    );

    const isNotAtleastOneRateProvider =
      poolId === POOLID.METASTABLE &&
      tokenWeights.reduce((acc, tw) => {
        if (tw.rateProvider !== undefined) {
          return acc + 1;
        }
        return acc;
      }, 0) === 0;
    const isInvalidMetastableTuple = tokenWeights.some(
      (tw) => tw.rateProvider !== undefined && tw.cacheTime === undefined,
    );

    if (someTokensNotSelected) {
      setSelectionError(new Error("Need to select tokens."));
    } else if (isInvalidTotalWeight) {
      setSelectionError(new Error("Invalid total weight."));
    } else if (hasZeroWeight) {
      setSelectionError(new Error("Invalid total weight."));
    } else if (isInvalidTokenListLength) {
      setSelectionError(new Error("Invalid amount of tokens selected."));
    } else if (isBothBeras) {
      setSelectionError(
        new Error("Cannot select native BERA and wrapped BERA."),
      );
    } else if (isNotAtleastOneRateProvider) {
      setSelectionError(new Error("Need to input rate providers."));
    } else if (isInvalidRateProvider) {
      setSelectionError(new Error("Invalid rate provider address."));
    } else if (isInvalidMetastableTuple) {
      setSelectionError(
        new Error(
          "Need to input cache times for rows with selected rate providers.",
        ),
      );
    } else {
      setSelectionError(undefined);
    }
  }, [tokenWeights, totalWeight]);

  const { data: tokenBalances } = usePollWalletBalances();

  useEffect(() => {
    if (selectionError !== undefined) return;
    const isInvalidInitialLiquidity = !tokenWeights.every(
      (item) => getSafeNumber(item.initialLiquidity) !== 0,
    );
    const isInitialLiquidityExceedingBalance = tokenWeights.some((item) => {
      if (!item.token) return false;
      const foundToken = tokenBalances?.find(
        (tokenBalance: BalanceToken) =>
          tokenBalance.address.toLowerCase() ===
          item.token?.address?.toLowerCase(),
      );

      if (!foundToken) return false;
      return (
        Number(foundToken.formattedBalance ?? 0) <
        getSafeNumber(item.initialLiquidity)
      );
    });
    if (isInvalidInitialLiquidity) {
      setLiquidityError(new Error("Must add initial liquidity."));
    } else if (isInitialLiquidityExceedingBalance) {
      setLiquidityError(new Error("Initial liquidity greater than balance."));
    } else {
      setLiquidityError(undefined);
    }
  }, [tokenWeights, tokenBalances, selectionError]);

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
    const stringArray = tokenWeights.map(
      (tokenWeight) =>
        `${tokenWeight.weight}${tokenWeight.token?.symbol || ""}`,
    );

    if (poolId === POOLID.METASTABLE) {
      stringArray.push("METASTABLE");
    }
    if (poolId === POOLID.STABLE) {
      stringArray.push("STABLE");
    }

    const formattedString = stringArray.join("-");

    setPoolName((prevPoolName) => {
      if (prevPoolName !== formattedString) {
        return formattedString;
      }
      return prevPoolName;
    });
    setPoolSymbol((prevPoolName) => {
      if (prevPoolName !== formattedString) {
        return formattedString;
      }
      return prevPoolName;
    });
  }, [tokenWeights, poolId]);

  const onAddToken = () => {
    if (tokenWeights.length >= 4) {
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

  const onTokenRateProviderChange = (index: number, rateProvider: string) => {
    const updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    // @ts-ignore
    updatedTokenWeights[index].rateProvider = rateProvider;

    setTokenWeights(updatedTokenWeights);
  };

  const onTokenCacheTimeChange = (index: number, cacheTime: number) => {
    const updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    // @ts-ignore
    updatedTokenWeights[index].cacheTime = cacheTime;

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

  const onWeightedPoolTypeChange = useCallback(
    (type: string) => {
      if (type === WeightedPoolType.EIGHTY_TWENTY) {
        setTokenWeights((prevWeights) => [
          { ...prevWeights[0], weight: 80, locked: true },
          { ...prevWeights[1], weight: 20, locked: true },
        ]);
        setWeightedPoolType(WeightedPoolType.EIGHTY_TWENTY);
      } else if (type === WeightedPoolType.EQUAL) {
        setTokenWeights((prevWeights) => [
          { ...prevWeights[0], weight: 50, locked: false },
          { ...prevWeights[1], weight: 50, locked: false },
        ]);
        setWeightedPoolType(WeightedPoolType.EQUAL);
      }
    },
    [setTokenWeights, setWeightedPoolType],
  );

  return {
    tokenWeights,
    totalWeight,
    selectionError,
    liquidityError,
    poolName,
    isInitialLiquidityDisabled: selectionError !== undefined,
    isPoolNameDisabled: liquidityError !== undefined,
    isPoolCreationDisabled:
      liquidityError !== undefined || selectionError !== undefined,
    weightedPoolType,
    poolSymbol,
    setPoolSymbol,
    setWeightedPoolType,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenWeightChange,
    onTokenBalanceChange,
    onLock,
    onUnlock,
    setPoolName,
    poolId,
    setPoolId,
    onWeightedPoolTypeChange,
    onTokenRateProviderChange,
    onTokenCacheTimeChange,
  };
};
