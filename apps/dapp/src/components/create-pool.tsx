import React from "react";
import { type Token } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Progress } from "@bera/ui/progress";
import { AlertCircle } from "lucide-react";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import CreatePoolInput from "./create-pool-input";
import { SettingsPopover } from "./settings-popover";

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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="center flex justify-between">
            Swap <SettingsPopover />
          </CardTitle>
        </CardHeader>
        <CardContent>
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
          <Button onClick={onAddToken} variant="secondary">
            Add a token
          </Button>
          {error && (
            <Alert variant="destructive" className="my-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error && error.message}</AlertDescription>
            </Alert>
          )}
          <div className="mt-4 flex justify-between">
            <p>Total allocated</p>
            <p className={cn("h-2", exceeding && "text-destructive")}>
              {totalWeight.toFixed(2)}%
            </p>
          </div>
          <Progress
            value={exceeding ? 100 : totalWeight}
            className={cn("h-2", exceeding && "bg-destructive")}
          />
          <Button className="mt-4 w-full" onClick={onContinue}>
            Continue
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
