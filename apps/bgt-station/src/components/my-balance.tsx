"use client";

import React from "react";
import { getTokens, usePollAssetWalletBalance, type Token } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";

import SwapInput from "./swap-input";

export default function MyBalance() {
  const [open, setOpen] = React.useState(false);
  const [redeemAmount, setRedeemAmount] = React.useState(0);
  usePollAssetWalletBalance();
  const tokens = getTokens();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        <h4 className="mb-2 text-foregroundSecondary">Balance</h4>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 text-2xl font-semibold">
            <Icons.bgt className="h-6 w-6 fill-foreground" />
            420.69
          </div>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => setOpen(true)}>
              Redeem
            </Button>
          </DialogTrigger>
        </div>
      </div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Redeem preview</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <SwapInput
            selected={tokens[0] as Token}
            amount={redeemAmount}
            setAmount={(amount) => setRedeemAmount(amount)}
            selectable={false}
            selectedTokens={tokens}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onTokenSelection={() => {}}
          />
          <Button
            onClick={() => {
              // TODO: redeem
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
