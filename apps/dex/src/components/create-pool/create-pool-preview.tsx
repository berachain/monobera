"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  CROCSWAP_DEX,
  TransactionActionType,
  formatNumber,
  useCrocEnv,
} from "@bera/berajs";
import { crocDexAddress } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
  PreviewToken,
  TokenList,
  useSlippage,
  useTxn,
} from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { parseUnits } from "ethers";
import { type Address } from "wagmi";

import { getSafeNumber } from "~/utils/getSafeNumber";
import onCreatePool from "~/app/api/getPools/api/onCreatePool";
import useCreatePool from "~/hooks/useCreatePool";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import {
  type BeraSdkResponse,
  initPool,
  CrocPoolView,
  type PriceRange,
} from "@bera/beracrocswap";
import { CrocTokenView } from "@bera/beracrocswap/dist/tokens";
import { type CrocContext } from "@bera/beracrocswap/dist/context";
import { encodeAbiParameters, parseAbiParameters } from "viem";

type Props = {
  tokenWeights: ITokenWeight[];
  error: Error | undefined;
  initialPrice: string;
  onBack: () => void;
};

export function CreatePoolPreview({
  tokenWeights,
  error,
  initialPrice,
  onBack,
}: Props) {
  const { needsApproval } = useCreatePool(tokenWeights);
  const router = useRouter();

  const { write, ModalPortal } = useTxn({
    message: "Create new pool",
    onSuccess: () => {
      void onCreatePool();
      router.push("/pool");
    },
    actionType: TransactionActionType.CREATE_POOL,
  });

  const rawBeraEntry = tokenWeights.find((tokenWeight) => {
    return tokenWeight.token?.address === process.env.NEXT_PUBLIC_BERA_ADDRESS;
  });

  tokenWeights[0]?.initialLiquidity;
  const baseToken = tokenWeights[0]?.token;
  const baseTokenInitialLiquidity = tokenWeights[0]?.initialLiquidity;
  const quoteToken = tokenWeights[1]?.token;

  const crocenv = useCrocEnv();

  const slippage = useSlippage();

  const handleCreatePool = useCallback(async () => {
    try {
      const crocContext: Promise<CrocContext> = crocenv.crocEnv
        ?.context as Promise<CrocContext>;

      const baseAssetCrocTokenView: CrocTokenView = new CrocTokenView(
        crocContext,
        baseToken?.address as string,
        baseToken?.decimals as number,
      );
      const quoteAssetCrocTokenView: CrocTokenView = new CrocTokenView(
        crocContext,
        quoteToken?.address as string,
        quoteToken?.decimals as number,
      );

      const crocPoolView: CrocPoolView = new CrocPoolView(
        quoteAssetCrocTokenView,
        baseAssetCrocTokenView,
        crocContext,
      );

      const priceLimits = {
        min: getSafeNumber(initialPrice) * (1 - (slippage ?? 1) / 100),
        max: getSafeNumber(initialPrice) * (1 + (slippage ?? 1) / 100),
      };
      const limits: PriceRange = [priceLimits.min, priceLimits.max];

      const initPoolInfo: BeraSdkResponse = initPool(
        Number(initialPrice),
        baseToken as any,
        quoteToken as any,
        36000,
      );

      const mintInfo: BeraSdkResponse = await crocPoolView.mintAmbientBase(
        baseTokenInitialLiquidity ?? 0,
        limits,
      );

      const totalValue =
        BigInt(initPoolInfo.value ?? 0) + BigInt(mintInfo.value ?? 0);
      const multiPathArgs = [2, 3, initPoolInfo.calldata, 2, mintInfo.calldata];

      const multiCmd = encodeAbiParameters(
        parseAbiParameters("uint8, uint8, bytes, uint8, bytes"),
        multiPathArgs as any[5],
      );
      write({
        address: crocDexAddress,
        abi: CROCSWAP_DEX,
        functionName: "userCmd",
        params: [6, multiCmd],
        value: rawBeraEntry === undefined ? 0n : totalValue,
      });
    } catch (error) {
      console.error("Error creating pool:", error);
    }
  }, [
    crocenv,
    baseToken,
    quoteToken,
    initialPrice,
    baseTokenInitialLiquidity,
    slippage,
    write,
    rawBeraEntry,
  ]);

  return (
    <Card className="w-[350px] shadow-lg sm:w-[480px]">
      {ModalPortal}
      <CardHeader>
        <CardTitle className="center flex items-center text-lg font-semibold">
          <Icons.chevronLeft
            className="block h-6 w-6 hover:cursor-pointer"
            onClick={onBack}
          />{" "}
          Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">
          Please take a moment to review the details before you submit a
          transaction to create the pool
        </p>
        <TokenList className="bg-muted ">
          {tokenWeights.map((tokenWeight, index) => {
            return (
              <PreviewToken
                key={index}
                token={tokenWeight.token}
                weight={undefined}
                value={getSafeNumber(tokenWeight.initialLiquidity)}
              />
            );
          })}
        </TokenList>
        <div className="w-full rounded-lg bg-muted p-3">
          <div className="flex h-fit w-full items-center justify-between text-sm">
            <p className="text-primary">Initial Price</p>
            <p>
              {formatNumber(getSafeNumber(initialPrice))}{" "}
              {tokenWeights[0]?.token?.symbol} = 1{" "}
              {tokenWeights[1]?.token?.symbol}
            </p>
          </div>
          <div className="flex h-fit w-full items-center justify-between text-sm">
            <p className="text-primary">Swap Fee</p>
            <p>dynamic</p>
          </div>
        </div>
        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error?.message}</AlertDescription>
          </Alert>
        )}

        {needsApproval.length > 0 ? (
          <ApproveButton
            amount={
              parseUnits(
                tokenWeights.find(
                  (w) => w.token?.address === needsApproval[0]?.address,
                )?.initialLiquidity || "0",
                needsApproval[0]?.decimals ?? 18,
              ) + parseUnits("10", 16)
            }
            token={needsApproval[0]}
            spender={crocDexAddress as Address}
          />
        ) : (
          <ActionButton>
            <Button className="w-full" onClick={() => handleCreatePool()}>
              Create Pool
            </Button>
          </ActionButton>
        )}
      </CardContent>
    </Card>
  );
}
