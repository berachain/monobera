"use client";

import { useState } from "react";
import { Button } from "@bera/ui/button";
import { Checkbox } from "@bera/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@bera/ui/dialog";
import { useLocalStorage } from "usehooks-ts";

export function Disclaimer() {
  const [checked, setChecked] = useState(false);
  const [_, setDisclaimerAccepted] = useLocalStorage(
    "DISCLAIMER_ACCEPTED",
    false,
  );
  return (
    // <Dialog open={open} onOpenChange={setOpen}>
    <Dialog open>
      {/* <DialogTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Vote
        </Button>
      </DialogTrigger> */}
      <DialogContent className="w-full rounded-md bg-primary-foreground p-0 pb-6 sm:max-w-[400px] sm:pb-0">
        <DialogHeader>
          <DialogTitle className="p-4 pb-1 leading-7">Terms of Use</DialogTitle>
          <hr />
          <div className="p-4">
            <div className="rounded-md border border-border bg-background px-4 py-3">
              <div className="h-6 font-medium">Trading View</div>
              <hr className="my-2" />
              <div className="text-sm leading-5 text-muted-foreground">
                TradingView charts and analysis tools are integrated into our
                DeFi perpetual trading platform under the terms of
                TradingView&apos;s API usage agreement and terms of service.
                TradingView is a registered trademark of TradingView, Inc., and
                their services are used in compliance with their respective
                terms and conditions.
              </div>
            </div>
            <div className="mt-2 rounded-md border border-border bg-background px-4 py-3">
              <div className="h-6 font-medium">Use of service</div>
              <hr className="my-2" />
              <div className="text-sm leading-5 text-muted-foreground">
                TradingView charts and analysis tools are integrated into our
                DeFi perpetual trading platform under the terms of
                TradingView&apos;s API usage agreement and terms of service.
                TradingView is a registered trademark of TradingView, Inc., and
                their services are used in compliance with their respective
                terms and conditions.
              </div>
            </div>
            <div className="my-6 flex items-center space-x-2 text-sm text-muted-foreground">
              <Checkbox
                id="terms"
                checked={checked}
                onCheckedChange={(check: boolean) => setChecked(check)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
            <Button
              className="w-full"
              disabled={!checked}
              onClick={() => setDisclaimerAccepted(true)}
            >
              Start Trading
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
