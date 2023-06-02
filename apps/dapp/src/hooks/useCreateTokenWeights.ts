/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { type Token } from "@bera/berajs";

export interface ITokenWeight {
  weight: number;
  locked: boolean;
  token: Token | undefined;
  initialLiquidity: number;
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
    initialLiquidity: 0,
  },
  {
    weight: 50,
    locked: false,
    token: undefined,
    initialLiquidity: 0,
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

const useCreateTokenWeights = () => {
  const [tokenWeights, setTokenWeights] =
    useState<ITokenWeight[]>(defaultTokenWeight);

  const [totalWeight, setTotalWeight] = useState(100);

  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    setError(undefined);

    // Check for errors in tokenWeights
    const hasZeroWeight = tokenWeights.some((item) => item.weight === 0);
    const isInvalidTotalWeight = totalWeight !== 100 || totalWeight > 100;
    const isUndefinedToken = tokenWeights.some(
      (item) => item.token === undefined,
    );
    const isInvalidTokenListLength = tokenWeights.length < 2;

    if (hasZeroWeight) {
      setError(new InvalidInputError("Weight cannot be 0"));
    } else if (isInvalidTotalWeight) {
      setError(new InvalidInputError("The total weight must be 100%"));
    } else if (isUndefinedToken) {
      setError(new InvalidInputError("Tokens must be selected"));
    } else if (isInvalidTokenListLength) {
      setError(new InvalidInputError("At least 2 tokens must be selected"));
    } else {
      setError(undefined);
    }
  }, [tokenWeights, totalWeight, setError]);

  // track total weight
  useEffect(() => {
    const weight = tokenWeights.reduce((acc, { weight }) => acc + weight, 0);
    setTotalWeight(weight);
  }, [tokenWeights, setTotalWeight]);

  // update weights
  useEffect(() => {
    const updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    const lockedValueWeights = getTotalWeightOfLockedItems(updatedTokenWeights);
    const remainingWeight = 100 - lockedValueWeights;

    const numberOfUnlockedItems =
      getTotalUnlockedItemsCount(updatedTokenWeights);

    const outstandingWeightPerItem = Math.floor(
      remainingWeight / numberOfUnlockedItems,
    );

    let updated = false; // Track if any changes were made to tokenWeights

    updatedTokenWeights.forEach((item: ITokenWeight, i: number) => {
      if (!item.locked && item.weight !== outstandingWeightPerItem) {
        // @ts-ignore
        updatedTokenWeights[i].weight =
          outstandingWeightPerItem > 0 ? outstandingWeightPerItem : 0;
        updated = true;
      }
    });

    if (updated) {
      setTokenWeights(updatedTokenWeights);
    }
  }, [tokenWeights, setTokenWeights]);

  const onAddToken = () => {
    if (tokenWeights.length >= 8) {
      return;
    }
    let updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    updatedTokenWeights = [
      ...updatedTokenWeights,
      { token: undefined, locked: false, weight: 0, initialLiquidity: 0 },
    ];
    setTokenWeights(updatedTokenWeights);
  };

  const onRemove = (index: number) => {
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

  const onTokenBalanceChange = (index: number, amount: number) => {
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

  const onTokenSelection = (token: Token, index: number) => {
    const updatedTokenWeights: ITokenWeight[] = [...tokenWeights];
    // @ts-ignore
    updatedTokenWeights[index].token = token;

    setTokenWeights(updatedTokenWeights);
  };

  return {
    tokenWeights,
    totalWeight,
    error,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenWeightChange,
    onTokenBalanceChange,
    onLock,
    onUnlock,
  };
};

export default useCreateTokenWeights;
