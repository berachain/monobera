"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BGT_TOKEN_ABI,
  TransactionActionType,
  useBeraJs,
  usePollWalletBalances,
} from "@bera/berajs";
import { bgtTokenAddress, cloudinaryUrl } from "@bera/config";
import { ActionButton, FormattedNumber, useTxn } from "@bera/shared-ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import BigNumber from "bignumber.js";
import { parseUnits } from "viem";

export default function Redeem() {
  const { isReady, account } = useBeraJs();
  const { useSelectedWalletBalance } = usePollWalletBalances();
  const bgtBalance = useSelectedWalletBalance(bgtTokenAddress);
  const bgtFormattedBalance = bgtBalance?.formattedBalance??"0";
  const [redeemAmount, setRedeemAmount] = useState<string>("");
  const { write, ModalPortal } = useTxn({
    message: `Redeem ${redeemAmount} BERA`,
    actionType: TransactionActionType.REDEEM_BERA,
  });

  return (
    <div className="container mx-auto mb-20 w-full max-w-[564px]">
      {ModalPortal}
      <Image
        className="max-[600px]:mx-auto"
        src={`${cloudinaryUrl}/bears/l9oaplrgfkrqw8y6noyp`}
        alt="proposal-bear"
        width={240}
        height={174}
      />
      <Card className="flex w-full flex-col gap-3 p-6">
        <div className="text-lg font-semibold leading-7 text-foreground">
          Redeem BGT for BERA
        </div>
        <div className="relative flex flex-col gap-2">
          <div className="leading-tigh text-sm font-semibold">Amount</div>
          <Input
            type="number"
            placeholder="0.00"
            endAdornment="BGT"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRedeemAmount(e.target.value)
            }
            value={redeemAmount}
          />
          {isReady && (
            <div className="flex w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
              <Icons.wallet className="relative inline-block h-3 w-3 " />
              <FormattedNumber
                value={bgtFormattedBalance}
                symbol="BGT"
                compact={false}
              />
              <span
                className="underline hover:cursor-pointer"
                onClick={() => {
                  setRedeemAmount(bgtFormattedBalance);
                }}
              >
                MAX
              </span>
            </div>
          )}
        </div>
        {/* <div className="flex flex-col gap-2 rounded-18 bg-muted p-3">
          <div className="flex justify-between text-sm font-medium leading-normal text-muted-foreground">
            <div>BGT Burned</div>
            <div className="text-foreground">0.0 BGT</div>
          </div>
          <div className="flex justify-between text-sm font-medium leading-normal text-muted-foreground">
            <div>BERA Redeemed</div>
            <div className="text-foreground">0.0 BERA</div>
          </div>
        </div> */}
        <Alert variant="info">
          Exchange your BGT for BERA at a 1:1 ratio. Redeeming your BGT into
          BERA is an irreversible action.
        </Alert>
        {/* {Number(redeemAmount) > Number(0) &&
          isReady &&
          !isBalanceLoading && (
            <Alert variant="destructive" className="">
              This amount exceeds your total balance of {userBalance} BGT
            </Alert>
          )} */}
        <ActionButton>
          <Button
            className="w-full"
            disabled={
              BigNumber(redeemAmount).lte(0) ||
              BigNumber(redeemAmount).gt(bgtFormattedBalance) ||
              !isReady
            }
            onClick={() =>
              write({
                address: bgtTokenAddress,
                abi: BGT_TOKEN_ABI,
                functionName: "redeem",
                params: [
                  account,
                  parseUnits(redeemAmount === "" ? "0" : redeemAmount, 18),
                ],
              })
            }
          >
            Confirm
          </Button>
        </ActionButton>
      </Card>
    </div>
  );
}
