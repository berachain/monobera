"use client";

import React from "react";
import Image from "next/image";
import { usePollBgtBalance } from "@bera/berajs";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

export default function Redeem() {
  const { useBgtBalance } = usePollBgtBalance();
  const userBalance = useBgtBalance();
  const [amount, setAmount] = React.useState("");
  return (
    <div div className="mx-auto w-full max-w-[500px]">
      <Image
        className="max-[600px]:mx-auto"
        src="/bears/redeem-bear.png"
        alt="proposal-bear"
        width={240}
        height={174}
      />
      <Card className="flex w-full flex-col gap-3 p-6">
        <div className="text-lg font-semibold leading-7 text-foreground">
          Redeem
        </div>
        <div className="relative flex flex-col gap-2">
          <div className="leading-tigh text-sm font-semibold">Amount</div>
          <Input
            type="number"
            placeholder="0.0"
            endAdornment="BGT"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
          <div className="flex w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
            <Icons.wallet className="relative inline-block h-3 w-3 " />
            {userBalance}
            <span
              className="underline hover:cursor-pointer"
              onClick={() => {
                setAmount(userBalance);
              }}
            >
              MAX
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-18 bg-muted p-3">
          <div className="flex justify-between text-sm font-medium leading-normal text-muted-foreground">
            <div>BGT Burned</div>
            <div className="text-foreground">0.0 BGT</div>
          </div>
          <div className="flex justify-between text-sm font-medium leading-normal text-muted-foreground">
            <div>BERA Redeemed</div>
            <div className="text-foreground">0.0 BERA</div>
          </div>
        </div>
        {Number(amount) > Number(userBalance) && (
          <Alert variant="destructive" className="">
            {" "}
            <Icons.alertCircle className="relative mr-1 mt-[-4px] inline h-4 w-4 text-destructive-foreground" />
            This amount exceeds your total balance of {userBalance} BGT
          </Alert>
        )}
        <Button
          className=""
          disabled={Number(amount) <= 0 || Number(amount) > Number(userBalance)}
        >
          Confirm
        </Button>
      </Card>
    </div>
  );
}
