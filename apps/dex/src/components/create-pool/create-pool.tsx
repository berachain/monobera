import React from "react";
import { type Token } from "@bera/berajs";
import { ActionButton } from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import CreatePoolInput from "~/components/create-pool/create-pool-input";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import { useCrocIsDupePool } from "~/hooks/useCrocIsDupePool";

type Props = {
  tokenWeights: ITokenWeight[];
  totalWeight: number;
  error: Error | undefined;
  onContinue: () => void;
  onTokenSelection: (token: Token | undefined, index: number) => void;
  onTokenWeightChange: (index: number, weight: number) => void;
};

export function CreatePool({
  tokenWeights,
  error,
  onContinue,
  onTokenSelection,
}: Props) {
  const selectedTokens = tokenWeights.map((tokenWeight: ITokenWeight) => {
    return tokenWeight.token;
  }) as Token[];

  const { useIsDupePool, isLoading } = useCrocIsDupePool({
    base: tokenWeights[0]?.token,
    quote: tokenWeights[1]?.token,
  });
  const isDupePool = useIsDupePool();
  return (
    <Card className="w-[350px] px-6 py-8 shadow-lg sm:w-[480px]">
      <CardTitle className="center text-md mb-3 flex w-full self-center p-0 text-center font-semibold sm:text-lg">
        Choose Base and Quote Tokens
      </CardTitle>

      <div className="flex flex-col gap-4">
        <ul className="divide divide-y divide-border rounded-lg border">
          {tokenWeights.map((tokenWeight, index) => {
            return (
              <CreatePoolInput
                key={index}
                tokenWeight={tokenWeight}
                index={index}
                selectedTokens={selectedTokens}
                onTokenSelection={onTokenSelection}
                isQuoteAsset={index === 1}
              />
            );
          })}
        </ul>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              {" "}
              <Icons.info className="mr-1 mt-[-4px] inline h-4 w-4" />
              {error?.message}
            </AlertDescription>
          </Alert>
        )}
        {isDupePool && (
          <Alert variant="destructive">
            <AlertTitle>Similar Pools Already Exist</AlertTitle>
            <AlertDescription>
              Please note that creating this pool will not be possible; consider
              adding liquidity to an existing pool instead.
            </AlertDescription>
          </Alert>
        )}
        <ActionButton>
          <Button
            disabled={error !== undefined || isLoading || isDupePool === true}
            className="w-full"
            onClick={onContinue}
          >
            Next
          </Button>
        </ActionButton>
      </div>
    </Card>
  );
}
