"use client";

import React from "react";
import { ActionButton } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { useTheme } from "next-themes";

import useCreateIncentiveTokens from "~/hooks/useCreateIncentivizeTokens";
import AddIncentivizeToken from "./add-incentivize-input";

export default function Incentivize() {
  const [poolAddress, setPoolAddress] = React.useState<string | undefined>(
    undefined,
  );

  const {
    incentivizeTokens,
    error,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenAmountChange,
  } = useCreateIncentiveTokens();

  return (
    <div className="container mx-auto w-full max-w-[480px] px-8 pb-20">
      <Card className="mx-6 w-full items-center bg-background shadow-lg">
        <CardHeader>
          <CardTitle className="center flex flex-col justify-between text-lg">
            Incentivize a Pool
            <div className="flex py-2 text-sm font-normal text-muted-foreground">
              Please select the address
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex text-sm font-semibold text-foreground">
            Search/Enter Pool Address
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
          <div className="mt-4 flex text-sm font-semibold text-foreground">
            Set Amount
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
          {/* Placeholder */}
          <div className="flex flex-col gap-1 rounded-lg bg-muted p-4">
            <div className="flex flex-row justify-between">
              <div className="text-md flex font-semibold text-muted-foreground">
                Detail 1
              </div>
              <div className="text-md flex font-semibold text-foreground">
                Number
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div className="text-md flex font-semibold text-muted-foreground">
                Detail 1
              </div>
              <div className="text-md flex font-semibold text-foreground">
                Number
              </div>
            </div>
          </div>
        </CardContent>
        <div className="flex flex-col p-4">
          <ActionButton>
            <Button className="flex w-full gap-1">Incentivize</Button>
          </ActionButton>
        </div>
      </Card>
    </div>
  );
}
