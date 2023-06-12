"use client";

import React from "react";
import { usePollBgtBalance } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";

export default function MyBalance() {
  const [open, setOpen] = React.useState(false);
  const [redeemAmount, setRedeemAmount] = React.useState(0);
  const { useBgtBalance } = usePollBgtBalance();
  const bgtBalance = useBgtBalance();
  console.log("bgtBalance", bgtBalance);
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
