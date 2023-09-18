"use client";

import { useBeraJs, usePollBgtBalance } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

export default function DepositWithdraw() {
  const { isReady } = useBeraJs();
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();

  return (
    <div className="flex w-full flex-col justify-between rounded-xl border border-border p-3 md:flex-row">
      <div className="flex flex-col gap-8 sm:flex-row md:gap-2 lg:gap-16">
        <div className="w-full flex-1 flex-shrink-0 p-4 md:w-1/2">
          <Icons.heartHandShake className="mb-4 h-6 w-6 text-accent" />
          <div className="text-sm text-muted-foreground">
            Stakers receive fees from each trade placed on the platform in
            exchnage for serving as the counterparty to all trades.{" "}
          </div>
          <div className="mt-8 text-2xl font-semibold leading-loose sm:mt-16">
            $2,100,507.10
          </div>
          <div className="mt-2 leading-7 text-muted-foreground">
            Fees Distributed in the last 24 hours
          </div>
        </div>
        <div className="w-full flex-1 flex-shrink-0 p-4 md:w-1/2">
          <Icons.calendarClock className="mb-4 h-6 w-6 text-accent" />
          <div className="text-sm text-muted-foreground">
            bHONEY accumulates fees in real-time. Stakers can claim their
            portion of the fees earned by clicking claim below.
          </div>
          <div className="mt-8 text-2xl font-semibold leading-loose sm:mt-16">
            $9,678.49
          </div>
          <div className="mt-2 leading-7 text-muted-foreground">
            Total Deposits
          </div>
        </div>
      </div>
      <div className="w-full flex-shrink-0 p-6 md:w-[400px]">
        <Tabs defaultValue="deposit">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="deposit" className="w-full">
              Deposit
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="w-full">
              Withdraw
            </TabsTrigger>
          </TabsList>
          <TabsContent value="deposit" className="flex flex-col gap-4">
            <div className="flex gap-1 text-xl font-semibold leading-7">
              <Icons.lock className="h-6 w-6 text-accent" />
              Deposit Honey
            </div>
            <div className="text-sm leading-tight text-muted-foreground">
              Receive bHONEY, a BRC-20 representing your ownership in the vault.{" "}
            </div>
            <div>
              <Input
                type="number"
                id="initial-deposit"
                placeholder="0.00"
                endAdornment="bHONEY"
              />
              {isReady && (
                <div className="mt-1 flex h-3 w-full items-center justify-end gap-1 text-xs text-muted-foreground">
                  <Icons.wallet className="relative inline-block h-3 w-3 " />
                  {userBalance}
                  <span className="cursor-pointer underline">MAX</span>
                </div>
              )}
            </div>
            <Button variant={"success"} className="w-full">
              Deposit Honey
            </Button>
          </TabsContent>

          <TabsContent value="withdraw" className="flex flex-col gap-4">
            <div className="flex gap-1 text-xl font-semibold leading-7">
              <Icons.lock className="h-6 w-6 text-accent" />
              Withdraw Honey
            </div>
            <div className="text-sm leading-tight text-muted-foreground">
              Burn your bHONEY to receive HONEY.
            </div>
            <div>
              <Input
                type="number"
                id="initial-deposit"
                placeholder="0.00"
                endAdornment="bHONEY"
              />
              {isReady && (
                <div className="mt-1 flex h-3 w-full items-center justify-end gap-1 text-xs text-muted-foreground">
                  <Icons.wallet className="relative inline-block h-3 w-3 " />
                  {userBalance}
                  <span className="cursor-pointer underline">MAX</span>
                </div>
              )}
            </div>
            <Button variant={"destructive"} className="w-full">
              Withdraw Honey
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
