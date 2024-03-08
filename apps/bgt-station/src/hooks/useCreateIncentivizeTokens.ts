"use client";

import { useEffect, useState } from "react";
import { usePollAssetWalletBalance, type Token } from "@bera/berajs";
import { beraTokenAddress, nativeTokenAddress } from "@bera/config";
import { getAddress } from "viem";

export interface IncentivizeToken {
  token: Token;
  amount: string;
}

export class InvalidInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidInputError";
  }
}

const defaultIncentivizeTokens: IncentivizeToken[] = [
  {
    token: undefined,
    amount: "",
  },
];

/**
 *
 * @brief A state management hook for preparing the creation of a incentive
 */
const useCreateIncentiveTokens = () => {
  const [incentivizeTokens, setIncentivizeTokens] = useState<
    IncentivizeToken[]
  >(defaultIncentivizeTokens);

  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const [error, setError] = useState<Error | undefined>(undefined);
  const { data: tokens } = useCurrentAssetWalletBalances();

  // track any errors
  useEffect(() => {
    setError(undefined);

    // Check for errors in tokenWeights
    const hasZeroWeight = incentivizeTokens.some(
      (item) => Number(item.amount) === 0,
    );
    const isUndefinedToken = incentivizeTokens.some(
      (item) => item.token === undefined,
    );

    // const isExceedingBalance = incentivizeTokens.some((item) => {
    //   const foundToken = tokens?.find(
    //     (t: any) =>
    //       getAddress(t.address) === getAddress(item?.token?.address ?? ""),
    //   );

    //   return (
    //     Number(foundToken?.formattedBalance ?? 0) < getSafeNumber(item.amount)
    //   );
    // });

    if (hasZeroWeight) {
      setError(new InvalidInputError("Weight cannot be 0"));
    } else if (isUndefinedToken) {
      setError(new InvalidInputError("Tokens must be selected"));
    } else {
      setError(undefined);
    }
  }, [incentivizeTokens, tokens]);

  const onAddToken = () => {
    console.log("add token", incentivizeTokens);
    // TODO: update number here
    if (incentivizeTokens.length >= 8) {
      return;
    }
    let updatedIncentiveTokens: IncentivizeToken[] = [...incentivizeTokens];
    updatedIncentiveTokens = [
      ...updatedIncentiveTokens,
      { token: undefined, amount: "0" },
    ];
    console.log("updatedIncentivedTokens", updatedIncentiveTokens);
    setIncentivizeTokens(updatedIncentiveTokens);
  };

  const onRemove = (index: number) => {
    if (incentivizeTokens.length <= 1) {
      return;
    }
    const updatedIncentiveTokens: IncentivizeToken[] = [
      ...incentivizeTokens.slice(0, index),
      ...incentivizeTokens.slice(index + 1),
    ];

    setIncentivizeTokens(updatedIncentiveTokens);
  };

  const onTokenAmountChange = (index: number, amount: number) => {
    const updatedIncentiveTokens: IncentivizeToken[] = [...incentivizeTokens];
    // @ts-ignore
    updatedIncentiveTokens[index] = {
      ...updatedIncentiveTokens[index],
      amount: amount.toString(),
    };

    setIncentivizeTokens(updatedIncentiveTokens);
  };

  const onTokenSelection = (token: Token | undefined, index: number) => {
    const updatedIncentiveTokens: IncentivizeToken[] = [...incentivizeTokens];
    const selectedTokenIndex = updatedIncentiveTokens.findIndex(
      (selectedToken) => selectedToken?.token?.address === token?.address,
    );

    if (selectedTokenIndex === -1) {
      // @ts-ignore
      updatedIncentiveTokens[index].token = token;
    } else {
      // @ts-ignore
      updatedIncentiveTokens[selectedTokenIndex].token = undefined;
      // @ts-ignore
      updatedIncentiveTokens[index].token = token;
    }
    setIncentivizeTokens(updatedIncentiveTokens);
  };

  return {
    incentivizeTokens,
    error,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenAmountChange,
  };
};

export default useCreateIncentiveTokens;
