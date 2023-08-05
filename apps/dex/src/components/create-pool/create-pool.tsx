import React from "react";
import { useBeraJs, type Token } from "@bera/berajs";
import { ConnectButton } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import CreatePoolInput from "~/components/create-pool/create-pool-input";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  tokenWeights: ITokenWeight[];
  totalWeight: number;
  error: Error | undefined;
  onContinue: () => void;
  onTokenSelection: (token: Token, index: number) => void;
  onAddToken: () => void;
  onRemove: (index: number) => void;
  onTokenWeightChange: (index: number, weight: number) => void;
  onLock: (index: number) => void;
  onUnlock: (index: number) => void;
};

export function CreatePool({
  tokenWeights,
  totalWeight,
  error,
  onContinue,
  onTokenSelection,
  onAddToken,
  onRemove,
  onTokenWeightChange,
  onLock,
  onUnlock,
}: Props) {
  const exceeding = totalWeight > 100;
  const selectedTokens = tokenWeights.map((tokenWeight: ITokenWeight) => {
    return tokenWeight.token;
  }) as Token[];
  const { isConnected, isWrongNetwork } = useBeraJs();
  return (
    <Card className="sm:w-[480px] w-[350px]">
      <CardHeader>
        <CardTitle className="center flex self-center p-0 sm:text-lg text-md font-semibold">
          Choose tokens and allocate weights
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ul
          role="list"
          className="divide divide-y divide-border rounded-lg border"
        >
          {tokenWeights.map((tokenWeight, index) => {
            return (
              <CreatePoolInput
                key={index}
                tokenWeight={tokenWeight}
                index={index}
                selectedTokens={selectedTokens}
                onTokenSelection={onTokenSelection}
                onRemove={onRemove}
                onTokenWeightChange={onTokenWeightChange}
                onLock={onLock}
                onUnlock={onUnlock}
              />
            );
          })}
        </ul>
        <Icons.pluseCircle
          className="mt-4 h-6 w-6 self-center text-muted-foreground"
          onClick={onAddToken}
        />
        {error && (
          <Alert variant="destructive" className="my-4">
            <Icons.warning className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error && error.message}</AlertDescription>
          </Alert>
        )}
        <div className="mt-4 flex justify-between text-sm">
          <p>Total allocated</p>
          <p className={cn("h-2", exceeding && "text-destructive")}>
            {totalWeight.toFixed(2)}%
          </p>
        </div>
        {isConnected && !isWrongNetwork ? (
          <Button
            disabled={error?.message === "Tokens must be selected"}
            className="mt-4 w-full"
            onClick={onContinue}
          >
            Next
          </Button>
        ) : (
          <ConnectButton className="mt-4 w-full" />
        )}
      </CardContent>
    </Card>
  );
}
