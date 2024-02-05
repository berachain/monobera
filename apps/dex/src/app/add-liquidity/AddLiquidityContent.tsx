"use client";

import { useRouter } from "next/navigation";
import {
  TransactionActionType,
  type Token,
  CROCSWAP_DEX,
  formatNumber,
} from "@bera/berajs";
import { cloudinaryUrl, crocDexAddress } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
  InfoBoxList,
  InfoBoxListItem,
  PreviewToken,
  TokenIcon,
  TokenInput,
  TokenList,
  TxnPreview,
  useSlippage,
  useTxn,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { parseUnits } from "ethers";

import { isBera, isBeratoken } from "~/utils/isBeraToken";
import { useAddLiquidity } from "./useAddLiquidity";
import {
  getBaseCost,
  getPoolUrl,
  getQuoteCost,
  type PoolV2,
} from "../pools/fetchPools";
import { useCallback, useMemo } from "react";
import { getSafeNumber } from "~/utils/getSafeNumber";
import { useCrocPool } from "~/hooks/useCrocPool";
import { type PriceRange, type BeraSdkResponse } from "@bera/beracrocswap";

interface IAddLiquidityContent {
  pool: PoolV2;
}

export default function AddLiquidityContent({ pool }: IAddLiquidityContent) {
  const router = useRouter();
  const {
    poolPrice,
    error,
    previewOpen,
    tokenInputs,
    needsApproval,
    areAllInputsEmpty,
    reset,
    updateTokenAmount,
    updateTokenExceeding,
    setPreviewOpen,
    beraToken,
    wBeraToken,
    isNativeBera,
    setIsNativeBera,
  } = useAddLiquidity(pool);

  const { write, ModalPortal } = useTxn({
    message: `Add liquidity to ${pool?.poolName}`,
    onSuccess: () => {
      reset();
    },
    actionType: TransactionActionType.ADD_LIQUIDITY,
  });

  const baseToken = pool.baseInfo;
  const quoteToken = pool.quoteInfo;

  const baseCost = useMemo(() => {
    if (!poolPrice) {
      return 0;
    }
    return getBaseCost(poolPrice);
  }, [poolPrice]);
  const quoteCost = useMemo(() => {
    if (!poolPrice) {
      return 0;
    }
    return getQuoteCost(poolPrice);
  }, [poolPrice]);

  const handleBaseAssetAmountChange = (value: string): void => {
    updateTokenAmount(0, value);
    const quoteAmount = baseCost * getSafeNumber(value);
    updateTokenAmount(1, quoteAmount === 0 ? "" : quoteAmount.toString());
  };

  const handleQuoteAssetAmountChange = (value: string): void => {
    updateTokenAmount(1, value);
    const baseAmount = quoteCost * getSafeNumber(value);
    updateTokenAmount(0, baseAmount === 0 ? "" : baseAmount.toString());
  };

  const crocPool = useCrocPool(pool);
  const slippage = useSlippage();
  const baseTokenInitialLiquidity = tokenInputs[0]?.amount;
  const handleCreatePool = useCallback(async () => {
    try {
      if (!crocPool) {
        return;
      }
      const priceLimits = {
        min: getSafeNumber(poolPrice) * (1 - (slippage ?? 1) / 100),
        max: getSafeNumber(poolPrice) * (1 + (slippage ?? 1) / 100),
      };
      const limits: PriceRange = [priceLimits.min, priceLimits.max];

      const mintInfo: BeraSdkResponse = await crocPool.mintAmbientBase(
        baseTokenInitialLiquidity ?? 0,
        limits,
      );

      const totalValue = BigInt(mintInfo.value ?? 0);
      const payload = [2, mintInfo.calldata];

      write({
        address: crocDexAddress,
        abi: CROCSWAP_DEX,
        functionName: "userCmd",
        params: payload,
        value: totalValue === 0n ? undefined : totalValue,
      });
    } catch (error) {
      console.error("Error creating pool:", error);
    }
  }, [
    crocPool,
    baseToken,
    quoteToken,
    poolPrice,
    baseTokenInitialLiquidity,
    slippage,
    write,
  ]);

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-4">
      {ModalPortal}
      <Card className="mx-6 w-full items-center bg-background p-4 sm:mx-0 sm:w-[480px]">
        <p className="text-center text-2xl font-semibold">{pool?.poolName}</p>
        <div className="flex w-full flex-row items-center justify-center rounded-lg p-4">
          {pool?.tokens?.map((token, i) => {
            return (
              <TokenIcon
                token={token}
                className={cn("h-12 w-12", i !== 0 && "ml-[-16px]")}
                key={token.address}
              />
            );
          })}
        </div>
        <div
          onClick={() => router.push(getPoolUrl(pool))}
          className="flex items-center justify-center text-sm font-normal leading-tight text-muted-foreground hover:cursor-pointer hover:underline"
        >
          View Pool Details
          <Icons.arrowRight className="W-4 h-4" />
        </div>
      </Card>
      <Card className="mx-6 w-full sm:w-[480px] md:mx-0 ">
        <CardHeader>
          <CardTitle className="center flex justify-between font-bold">
            Add Liquidity
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TokenList>
            <TokenInput
              key={baseToken.address}
              selected={
                isBeratoken(baseToken)
                  ? isNativeBera
                    ? beraToken
                    : wBeraToken
                  : (baseToken as Token)
              }
              selectable={
                isBeratoken(baseToken) && beraToken && wBeraToken ? true : false
              }
              customTokenList={
                isBeratoken(baseToken)
                  ? [beraToken as Token, wBeraToken as Token]
                  : undefined
              }
              onTokenSelection={(token: Token | undefined) => {
                if (isBera(token)) {
                  setIsNativeBera(true);
                } else {
                  setIsNativeBera(false);
                }
              }}
              amount={tokenInputs[0]?.amount ?? ""}
              setAmount={(amount: string) => {
                handleBaseAssetAmountChange(amount);
              }}
              price={0}
              onExceeding={(exceeding: boolean) =>
                updateTokenExceeding(0, exceeding)
              }
              showExceeding={true}
              disabled={!poolPrice}
            />

            <TokenInput
              key={quoteToken.address}
              selected={
                isBeratoken(quoteToken)
                  ? isNativeBera
                    ? beraToken
                    : wBeraToken
                  : (quoteToken as Token)
              }
              selectable={
                isBeratoken(quoteToken) && beraToken && wBeraToken
                  ? true
                  : false
              }
              customTokenList={
                isBeratoken(quoteToken)
                  ? [beraToken as Token, wBeraToken as Token]
                  : undefined
              }
              onTokenSelection={(token: Token | undefined) => {
                if (isBera(token)) {
                  setIsNativeBera(true);
                } else {
                  setIsNativeBera(false);
                }
              }}
              amount={tokenInputs[1]?.amount ?? ""}
              setAmount={(amount: string) => {
                handleQuoteAssetAmountChange(amount);
              }}
              weight={quoteToken.normalizedWeight}
              price={0}
              onExceeding={(exceeding: boolean) =>
                updateTokenExceeding(1, exceeding)
              }
              showExceeding={true}
              disabled={!poolPrice}
            />
          </TokenList>
          <InfoBoxList>
            <InfoBoxListItem
              title={"Pool Price"}
              value={
                poolPrice
                  ? `${formatNumber(poolPrice)} ${baseToken.symbol} = 1 ${
                      quoteToken.symbol
                    }`
                  : "-"
              }
            />
            {/* <InfoBoxListItem
              title={"Approximate Total Value"}
              value={formatUsd(totalValue ?? 0) ?? "-"}
            /> */}
          </InfoBoxList>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          )}
          <TxnPreview
            open={previewOpen}
            disabled={areAllInputsEmpty || error !== undefined}
            title={"Confirm LP Addition Details"}
            imgURI={`${cloudinaryUrl}/placeholder/preview-swap-img_ucrnla`}
            triggerText={"Preview"}
            setOpen={setPreviewOpen}
          >
            <TokenList className="bg-muted">
              {tokenInputs
                .filter(
                  (tokenInput: { amount: string }) => tokenInput.amount !== "",
                )
                .map((tokenInput: any) => {
                  return (
                    <PreviewToken
                      key={tokenInput.address}
                      token={
                        isBeratoken(tokenInput)
                          ? isNativeBera
                            ? beraToken
                            : wBeraToken
                          : tokenInput
                      }
                      weight={tokenInput?.normalizedWeight}
                      value={tokenInput?.amount}
                      price={0}
                    />
                  );
                })}
            </TokenList>
            <InfoBoxList>
              <InfoBoxListItem
                title={"Pool Price"}
                value={
                  poolPrice
                    ? `${formatNumber(poolPrice)} ${baseToken.symbol} = 1 ${
                        quoteToken.symbol
                      }`
                    : "-"
                }
              />
              {/* <InfoBoxListItem
                title={"Approximate Total Value"}
                value={formatUsd(totalValue ?? 0) ?? "-"}
              /> */}
            </InfoBoxList>
            {needsApproval.length > 0 ? (
              <ApproveButton
                amount={parseUnits(
                  tokenInputs.find(
                    (t) => t.address === needsApproval[0]?.address,
                  )?.amount || "0",
                  needsApproval[0]?.decimals ?? 18,
                )}
                token={needsApproval[0]}
                spender={crocDexAddress}
              />
            ) : (
              <ActionButton>
                <Button className="w-full" onClick={() => handleCreatePool()}>
                  Add Liquidity
                </Button>
              </ActionButton>
            )}
          </TxnPreview>
        </CardContent>
      </Card>
    </div>
  );
}
