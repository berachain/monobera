"use client";

import { useEffect, useState } from "react";
import {
  ERC2MODULE_PRECOMPILE_ADDRESS,
  useBeraJs,
  usePollAllowance,
  usePollBalance,
  type Token,
} from "@bera/berajs";
import { parseUnits } from "viem";

import { honey, stgUsd } from "~/config/tokens";
import { useFees } from "./useFees";
import { useTxn } from "./useTxn";

export const useSwap = () => {
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
  // eslint-disable-next-line
  const [payload, setPayload] = useState<any[]>([]);

  const { isConnected, account } = useBeraJs();

  const { useAllowance } = usePollAllowance({
    contract: ERC2MODULE_PRECOMPILE_ADDRESS,
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
        {
          amount: parseUnits(`${fromAmount}`, 18),
          denom: "stgusdc",
        },
      ];
      setPayload(payload);
    }
    if (!isMint && account) {
      const payload = [account, parseUnits(`${fromAmount}`, 18), "stgusdc"];
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
