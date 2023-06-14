"use client";

import React from "react";
import {
  BGT_PRECOMPILES_ADDRESS,
  BGT_PRECOMPILE_ABI,
  usePollBgtBalance,
  type Token,
} from "@bera/berajs";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";

import { useRedeem } from "~/hooks/useRedeem";
import { useTxn } from "~/hooks/useTxn";
import TokenInput from "./token-input";

export default function MyBalance() {
  const [open, setOpen] = React.useState(false);

  const { useBgtBalance } = usePollBgtBalance();
  const bgtBalance = useBgtBalance();

  const { redeemAmount, payload, setRedeemAmount } = useRedeem();

  const { write, isLoading } = useTxn({
    onSuccess: () => setOpen(false),
    onError: () => setOpen(false),
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div>
        <h4 className="mb-2 text-foregroundSecondary">Balance</h4>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 text-2xl font-semibold">
            <Icons.bgt className="h-6 w-6 fill-foreground" />
            {bgtBalance}
          </div>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => setOpen(true)}>
              Redeem
            </Button>
          </DialogTrigger>
        </div>
      </div>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Redeem preview</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <TokenInput
            selected={
              {
                address: "bgt",
                symbol: "BGT",
                name: "BGT",
                decimals: 18,
              } as Token
            }
            selectable={false}
            amount={redeemAmount}
            balance={Number(bgtBalance)}
            setAmount={setRedeemAmount}
          />
          <Button
            disabled={isLoading}
            onClick={() => {
              write({
                address: BGT_PRECOMPILES_ADDRESS,
                abi: BGT_PRECOMPILE_ABI,
                functionName: "redeemBgtForBera",
                params: payload,
              });
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
