"use client";

import React from "react";
import Image from "next/image";
import { useBeraConfig, usePollBgtBalance } from "@bera/berajs";
import { REDEEM_ABI } from "@bera/berajs/src/config";
import { useTxn } from "@bera/shared-ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { type Address } from "wagmi";

import { useRedeem } from "../../hooks/useRedeem";

export default function Redeem() {
  const { useBgtBalance } = usePollBgtBalance();
  const { redeemAmount, payload, setRedeemAmount } = useRedeem();
  const userBalance = useBgtBalance();
  const { write, isLoading } = useTxn({
    message: "Redeem BERA",
  });
  const { networkConfig } = useBeraConfig();

  return (
    <div className="container mx-auto w-full max-w-[564px]">
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRedeemAmount(Number(e.target.value))
            }
            value={redeemAmount}
          />
          <div className="flex w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
            <Icons.wallet className="relative inline-block h-3 w-3 " />
            {userBalance}
            <span
              className="underline hover:cursor-pointer"
              onClick={() => {
                setRedeemAmount(Number(userBalance));
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
        {Number(redeemAmount) > Number(userBalance) && (
          <Alert variant="destructive" className="">
            This amount exceeds your total balance of {userBalance} BGT
          </Alert>
        )}
        <Button
          className=""
          disabled={
            Number(redeemAmount) <= 0 ||
            Number(redeemAmount) > Number(userBalance) ||
            !payload ||
            isLoading
          }
          onClick={() =>
            write({
              address: networkConfig.precompileAddresses
                .erc20BgtAddress as Address,
              abi: REDEEM_ABI,
              functionName: "redeem",
              params: payload,
            })
          }
        >
          Confirm
        </Button>
      </Card>
    </div>
  );
}
