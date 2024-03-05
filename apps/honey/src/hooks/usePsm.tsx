"use client";

import { useEffect, useState } from "react";
import {
  TransactionActionType,
  useBeraJs,
  usePollAllowance,
  usePollBalance,
  usePollHoneyParams,
  usePollHoneyPreview,
  useTokens,
  type Token,
} from "@bera/berajs";
import { honeyRouterAddress, honeyTokenAddress } from "@bera/config";
import { useTxn } from "@bera/shared-ui";
import BigNumber from "bignumber.js";
import { getAddress, parseUnits, type Address } from "viem";

export const usePsm = () => {
  const [isTyping, setIsTyping] = useState(false);

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
    if (defaultCollateral && honey && !selectedFrom && !selectedTo) {
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

  const { isReady, account } = useBeraJs();

  const { useAllowance } = usePollAllowance({
    contract: honeyRouterAddress,
    token: selectedFrom,
  });

  const allowance = useAllowance();

  const { useHoneyParams, isLoading: isFeeLoading } = usePollHoneyParams(
    collateralList?.map((token: any) => token.address) ?? [],
  );

  const params = useHoneyParams(
    collateral ? (collateral.address as Address) : undefined,
  );

  const fee = params ? (isMint ? params.mintFee : params.redeemFee) : 0;

  const {
    write,
    isLoading: isUseTxnLoading,
    ModalPortal,
  } = useTxn({
    message: isMint
      ? `Mint ${Number(toAmount).toFixed(2)} Honey`
      : `Redeem ${Number(fromAmount).toFixed(2)} Honey`,
    actionType: isMint
      ? TransactionActionType.MINT_HONEY
      : TransactionActionType.REDEEM_HONEY,
  });

  const { useHoneyPreview, isLoading: isHoneyPreviewLoading } =
    usePollHoneyPreview(
      isTyping ? undefined : collateral,
      (givenIn ? fromAmount : toAmount) ?? "0",
      isMint,
      givenIn,
    );
  const honeyPreview = useHoneyPreview();

  useEffect(() => {
    if (givenIn) setToAmount(honeyPreview);
    else setFromAmount(honeyPreview);
  }, [honeyPreview]);

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

  const payload = [
    collateral?.address,
    parseUnits(
      fromAmount ?? "0",
      (isMint ? collateral?.decimals : honey?.decimals) ?? 18,
    ),
    account ?? "",
  ];

  const needsApproval = BigNumber(fromAmount ?? "0").gt(
    allowance?.formattedAllowance ?? "0",
  );
  const exceedBalance = BigNumber(fromAmount ?? "0").gt(
    fromBalance?.formattedBalance ?? "0",
  );

  const isLoading = isUseTxnLoading || isHoneyPreviewLoading;
  return {
    account,
    payload,
    allowance,
    setSelectedFrom,
    isLoading,
    write,
    selectedFrom,
    selectedTo,
    fee,
    isReady,
    isFeeLoading,
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
    exceedBalance,
    honey,
    collateralList,
    setIsTyping,
    isTyping,
  };
};
