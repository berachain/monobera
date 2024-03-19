"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import {
  MULTISWAP_ABI,
  TransactionActionType,
  WBERA_ABI,
  useBeraJs,
  usePollAssetWalletBalance,
} from "@bera/berajs";
import { cloudinaryUrl, crocMultiSwapAddress } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
  BREAKPOINTS,
  TokenInput,
  TooltipCustom,
  useBreakpoint,
  useTxn,
} from "@bera/shared-ui";
import { useAnalytics } from "@bera/shared-ui/src/utils/analytics";
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { parseUnits, type Address } from "viem";

import { WRAP_TYPE, useSwap } from "~/hooks/useSwap";
import { SettingsPopover } from "./settings-popover";

const DynamicPreview = dynamic(() => import("./preview-dialog"), {
  loading: () => (
    <Button className="w-full gap-1">
      Preview <Icons.arrowRight className="h-3 w-3" />
    </Button>
  ),
  ssr: false,
});

const Connect = dynamic(
  () => import("@bera/shared-ui").then((mod) => mod.ConnectButton),
  {
    ssr: false,
    loading: () => (
      <Button className="w-full gap-2 text-lg font-semibold">
        <Icons.wallet className={"h-6 w-6"} />
        Connect Wallet
      </Button>
    ),
  },
);

interface ISwapCard {
  inputCurrency?: Address | undefined;
  outputCurrency?: Address | undefined;
  addTokensOnLoad?: boolean;
  isMainPage?: boolean;
  showBear?: boolean;
  className?: string;
}

export function SwapCard({
  inputCurrency,
  outputCurrency,
  showBear = true,
  isMainPage = false,
  className,
}: ISwapCard) {
  const {
    setSelectedFrom,
    selectedFrom,
    allowance,
    selectedTo,
    fromAmount,
    setFromAmount,
    swapAmount,
    toAmount,
    error,
    setToAmount,
    setSelectedTo,
    setSwapAmount,
    onSwitch,
    setIsTyping,
    swapInfo,
    isRouteLoading,
    refreshAllowance,
    payload,
    exchangeRate,
    gasPrice,
    tokenInPrice,
    tokenOutPrice,
    isWrap,
    wrapType,
    minAmountOut,
    priceImpact,
  } = useSwap({
    inputCurrency,
    outputCurrency,
  });

  const { captureException, track } = useAnalytics();

  const { refetch } = usePollAssetWalletBalance();
  const safeFromAmount =
    Number(fromAmount) > Number.MAX_SAFE_INTEGER
      ? Number.MAX_SAFE_INTEGER
      : Number(fromAmount) ?? 0;

  const safeSwapAmount =
    Number(swapAmount) > Number.MAX_SAFE_INTEGER
      ? Number.MAX_SAFE_INTEGER
      : Number(swapAmount) ?? 0;

  const { isConnected } = useBeraJs();
  const [exceedingBalance, setExceedingBalance] = useState(false);

  const [openPreview, setOpenPreview] = useState(false);

  const { write, isLoading, ModalPortal } = useTxn({
    actionType: TransactionActionType.SWAP,
    message: `Swap ${selectedFrom?.symbol} to ${selectedTo?.symbol}`,
    onSuccess: () => {
      track("swap_token_success", {
        tokenFrom: selectedFrom?.symbol,
        tokenTo: selectedTo?.symbol,
      });
      setFromAmount(undefined);
      setSwapAmount("");
      setToAmount(undefined);
      setOpenPreview(false);
      void refreshAllowance();
      refetch();
    },
    onError: (e: Error | undefined) => {
      track("swap_token_failed", {
        tokenFrom: selectedFrom?.symbol,
        tokenTo: selectedTo?.symbol,
      });
      captureException(e, {
        event_id: "swap_token_failed",
        data: { tokenFrom: selectedFrom?.symbol, tokenTo: selectedTo?.symbol },
      });
      setOpenPreview(false);
    },
  });

  const {
    write: wrapWrite,
    isLoading: isWrapLoading,
    ModalPortal: WrapModalPortal,
  } = useTxn({
    message:
      wrapType === WRAP_TYPE.WRAP
        ? `Wrapping ${swapAmount} BERA to WBERA`
        : `Unwrapping ${swapAmount} WBERA to BERA`,
    actionType:
      wrapType === WRAP_TYPE.WRAP
        ? TransactionActionType.WRAP
        : TransactionActionType.UNWRAP,
    onSuccess: () => {
      track(
        wrapType === WRAP_TYPE.WRAP
          ? "wrap_bera_success"
          : "unwrap_wbera_success",

        { swapAmount },
      );
    },
    onError: (e: Error | undefined) => {
      track(
        wrapType === WRAP_TYPE.WRAP
          ? "wrap_bera_failed"
          : "unwrap_wbera_failed",

        { swapAmount },
      );
      captureException(e, {
        event_id:
          wrapType === WRAP_TYPE.WRAP
            ? "wrap_bera_failed"
            : "unwrap_wbera_failed",
        data: swapAmount,
      });
    },
  });

  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { isLoading: isBalancesLoading } = useCurrentAssetWalletBalances();

  const getSwapButton = () => {
    if (
      (Number(allowance?.formattedAllowance) ?? 0) < (safeFromAmount ?? 0) &&
      !exceedingBalance &&
      !isWrap &&
      !isRouteLoading &&
      swapInfo?.batchSwapSteps.length !== 0
    ) {
      return (
        <ApproveButton
          amount={parseUnits(
            (fromAmount ?? "0") as `${number}`,
            selectedFrom?.decimals ?? 18,
          )}
          token={selectedFrom}
          spender={crocMultiSwapAddress}
        />
      );
    }
    if (isConnected) {
      if (isWrap) {
        return (
          <Button
            className="w-full"
            disabled={isWrapLoading}
            onClick={() => {
              wrapWrite({
                address: process.env.NEXT_PUBLIC_WBERA_ADDRESS as Address,
                abi: WBERA_ABI,
                functionName:
                  wrapType === WRAP_TYPE.WRAP ? "deposit" : "withdraw",
                params:
                  wrapType === WRAP_TYPE.WRAP
                    ? []
                    : [parseUnits(`${safeSwapAmount}`, 18)],
                value:
                  wrapType === WRAP_TYPE.WRAP
                    ? parseUnits(`${safeSwapAmount}`, 18)
                    : 0n,
              });
            }}
          >
            {wrapType}
          </Button>
        );
      }
      if (swapInfo !== undefined) {
        return (
          <DynamicPreview
            swapInfo={swapInfo}
            disabled={
              swapInfo?.formattedReturnAmount === "0" ||
              exceedingBalance ||
              Number(fromAmount) <= 0 ||
              Number(toAmount) <= 0
            }
            priceImpact={0}
            exchangeRate={exchangeRate}
            tokenIn={selectedFrom}
            tokenOut={selectedTo}
            tokenInPrice={tokenInPrice}
            tokenOutPrice={tokenOutPrice}
            open={openPreview}
            setOpen={setOpenPreview}
            write={() => {
              write({
                address: crocMultiSwapAddress,
                abi: MULTISWAP_ABI,
                functionName: "multiSwap",
                params: payload,
                value: swapInfo.value,
              });
            }}
            isLoading={isLoading}
            minAmountOut={minAmountOut}
          />
        );
      }
      return (
        <DynamicPreview
          swapInfo={swapInfo}
          disabled={true}
          priceImpact={0}
          exchangeRate={exchangeRate}
          tokenIn={selectedFrom}
          tokenOut={selectedTo}
          tokenInPrice={tokenInPrice}
          tokenOutPrice={tokenOutPrice}
          open={openPreview}
          setOpen={setOpenPreview}
          write={() => {
            write({
              address: crocMultiSwapAddress,
              abi: MULTISWAP_ABI,
              functionName: "multiSwap",
              params: payload,
              value: (swapInfo as any)?.value,
            });
          }}
          isLoading={isLoading}
          minAmountOut={minAmountOut}
        />
      );
    }
    return <Connect />;
  };

  const hasRouteNotFoundError =
    selectedFrom &&
    selectedTo &&
    swapInfo &&
    swapInfo.batchSwapSteps.length === 0 &&
    fromAmount &&
    fromAmount !== "" &&
    swapAmount !== "0" &&
    swapAmount !== "" &&
    !isRouteLoading &&
    !isWrap;

  const hasInsufficientBalanceError =
    isConnected && exceedingBalance && !isBalancesLoading;

  const gasPriceLabel = useMemo(() => {
    if (
      !gasPrice ||
      hasRouteNotFoundError ||
      !toAmount ||
      !fromAmount ||
      !selectedTo ||
      !selectedFrom ||
      error !== undefined
    )
      return "-";
    if (gasPrice < 0.01) return "<$0.01";
    return `$${gasPrice.toFixed(2)}`;
  }, [
    toAmount,
    fromAmount,
    selectedTo,
    selectedFrom,
    gasPrice,
    hasRouteNotFoundError,
    error,
  ]);
  const breakpoint = useBreakpoint();

  return (
    <div className={cn("flex w-full flex-col items-center", className)}>
      {ModalPortal}
      {WrapModalPortal}
      <div className="w-full">
        {showBear && (
          <Image
            src={`${cloudinaryUrl}/bears/qsmspkwyjoeh1cwb6fz7`}
            className="mx-auto self-start md:mx-0"
            alt="bidness"
            width={150}
            height={200}
          />
        )}
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <Card className="w-full rounded-2xl px-6 py-8">
            <CardTitle
              className={cn(
                "center flex items-center justify-between px-2",
                isMainPage ? "pointer-events-none" : "",
              )}
            >
              Swap <SettingsPopover />
            </CardTitle>
            <div className="mt-3">
              <div className="border-1 flex flex-col gap-4 border-border">
                <ul
                  className={cn(
                    "divide-y divide-border rounded-2xl border",
                    isMainPage ? "pointer-events-none" : "",
                  )}
                  role="list"
                >
                  <TokenInput
                    selected={selectedFrom}
                    selectedTokens={[selectedFrom, selectedTo]}
                    onTokenSelection={setSelectedFrom}
                    amount={fromAmount ?? ""}
                    price={Number(tokenInPrice)}
                    showExceeding={true}
                    setIsTyping={(isTyping: boolean) => setIsTyping(isTyping)}
                    onExceeding={(isExceeding: boolean) =>
                      setExceedingBalance(isExceeding)
                    }
                    setAmount={(amount) => {
                      // setSwapKind(SwapKind.GIVEN_IN);
                      setSwapAmount(amount);
                      setFromAmount(amount);
                    }}
                  />
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex w-full items-center justify-center"
                      aria-hidden="true"
                    >
                      <Button
                        type="button"
                        variant={"outline"}
                        onClick={() => {
                          onSwitch();
                        }}
                        className="z-10 inline-flex h-6 w-6 items-center rounded-sm border-border bg-background p-0.5 text-sm font-semibold text-muted-foreground md:h-8 md:w-8 md:p-1"
                      >
                        <Icons.swap className="h-3 w-3 md:h-6 md:w-6" />
                      </Button>
                    </div>
                  </div>
                  <TokenInput
                    selected={selectedTo}
                    selectedTokens={[selectedFrom, selectedTo]}
                    onTokenSelection={setSelectedTo}
                    amount={toAmount}
                    price={Number(tokenOutPrice)}
                    hideMax={true}
                    disabled={true}
                    setAmount={(amount) => {
                      // setSwapKind(SwapKind.GIVEN_OUT);
                      setSwapAmount(amount);
                      setToAmount(amount);
                    }}
                    priceImpact={priceImpact}
                    showExceeding={false}
                    isActionLoading={isRouteLoading && !isWrap}
                  />
                </ul>
                {priceImpact && priceImpact < -10 && (
                  <TooltipCustom
                    anchor={
                      breakpoint > BREAKPOINTS.md ? "right" : "bottom-center"
                    }
                    position={
                      breakpoint > BREAKPOINTS.md ? "left" : "bottom-center"
                    }
                    tooltipContent={
                      <div className="w-[250px]">
                        <p className="text-xs text-muted-foreground">
                          A swap of this size may have a high price impact,
                          given the current liquidity in the pool. There may be
                          a large difference between the amount of your input
                          token and what you will receive in the output token
                        </p>
                      </div>
                    }
                  >
                    <Alert variant="destructive">
                      <AlertDescription className="text-xs">
                        <Icons.tooltip className="mr-2 mt-[-4px] inline h-4 w-4" />
                        {`Price Impact Warning: ${priceImpact}%`}
                      </AlertDescription>
                    </Alert>
                  </TooltipCustom>
                )}

                <div className="flex flex-col gap-2">
                  {!isWrap ? (
                    <div className="flex w-full flex-col gap-1 rounded-lg bg-muted p-3">
                      <div className="flex w-full flex-row justify-between">
                        <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                          Exchange rate
                        </p>
                        <p className="whitespace-nowrap text-right text-xs font-medium sm:text-sm">
                          {exchangeRate ?? "-"}
                        </p>
                      </div>
                      <div className="flex w-full flex-row justify-between">
                        <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                          Network fee
                        </p>
                        <p className="cursor-help whitespace-nowrap text-right text-xs font-medium sm:text-sm ">
                          <span className="flex flex-row items-center gap-1">
                            {gasPriceLabel !== "-" && (
                              <Icons.fuel className="h-4 w-4" />
                            )}
                            {gasPriceLabel}
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    false
                  )}
                  {hasInsufficientBalanceError ? (
                    <Alert
                      variant="destructive"
                      className="items-center justify-center"
                    >
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        This amount exceeds your total balance
                      </AlertDescription>
                    </Alert>
                  ) : (
                    false
                  )}
                  {error !== undefined && (
                    <Alert variant="destructive">
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription className="text-xs">
                        {error.message}
                      </AlertDescription>
                    </Alert>
                  )}
                  {/* {isRouteLoading === true && swapAmount !=='0' && selectedTo !==undefined ? (
                    <Alert variant="info">
                      <AlertTitle>Searching for best routes</AlertTitle>
                      <AlertDescription className="text-xs">
                        route loading
                      </AlertDescription>
                    </Alert>
                  ) : (
                    false
                  )} */}
                  {/* {showPriceImpact ? (
                    <Alert variant="destructive">
                      <AlertTitle>
                        {" "}
                        <Icons.tooltip className="mt-[-4px] inline h-4 w-4" />{" "}
                        Price Impact Error
                      </AlertTitle>
                      <AlertDescription className="text-xs">
                        This swap will result in a high price impact (-
                        {priceImpact?.toFixed(2)}%)
                      </AlertDescription>
                    </Alert>
                  ) : (
                    false
                  )} */}
                  {hasRouteNotFoundError ? (
                    <Alert variant="destructive">
                      <AlertTitle>
                        {" "}
                        <Icons.tooltip className="mt-[-4px] inline h-4 w-4" />{" "}
                        Route Not Found
                      </AlertTitle>
                      <AlertDescription className="text-xs">
                        No route found for this swap. Please try a different
                        pair.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    false
                  )}
                </div>
                {isMainPage ? (
                  <Link href="/swap" className="w-full">
                    <Button className="flex w-full gap-1">
                      Enter App <Icons.arrowRight className="block h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <ActionButton>{getSwapButton()}</ActionButton>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
