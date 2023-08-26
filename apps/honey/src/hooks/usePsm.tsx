"use client";

import { useEffect, useState } from "react";
import {
  useBeraJs,
  usePollAllowance,
  usePollBalance,
  type Token,
} from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import { parseUnits } from "viem";

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

  const [payload, setPayload] = useState<any[]>([]);

  const { isConnected, account } = useBeraJs();

  const { useAllowance } = usePollAllowance({
    contract: process.env.NEXT_PUBLIC_ERC20_HONEY_ADDRESS as string,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  // const block = useLatestBlock();

  const [fee, fee2] = useFees();

  const { write, isLoading, ModalPortal } = useTxn({
    message: isMint ? "Mint Honey" : "Redeem Honey",
  });

  const onSwitch = () => {
    const tempFromAmount = fromAmount;
    const tempToAmount = toAmount;

    const tempFrom = selectedFrom;
    const tempTo = selectedTo;

    setSelectedFrom(tempTo);
    setSelectedTo(tempFrom);

    setFromAmount(tempToAmount);
    setToAmount(tempFromAmount);
  };

  useEffect(() => {
    if (isMint && account) {
      const payload = [
        account,
        stgUsd.address,
        parseUnits(`${fromAmount}`, 18),
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
  }, [isMint, account, fromAmount, toAmount]);

  const [needsApproval, setNeedsApproval] = useState(false);

  const validInput = Boolean(
    Number(payload[2] > 0) &&
      Number(payload[2]) <= Number(fromBalance?.formattedBalance),
  );

  useEffect(() => {
    if (
      allowance?.formattedAllowance === "0" ||
      Number(allowance?.formattedAllowance) < fromAmount
    ) {
      if (!needsApproval) setNeedsApproval(true);
    } else {
      if (needsApproval) setNeedsApproval(false);
    }
  }, [fromAmount, allowance]);
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
    onSwitch,
    ModalPortal,
    needsApproval,
    validInput,
  };
};
