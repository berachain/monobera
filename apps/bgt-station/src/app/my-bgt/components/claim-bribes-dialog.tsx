"use client";

import React from "react";
import {
  formatUsd,
  usePollBribes,
  useTokens,
  type FormattedBribe,
} from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";
import { Button } from "@bera/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@bera/ui/dialog";
import { getAddress } from "viem";

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
  const { useFormattedValidatorUserBribes } = usePollBribes();
  const formattedBribes: FormattedBribe[] =
    useFormattedValidatorUserBribes(prices);
  const { tokenDictionary } = useTokens();
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
        <div className="flex w-full flex-col items-center">
          <div className="flex flex-col self-center text-5xl font-bold leading-[48px] text-foreground">
            {formatUsd(totalValue ?? 0)}
            <span className="text-center text-sm font-semibold leading-normal text-muted-foreground">
              in claimable rewards
            </span>
          </div>
        </div>
        <Accordion type="multiple" className="flex-grow">
          {formattedBribes.map((bribe: FormattedBribe) => {
            return (
              <AccordionItem value="item-1" key={bribe.validatorAddress}>
                <AccordionTrigger>
                  <div className="flex w-full flex-row items-center justify-between text-sm">
                    {/* <Identicon account={getAddress(voter.voter)} />
                  {truncateHash(voter.voter, 6, 4)} */}
                    <p>{bribe.validatorName}</p>
                    <p>{formatUsd(bribe.totalValue)}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex w-full flex-col gap-4 text-xs font-medium leading-tight text-muted-foreground">
                  {bribe.rewards.map((reward) => {
                    const token =
                      tokenDictionary &&
                      tokenDictionary[getAddress(reward.token)];
                    const tokenAddress = token ? token.address : reward.token;
                    console.log(tokenAddress);
                    return (
                      <div
                        className="mt-2 flex w-full flex-row justify-between"
                        key={reward.token}
                      >
                        <div>
                          <TokenIcon address={tokenAddress} fetch size="xl" />
                        </div>
                        <p>{formatUsd(reward.amount)}</p>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
