"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { type SwapInfo } from "@bera/bera-router";
import { formatUsd, type Token } from "@bera/berajs";
import { Spinner, TokenIcon } from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { useReadLocalStorage } from "usehooks-ts";

import { LOCAL_STORAGE_KEYS } from "~/utils/constants";

type Props = {
  swapInfo: SwapInfo | undefined;
  priceImpact: number | undefined;
  exchangeRate: string | undefined;
  tokenIn: Token | undefined;
  tokenOut: Token | undefined;
  tokenInPrice: string | undefined;
  tokenOutPrice: string | undefined;
  open: boolean;
  setOpen: (open: boolean) => void;
  write: () => void;
  isLoading: boolean;
  disabled: boolean;
};

const PreviewToken = ({
  token,
  title,
  amount,
  price,
}: {
  token: Token | undefined;
  title: string;
  amount: string;
  price: string;
}) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <div className="flex w-full items-center justify-between">
        <h4 className="text-xl font-semibold ">{Number(amount).toFixed(2)}</h4>
        <Badge key={token?.address} variant={"secondary"} className={"w-fit"}>
          <TokenIcon token={token} className="h-6 w-6" />
          {token?.symbol}
        </Badge>
      </div>
      <p className="text-xs font-medium text-muted-foreground">
        {formatUsd(Number(price) * Number(amount))}
      </p>
    </div>
  );
};

const PRICE_CHANGE_THRESHOLD = 5 / 100; // 5% price change

export default function PreviewDialog({
  swapInfo,
  exchangeRate,
  tokenIn,
  tokenOut,
  tokenInPrice,
  tokenOutPrice,
  isLoading,
  open,
  disabled,
  setOpen,
  write,
}: Props) {
  const [initialSwapInfo, setInitialSwapInfo] = useState<SwapInfo | undefined>(
    undefined,
  );

  const [priceChangeWarning, setPriceChangeWarning] = useState<
    boolean | undefined
  >(undefined);

  const slippageType = useReadLocalStorage(
    LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE_TYPE,
  );

  const slippageValue = useReadLocalStorage(
    LOCAL_STORAGE_KEYS.SLIPPAGE_TOLERANCE_VALUE,
  );

  useEffect(() => {
    const upperBound =
      (1 + PRICE_CHANGE_THRESHOLD) *
      Number(initialSwapInfo?.formattedReturnAmount);
    const lowerBound =
      (1 - PRICE_CHANGE_THRESHOLD) *
      Number(initialSwapInfo?.formattedReturnAmount);

    const isNewSwapGTSlippage =
      upperBound < Number(swapInfo?.formattedReturnAmount);
    const isNewSwapLTSlippage =
      lowerBound > Number(swapInfo?.formattedReturnAmount);

    if (
      initialSwapInfo !== undefined &&
      (isNewSwapGTSlippage || isNewSwapLTSlippage)
    ) {
      setPriceChangeWarning(true);
    } else {
      setPriceChangeWarning(false);
    }
  }, [swapInfo, slippageValue, slippageType, initialSwapInfo]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          onClick={() => {
            setOpen(true);
            setInitialSwapInfo(swapInfo);
          }}
          className="w-full gap-1"
          variant="outline"
        >
          Preview <Icons.arrowRight className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="mb-3">Preview swap</DialogTitle>
          <Image
            alt="preview"
            src="/graphics/preview-swap-img.png"
            className="self-center"
            width={525}
            height={150}
          />
        </DialogHeader>
        <PreviewToken
          token={tokenIn}
          title={"You pay"}
          amount={swapInfo?.formattedSwapAmount ?? "0"}
          price={tokenInPrice ?? "0"}
        />
        {/* TODO: add slippage calculation */}
        <PreviewToken
          token={tokenOut}
          title={"You receive"}
          amount={swapInfo?.formattedReturnAmount ?? "0"}
          price={tokenOutPrice ?? "0"}
        />
        <div className="flex w-full flex-col gap-2 rounded-lg bg-muted p-3">
          <div className="flex w-full flex-row justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Exchange rate
            </p>
            <p className="whitespace-nowrap text-right text-sm font-medium">
              {exchangeRate}
            </p>
          </div>
          <div className="flex w-full flex-row justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              Minimum received
            </p>
            <p className="whitespace-nowrap text-right text-sm font-medium">
              {Number(swapInfo?.formattedReturnAmount).toFixed(2)}{" "}
              {tokenOut?.symbol}
            </p>
          </div>
        </div>
        {priceChangeWarning && (
          <Alert
            variant="destructive"
            className="my-4 items-center justify-center"
          >
            <AlertTitle>Price Change</AlertTitle>
            <AlertDescription>
              The swap price has changed by more than 5%.
            </AlertDescription>
          </Alert>
        )}
        {!priceChangeWarning && (
          <Button
            disabled={isLoading}
            onClick={() => {
              write();
            }}
          >
            {isLoading ? (
              <p className="flex flex-row gap-2">
                Loading <Spinner size={16} color="white" />
              </p>
            ) : (
              "Swap"
            )}
          </Button>
        )}
        {priceChangeWarning && (
          <Button
            variant="destructive"
            onClick={() => setInitialSwapInfo(swapInfo)}
          >
            Accept Price Change <Icons.arrowRight className="h-3 w-3" />
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
