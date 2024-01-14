"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  DEX_PRECOMPILE_ABI,
  TransactionActionType,
  useBeraConfig,
} from "@bera/berajs";
import { cloudinaryUrl, subgraphUrl } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
  PreviewToken,
  TokenList,
  useTxn,
} from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { parseUnits } from "ethers";
import { type Address } from "wagmi";

import { getSafeNumber } from "~/utils/getSafeNumber";
import onCreatePool from "~/app/api/getPools/api/onCreatePool";
import useCreatePool from "~/hooks/useCreatePool";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  tokenWeights: ITokenWeight[];
  error: Error | undefined;
  poolName: string;
  fee: number;
  setPoolName: (poolName: string) => void;
  onBack: () => void;
  isDuplicatePool?: boolean;
};

const poolNameExisted = (nameInput: string, poolName: string) => {
  return nameInput === poolName;
};

const poolSwapFeeExisted = (swapFeeInput: number, poolSwapFee: number) => {
  return swapFeeInput * 1e16 == poolSwapFee;
};

const poolTokenWeightsExisted = (tokensInput: any, poolsTokens: any) => {
  // rearrange tokenInput
  const formattedTokenInput = tokensInput.map((token: any) => {
    return {
      weight: token?.weight,
      symbol: token?.token?.symbol,
    };
  });
  //rearrange poolTokens
  const formattedPoolTokens = poolsTokens.map((token: any) => {
    return {
      weight: token.denomWeight,
      name: token.symbol,
    };
  });

  for (const token1 of formattedTokenInput) {
    const equivalentExists = formattedPoolTokens.some((token2: any) => {
      return token1.name === token2.name && token1.weight === token2.weight;
    });

    if (!equivalentExists) {
      return true;
    }
  }
  return false;
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
  const [isDuplicatePool, setIsDuplicatePool] = useState(false);

  useEffect(() => {
    const getAllPoolsInfo = async () => {
      try {
        const data = await fetch(subgraphUrl, {
          method: "POST",
          body: JSON.stringify({
            query: `{
                  pools(first: 200){
                    id
                    pool: address
                    poolName: name
                    tokens: poolTokens {
                      denomWeight
                      denom
                      symbol
                    }
                    swapFee
                  }}`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 10 },
        })
          .then((res) => res.json())
          .catch((e: any) => {
            console.log("fetching error", e);
            return undefined;
          });

        if (data.error !== undefined) {
          console.error("error fetching cutting board");
        }

        return data?.data?.pools ?? [];
      } catch (e) {
        console.log(e);
        return 0;
      }
    };

    const fetchData = async () => {
      try {
        const pools = await getAllPoolsInfo();
        return pools.find((pool: any) => {
          const isSameName = poolNameExisted(poolName, pool.poolName);
          const isSameSwapFee = poolSwapFeeExisted(fee, pool.swapFee);
          const isSameTokenWeights = poolTokenWeightsExisted(
            tokenWeights,
            pool.tokens,
          );
          if (isSameName && isSameSwapFee && isSameTokenWeights)
            setIsDuplicatePool(
              isSameName && isSameSwapFee && isSameTokenWeights,
            );
          return;
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [fee, poolName, tokenWeights]);

  const { write, ModalPortal } = useTxn({
    message: `Create ${poolName} pool`,
    onSuccess: () => {
      void onCreatePool();
      router.push(`/pool`);
    },
    actionType: TransactionActionType.CREATE_POOL,
  });

  // holy javascript hell
  const parsedFee = Number(Number(fee / 100).toFixed(4));

  const options = {
    weights: tokenWeights.map((tokenWeight) => ({
      asset: tokenWeight.token?.address,
      weight: tokenWeight.weight,
    })),
    swapFee: parseUnits(`${parsedFee}`, 18),
  };

  const rawBeraEntry = tokenWeights.find((tokenWeight) => {
    return tokenWeight.token?.address === process.env.NEXT_PUBLIC_BERA_ADDRESS;
  });

  const payload = [
    poolName,
    tokenWeights.map((tokenWeight) => tokenWeight.token?.address),
    tokenWeights.map((tokenWeight) =>
      parseUnits(
        tokenWeight.initialLiquidity,
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
                value={getSafeNumber(tokenWeight.initialLiquidity)}
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

        {isDuplicatePool && (
          <Alert variant="destructive" className="my-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Duplicate pool created, please try another one
            </AlertDescription>
          </Alert>
        )}

        {needsApproval.length > 0 ? (
          <ApproveButton
            amount={parseUnits(
              tokenWeights.find(
                (w) => w.token?.address === needsApproval[0]?.address,
              )?.initialLiquidity || "0",
              needsApproval[0]?.decimals ?? 18,
            )}
            token={needsApproval[0]}
            spender={
              networkConfig.precompileAddresses.erc20ModuleAddress as Address
            }
          />
        ) : (
          <ActionButton>
            <Button
              className="w-full"
              disabled={isDuplicatePool}
              onClick={() => {
                write({
                  address: networkConfig.precompileAddresses
                    .erc20DexAddress as Address,
                  abi: DEX_PRECOMPILE_ABI,
                  functionName: "createPool",
                  params: payload,
                  value:
                    rawBeraEntry === undefined
                      ? 0n
                      : parseUnits(rawBeraEntry.initialLiquidity, 18),
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
