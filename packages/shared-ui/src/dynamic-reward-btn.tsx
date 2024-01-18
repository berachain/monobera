"use client";

import { useState } from "react";
import { formatAmountSmall } from "@bera/berajs/src/utils/formatAmountSmall";
import { bgtTokenAddress } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Input } from "@bera/ui/input";

import { ActionButton } from "./action-btn-wrapper";
import { TokenIcon } from "./token-icon";

export function DynamicRewardBtn({
  claimableBgtRewards,
  disabled,
  onClaim,
  amount,
  setAmount,
  ...props
}: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button {...props} disabled={disabled} onClick={() => setOpen(true)}>
        Claim
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-4">
          <RewardModalContent
            {...{ amount, setAmount, onClaim, claimableBgtRewards }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const RewardModalContent = ({
  amount,
  setAmount,
  onClaim,
  claimableBgtRewards,
}: {
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
  onClaim: () => void;
  claimableBgtRewards: number | undefined;
}) => {
  const exceeding =
    amount !== undefined && Number(amount) > Number(claimableBgtRewards ?? 0);
  const { isSmall, formattedBgt } = formatAmountSmall(claimableBgtRewards ?? 0);
  return (
    <div className="flex w-full flex-col gap-8 sm:w-[440px]">
      <div className="text-lg font-semibold leading-7">Unclaimed Rewards</div>
      <div>
        <Input
          className="w-full text-right"
          placeholder="0.00"
          startAdornment={
            <div className="flex gap-2 text-muted-foreground">
              {" "}
              <TokenIcon address={bgtTokenAddress} fetch /> BGT
            </div>
          }
          value={amount}
          type="number"
          onChange={(e: any) => setAmount(e.target.value as number | undefined)}
        />
        <div className="mt-1 h-[10px] text-right text-[10px] text-muted-foreground">
          {" "}
          Available to Claim: {isSmall && "< "} {formattedBgt.toFixed(2)}{" "}
          <span
            className=" cursor-pointer underline"
            onClick={() => setAmount(Number(claimableBgtRewards ?? 0))}
          >
            MAX
          </span>
        </div>
      </div>
      <ActionButton>
        <Button
          className="w-full"
          disabled={amount === 0 || !amount || exceeding}
          onClick={() => onClaim()}
        >
          Claim Rewards
        </Button>
      </ActionButton>
    </div>
  );
};
