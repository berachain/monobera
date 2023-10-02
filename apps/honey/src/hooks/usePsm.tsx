"use client";

import { useEffect, useState } from "react";
import {
  useBeraJs,
  usePollAllowance,
  usePollBalance,
  usePollHoneyParams,
  usePollPreviewMint,
  usePollPreviewMintGivenOut,
  usePollPreviewRedeem,
  usePollPreviewRedeemGivenOut,
  useTokens,
  type Token,
} from "@bera/berajs";
import { erc20HoneyAddress, honeyTokenAddress } from "@bera/config";
import { useTxn } from "@bera/shared-ui";
import { getAddress, parseUnits, type Address } from "viem";

export const usePsm = () => {
  const { tokenDictionary, tokenList } = useTokens();
  const collateralList = tokenList?.filter((token: any) =>
    token.tags?.includes("collateral"),
  );
  const defaultCollateral = collateralList?.find((token: any) =>
    token.tags.includes("defaultCollateral"),
  );
  const honey = tokenDictionary
    ? tokenDictionary[getAddress(honeyTokenAddress)]
    : undefined;

  const [selectedTo, setSelectedTo] = useState<Token | undefined>(undefined);

  const [selectedFrom, setSelectedFrom] = useState<Token | undefined>(
    undefined,
  );

  const [givenIn, setGivenIn] = useState<boolean>(true);

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
    contract: erc20HoneyAddress,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const { useHoneyParams } = usePollHoneyParams();

  const params = useHoneyParams(
    collateral ? (collateral.address as Address) : undefined,
  );

  const fee = params ? (isMint ? params.mintFee : params.redeemFee) : 0;

  const { write, isLoading, ModalPortal } = useTxn({
    message: isMint ? "Mint Honey" : "Redeem Honey",
  });

  const { usePreviewMint } = usePollPreviewMint(collateral, fromAmount);
  const previewMint = usePreviewMint();
  const { usePreviewMintGivenOut } = usePollPreviewMintGivenOut(
    collateral,
    toAmount,
  );
  const previewMintGivenOut = usePreviewMintGivenOut();
  const { usePreviewRedeemGivenOut } = usePollPreviewRedeemGivenOut(
    collateral,
    toAmount,
  );

  const previewRedeemGivenOut = usePreviewRedeemGivenOut();
  const { usePreviewRedeem } = usePollPreviewRedeem(collateral, fromAmount);
  const previewRedeem = usePreviewRedeem();

  console.log();
  useEffect(() => {
    if (isMint && givenIn && previewMint !== undefined) {
      setToAmount(Number(previewMint));
    } else if (
      previewMint === undefined &&
      fromAmount === 0 &&
      isMint &&
      givenIn
    ) {
      setToAmount(Number(0));
    }
    if (!isMint && givenIn && previewRedeem !== undefined) {
      setToAmount(Number(previewRedeem));
    } else if (
      previewRedeem === undefined &&
      fromAmount === 0 &&
      !isMint &&
      givenIn
    ) {
      setToAmount(Number(0));
    }

    if (isMint && givenIn === false && previewMintGivenOut !== undefined) {
      setFromAmount(Number(previewMintGivenOut));
    } else if (
      previewMintGivenOut === undefined &&
      toAmount === 0 &&
      isMint &&
      givenIn === false
    ) {
      setFromAmount(Number(0));
    }

    if (!isMint && givenIn === false && previewRedeemGivenOut !== undefined) {
      setFromAmount(Number(previewRedeemGivenOut));
    } else if (
      previewRedeemGivenOut === undefined &&
      fromAmount === 0 &&
      !isMint &&
      givenIn
    ) {
      setFromAmount(Number(0));
    }
  }, [previewMint, previewRedeem, previewMintGivenOut, previewRedeemGivenOut]);

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
