"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { type SwapInfo } from "@bera/bera-router";
import { DEX_PRECOMPILE_ABI, type Token } from "@bera/berajs";
import { TokenIcon, useTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";

import { erc20DexAddress } from "~/config";

type Props = {
  swapInfo: SwapInfo | undefined;
  payload: any[];
  priceImpact: number | undefined;
};

function normalizeToRatio(num1: number, num2: number): string {
  const ratio = num2 / num1;

  return ratio.toFixed(6);
}

const Route = ({
  swapInfo,
  onExpand,
}: {
  swapInfo: SwapInfo | undefined;
  onExpand: () => void;
}) => {
  console.log(swapInfo);
  return (
    <div className="align-center flex flex-row gap-2">
      {swapInfo?.swaps.map((swap, index) => {
        return (
          <div
            className="align-center flex flex-row gap-2 font-semibold"
            key={swap.tokenIn + index}
          >
            {index === 0 && swap.tokenInObj?.symbol}{" "}
            {index !== swapInfo?.swaps.length && (
              <Icons.arrowRight className="w-4" />
            )}{" "}
            {swap.tokenOutObj?.symbol}
          </div>
        );
      })}
      <Icons.expand className="w-4 hover:text-primary" onClick={onExpand} />
    </div>
  );
};

const ExpandedRoute = ({ swapInfo }: { swapInfo: SwapInfo | undefined }) => {
  return (
    <div className="align-center flex w-full flex-row justify-between">
      <TokenIcon token={swapInfo?.tokenInObj} />
      <Icons.arrowRight className="w-4 self-center" />

      <div className="self-center">
        <div className="align-center flex w-full flex-row justify-center gap-2">
          {" "}
          {/* Updated line */}
          {swapInfo?.pools.map((pool, index) => {
            return (
              <div className="flex w-fit flex-row" key={pool.id + index}>
                {pool.tokens.map((token: Token, index) => {
                  return (
                    <TokenIcon
                      token={token}
                      className={cn("", index !== 0 && "ml-[-24px]")}
                      key={token.address + index}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <Icons.arrowRight className="w-4 self-center" />
      <TokenIcon token={swapInfo?.tokenOutObj} />
    </div>
  );
};

export default function PreviewDialog({
  swapInfo,
  payload,
  priceImpact,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const [expandRoute, setExpandRoute] = React.useState(false);
  const { write, isLoading } = useTxn({
    message: `Swap ${swapInfo?.formattedSwapAmount} ${swapInfo?.tokenInObj?.symbol} to ${swapInfo?.formattedReturnAmount} ${swapInfo?.tokenOutObj?.symbol}`,
    onSuccess() {
      setOpen(false);
    },
    onError() {
      setOpen(false);
    },
  });

  console.log(payload);
  const ratio = normalizeToRatio(
    Number(swapInfo?.formattedSwapAmount),
    Number(swapInfo?.formattedReturnAmount),
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={swapInfo === undefined}
          onClick={() => setOpen(true)}
          className="w-full"
        >
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Preview swap</DialogTitle>
        </DialogHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="flex w-1/2 items-center justify-center gap-2 rounded-lg bg-accent p-4">
            <TokenIcon token={swapInfo?.tokenInObj} />
            {swapInfo?.formattedSwapAmount}
            {swapInfo?.tokenInObj?.symbol}
          </div>

          <Icons.arrowRight className="min-h-0 w-6 min-w-0 shrink-0" />

          <div className="flex w-1/2 items-center justify-center gap-2 rounded-lg bg-accent p-4">
            <TokenIcon token={swapInfo?.tokenOutObj} />
            {swapInfo?.formattedReturnAmount?.substring(0, 6)}
            {swapInfo?.tokenOutObj?.symbol}
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <p>Exchange rate</p>
            <p className="font-semibold">
              1 {swapInfo?.tokenInObj?.symbol} = {ratio}{" "}
              {swapInfo?.tokenOutObj?.symbol}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Swap amount</p>
            <p className="font-semibold">
              {swapInfo?.formattedSwapAmount} {swapInfo?.tokenInObj?.symbol}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Expected output</p>
            <p className="font-semibold">
              {swapInfo?.formattedReturnAmount} {swapInfo?.tokenOutObj?.symbol}
            </p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Price Impact</p>
            <p className="font-semibold">{priceImpact ?? 0}%</p>
          </div>
          <div className="flex flex-row items-center justify-between">
            <p>Route</p>
            <Route
              swapInfo={swapInfo}
              onExpand={() => setExpandRoute(!expandRoute)}
            />
          </div>
        </div>
        {expandRoute && <ExpandedRoute swapInfo={swapInfo} />}
        <Button
          disabled={isLoading}
          onClick={() => {
            write({
              address: erc20DexAddress,
              abi: DEX_PRECOMPILE_ABI,
              functionName: "batchSwap",
              params: payload,
            });
          }}
        >
          {isLoading ? "Loading..." : "Swap"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
