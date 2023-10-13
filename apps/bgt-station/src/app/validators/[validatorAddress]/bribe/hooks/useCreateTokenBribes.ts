"use client";

import { useEffect, useState } from "react";
import {
  useBeraConfig,
  usePollAllowances,
  usePollAssetWalletBalance,
  usePollEpochs,
  type Token,
} from "@bera/berajs";
import { parseUnits } from "viem";
import { type Address } from "wagmi";

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

const useCreateTokenBribes = (validatorAddress: string) => {
  const { useCurrentEpoch, isLoading } = usePollEpochs();

  const currentEpoch = useCurrentEpoch();
  const { networkConfig } = useBeraConfig();
  const [epoch, setEpoch] = useState<number | undefined>(undefined);
  const [epochError, setEpochError] = useState<Error | undefined>(undefined);
  const [tokenBribes, setTokenBribes] = useState<ITokenBribe[]>([]);
  const [proposals, setProposals] = useState(String(100));
  const [error, setError] = useState<Error | undefined>(undefined);
  const [payload, setPayload] = useState<any[]>([]);
  const [needsApproval, setNeedsApproval] = useState<Token[]>([]);

  const t: Token[] = tokenBribes
    .filter((tokenWeight: ITokenBribe) => tokenWeight.token !== undefined)
    .map((tokenWeight) => tokenWeight.token) as Token[];

  const { useCurrentAllowancesForContract } = usePollAllowances({
    contract: networkConfig.precompileAddresses.erc20ModuleAddress as Address,
    tokens: t,
  });

  const allowances = useCurrentAllowancesForContract();

  useEffect(() => {
    if (allowances) {
      const needsApproval = allowances
        ?.map((allowance) => {
          const token = tokenBribes.find(
            (tokenWeight: ITokenBribe) =>
              tokenWeight.token?.address === allowance.address,
          );
          if (
            allowance.formattedAllowance === "0" ||
            Number(allowance.formattedAllowance) < (token?.total ?? 0)
          ) {
            return allowance;
          }
        })
        .filter((token) => token !== undefined) as Token[];
      setNeedsApproval(needsApproval);
    }
  }, [allowances]);

  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { data: tokens } = useCurrentAssetWalletBalances();

  useEffect(() => {
    const tokenAddress = tokenBribes.map(
      (bribe: ITokenBribe) => bribe.token?.address,
    );
    const tokenAmounts = tokenBribes.map((bribe: ITokenBribe) =>
      parseUnits(`${bribe.total}`, bribe.token?.decimals ?? 18),
    );
    const newPayload = [
      validatorAddress as `0x${string}`,
      BigInt.asIntN(64, parseUnits(`${Number(epoch ?? 0)}`, 0)),
      BigInt.asUintN(64, parseUnits(`${Number(proposals ?? 0)}`, 0)),
      tokenAddress as `0x${string}`[],
      tokenAmounts,
    ];
    setPayload(newPayload);
  }, [currentEpoch, epoch, proposals, tokenBribes]);

  // handle epoch state on load and check for epoch errors
  useEffect(() => {
    setEpochError(undefined);
    if (currentEpoch !== undefined) {
      setEpoch(currentEpoch + 1);
    } else {
      const isInvalidEpoch = currentEpoch < currentEpoch + 1;
      if (isInvalidEpoch) {
        setEpochError(new InvalidInputError("Invalid Epoch"));
      }
    }
  }, [currentEpoch, isLoading]);

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
            const foundToken = tokens?.find(
              (t: any) => t.address === item?.token?.address,
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
  }, [tokenBribes, tokens, proposals]);

  const onAddToken = () => {
    let updatedTokenBribes: ITokenBribe[] = [...tokenBribes];
    updatedTokenBribes = [
      ...updatedTokenBribes,
      { token: undefined, bribe: 0, total: 0 },
    ];
    setTokenBribes(updatedTokenBribes);
  };

  const onRemove = (index: number) => {
    const updatedTokenBribes: ITokenBribe[] = [
      ...tokenBribes.slice(0, index),
      ...tokenBribes.slice(index + 1),
    ];

    setTokenBribes(updatedTokenBribes);
  };

  const onTokenBribeChange = (index: number, bribe: number) => {
    const updatedTokenBribes: ITokenBribe[] = [...tokenBribes];
    // @ts-ignore
    updatedTokenBribes[index] = {
      ...updatedTokenBribes[index],

      bribe,
      total: bribe * Number(proposals),
    };

    setTokenBribes(updatedTokenBribes);
  };

  const onTokenTotalChange = (index: number, total: number) => {
    const updatedTokenBribes: ITokenBribe[] = [...tokenBribes];
    // @ts-ignore
    updatedTokenBribes[index] = {
      ...updatedTokenBribes[index],
      bribe: total / Number(proposals),
      total,
    };

    setTokenBribes(updatedTokenBribes);
  };

  const onTokenSelection = (token: Token, index: number) => {
    const updatedTokenBribes: ITokenBribe[] = [...tokenBribes];
    const selectedTokenIndex = updatedTokenBribes.findIndex(
      (selectedToken) => selectedToken?.token?.address === token.address,
    );

    if (selectedTokenIndex === -1) {
      // @ts-ignore
      updatedTokenBribes[index].token = token;
    } else {
      // @ts-ignore
      updatedTokenBribes[selectedTokenIndex].token = undefined;
      // @ts-ignore
      updatedTokenBribes[index].token = token;
    }

    setTokenBribes(updatedTokenBribes);
  };

  return {
    proposals,
    tokenBribes,
    error,
    epoch,
    epochError,
    payload,
    needsApproval,
    setEpoch,
    setProposals,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenBribeChange,
    onTokenTotalChange,
  };
};

export default useCreateTokenBribes;
