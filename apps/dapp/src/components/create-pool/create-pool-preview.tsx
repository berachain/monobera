import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import CreatePoolPreviewInput from "~/components/create-pool/create-pool-preview-input";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  tokenWeights: ITokenWeight[];
  error: Error | undefined;
  poolName: string;
  fee: number;
  setPoolName: (poolName: string) => void;
  onSubmit: () => void;
};

export function CreatePoolPreview({
  tokenWeights,
  error,
  poolName,
  fee,
  setPoolName,
  onSubmit,
}: Props) {
  const [editPoolName, setEditPoolName] = useState(false);
  return (
    <Card className="max-w-[500px]">
      <CardHeader>
        <CardTitle className="center flex justify-between">
          Preview New Weighted Pool
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tokenWeights.map((tokenWeight, index) => {
          return (
            <CreatePoolPreviewInput key={index} tokenWeight={tokenWeight} />
          );
        })}
        <h2 className="text-lg">Pool Options</h2>
        <div className="flex h-[40px] w-full items-center justify-between align-middle text-sm text-secondary">
          <p>Pool Name</p>
          <div className="flex">
            {editPoolName ? (
              <Input
                className="mr-1 w-32 border-none text-right"
                value={poolName}
                maxLength={120}
                onChange={(e) => setPoolName(e.target.value)}
              />
            ) : (
              <p className="px-3 py-2">{poolName}</p>
            )}
            <Icons.edit
              className="h-4 w-4 self-center hover:text-purple-100"
              onClick={() => setEditPoolName(!editPoolName)}
            />
          </div>
        </div>
        <div className="flex h-[40px] w-full items-center justify-between text-sm text-secondary">
          <p>Pool Type</p>
          <p>Weighted</p>
        </div>
        <div className="flex h-[40px] w-full items-center justify-between text-sm text-secondary">
          <p>Swap Fee</p>
          <p>{fee}%</p>
        </div>
        {error && (
          <Alert variant="destructive" className="my-4">
            <Icons.warning className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error && error.message}</AlertDescription>
          </Alert>
        )}
        <Button className="mt-4 w-full" onClick={onSubmit}>
          Continue
        </Button>
      </CardContent>
    </Card>
  );
}
