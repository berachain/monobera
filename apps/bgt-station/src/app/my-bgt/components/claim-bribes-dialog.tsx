"use client";

import React from "react";
import { formatUsd, usePollBribes, type FormattedBribe } from "@bera/berajs";
import { TokenIcon, ValidatorIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { type Address } from "viem";

import { usePollPrices } from "~/hooks/usePollPrices";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  disabled: boolean;
  totalValue: number;
  bribes: any[];
}

export function ClaimBribesDialog({
  open,
  setOpen,
  disabled,
  totalValue,
}: Props) {
  const { usePrices } = usePollPrices();
  const prices = usePrices();
  const { useFormattedValidatorUserBribes, useBribeTokensSymbol } =
    usePollBribes();
  const formattedBribes: FormattedBribe[] =
    useFormattedValidatorUserBribes(prices);

  const bribeTokensSymbol = useBribeTokensSymbol();
  console.log(bribeTokensSymbol);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full max-w-[223px]"
          disabled={disabled}
          onClick={() => {
            setOpen(true);
          }}
        >
          Claim
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="mb-3">Reward Breakdown</DialogTitle>
        </DialogHeader>
        <div className="flex h-full w-full flex-col items-center gap-2">
          <div className="flex w-full flex-col items-center">
            <div className="flex flex-col self-center text-5xl font-bold leading-[48px] text-foreground">
              {formatUsd(totalValue ?? 0)}
              <span className="text-center text-sm font-semibold leading-normal text-muted-foreground">
                in claimable rewards
              </span>
            </div>
          </div>
          {formattedBribes.map((bribe: FormattedBribe, index) => {
            return (
              <div
                className="w-full"
                key={bribe.validatorAddress ?? `item-${index}`}
              >
                <div>
                  <div className="flex w-full flex-row items-center justify-between text-sm font-semibold">
                    <div className="flex flex-row items-center justify-center gap-1">
                      <ValidatorIcon
                        address={bribe.validatorAddress as Address}
                        className="h-8 w-8"
                      />
                      <p>{bribe.validatorName}</p>
                    </div>
                    <p>{formatUsd(bribe.totalValue)}</p>
                  </div>
                </div>
                <div className="flex h-fit w-full flex-col gap-4 text-xs font-medium leading-tight text-muted-foreground">
                  {bribe.rewards.map((reward) => {
                    return (
                      <div
                        className="mt-2 flex w-full flex-row justify-between"
                        key={reward.token}
                      >
                        <div className="flex flex-row items-center justify-center gap-1">
                          <TokenIcon address={reward.token} fetch size="xl" />
                          <p>{reward.amount.toFixed(2)}</p>
                          {/* <p>{tokenInformation?.symbol}</p> */}
                        </div>
                        <p>{formatUsd(reward.value)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
