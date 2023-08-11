import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import CreatePoolInitialLiquidityInput from "~/components/create-pool/create-pool-initial-liquidity-input";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

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
    <Card className="w-[350px] sm:w-[480px]">
      <CardHeader>
        <CardTitle className="center flex justify-between">
          Set Initial Liquidity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul
          role="list"
          className="divide divide-y divide-border rounded-lg border"
        >
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
        </ul>

        {error && (
          <Alert className="my-4">
            <Icons.warning className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error && error.message}</AlertDescription>
          </Alert>
        )}
        <Button
          className="mt-4 w-full"
          onClick={onContinue}
          disabled={error !== undefined}
        >
          Next
        </Button>
      </CardContent>
    </Card>
  );
}
