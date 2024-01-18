"use client";

import { useEffect, useState } from "react";
import {
  TransactionActionType,
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
import BigNumber from "bignumber.js";
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

  const [isTyping, setIsTyping] = useState(false);

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

  const [fromAmount, setFromAmount] = useState<string | undefined>(undefined);

  const [toAmount, setToAmount] = useState<string | undefined>(undefined);

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
    message: isMint
      ? `Mint ${Number(toAmount).toFixed(2)} Honey`
      : `Redeem ${Number(fromAmount).toFixed(2)} Honey`,
    actionType: isMint
      ? TransactionActionType.MINT_HONEY
      : TransactionActionType.REDEEM_HONEY,
  });

  const { usePreviewMint } = usePollPreviewMint(
    collateral,
    (fromAmount ?? "0") as `${number}`,
  );
  const previewMint = usePreviewMint();
  const { usePreviewMintGivenOut } = usePollPreviewMintGivenOut(
    collateral,
    (toAmount ?? "0") as `${number}`,
  );
  const previewMintGivenOut = usePreviewMintGivenOut();
  const { usePreviewRedeemGivenOut } = usePollPreviewRedeemGivenOut(
    collateral,
    (toAmount ?? "0") as `${number}`,
  );

  const previewRedeemGivenOut = usePreviewRedeemGivenOut();
  const { usePreviewRedeem } = usePollPreviewRedeem(
    collateral,
    (fromAmount ?? "0") as `${number}`,
  );
  const previewRedeem = usePreviewRedeem();

  useEffect(() => {
    if (isMint && givenIn && previewMint !== undefined) {
      setToAmount(previewMint);
    } else if (!previewMint && Number(fromAmount) === 0 && isMint && givenIn) {
      setToAmount("");
    }
    if (!isMint && givenIn && previewRedeem) {
      setToAmount(previewRedeem);
    } else if (
      !previewRedeem &&
      Number(fromAmount) === 0 &&
      !isMint &&
      givenIn
    ) {
      setToAmount("");
    }

    if (isMint && !givenIn && previewMintGivenOut) {
      setFromAmount(previewMintGivenOut);
    } else if (
      !previewMintGivenOut &&
      Number(toAmount) === 0 &&
      isMint &&
      givenIn === false
    ) {
      setFromAmount("");
    }

    if (!isMint && givenIn === false && previewRedeemGivenOut !== undefined) {
      setFromAmount(previewRedeemGivenOut);
    } else if (
      previewRedeemGivenOut === undefined &&
      Number(fromAmount) === 0 &&
      !isMint &&
      givenIn
    ) {
      setFromAmount("");
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
    setGivenIn(!givenIn);
  };

  useEffect(() => {
    if (isMint && account) {
      const payload = [
        account,
        selectedFrom?.address,
        parseUnits((fromAmount ?? "0") as `${number}`, 18),
      ];
      setPayload(payload);
    }
    if (!isMint && account) {
      const payload = [
        account,
        parseUnits((fromAmount ?? "0") as `${number}`, 18),
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
      BigNumber(allowance?.formattedAllowance).eq("0") ||
      BigNumber(fromAmount ?? "0").gt(allowance?.formattedAllowance ?? "0")
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
    isTyping,
    setIsTyping,
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
