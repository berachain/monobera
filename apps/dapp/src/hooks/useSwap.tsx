"use client";

import { useEffect, useState } from "react";
import { type SwapInfo } from "@bera/bera-router";
import {
  ERC2MODULE_PRECOMPILE_ADDRESS,
  useLatestBlock,
  usePollAllowance,
  usePollAssetWalletBalance,
  usePollPools,
  type Pool,
  type Token,
} from "@bera/berajs";
import { parseUnits, formatUnits } from 'viem';
import { type Address } from "wagmi";

import { useRouter } from "~/context/routerContext";

export enum SwapKind {
  GIVEN_IN = 0,
  GIVEN_OUT = 1,
}

export const useSwap = () => {
  const [selectedTo, setSelectedTo] = useState<Token | undefined>(undefined);

  const [selectedPool] = useState<Pool | undefined>(undefined);

  const [fromAmount, setFromAmount] = useState(0);

  const [toAmount, setToAmount] = useState(0);

  const [swapAmount, setSwapAmount] = useState(0);

  const [swapKind, setSwapKind] = useState<SwapKind>(SwapKind.GIVEN_IN);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string[]>([]);

  // eslint-disable-next-line
  const [payload, setPayload] = useState<any[]>([]);

  usePollAssetWalletBalance();
  const { usePools } = usePollPools();

  const pools = usePools();

  const { router } = useRouter();

  const [selectedFrom, setSelectedFrom] = useState<Token | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchData = async () => {
      if (selectedFrom && selectedTo && swapAmount !== 0) {
        const parsedSwapAmount = parseUnits(
          `${swapAmount ?? 0}`,
          swapKind === SwapKind.GIVEN_IN
            ? selectedFrom.decimals
            : selectedTo.decimals,
        );
        try {
          console.log('WTFFF')
          setIsLoading(true);
          const t: SwapInfo = await router.getSwaps(
            selectedFrom?.address as Address,
            selectedTo?.address as Address,
            swapKind === SwapKind.GIVEN_IN ? 0 : 1,
            parsedSwapAmount,
          );


          if (swapKind === SwapKind.GIVEN_IN) {
            setToAmount(Number(formatUnits(t.returnAmount ?? 0n, selectedTo?.decimals ?? 18)));
          } else {
            setFromAmount(Number(formatUnits(t.returnAmount ?? 0n, selectedFrom?.decimals ?? 18)));
          } 
          setIsLoading(false);
          return
        } catch (error: any) {
          setError(error);
          setIsLoading(false);
          return
        }
      }
    };

    void fetchData();
  }, [selectedFrom, selectedTo, fromAmount, toAmount, swapAmount]);

  const { useAllowance } = usePollAllowance({
    contract: ERC2MODULE_PRECOMPILE_ADDRESS,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const block = useLatestBlock();

  useEffect(() => {
    const deadline = block + 10000n;
    const payload = [
      swapKind,
      selectedPool?.address,
      selectedFrom?.address,
      parseUnits(`${fromAmount ?? 0}`, selectedFrom?.decimals ?? 18),
      selectedTo?.address,
      parseUnits(`${toAmount ?? 0}`, selectedTo?.decimals ?? 18),
      deadline,
    ];
    setPayload(payload);
  }, [block, swapKind, fromAmount, selectedFrom, toAmount, selectedTo]);
  return {
    payload,
    setSwapKind,
    setSelectedFrom,
    selectedFrom,
    allowance,
    selectedTo,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    swapKind,
    setSelectedTo,
    setSwapAmount,
    pools,
    selectedPool,
    previewSwapAmount: "0",
    isLoading,
    error
  };
};
