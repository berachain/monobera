"use client";

import React from "react";
import {
  STAKING_PRECOMPILE_ABI,
  getTokens,
  truncateHash,
  useBeraJs,
  usePollAccountDelegations,
  type Token,
  type Validator,
  useBeraConfig,
} from "@bera/berajs";
import { ConnectButton, TokenInput, useTxn } from "@bera/shared-ui";
import { Badge } from "@bera/ui/badge";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { type Address, formatUnits, parseUnits } from "viem";

import { dummyToken } from "~/utils/constants";

type Props = {
  validator: Validator | undefined;
  validatorAddress: `0x{string}`;
  inList?: boolean;
};

export default function UnbondButton({
  validator,
  validatorAddress,
  inList = false,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [unbondAmount, setUnbondAmount] = React.useState(0);
  const tokens = getTokens();
  const { useSelectedAccountDelegation } =
    usePollAccountDelegations(validatorAddress);
  const accountDelegation = useSelectedAccountDelegation();
  const { networkConfig } = useBeraConfig();
  const { isConnected } = useBeraJs();
  const { write, isLoading } = useTxn({
    message: `Unbond ${unbondAmount}`,
    onSuccess: () => setOpen(false),
    onError: () => setOpen(false),
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={!inList ? "w-full" : "z-100"}
          onClick={(e) => inList && e.preventDefault()}
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
            amount={unbondAmount}
            setAmount={(amount) => setUnbondAmount(amount)}
            selectable={false}
            selectedTokens={tokens}
            balance={Number(formatUnits(accountDelegation ?? 0n, 0))}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onTokenSelection={() => {}}
          />
          {isConnected ? (
            <Button
              disabled={isLoading}
              onClick={() => {
                write({
                  address: networkConfig.precompileAddresses.stakingAddress as Address,
                  abi: STAKING_PRECOMPILE_ABI,
                  functionName: "undelegate",
                  params: [validatorAddress, parseUnits(`${unbondAmount}`, 18)],
                });
              }}
            >
              Unbond
            </Button>
          ) : (
            <ConnectButton />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
