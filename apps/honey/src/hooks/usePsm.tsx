"use client";

import { useEffect, useState } from "react";
import {
  useBeraConfig,
  useBeraJs,
  usePollAllowance,
  usePollBalance,
  type Token,
} from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import { parseUnits, type Address } from "viem";

import { honey, stgUsd } from "~/config/tokens";
import { useFees } from "./useFees";

export const usePsm = () => {
  const [selectedTo, setSelectedTo] = useState<Token>(honey);

  const [selectedFrom, setSelectedFrom] = useState<Token>(stgUsd);

  const [fromAmount, setFromAmount] = useState(0);

  const [toAmount, setToAmount] = useState(0);

  const isMint = selectedFrom.address === stgUsd.address;

  const { useBalance: useFromBalance } = usePollBalance({
    address: selectedFrom.address,
  });

  const fromBalance = useFromBalance();

  const { useBalance: useToBalance } = usePollBalance({
    address: selectedTo.address,
  });

  const toBalance = useToBalance();
  console.log(fromBalance);
   
  const [payload, setPayload] = useState<any[]>([]);

  const { isConnected, account } = useBeraJs();
  const { networkConfig } = useBeraConfig();
  const { useAllowance } = usePollAllowance({
    contract: '0x7B44CdD81a8a25EFc1842AC2A2546C3B6e6A3fE2',
    token: selectedFrom,
  });

  const allowance = useAllowance();

  // const block = useLatestBlock();

  const [fee, fee2] = useFees();

  const { write, isLoading } = useTxn({
    message: isMint ? "Mint Honey" : "Redeem Honey",
  });
  useEffect(() => {
    if (isMint && account) {
      const payload = [
        account,
        stgUsd.address,
        parseUnits(`${fromAmount}`, 18)
      ];
      setPayload(payload);
    }
    if (!isMint && account) {
      const payload = [
        account,
        parseUnits(`${fromAmount}`, 18),
        stgUsd.address,
      ];      
      setPayload(payload);
    }
    // const deadline = block + 10000n;
    // const payload = [
    //   selectedFrom?.address,
    //   parseUnits(`${fromAmount ?? 0}`, selectedFrom?.decimals ?? 18),
    //   selectedTo?.address,
    //   parseUnits(`${toAmount ?? 0}`, selectedTo?.decimals ?? 18),
    //   deadline,
    // ];
  }, [isMint, account, fromAmount, toAmount]);
  console.log('payload', allowance)
  return {
    payload,
    isConnected,
    setSelectedFrom,
    allowance,
    isLoading,
    write,
    selectedFrom,
    selectedTo,
    setSelectedTo,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    isMint,
    fromBalance,
    toBalance,
    fee,
    fee2,
  };
};
