"use client";

import React from "react";
import {
  getTokens,
  truncateHash,
  usePollAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";

import { dummyToken } from "~/utils/constants";
import SwapInput from "~/components/swap-input";
import { type ValidatorInfo } from "../../data/validator";

type Props = {
  validator: ValidatorInfo;
  validatorAddress: `0x{string}`;
  inList?: boolean;
};

export default function UnbondButton({
  validator,
  validatorAddress,
  inList = false,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [redeemAmount, setRedeemAmount] = React.useState(0);
  usePollAssetWalletBalance();
  const tokens = getTokens();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={!inList ? "w-full" : ""}
          onClick={(e) => inList && e.stopPropagation()}
        >
          Unbond
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delegate details</DialogTitle>
        </DialogHeader>
        <div
          className=" 
      flex flex-col gap-3"
        >
          <div className="my-6 flex items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-gray-300" />
            <div>
              <h3 className="text-lg font-semibold">{validator.name}</h3>
              <Badge variant="secondary">
                {truncateHash(validatorAddress)}
              </Badge>
            </div>
          </div>
          <SwapInput
            selected={tokens[0] || (dummyToken as Token)}
            amount={redeemAmount}
            setAmount={(amount) => setRedeemAmount(amount)}
            selectable={false}
            selectedTokens={tokens}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onTokenSelection={() => {}}
          />
          <Button
            onClick={() => {
              // TODO: delegate
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
