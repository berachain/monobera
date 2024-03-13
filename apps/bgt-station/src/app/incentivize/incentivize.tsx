"use client";

import React, { useEffect, useState } from "react";
import { ActionButton } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import useCreateIncentiveTokens from "~/hooks/useCreateIncentivizeTokens";
import AddIncentivizeToken from "./add-incentivize-input";

export default function Incentivize() {
  const [poolAddress, setPoolAddress] = useState<string | undefined>(undefined);
  const [blockNumber, setBlockNumber] = useState<string | undefined>(undefined);
  const [totalIncentiveValue, setTotalIncentiveValue] =
    React.useState<number>(0);

  const {
    incentivizeTokens,
    error,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenAmountChange,
  } = useCreateIncentiveTokens();
  useEffect(() => {
    const total = incentivizeTokens.reduce((acc, token) => {
      // Assuming token.amount is a number. If it's a string, you may need to convert it using parseFloat(token.amount) or a similar method
      return acc + (parseFloat(token.amount) || 0);
    }, 0);
    setTotalIncentiveValue(total);
  }, [incentivizeTokens]);

  return (
    <div className="container mx-auto max-w-[480px] pb-20">
      <Card className="w-full items-center justify-center bg-background p-4 shadow-lg sm:w-[480px]">
        <div className="center flex flex-col justify-between text-lg font-semibold text-foreground">
          Incentivize a Pool
          <div className="flex text-sm font-normal text-muted-foreground">
            Note: Incentives are generally distributed by protocols.
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-8">
          <div className="flex flex-col">
            <div className="flex text-sm font-medium text-foreground">
              1. Search/Enter Pool Address
            </div>
            <div className="text-sm leading-tight">
              {/* TODO: add pool address validation */}
              <Input
                type="text"
                placeholder="0x0000...0000"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPoolAddress(e.target.value)
                }
                value={poolAddress}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex text-sm font-medium text-foreground">
              2. Set a Starting Block No.
            </div>
            <div className="text-sm leading-tight">
              {/* TODO: add block number validation */}
              <Input
                type="text"
                placeholder="0x0000...0000"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBlockNumber(e.target.value)
                }
                value={blockNumber}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex text-sm font-medium text-foreground">
              3. Select Tokens & Set Amounts
            </div>
            <div className="border-1 flex flex-col gap-6 border-border">
              <ul className="divide-y divide-border rounded-md border">
                {incentivizeTokens.map((incentivizeToken, index) => (
                  <AddIncentivizeToken
                    key={index}
                    selectedToken={incentivizeToken}
                    index={index}
                    onTokenSelection={onTokenSelection}
                    onRemove={onRemove}
                    onTokenAmountChange={onTokenAmountChange}
                  />
                ))}
              </ul>
            </div>
            <Icons.plusCircle
              className="m-4 h-6 w-6 self-center text-muted-foreground"
              onClick={onAddToken}
            />
          </div>
          {/* Placeholder */}
          <div className="flex flex-col gap-1 rounded-lg bg-muted p-4">
            <div className="flex flex-row justify-between">
              <div className="text-md flex font-medium text-muted-foreground">
                Total Incentive Value
              </div>
              <div className="text-md flex font-medium text-foreground">
                ${totalIncentiveValue}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-md flex font-medium text-muted-foreground">
                Incentive Start Block
              </div>
              <div className="text-md flex font-medium text-foreground">
                {blockNumber ?? "~~"}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-md flex font-medium text-muted-foreground">
                Est. Start Date
              </div>
              <div className="text-md flex font-medium text-foreground">
                Number
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <ActionButton>
              <Button className="flex w-full gap-1">Incentivize</Button>
            </ActionButton>
          </div>
        </div>
      </Card>
    </div>
  );
}
