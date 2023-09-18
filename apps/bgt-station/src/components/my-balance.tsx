"use client";

import React from "react";
import {
  ERC20BGT_PRECOMPILE_ABI,
  useBeraConfig,
  usePollBgtBalance,
  type Token,
} from "@bera/berajs";
import { TokenInput, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { type Address } from "wagmi";

import { useRedeem } from "~/hooks/useRedeem";

export default function MyBalance() {
  const [open, setOpen] = React.useState(false);
  const { networkConfig } = useBeraConfig();

  const { useBgtBalance, isLoading: isBalanceLoading } = usePollBgtBalance();
  const bgtBalance = useBgtBalance();

  const { redeemAmount, payload, setRedeemAmount } = useRedeem();

  const { write, isLoading } = useTxn({
    message: `Redeem ${redeemAmount} BGT`,
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
            disabled={isBalanceLoading}
            selectable={false}
            amount={redeemAmount}
            balance={Number(bgtBalance)}
            setAmount={setRedeemAmount}
          />
          <Button
            disabled={isLoading}
            onClick={() => {
              write({
                address: networkConfig.precompileAddresses
                  .erc20BgtAddress as Address,
                abi: ERC20BGT_PRECOMPILE_ABI,
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
