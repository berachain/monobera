"use client";

import { useEffect, useState } from "react";
import {
  useBeraJs,
  usePollAllowance,
  usePollBalance,
  usePollHoneyParams,
  usePollPreviewMint,
  usePollPreviewRedeem,
  useTokens,
  type Token,
} from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import { parseUnits, type Address, getAddress } from "viem";
import { honeyTokenAddress } from "~/config";

export const usePsm = () => {
  const { tokenDictionary, tokenList } = useTokens();
  const collateralList = tokenList?.filter((token: any) =>
    token.tags?.includes("collateral"),
  );

  const defaultCollateral = collateralList?.find((token: any) =>
    token.tags.includes("defaultCollateral"),
  );
  const honey = tokenDictionary
    ? tokenDictionary[getAddress(honeyTokenAddress) ]
    : undefined;

  const [selectedTo, setSelectedTo] = useState<Token | undefined>(undefined);

  const [selectedFrom, setSelectedFrom] = useState<Token | undefined>(
    undefined,
  );

  const [_givenIn, setGivenIn] = useState<boolean>(true);

  // console.log('h',honey);
  // console.log('bbb',collateralList);
  // console.log('cas',defaultCollateral);
  useEffect(() => {
    if (
      defaultCollateral &&
      honey &&
      selectedFrom === undefined &&
      selectedTo === undefined
    ) {
      setSelectedFrom(defaultCollateral);
      setSelectedTo(honey);
    }
  }, [collateralList, honey]);

  const [fromAmount, setFromAmount] = useState(0);

  const [toAmount, setToAmount] = useState(0);

  const isMint = selectedFrom?.address !== honey?.address;

  const collateral = isMint ? selectedFrom : selectedTo;

  const { useBalance: useFromBalance } = usePollBalance({
    address: selectedFrom?.address,
  });

  const fromBalance = useFromBalance();

  const { useBalance: useToBalance } = usePollBalance({
    address: selectedTo?.address,
  });

  const toBalance = useToBalance();

  const [payload, setPayload] = useState<any[]>([]);

  const { isConnected, account } = useBeraJs();

  const { useAllowance } = usePollAllowance({
    contract: honeyTokenAddress,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const { useHoneyParams } = usePollHoneyParams();

  const params = useHoneyParams(
    collateral ? (collateral.address as Address) : undefined,
  );

  // console.log("params", params);

  const fee = params ? (isMint ? params.mintFee : params.redeemFee) : undefined;
  // const block = useLatestBlock();

  // const [fee, fee2] = useFees();

  const { write, isLoading, ModalPortal } = useTxn({
    message: isMint ? "Mint Honey" : "Redeem Honey",
  });

  const { usePreviewMint } = usePollPreviewMint(collateral, fromAmount);
  const previewMint = usePreviewMint();

  const { usePreviewRedeem } = usePollPreviewRedeem(collateral, fromAmount);
  const previewRedeem = usePreviewRedeem();

  // const { usePreviewRedeem: usePreviewMintGivenOut } = usePollPreviewRedeem(collateral, collateralAmountGivenOut);
  // const previewRedeemGivenOut = usePreviewMintGivenOut()
  // console.log('prgo',previewRedeemGivenOut)

  // console.log("previewMint", previewMint);
  // console.log("previewRedeem", previewRedeem);
  useEffect(() => {
    if (isMint) {
      setToAmount(Number(previewMint));
    }
    if (!isMint) {
      setToAmount(Number(previewRedeem));
    }
  }, [previewMint, previewRedeem]);

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
        selectedFrom?.address,
        parseUnits(`${fromAmount}`, 18),
      ];
      setPayload(payload);
    }
    if (!isMint && account) {
      const payload = [
        account,
        parseUnits(`${fromAmount}`, 18),
        selectedTo?.address,
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
    fee,
    setSelectedTo,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    isMint,
    fromBalance,
    toBalance,
    onSwitch,
    ModalPortal,
    setGivenIn,
    needsApproval,
    validInput,
    honey,
    collateralList,
  };
};
