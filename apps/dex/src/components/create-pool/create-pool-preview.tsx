"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DEX_PRECOMPILE_ABI,
  TransactionActionType,
  useBeraConfig,
} from "@bera/berajs";
import { cloudinaryUrl } from "@bera/config";
import { ActionButton, PreviewToken, TokenList, useTxn } from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { parseUnits } from "viem";
import { type Address } from "wagmi";

import onCreatePool from "~/app/api/getPools/api/onCreatePool";
import useCreatePool from "~/hooks/useCreatePool";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import ApproveTokenButton from "../approve-token-button";

type Props = {
  tokenWeights: ITokenWeight[];
  error: Error | undefined;
  poolName: string;
  fee: number;
  setPoolName: (poolName: string) => void;
  onBack: () => void;
};

export function CreatePoolPreview({
  tokenWeights,
  error,
  poolName,
  fee,
  setPoolName,
  onBack,
}: Props) {
  const { needsApproval } = useCreatePool(tokenWeights);
  const { networkConfig } = useBeraConfig();

  const router = useRouter();

  const { write, ModalPortal } = useTxn({
    message: `Create ${poolName} pool`,
    onSuccess: () => {
      void onCreatePool();
      router.push(`/pool`);
    },
    actionType: TransactionActionType.CREATE_POOL,
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
  ];
  return (
    <Card className="w-[350px] shadow-lg sm:w-[480px]">
      {ModalPortal}
      <CardHeader>
        <CardTitle className="center flex items-center text-lg font-semibold">
          <Icons.chevronLeft
            className="block h-6 w-6 hover:cursor-pointer"
            onClick={onBack}
          />{" "}
          Create pool
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Image
          alt="preview"
          src={`${cloudinaryUrl}/placeholder/preview-swap-img_ucrnla`}
          className="self-center"
          width={525}
          height={150}
        />
        <div className="flex w-full flex-col gap-1">
          <p className="pl-1 text-sm font-medium">Give your pool a name</p>
          <Input
            className="w-full border-border px-2 text-left font-semibold focus-visible:ring-0"
            value={poolName}
            maxLength={120}
            onChange={(e) => setPoolName(e.target.value)}
          />
        </div>
        <TokenList className="bg-muted ">
          {tokenWeights.map((tokenWeight, index) => {
            return (
              <PreviewToken
                key={index}
                token={tokenWeight.token}
                weight={tokenWeight.weight}
                value={tokenWeight.initialLiquidity}
              />
            );
          })}
        </TokenList>
        <div className="w-full rounded-lg bg-muted p-2">
          <div className="flex h-[40px] w-full items-center justify-between text-sm">
            <p className="text-primary">Pool Type</p>
            <p>Weighted</p>
          </div>
          <div className="flex h-[40px] w-full items-center justify-between text-sm">
            <p className="text-primary">Swap Fee</p>
            <p>{fee}%</p>
          </div>
        </div>
        {error && (
          <Alert variant="destructive" className="my-4">
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
          <ActionButton>
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
          </ActionButton>
        )}
      </CardContent>
    </Card>
  );
}
