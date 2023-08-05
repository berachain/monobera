"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { DEX_PRECOMPILE_ABI, useBeraConfig, useBeraJs } from "@bera/berajs";
import { useTxn } from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { parseUnits } from "viem";
import { type Address } from "wagmi";
import Image from "next/image";

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
  const { needsApproval } = useCreatePool(tokenWeights);
  const { networkConfig } = useBeraConfig();

  const router = useRouter();

  const { account } = useBeraJs();
  const { write, ModalPortal } = useTxn({
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
    swapFee: parseUnits(`${fee / 100}`, 18),
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
  return (
    <Card className="sm:w-[480px] w-[350px]">
      {ModalPortal}
      <CardHeader>
        <CardTitle className="center flex justify-between text-lg font-semibold">
          Create Pool
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">

      <Image
            alt="preview"
            src="/graphics/create-pool-preview.png"
            className="self-center bg-gradient-to-b from-stone-50 to-stone-50"
            width={525}
            height={150}
          />
        <div className="w-full flex flex-col gap-1">
        <p className="text-sm font-medium ">Give Your Pool a Name</p>
        <Input
          className="w-full border-border px-2 text-left font-semibold focus-visible:ring-0"
          value={poolName}
          maxLength={120}
          onChange={(e) => setPoolName(e.target.value)}
        />
        </div>
        <ul
          role="list"
          className="divide divide-y divide-border rounded-lg border flex flex-col bg-border "
        >
        {tokenWeights.map((tokenWeight, index) => {
          return (
            <CreatePoolPreviewInput key={index} tokenWeight={tokenWeight} />
          );
        })}
        </ul>
        <div className="w-full bg-border rounded-lg p-2">
        <div className="flex h-[40px] w-full items-center justify-between text-sm">
          <p className="text-muted-foreground">Pool Type</p>
          <p >Weighted</p>
        </div>
        <div className="flex h-[40px] w-full items-center justify-between text-sm">
          <p className="text-muted-foreground">Swap Fee</p>
          <p >{fee}%</p>
        </div>
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
            spender={
              networkConfig.precompileAddresses.erc20ModuleAddress as Address
            }
          />
        ) : (
          <Button
            className="w-full"
            onClick={() => {
              write({
                address: networkConfig.precompileAddresses
                  .erc20DexAddress as Address,
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
