"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBeraJs, usePollBgtBalance, type Token } from "@bera/berajs";
import { ActionButton } from "@bera/shared-ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { useTheme } from "next-themes";

import useCreateIncentiveTokens, {
  IncentivizeToken,
} from "~/hooks/useCreateIncentivizeTokens";
import AddIncentivizeToken from "./add-incentivize-input";

export default function Incentivize({}: {}) {
  const { isConnected } = useBeraJs();
  const { theme, systemTheme } = useTheme();
  const t = theme === "system" ? systemTheme : theme;
  const router = useRouter();
  const [poolAddress, setPoolAddress] = React.useState<string | undefined>(
    undefined,
  );

  const { useBgtBalance, isLoading: isBalanceLoading } = usePollBgtBalance();
  const bgtBalance = useBgtBalance();
  const {
    incentivizeTokens,
    error,
    onTokenSelection,
    onAddToken,
    onRemove,
    onTokenAmountChange,
  } = useCreateIncentiveTokens();
  console.log("incentivizeTokens", incentivizeTokens);
  const selectedTokens = incentivizeTokens.map(
    (incentivizeToken: IncentivizeToken) => {
      return incentivizeToken.token;
    },
  ) as Token[];

  return (
    <div className="container mx-auto w-full max-w-[480px] px-8 pb-20">
      <Card className="mx-6 w-full items-center bg-background">
        <CardHeader>
          <CardTitle className="center flex flex-col justify-between text-lg">
            Incentivize a Pool
            <div className="text-md flex py-2 font-normal text-muted-foreground">
              Please select the address
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="text-md flex font-semibold text-foreground">
            Search/Enter Pool Address
          </div>
          <div className="text-sm leading-tight">
            <Input
              type="text"
              placeholder="0x0000...0000"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPoolAddress(e.target.value)
              }
              value={poolAddress}
            />
          </div>
          <div className="text-md flex font-semibold text-foreground">
            Set Amount
          </div>
          <div className="border-1 flex flex-col gap-6 border-border">
            <ul className="divide-y divide-border rounded-lg border">
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
            className="mt-4 h-6 w-6 self-center text-muted-foreground"
            onClick={onAddToken}
          />
          {/* Placeholder */}
          <div className="flex flex-col rounded-lg bg-muted p-4">
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
