"use client";

import React from "react";
import dynamic from "next/dynamic";
import { RouteNotFound } from "@bera/bera-router";
import { useBeraJs } from "@bera/berajs";
import { ConnectButton, TokenInput } from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { type Address } from "wagmi";

import { erc20ModuleAddress } from "~/config";
import { SwapKind, useSwap } from "~/hooks/useSwap";
import { SettingsPopover } from "./settings-popover";

const DynamicPreview = dynamic(() => import("./preview-dialog"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const DynamicApproveButton = dynamic(() => import("./approve-token-button"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface ISwapCard {
  inputCurrency?: Address | undefined;
  outputCurrency?: Address | undefined;
}
export function SwapCard({ inputCurrency, outputCurrency }: ISwapCard) {
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
    swapInfo,
    payload,
    priceImpact,
  } = useSwap({
    inputCurrency,
    outputCurrency,
  });
  const { isConnected } = useBeraJs();
  return (
    <Card className="m-auto w-[500px]">
      <CardHeader>
        <CardTitle className="center flex justify-between">
          Swap <SettingsPopover />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col gap-4">
          <TokenInput
            selected={selectedFrom}
            selectedTokens={[selectedFrom, selectedTo]}
            onTokenSelection={setSelectedFrom}
            amount={fromAmount ?? 0}
            setAmount={(amount) => {
              setSwapKind(SwapKind.GIVEN_IN);
              setSwapAmount(Number(amount));
              setFromAmount(Number(amount));
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedFrom(selectedTo);
              setSelectedTo(selectedFrom);
            }}
          >
            <Icons.swap className="h-6 w-6" />
          </Button>

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
          {(priceImpact ?? 0) > 15 && "Price impact is too high"}
          {error instanceof RouteNotFound && (
            <Alert variant="destructive" className="my-4">
              <Icons.warning className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          {(Number(allowance?.formattedAllowance) ?? 0) < fromAmount ? (
            <DynamicApproveButton
              token={selectedFrom}
              spender={erc20ModuleAddress}
            />
          ) : isConnected ? (
            <DynamicPreview
              swapInfo={swapInfo}
              payload={payload}
              priceImpact={priceImpact}
            />
          ) : (
            <ConnectButton />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
