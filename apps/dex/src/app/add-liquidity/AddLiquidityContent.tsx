"use client";

import { useCallback, useEffect, useMemo } from "react";
import { notFound, useRouter } from "next/navigation";
import {
  ADDRESS_ZERO,
  TXN_GAS_USED_ESTIMATES,
  TransactionActionType,
  bexAbi,
  useGasData,
  usePollWalletBalances,
  type Token,
} from "@bera/berajs";
import { getAddLiquidityPayload } from "@bera/berajs/actions";
import { beraTokenAddress, cloudinaryUrl, crocDexAddress } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
  FormattedNumber,
  InfoBoxList,
  InfoBoxListItem,
  PreviewToken,
  TokenIcon,
  TokenInput,
  TokenList,
  TxnPreview,
  useSlippage,
  useTxn,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Address, formatUnits, parseUnits } from "viem";

import { isBera, isBeratoken } from "~/utils/isBeraToken";
import { SettingsPopover } from "~/components/settings-popover";
import { getBaseCost, getPoolUrl, getQuoteCost } from "../pools/fetchPools";
import { useAddLiquidity } from "./useAddLiquidity";
import { useSelectedPool } from "~/hooks/useSelectedPool";
import { Skeleton } from "@bera/ui/skeleton";
import { AddLiquiditySuccess } from "@bera/shared-ui/src/txn-modals";

interface IAddLiquidityContent {
  shareAddress: Address;
}

export default function AddLiquidityContent({
  shareAddress,
}: IAddLiquidityContent) {
  const { data: pool, isLoading } = useSelectedPool(shareAddress);
  useEffect(() => {
    if (!pool && !isLoading) {
      notFound();
    }
  }, [pool, isLoading]);

  const router = useRouter();
  const {
    baseToken,
    quoteToken,
    poolPrice,
    error,
    previewOpen,
    tokenInputs,
    needsApproval,
    areAllInputsEmpty,
    isBaseInput,
    setIsBaseInput,
    refreshAllowances,
    reset,
    updateTokenAmount,
    updateTokenExceeding,
    setPreviewOpen,
    beraToken,
    wBeraToken,
    isNativeBera,
    setIsNativeBera,
  } = useAddLiquidity(pool);

  const { refresh } = usePollWalletBalances();
  const { write, ModalPortal } = useTxn({
    message: `Add liquidity to ${pool?.poolName}`,
    onSuccess: () => {
      reset();
      refresh();
    },
    CustomSuccessModal: AddLiquiditySuccess,
    customSuccessModalProps: {
      pool: pool,
    },
    actionType: TransactionActionType.ADD_LIQUIDITY,
  });

  const baseCost = useMemo(() => {
    if (!poolPrice) {
      return 0;
    }
    return getBaseCost(poolPrice);
  }, [poolPrice]);

  const quoteCost = useMemo(() => {
    if (!poolPrice) {
      return 0;
    }
    return getQuoteCost(poolPrice);
  }, [poolPrice]);

  const handleBaseAssetAmountChange = (value: string): void => {
    updateTokenAmount(0, value);
    const parsedBaseCost = parseUnits(
      baseCost.toString(),
      quoteToken?.decimals ?? 18,
    );
    const parsedValue = parseUnits(value, quoteToken?.decimals ?? 18);
    const quoteAmount =
      (parsedBaseCost * parsedValue) /
      BigInt(10 ** (quoteToken?.decimals ?? 18));
    updateTokenAmount(
      1,
      quoteAmount === 0n
        ? ""
        : formatUnits(quoteAmount, quoteToken?.decimals ?? 18),
    );
  };

  const handleQuoteAssetAmountChange = (value: string): void => {
    updateTokenAmount(1, value);
    const parsedQuoteCost = parseUnits(
      quoteCost.toString(),
      baseToken?.decimals ?? 18,
    );
    const parsedValue = parseUnits(value, baseToken?.decimals ?? 18);
    const baseAmount =
      (parsedQuoteCost * parsedValue) /
      BigInt(10 ** (baseToken?.decimals ?? 18));
    updateTokenAmount(
      0,
      baseAmount === 0n
        ? ""
        : formatUnits(baseAmount, baseToken?.decimals ?? 18),
    );
  };

  const slippage = useSlippage();
  const baseTokenInitialLiquidity = tokenInputs[0]?.amount;
  const quoteTokenInitialLiquidity = tokenInputs[1]?.amount;

  const bnBaseAmount = parseUnits(
    baseTokenInitialLiquidity ?? "0",
    baseToken?.decimals ?? 18,
  );

  const bnQuoteAmount = parseUnits(
    quoteTokenInitialLiquidity ?? "0",
    quoteToken?.decimals ?? 18,
  );

  const maxBaseApprovalAmount = useMemo(() => {
    if (!baseTokenInitialLiquidity || !slippage) {
      return 0n;
    }
    const parsedLiq = parseUnits(
      baseTokenInitialLiquidity as string,
      baseToken?.decimals ?? 18,
    );
    const sI = BigInt(parsedLiq);
    // const s = BigInt(((slippage ?? 0) + 0.001) * 10 ** baseToken.decimals);
    const s = parseUnits(
      (slippage ?? 0).toString(), // add a little more just to avoid infininte approval
      baseToken?.decimals ?? 18,
    );
    const minAmountOut =
      (sI ?? 0n) +
      ((sI ?? 0n) * s) / BigInt(100 * 10 ** (baseToken?.decimals ?? 18));
    return minAmountOut;
  }, [baseTokenInitialLiquidity, slippage]);

  const maxQuoteApprovalAmount = useMemo(() => {
    if (!quoteTokenInitialLiquidity || !slippage) {
      return 0n;
    }
    const parsedLiq = parseUnits(
      quoteTokenInitialLiquidity as string,
      quoteToken?.decimals ?? 18,
    );
    const sI = BigInt(parsedLiq);
    // const s = BigInt(((slippage ?? 0) + 0.001) * 10 ** quoteToken.decimals);
    const s = parseUnits(
      (slippage ?? 0).toString(),
      quoteToken?.decimals ?? 18,
    );

    const minAmountOut =
      (sI ?? 0n) +
      ((sI ?? 0n) * s) / BigInt(100 * 10 ** (quoteToken?.decimals ?? 18));

    return minAmountOut;
  }, [quoteTokenInitialLiquidity, slippage]);

  const handleAddLiquidity = useCallback(async () => {
    try {
      setPreviewOpen(false);
      const addLiqPayload = await getAddLiquidityPayload({
        args: {
          slippage: slippage ?? 0,
          poolPrice,
          baseToken: baseToken as Token,
          quoteToken: quoteToken as Token,
          isAmountBaseDenominated: isBaseInput,
          baseAmount: bnBaseAmount,
          quoteAmount: bnQuoteAmount,
          poolIdx: pool?.poolIdx ?? 0,
        },
      });
      if (!addLiqPayload || !addLiqPayload.payload) {
        throw new Error("Error generating transaction payload");
      }
      write({
        address: crocDexAddress,
        abi: bexAbi,
        functionName: "userCmd",
        params: addLiqPayload.payload,
        value: addLiqPayload?.value === 0n ? undefined : addLiqPayload?.value,
      });
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  }, [
    baseToken,
    isBaseInput,
    quoteToken,
    poolPrice,
    bnBaseAmount,
    bnQuoteAmount,
    write,
  ]);

  const totalHoneyPrice = useMemo(() => {
    return (
      Number(baseToken?.usdValue ?? 0) * Number(tokenInputs[0]?.amount || 0) +
      Number(quoteToken?.usdValue ?? 0) * Number(tokenInputs[1]?.amount || 0)
    );
  }, [baseToken, quoteToken, tokenInputs[0]?.amount, tokenInputs[1]?.amount]);

  const needsApprovalNoBera = needsApproval.filter(
    (token) => token.address.toLowerCase() !== beraTokenAddress.toLowerCase(),
  );

  const { estimatedBeraFee } = useGasData({
    gasUsedOverride: TXN_GAS_USED_ESTIMATES.SWAP * 8 * 2, // multiplied by 8 for the multiswap steps assumption in a swap, then by 2 to allow for a follow up swap
  });

  const baseSelected: Token = useMemo(() => {
    return isBeratoken(baseToken)
      ? isNativeBera
        ? beraToken
        : wBeraToken
      : baseToken;
  }, [baseToken, isNativeBera]);

  const quoteSelected: Token = useMemo(() => {
    return isBeratoken(quoteToken)
      ? isNativeBera
        ? beraToken
        : wBeraToken
      : quoteToken;
  }, [quoteToken, isNativeBera]);

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-4">
      {ModalPortal}
      <Card className="mx-6 w-full items-center bg-background p-4 sm:mx-0 sm:w-[480px] flex flex-col">
        {isLoading ? (
          <Skeleton className="h-8 w-40 self-center" />
        ) : (
          <p className="text-center text-2xl font-semibold">{pool?.poolName}</p>
        )}
        <div className="flex w-full flex-row items-center justify-center rounded-lg p-4">
          {isLoading ? (
            <Skeleton className="h-12 w-24" />
          ) : (
            pool?.tokens?.map((token, i) => {
              return (
                <TokenIcon
                  symbol={token.symbol}
                  address={token.address}
                  className={cn("h-12 w-12", i !== 0 && "ml-[-16px]")}
                  key={token.address}
                />
              );
            })
          )}
        </div>
        <div
          onClick={() => router.push(getPoolUrl(pool))}
          className="flex items-center justify-center text-sm font-normal leading-tight text-muted-foreground hover:cursor-pointer hover:underline"
        >
          View Pool Details
          <Icons.arrowRight className="W-4 h-4" />
        </div>
      </Card>
      <Card className="mx-6 w-full sm:w-[480px] md:mx-0 ">
        <CardHeader>
          <CardTitle className="center flex justify-between font-bold">
            Add Liquidity
            <SettingsPopover />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TokenList>
            <TokenInput
              key={baseToken?.address}
              selected={baseSelected}
              selectable={
                isBeratoken(baseToken) && beraToken && wBeraToken ? true : false
              }
              customTokenList={
                isBeratoken(baseToken)
                  ? [beraToken as Token, wBeraToken as Token]
                  : undefined
              }
              onTokenSelection={(token: Token | undefined) => {
                if (isBera(token)) {
                  setIsNativeBera(true);
                } else {
                  setIsNativeBera(false);
                }
              }}
              amount={tokenInputs[0]?.amount ?? ""}
              setAmount={(amount: string) => {
                setIsBaseInput(true);
                handleBaseAssetAmountChange(amount);
              }}
              price={Number(baseToken?.usdValue ?? "0")}
              onExceeding={(exceeding: boolean) =>
                updateTokenExceeding(0, exceeding)
              }
              showExceeding={true}
              disabled={!poolPrice}
              beraSafetyMargin={estimatedBeraFee}
            />

            <TokenInput
              key={quoteToken?.address}
              selected={quoteSelected}
              selectable={
                isBeratoken(quoteToken) && beraToken && wBeraToken
                  ? true
                  : false
              }
              customTokenList={
                isBeratoken(quoteToken)
                  ? [beraToken as Token, wBeraToken as Token]
                  : undefined
              }
              onTokenSelection={(token: Token | undefined) => {
                if (isBera(token)) {
                  setIsNativeBera(true);
                } else {
                  setIsNativeBera(false);
                }
              }}
              amount={tokenInputs[1]?.amount ?? ""}
              setAmount={(amount: string) => {
                setIsBaseInput(false);
                handleQuoteAssetAmountChange(amount);
              }}
              price={Number(quoteToken?.usdValue ?? "0")}
              onExceeding={(exceeding: boolean) =>
                updateTokenExceeding(1, exceeding)
              }
              showExceeding={true}
              disabled={!poolPrice}
              beraSafetyMargin={estimatedBeraFee}
            />
          </TokenList>
          <InfoBoxList>
            <InfoBoxListItem
              title={"Pool Price"}
              value={
                poolPrice ? (
                  <span>
                    <FormattedNumber
                      value={poolPrice}
                      symbol={baseToken?.symbol ?? ""}
                    />{" "}
                    = 1 {quoteToken?.symbol}
                  </span>
                ) : (
                  <span>{"-"}</span>
                )
              }
            />
            <InfoBoxListItem
              title={"Total Value"}
              value={
                <FormattedNumber
                  value={totalHoneyPrice}
                  symbol="USD"
                  compact={false}
                />
              }
            />

            <InfoBoxListItem title={"Slippage"} value={`${slippage}%`} />
          </InfoBoxList>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          )}
          <TxnPreview
            open={previewOpen}
            disabled={areAllInputsEmpty || error !== undefined}
            title={"Confirm LP Addition Details"}
            imgURI={`${cloudinaryUrl}/placeholder/preview-swap-img_ucrnla`}
            triggerText={"Preview"}
            setOpen={setPreviewOpen}
          >
            <TokenList className="bg-muted">
              <PreviewToken
                token={
                  isBeratoken(tokenInputs[0])
                    ? isNativeBera
                      ? beraToken
                      : wBeraToken
                    : tokenInputs[0]
                }
                value={tokenInputs[0]?.amount}
                price={Number(baseToken?.usdValue ?? 0)}
              />
              <PreviewToken
                token={
                  isBeratoken(tokenInputs[1])
                    ? isNativeBera
                      ? beraToken
                      : wBeraToken
                    : tokenInputs[1]
                }
                value={tokenInputs[1]?.amount}
                price={Number(quoteToken?.usdValue ?? 0)}
              />
            </TokenList>
            <InfoBoxList>
              <InfoBoxListItem
                title={"Pool Price"}
                value={
                  poolPrice ? (
                    <span>
                      <FormattedNumber
                        value={poolPrice}
                        symbol={baseToken?.symbol ?? ""}
                      />{" "}
                      = 1 {quoteToken?.symbol}
                    </span>
                  ) : (
                    <span>{"-"}</span>
                  )
                }
              />
              <InfoBoxListItem
                title={"Total Value"}
                value={
                  <FormattedNumber
                    value={totalHoneyPrice}
                    symbol="USD"
                    compact={false}
                  />
                }
              />
              <InfoBoxListItem title={"Slippage"} value={`${slippage}%`} />
            </InfoBoxList>
            {(!isNativeBera && needsApproval.length > 0) ||
            (isNativeBera && needsApprovalNoBera.length > 0) ? (
              <ApproveButton
                amount={
                  isNativeBera
                    ? needsApprovalNoBera[0]?.address.toLowerCase() ===
                      baseToken?.address.toLowerCase()
                      ? maxBaseApprovalAmount
                      : maxQuoteApprovalAmount
                    : needsApproval[0]?.address.toLowerCase() ===
                        baseToken?.address.toLowerCase()
                      ? maxBaseApprovalAmount
                      : maxQuoteApprovalAmount
                }
                token={isNativeBera ? needsApprovalNoBera[0] : needsApproval[0]}
                spender={crocDexAddress}
                onApproval={() => refreshAllowances()}
              />
            ) : (
              <ActionButton>
                <Button className="w-full" onClick={() => handleAddLiquidity()}>
                  Add Liquidity
                </Button>
              </ActionButton>
            )}
          </TxnPreview>
        </CardContent>
      </Card>
    </div>
  );
}
