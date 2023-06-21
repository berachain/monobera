import React from "react";
import {
  DEX_PRECOMPILE_ABI,
  DEX_PRECOMPILE_ADDRESS,
  formatUsd,
  type Token,
} from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader } from "@bera/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";

import { useTxn } from "~/hooks/usTxn";
import { TokenIcon } from "./token-icon";

type Props = {
  fromToken: Token | undefined;
  toToken: Token | undefined;
  fromAmount: number;
  toAmount: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any[];
};

function normalizeToRatio(num1: number, num2: number): string {
  const ratio = num2 / num1;

  return ratio.toFixed(6);
}

export default function PreviewDialog({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  payload,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const { write, isLoading } = useTxn({
    message: `Swap ${fromAmount?.toFixed(4)} ${
      fromToken?.symbol
    } to ${toAmount?.toFixed(4)} ${toToken?.symbol}`,
    onSuccess() {
      setOpen(false);
    },
    onError() {
      setOpen(false);
    },
  });

  const ratio = normalizeToRatio(fromAmount, toAmount);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          disabled={fromAmount === 0 && toAmount === 0}
          onClick={() => setOpen(true)}
        >
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Preview swap</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Card className="border border-border">
            <CardHeader className="rounded-t-lg border-b border-y-border p-3 text-xs text-primary-foreground">
              Effective price: 1 {fromToken?.symbol} = {ratio} {toToken?.symbol}
            </CardHeader>
            <CardContent className="border-border p-3">
              <div className="relative -mx-3 grid grid-cols-1 divide-y divide-border">
                <div className="flex items-center justify-start gap-2 px-3 pb-3">
                  <TokenIcon token={fromToken} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {fromAmount} {fromToken?.symbol}
                    </span>
                    <span className="text-xs font-medium text-backgroundSecondary">
                      {formatUsd((fromAmount ?? 0) * 1)}
                    </span>
                  </div>
                </div>
                <div className="absolute right-4 top-[calc(50%-16px)] border-none bg-card">
                  <Icons.arrowDown className="h-8 w-8 rounded-full border border-border bg-card p-1" />
                </div>
                <div className="flex items-center justify-start gap-2 px-3 pt-3">
                  <TokenIcon token={toToken} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {toAmount} {toToken?.symbol}
                    </span>
                    <span className="text-xs font-medium text-backgroundSecondary">
                      {formatUsd((fromAmount ?? 0) * 1)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button
          disabled={isLoading}
          onClick={() => {
            write({
              address: DEX_PRECOMPILE_ADDRESS,
              abi: DEX_PRECOMPILE_ABI,
              functionName: "swap",
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
