"use client";

import React, { useState } from "react";
import { beraTokenAddress } from "@bera/config";
import { TokenIcon } from "@bera/shared-ui";
import { Input } from "@bera/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@bera/ui/card";
import { Button } from "@bera/ui/button";

interface ClaimRewardsCardProps {
  rewards: number;
}

export const ClaimRewardsCard = ({ rewards }: ClaimRewardsCardProps) => {
  const [claimAmount, setClaimAmount] = useState(0);

  const handleMaxClick = () => {
    setClaimAmount(rewards);
  };

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Claimable BERA</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-4 items-center">
          <TokenIcon address={beraTokenAddress} className="w-8 h-8" />
          <Input
            type="number"
            value={claimAmount}
            onChange={(e) => setClaimAmount(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <p>Total Claimable Rewards: {rewards}</p>
          <p>Max</p>
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <Button className="w-full">Claim</Button>
          <Button className="w-full" variant="outline">
            Re-Stake
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
