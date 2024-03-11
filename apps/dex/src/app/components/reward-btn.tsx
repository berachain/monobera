"use client";

import React, { useState } from "react";
import {
  REWARDS_PRECOMPILE_ABI,
  TransactionActionType,
  useBeraJs,
  usePollBgtRewards,
  useTokens,
} from "@bera/berajs";
import { bgtTokenAddress, rewardsAddress } from "@bera/config";
import { ActionButton, TokenInput, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { parseEther, type Address } from "viem";

export function RewardBtn({ poolAddress, ...props }: any) {
  const { isReady } = useBeraJs();

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<`${number}` | undefined>(undefined);

  const { useBgtReward, refetch } = usePollBgtRewards([poolAddress]);
  const { data: bgtRewards } = useBgtReward(poolAddress);

  const { write, isLoading, ModalPortal } = useTxn({
    message: `Claiming ${
      amount === bgtRewards ? "All" : Number(amount).toFixed(2)
    } BGT Rewards`,
    actionType: TransactionActionType.CLAIMING_REWARDS,
    onSuccess: () => refetch(),
  });

  return (
    <>
      {ModalPortal}
      <Button
        {...props}
        disabled={isLoading || Number(bgtRewards) === 0 || !isReady}
        onClick={() => setOpen(true)}
      >
        Claim
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-4">
          <RewardModalContent
            {...{ poolAddress, amount, setAmount, write, bgtRewards }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const RewardModalContent = ({
  poolAddress,
  amount,
  setAmount,
  write,
  bgtRewards,
}: {
  poolAddress: Address;
  amount: `${number}` | undefined;
  setAmount: (amount: `${number}` | undefined) => void;
  write: (arg0: any) => void;
  bgtRewards: string | undefined;
}) => {
  const exceeding = amount !== undefined && Number(amount) > Number(bgtRewards);

  const { tokenDictionary } = useTokens();
  return (
    <div className="flex w-full flex-col gap-8 ">
      <div className="text-lg font-semibold leading-7">Unclaimed Rewards</div>
      <div className="rounded-md border border-border bg-input">
        <TokenInput
          selected={
            tokenDictionary ? tokenDictionary[bgtTokenAddress] : undefined
          }
          amount={amount}
          balance={bgtRewards}
          hidePrice
          showExceeding={true}
          selectable={false}
          setAmount={(amount) => setAmount(amount as `${number}`)}
        />
      </div>
      <ActionButton>
        <Button
          className="w-full"
          disabled={amount === `${0}` || !amount || exceeding}
          onClick={() => {
            write(
              amount === bgtRewards
                ? {
                    address: rewardsAddress,
                    abi: REWARDS_PRECOMPILE_ABI,
                    functionName: "withdrawAllDepositorRewards",
                    params: [poolAddress],
                  }
                : {
                    address: rewardsAddress,
                    abi: REWARDS_PRECOMPILE_ABI,
                    functionName: "withdrawDepositorRewards",
                    params: [poolAddress, parseEther(amount ?? "0")],
                  },
            );
          }}
        >
          Claim Rewards
        </Button>
      </ActionButton>
    </div>
  );
};
