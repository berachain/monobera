"use client";

import { useEffect, useState } from "react";
import {
  ERC2MODULE_PRECOMPILE_ADDRESS,
  useBeraJs,
  useLatestBlock,
  usePollAllowance,
  usePollAssetWalletBalance,
  usePollPools,
  usePollPreviewSwapExact,
  type Pool,
  type Token,
  type WeightedToken,
} from "@bera/berajs";
import { parseUnits } from "viem";

export enum SwapKind {
  GIVEN_IN = 0,
  GIVEN_OUT = 1,
}

export const useSwap = () => {
  const [selectedTo, setSelectedTo] = useState<Token | undefined>(undefined);

  const [selectedPool, setSelectedPool] = useState<Pool | undefined>(undefined);

  const [fromAmount, setFromAmount] = useState(0);

  const [toAmount, setToAmount] = useState(0);

  const [swapKind, setSwapKind] = useState<SwapKind>(SwapKind.GIVEN_IN);

  // eslint-disable-next-line
  const [payload, setPayload] = useState<any[]>([]);

  usePollAssetWalletBalance();
  const { usePools } = usePollPools();
  const { isConnected } = useBeraJs();
  const pools = usePools();

  const [selectedFrom, setSelectedFrom] = useState<Token | undefined>(
    undefined,
  );

  const { useAllowance } = usePollAllowance({
    contract: ERC2MODULE_PRECOMPILE_ADDRESS,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const block = useLatestBlock();
  const { usePreviewSwapExact } = usePollPreviewSwapExact(
    selectedPool?.address ?? "",
    swapKind === SwapKind.GIVEN_IN ? fromAmount : toAmount,
    swapKind === SwapKind.GIVEN_IN ? selectedFrom : selectedTo,
    swapKind === SwapKind.GIVEN_IN ? selectedTo : selectedFrom,
  );

  const previewSwapAmount = usePreviewSwapExact();

  useEffect(() => {
    const selectedPool = pools?.find((pool: Pool) =>
      pool.weights.some(
        (w: WeightedToken) => w.address === selectedFrom?.address,
      ),
    );
    if (selectedPool) {
      setSelectedTo(
        selectedPool.weights.find(
          (w: WeightedToken) => w.address !== selectedFrom?.address,
        ),
      );
      setSelectedPool(selectedPool);
    }
  }, [selectedFrom]);

  useEffect(() => {
    swapKind === SwapKind.GIVEN_IN
      ? setToAmount(previewSwapAmount)
      : setFromAmount(previewSwapAmount);
  }, [previewSwapAmount]);

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
    isConnected,
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
    pools,
    selectedPool,
    previewSwapAmount,
  };
};
