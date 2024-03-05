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
  tokenA: Token | undefined;
  tokenB: Token | undefined;
  error: Error | undefined;
  setTokenA: (token: Token | undefined) => void;
  setTokenB: (token: Token | undefined) => void;
  onContinue: () => void;
};

export function CreatePool({
  tokenA,
  tokenB,
  setTokenA,
  setTokenB,
  error,
  onContinue,
}: Props) {
  const selectedTokens = [tokenA, tokenB] as Token[];

  const { useIsDupePool, isLoading } = useCrocIsDupePool({
    tokenA,
    tokenB,
  });
  const isDupePool = useIsDupePool();
  return (
    <Card className="w-[350px] px-6 py-8 shadow-lg sm:w-[480px]">
      <CardTitle className="center text-md mb-3 flex w-full self-center p-0 text-center font-semibold sm:text-lg">
        Choose Base and Quote Tokens
      </CardTitle>

      <div className="flex flex-col gap-4">
        <ul className="divide divide-y divide-border rounded-lg border">
          <CreatePoolInput
            key={0}
            token={tokenA}
            selectedTokens={selectedTokens}
            onTokenSelection={setTokenA}
          />
          <CreatePoolInput
            key={1}
            token={tokenB}
            selectedTokens={selectedTokens}
            onTokenSelection={setTokenB}
          />
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
