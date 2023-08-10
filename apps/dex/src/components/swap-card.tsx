"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { RouteNotFound } from "@bera/bera-router";
import { DEX_PRECOMPILE_ABI, useBeraJs } from "@bera/berajs";
import { TokenInput, useTxn } from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { type Address } from "wagmi";

import { erc20DexAddress, erc20ModuleAddress } from "~/config";
import { SwapKind, useSwap } from "~/hooks/useSwap";
import { BerachainInfo } from "./berachain-info";
import { SettingsPopover } from "./settings-popover";

const DynamicPreview = dynamic(() => import("./preview-dialog"), {
  loading: () => (
    <Button className="w-full gap-1" variant="outline">
      Preview <Icons.arrowRight className="h-3 w-3" />
    </Button>
  ),
  ssr: false,
});

const DynamicApproveButton = dynamic(() => import("./approve-token-button"), {
  loading: () => <p>Loading...</p>,
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
  isMainPage?: boolean;
}
export function SwapCard({
  inputCurrency,
  outputCurrency,
  isMainPage,
}: ISwapCard) {
  const {
    setSwapKind,
    setSelectedFrom,
    selectedFrom,
    allowance,
    selectedTo,
    fromAmount,
    setFromAmount,
    toAmount,
    error,
    setToAmount,
    setSelectedTo,
    setSwapAmount,
    onSwitch,
    swapInfo,
    payload,
    showPriceImpact,
    priceImpact,
    exchangeRate,
    gasPrice,
    tokenInPrice,
    tokenOutPrice,
  } = useSwap({
    inputCurrency,
    outputCurrency,
  });
  const { isConnected, isWrongNetwork } = useBeraJs();
  const [exceedingBalance, setExceedingBalance] = useState(false);

  const [openPreview, setOpenPreview] = useState(false);

  const { write, isLoading, ModalPortal } = useTxn({
    message: `Swap ${Number(swapInfo?.formattedSwapAmount).toFixed(4)} ${
      selectedFrom?.symbol
    } to ${Number(swapInfo?.formattedReturnAmount).toFixed(4)} ${
      selectedTo?.symbol
    }`,
    onSuccess: () => {
      setOpenPreview(false);
    },
    onError: () => {
      setOpenPreview(false);
    },
  });

  return (
    <div className="flex w-fit flex-col items-center">
      {ModalPortal}
      <Image
        src="/graphics/bidness-bera.png"
        className="mb-[-40px] self-start"
        alt="bidness"
        width={150}
        height={200}
      />
      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="m-auto w-full rounded-xl sm:w-[500px]">
          <CardHeader className="pb-3 pt-8">
            <CardTitle className="center flex justify-between">
              Swap <SettingsPopover />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-1 flex flex-col gap-2 border-border">
              <ul
                role="list"
                className="di divide-y divide-border rounded-lg border"
              >
                <TokenInput
                  selected={selectedFrom}
                  selectedTokens={[selectedFrom, selectedTo]}
                  onTokenSelection={setSelectedFrom}
                  amount={fromAmount ?? 0}
                  onExceeding={(isExceeding: boolean) =>
                    setExceedingBalance(isExceeding)
                  }
                  setAmount={(amount) => {
                    setSwapKind(SwapKind.GIVEN_IN);
                    setSwapAmount(Number(amount));
                    setFromAmount(Number(amount));
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
                      className="z-10 inline-flex h-fit w-fit items-center rounded-full bg-background p-1 text-sm font-semibold sm:p-2"
                    >
                      <Icons.swap className="h-3 w-3 sm:h-6 sm:w-6" />
                    </Button>
                  </div>
                </div>
                <TokenInput
                  selected={selectedTo}
                  selectedTokens={[selectedFrom, selectedTo]}
                  onTokenSelection={setSelectedTo}
                  amount={toAmount}
                  setAmount={(amount) => {
                    setSwapKind(SwapKind.GIVEN_OUT);
                    setSwapAmount(Number(amount));
                    setToAmount(Number(amount));
                  }}
                />
              </ul>
              {swapInfo && (
                <div className="mt-4 flex w-full flex-col gap-2 rounded-lg bg-muted p-3">
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
                      Gas fee
                    </p>
                    <p className="whitespace-nowrap text-right text-xs font-medium sm:text-sm">
                      {gasPrice} BERA
                    </p>
                  </div>
                </div>
              )}
              {exceedingBalance && (
                <Alert
                  variant="destructive"
                  className="items-center justify-center"
                >
                  <Icons.warning className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    This amount exceeds your total balance
                  </AlertDescription>
                </Alert>
              )}
              {error instanceof RouteNotFound && (
                <Alert variant="destructive">
                  <Icons.warning className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription className="text-xs">
                    {error.message}
                  </AlertDescription>
                </Alert>
              )}
              {showPriceImpact && (
                <Alert variant="destructive">
                  <Icons.warning className="h-4 w-4" />
                  <AlertTitle>Price Impact Error</AlertTitle>
                  <AlertDescription className="text-xs">
                    This swap will result in a high price impact (-
                    {priceImpact?.toFixed(2)}%)
                  </AlertDescription>
                </Alert>
              )}
              <div className="w-full">
                {(Number(allowance?.formattedAllowance) ?? 0) < fromAmount &&
                !exceedingBalance ? (
                  <DynamicApproveButton
                    token={selectedFrom}
                    spender={erc20ModuleAddress}
                  />
                ) : isConnected || isWrongNetwork ? (
                  swapInfo !== undefined ? (
                    <DynamicPreview
                      swapInfo={swapInfo}
                      disabled={
                        !swapInfo?.formattedReturnAmount ||
                        exceedingBalance ||
                        (isWrongNetwork ?? true)
                      }
                      priceImpact={priceImpact}
                      exchangeRate={exchangeRate}
                      tokenIn={selectedFrom}
                      tokenOut={selectedTo}
                      tokenInPrice={tokenInPrice}
                      tokenOutPrice={tokenOutPrice}
                      open={openPreview}
                      setOpen={setOpenPreview}
                      write={() => {
                        write({
                          address: erc20DexAddress,
                          abi: DEX_PRECOMPILE_ABI,
                          functionName: "batchSwap",
                          params: payload,
                        });
                      }}
                      isLoading={isLoading}
                    />
                  ) : (
                    <Button
                      disabled={true}
                      variant={"outline"}
                      className="w-full"
                    >
                      Select Token & Enter Amount
                    </Button>
                  )
                ) : (
                  <Connect />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        {isMainPage && <BerachainInfo />}
      </div>
    </div>
  );
}
