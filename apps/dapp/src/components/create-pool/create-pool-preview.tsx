"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DEX_PRECOMPILE_ABI,
  DEX_PRECOMPILE_ADDRESS,
  ERC2MODULE_PRECOMPILE_ADDRESS,
  useBeraJs,
} from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { parseUnits } from "viem";

import CreatePoolPreviewInput from "~/components/create-pool/create-pool-preview-input";
import useCreatePool from "~/hooks/useCreatePool";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import ApproveTokenButton from "../approve-token-button";

type Props = {
  tokenWeights: ITokenWeight[];
  error: Error | undefined;
  poolName: string;
  fee: number;
  setPoolName: (poolName: string) => void;
};

export function CreatePoolPreview({
  tokenWeights,
  error,
  poolName,
  fee,
  setPoolName,
}: Props) {
  const [editPoolName, setEditPoolName] = useState(false);

  const { needsApproval } = useCreatePool(tokenWeights);
  const router = useRouter();

  const { account } = useBeraJs();
  const { write } = useTxn({
    message: `Create ${poolName} pool`,
    onSuccess: () => {
      router.push(`/pool`);
    },
  });

  const options = {
    weights: tokenWeights.map((tokenWeight) => ({
      asset: tokenWeight.token?.address,
      weight: tokenWeight.weight,
    })),
    swapFee: fee,
  };

  const payload = [
    poolName,
    tokenWeights.map((tokenWeight) => tokenWeight.token?.address),
    tokenWeights.map((tokenWeight) =>
      parseUnits(
        `${tokenWeight.initialLiquidity}`,
        tokenWeight.token?.decimals ?? 18,
      ),
    ),
    "balancer",
    options,
    account,
  ];
  console.log(payload);
  return (
    <Card className="w-full">
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
        <div className="flex h-[40px] items-center justify-between align-middle text-sm">
          <p>Pool Name</p>
          <div className="flex">
            {editPoolName ? (
              <Input
                className="mr-1 border-none text-right"
                value={poolName}
                maxLength={120}
                onChange={(e) => setPoolName(e.target.value)}
              />
            ) : (
              <p className="px-3 py-2">{poolName}</p>
            )}
            <Button
              onClick={() => setEditPoolName(!editPoolName)}
              variant="ghost"
              className="px-0"
            >
              <Icons.edit className="h-4 w-4 self-center hover:text-primary" />
            </Button>
          </div>
        </div>
        <div className="flex h-[40px] w-full items-center justify-between text-sm">
          <p>Pool Type</p>
          <p>Weighted</p>
        </div>
        <div className="flex h-[40px] w-full items-center justify-between text-sm">
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
        {needsApproval.length > 0 ? (
          <ApproveTokenButton
            token={needsApproval[0]}
            spender={ERC2MODULE_PRECOMPILE_ADDRESS}
          />
        ) : (
          <Button
            onClick={() => {
              write({
                address: DEX_PRECOMPILE_ADDRESS,
                abi: DEX_PRECOMPILE_ABI,
                functionName: "createPool",
                params: payload,
              });
            }}
          >
            Create Pool
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
