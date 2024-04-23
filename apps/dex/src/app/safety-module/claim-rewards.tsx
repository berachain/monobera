"use client";

import React, { useState } from "react";
import { beraTokenAddress } from "@bera/config";
import { TokenIcon } from "@bera/shared-ui";
import { Input } from "@bera/ui/input";
import { Button } from "@bera/ui/button";

interface ClaimRewardsCardProps {
  rewards: number;
}

export const ClaimRewardsCard = ({ rewards }: ClaimRewardsCardProps) => {
  const [claimAmount, setClaimAmount] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = Number(event.target.value);
    if (
      !Number.isNaN(numValue) &&
      (numValue >= 0 || event.target.value === "")
    ) {
      setClaimAmount(event.target.value);
    }
  };

  const handleMaxClick = () => {
    setClaimAmount(rewards.toString());
  };

  return (
    <div className="bg-background rounded-md p-4 border">
      <h2 className="text-lg font-semibold pb-2">Claim Your Rewards</h2>
      <div className="flex">
        <div className="px-2 py-2 border-r-0 border rounded-tl-sm rounded-bl-sm">
          <TokenIcon
            address={beraTokenAddress}
            className="flex items-center pointer-events-none"
          />
        </div>
        <div className="flex flex-grow">
          <Input
            type="text"
            placeholder="Enter amount"
            value={claimAmount}
            onChange={handleInputChange}
            className="pr-20 rounded-none border h-full flex-1"
          />
        </div>
        <Button
          onClick={handleMaxClick}
          className="flex font-bold rounded-none rounded-r-sm"
        >
          Max
        </Button>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Total Claimable Rewards: {rewards.toFixed(2)}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Button
          disabled={rewards === 0}
          onClick={() => console.log("Claim", claimAmount)}
        >
          Claim
        </Button>
        <Button
          variant="outline"
          disabled={rewards === 0}
          onClick={() => console.log("Re-Stake", claimAmount)}
        >
          Re-Stake
        </Button>
      </div>
    </div>
  );
};
