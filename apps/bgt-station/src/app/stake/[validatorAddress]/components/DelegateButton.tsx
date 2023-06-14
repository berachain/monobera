"use client";

import React from "react";
import {
  STAKING_PRECOMPILE_ABI,
  STAKING_PRECOMPILE_ADDRESS,
  getTokens,
  truncateHash,
  useBeraJs,
  usePollBgtBalance,
  type Token,
  type Validator,
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
import { parseUnits } from "viem";

import { dummyToken } from "~/utils/constants";
import ConnectWalletDialog from "~/components/connect-wallet-dialog";
import TokenInput from "~/components/token-input";
import { useTxn } from "~/hooks/useTxn";

type Props = {
  validator: Validator | undefined;
  validatorAddress: `0x{string}`;
};

export default function DelegateButton({ validator, validatorAddress }: Props) {
  const [open, setOpen] = React.useState(false);
  const [delegateAmount, setDelegateAmount] = React.useState(0);
  const { useBgtBalance } = usePollBgtBalance();
  const bgtBalance = useBgtBalance();
  const { isConnected } = useBeraJs();
  const tokens = getTokens();
  const { write, isLoading } = useTxn({
    onSuccess: () => setOpen(false),
    onError: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Delegate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Delegate details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="my-6 flex items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-gray-300" />
            <div>
              <h3 className="text-lg font-semibold">
                {validator?.description.moniker}
              </h3>
              <Badge variant="secondary">
                {truncateHash(validatorAddress)}
              </Badge>
            </div>
          </div>
          <TokenInput
            selected={tokens[0] || (dummyToken as Token)}
            amount={delegateAmount}
            setAmount={(amount) => setDelegateAmount(amount)}
            selectable={false}
            balance={Number(bgtBalance)}
          />
          {isConnected ? (
            <Button
              disabled={isLoading}
              onClick={() => {
                write({
                  address: STAKING_PRECOMPILE_ADDRESS,
                  abi: STAKING_PRECOMPILE_ABI,
                  functionName: "delegate",
                  params: [
                    validatorAddress,
                    parseUnits(`${delegateAmount}`, 18),
                  ],
                });
              }}
            >
              Delegate
            </Button>
          ) : (
            <ConnectWalletDialog className="w-full" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
