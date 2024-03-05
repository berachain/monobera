"use client";

import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  CROCSWAP_DEX,
  TransactionActionType,
  formatNumber,
  useCrocEnv,
  useTokenHoneyPrice,
  type Token,
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
import { parseUnits } from "viem";

import { getSafeNumber } from "~/utils/getSafeNumber";
import useCreatePool from "~/hooks/useCreatePool";
import {
  type BeraSdkResponse,
  initPool,
  type PriceRange,
  encodeWarmPath,
  transformLimits,
  encodeCrocPrice,
} from "@bera/beracrocswap";
import { encodeAbiParameters, parseAbiParameters } from "viem";
import { formatUsd } from "@bera/berajs/src/utils/formatUsd";
import { POOLID, SWAPFEE } from "~/hooks/useCreateTokenWeights";

type Props = {
  baseToken: Token | undefined;
  quoteToken: Token | undefined;
  baseAmount: string;
  quoteAmount: string;
  error: Error | undefined;
  initialPrice: string;
  isBaseTokenInput: boolean;
  poolId: POOLID;
  onBack: () => void;
};

const INITIAL_AMOUNT = 11000n;

function calculateBaseTokenAmount(initLiq: bigint, priceArg: bigint) {
  // Convert inputs to BigInt to ensure precision in calculations
  const initLiqBigInt = initLiq;
  const priceArgBigInt = priceArg;

  // Calculate the amount for base side tokens
  // [initLiq * priceArg] >> 64
  const baseTokenAmount = (initLiqBigInt * priceArgBigInt) >> BigInt(64);
  const increasedBaseTokenAmount =
    (baseTokenAmount * BigInt(120)) / BigInt(100);
  return increasedBaseTokenAmount;
}

function calculateQuoteTokenAmount(initLiq: bigint, priceArg: bigint) {
  // Convert inputs to BigInt to ensure precision in calculations
  const initLiqBigInt = initLiq;
  const priceArgBigInt = priceArg;

  // Calculate the amount for quote side tokens
  // [initLiq << 64] / priceArg
  const quoteTokenAmount = (initLiqBigInt << BigInt(64)) / priceArgBigInt;

  const increasedQuoteTokenAmount =
    (quoteTokenAmount * BigInt(120)) / BigInt(100);
  return increasedQuoteTokenAmount;
}

export function CreatePoolPreview({
  baseToken,
  quoteToken,
  baseAmount,
  quoteAmount,
  error,
  initialPrice,
  isBaseTokenInput,
  poolId,
  onBack,
}: Props) {
  const { needsApproval, refreshAllowances } = useCreatePool({
    baseToken: baseToken as Token,
    quoteToken: quoteToken as Token,
    baseAmount,
    quoteAmount,
  });
  const router = useRouter();

  const { write, ModalPortal } = useTxn({
    message: "Create new pool",
    onSuccess: () => {
      router.push("/pools");
    },
    actionType: TransactionActionType.CREATE_POOL,
  });

  const crocenv = useCrocEnv();

  const slippage = useSlippage();

  const handleCreatePool = useCallback(async () => {
    try {
      let inputLiq;
      if (isBaseTokenInput) {
        inputLiq = baseAmount;
      } else {
        inputLiq = quoteAmount;
      }

      const encodedCrocPrice = encodeCrocPrice(getSafeNumber(initialPrice));
      const encodedPriceNumber = encodedCrocPrice.toBigInt();
      const initialLiquidityAmount = isBaseTokenInput
        ? calculateBaseTokenAmount(INITIAL_AMOUNT, encodedPriceNumber)
        : calculateQuoteTokenAmount(INITIAL_AMOUNT, encodedPriceNumber);

      const priceLimits = {
        min: getSafeNumber(initialPrice),
        max: getSafeNumber(initialPrice),
      };
      const limits: PriceRange = [priceLimits.min, priceLimits.max];

      const initPoolInfo: BeraSdkResponse = initPool(
        Number(initialPrice),
        baseToken as Token,
        quoteToken as Token,
        Number(poolId),
      );

      const bnLiquidity = parseUnits(
        inputLiq ?? "0",
        isBaseTokenInput
          ? (baseToken?.decimals as number)
          : (quoteToken?.decimals as number),
      );

      const transformedLimits = transformLimits(
        limits,
        baseToken?.decimals as number,
        quoteToken?.decimals as number,
      );

      const mintCalldata = await encodeWarmPath(
        baseToken?.address as string,
        quoteToken?.address as string,
        isBaseTokenInput ? 31 : 32,
        0,
        0,
        ((bnLiquidity - initialLiquidityAmount) * BigInt(999)) / BigInt(1000),
        transformedLimits[0],
        transformedLimits[1],
        0,
        Number(poolId),
      );

      const multiPathArgs = [2, 3, initPoolInfo.calldata, 2, mintCalldata];

      const multiCmd = encodeAbiParameters(
        parseAbiParameters("uint8, uint8, bytes, uint8, bytes"),
        multiPathArgs as any[5],
      );
      write({
        address: crocDexAddress,
        abi: CROCSWAP_DEX,
        functionName: "userCmd",
        params: [6, multiCmd],
      });
    } catch (error) {
      console.error("Error creating pool:", error);
    }
  }, [
    crocenv,
    baseToken,
    quoteToken,
    initialPrice,
    isBaseTokenInput,
    slippage,
    write,
  ]);

  const { data: baseTokenHoneyPrice } = useTokenHoneyPrice(baseToken?.address);
  const { data: quoteTokenHoneyPrice } = useTokenHoneyPrice(
    quoteToken?.address,
  );

  const total = useMemo(() => {
    return (
      getSafeNumber(baseAmount) * Number(baseTokenHoneyPrice ?? 0) +
      getSafeNumber(quoteAmount) * Number(quoteTokenHoneyPrice ?? 0)
    );
  }, [baseAmount, quoteAmount, baseTokenHoneyPrice, quoteTokenHoneyPrice]);

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
          <PreviewToken
            token={baseToken}
            price={baseTokenHoneyPrice}
            value={getSafeNumber(baseAmount)}
          />
          <PreviewToken
            token={quoteToken}
            price={quoteTokenHoneyPrice}
            value={getSafeNumber(quoteAmount)}
          />
        </TokenList>
        <div className="w-full rounded-lg bg-muted p-3">
          <div className="flex h-fit w-full items-center justify-between text-sm">
            <p className="text-primary">Initial Price</p>
            <p>
              {formatNumber(getSafeNumber(initialPrice))} {baseToken?.symbol} =
              1 {quoteToken?.symbol}
            </p>
          </div>
          <div className="flex h-fit w-full items-center justify-between text-sm">
            <p className="text-primary">Estimated Value</p>
            <p>{formatUsd(total)}</p>
          </div>
          <div className="flex h-fit w-full items-center justify-between text-sm">
            <p className="text-primary">Swap Fee</p>
            <p>{SWAPFEE[poolId].toString()}%</p>
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
            amount={parseUnits(
              baseToken?.address === needsApproval[0]?.address
                ? baseAmount
                : quoteAmount,
              needsApproval[0]?.decimals ?? 18,
            )}
            token={needsApproval[0]}
            spender={crocDexAddress}
            onApproval={() => refreshAllowances()}
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
