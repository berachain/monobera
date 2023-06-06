import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import CreatePoolInitialLiquidityInput from "./create-pool-initial-liquidity-input";

type Props = {
  tokenWeights: ITokenWeight[];
  error: Error | undefined;
  onTokenBalanceChange: (index: number, amount: number) => void;
  onContinue: () => void;
};

export function CreatePoolInitialLiquidity({
  tokenWeights,
  error,
  onTokenBalanceChange,
  onContinue,
}: Props) {
  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="center flex justify-between">
          Set Initial Liquidity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tokenWeights.map((tokenWeight, index) => {
          return (
            <CreatePoolInitialLiquidityInput
              key={index}
              tokenWeight={tokenWeight}
              index={index}
              onTokenBalanceChange={onTokenBalanceChange}
            />
          );
        })}
        {error && (
          <Alert variant="destructive" className="my-4">
            <Icons.warning className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error && error.message}</AlertDescription>
          </Alert>
        )}
        <Button className="mt-4 w-full" onClick={onContinue}>
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
