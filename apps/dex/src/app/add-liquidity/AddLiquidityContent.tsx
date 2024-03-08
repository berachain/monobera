"use client";

import { useRouter } from "next/navigation";
import {
  TransactionActionType,
  type Token,
  CROCSWAP_DEX,
  formatNumber,
  useTokenHoneyPrice,
  usePollAssetWalletBalance,
} from "@bera/berajs";
import {
  beraTokenAddress,
  cloudinaryUrl,
  crocDexAddress,
  nativeTokenAddress,
} from "@bera/config";
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
import { parseUnits } from "viem";

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
import {
  type PriceRange,
  encodeWarmPath,
  transformLimits,
} from "@bera/beracrocswap";
import { SettingsPopover } from "~/components/settings-popover";
import { formatUsd } from "../../../../../packages/berajs/src/utils/formatUsd";
import { useCrocPoolNativeBera } from "~/hooks/useCrocPoolNativeBera";

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
    isBaseInput,
    setIsBaseInput,
    refreshAllowances,
    reset,
    updateTokenAmount,
    updateTokenExceeding,
    setPreviewOpen,
    beraToken,
    wBeraToken,
    isNativeBera,
    setIsNativeBera,
  } = useAddLiquidity(pool);

  const { refetch } = usePollAssetWalletBalance();
  const { write, ModalPortal } = useTxn({
    message: `Add liquidity to ${pool?.poolName}`,
    onSuccess: () => {
      reset();
      refetch();
    },
    actionType: TransactionActionType.ADD_LIQUIDITY,
  });

  const baseToken = pool.baseInfo;
  const quoteToken = pool.quoteInfo;

  const { data: baseTokenHoneyPrice } = useTokenHoneyPrice(baseToken?.address);
  const { data: quoteTokenHoneyPrice } = useTokenHoneyPrice(
    quoteToken?.address,
  );

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

  const baseTokenAddress = isBeratoken(tokenInputs[0])
    ? isNativeBera
      ? nativeTokenAddress
      : beraTokenAddress
    : tokenInputs[0]?.address;
  const quoteTokenAddress = isBeratoken(tokenInputs[1])
    ? isNativeBera
      ? nativeTokenAddress
      : beraTokenAddress
    : tokenInputs[1]?.address;

  const crocPool = useCrocPoolNativeBera(
    baseTokenAddress,
    tokenInputs[0]?.decimals,
    quoteTokenAddress,
    tokenInputs[1]?.decimals,
  );

  const slippage = useSlippage();
  const baseTokenInitialLiquidity = tokenInputs[0]?.amount;
  const quoteTokenInitialLiquidity = tokenInputs[1]?.amount;

  const bnBaseAmount = parseUnits(
    baseTokenInitialLiquidity as string,
    baseToken.decimals,
  );

  const bnQuoteAmount = parseUnits(
    quoteTokenInitialLiquidity as string,
    baseToken.decimals,
  );

  const maxBaseApprovalAmount = useMemo(() => {
    if (!baseTokenInitialLiquidity || !slippage) {
      return 0n;
    }
    const parsedLiq = parseUnits(
      baseTokenInitialLiquidity as string,
      baseToken.decimals,
    );
    const sI = BigInt(parsedLiq);
    const s = BigInt(((slippage ?? 0) + 0.001) * 10 ** 18);
    const minAmountOut = (sI ?? 0n) + ((sI ?? 0n) * s) / BigInt(100 * 10 ** 18);
    return minAmountOut;
  }, [baseTokenInitialLiquidity, slippage]);

  const maxQuoteApprovalAmount = useMemo(() => {
    if (!quoteTokenInitialLiquidity || !slippage) {
      return 0n;
    }
    const parsedLiq = parseUnits(
      quoteTokenInitialLiquidity as string,
      baseToken.decimals,
    );
    const sI = BigInt(parsedLiq);
    const s = BigInt(((slippage ?? 0) + 0.001) * 10 ** 18);
    const minAmountOut = (sI ?? 0n) + ((sI ?? 0n) * s) / BigInt(100 * 10 ** 18);
    return minAmountOut;
  }, [quoteTokenInitialLiquidity, slippage]);

  const handleAddLiquidity = useCallback(async () => {
    try {
      if (!crocPool) {
        return;
      }
      const priceLimits = {
        min: getSafeNumber(poolPrice) * (1 - (slippage ?? 1) / 100),
        max: getSafeNumber(poolPrice) * (1 + (slippage ?? 1) / 100),
      };
      const limits: PriceRange = [priceLimits.min, priceLimits.max];

      const transformedLimits = transformLimits(
        limits,
        baseToken.decimals,
        quoteToken.decimals,
      );

      let totalValue = 0n;

      if (baseTokenAddress === nativeTokenAddress) {
        totalValue = bnBaseAmount;
      }

      if (quoteTokenAddress === nativeTokenAddress) {
        totalValue = bnQuoteAmount;
      }

      const mintCalldata = await encodeWarmPath(
        baseTokenAddress as string,
        quoteTokenAddress as string,
        isBaseInput ? 31 : 32,
        0,
        0,
        isBaseInput ? bnBaseAmount : bnQuoteAmount,
        transformedLimits[0],
        transformedLimits[1],
        0,
        pool.poolIdx,
      );
      const payload = [2, mintCalldata];

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
    isBaseInput,
    quoteToken,
    poolPrice,
    bnBaseAmount,
    bnQuoteAmount,
    write,
  ]);

  const totalHoneyPrice = useMemo(() => {
    if (!baseTokenHoneyPrice || !quoteTokenHoneyPrice) {
      return 0;
    }
    return (
      Number(baseTokenHoneyPrice) * Number(tokenInputs[0]?.amount || 0) +
      Number(quoteTokenHoneyPrice) * Number(tokenInputs[1]?.amount || 0)
    );
  }, [
    baseTokenHoneyPrice,
    quoteTokenHoneyPrice,
    tokenInputs[0]?.amount,
    tokenInputs[1]?.amount,
  ]);

  const needsApprovalNoBera = needsApproval.filter(
    (token) => token.address.toLowerCase() !== beraTokenAddress.toLowerCase(),
  );

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-4">
      {ModalPortal}
      <Card className="mx-6 w-full items-center bg-background p-4 sm:mx-0 sm:w-[480px]">
        <p className="text-center text-2xl font-semibold">{pool?.poolName}</p>
        <div className="flex w-full flex-row items-center justify-center rounded-lg p-4">
          {pool?.tokens?.map((token, i) => {
            return (
              <TokenIcon
                symbol={token.symbol}
                address={token.address}
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
            <SettingsPopover />
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
                  : baseToken
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
                setIsBaseInput(true);
                handleBaseAssetAmountChange(amount);
              }}
              price={baseTokenHoneyPrice}
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
                  : quoteToken
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
                setIsBaseInput(false);
                handleQuoteAssetAmountChange(amount);
              }}
              weight={quoteToken.normalizedWeight}
              price={quoteTokenHoneyPrice}
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
                  ? `${formatNumber(poolPrice, 4)} ${baseToken.symbol} = 1 ${
                      quoteToken.symbol
                    }`
                  : "-"
              }
            />
            <InfoBoxListItem
              title={"Total Value"}
              value={formatUsd(totalHoneyPrice)}
            />

            <InfoBoxListItem title={"Slippage"} value={`${slippage}%`} />
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
              <PreviewToken
                token={
                  isBeratoken(tokenInputs[0])
                    ? isNativeBera
                      ? beraToken
                      : wBeraToken
                    : tokenInputs[0]
                }
                value={getSafeNumber(tokenInputs[0]?.amount)}
                price={baseTokenHoneyPrice}
              />
              <PreviewToken
                token={
                  isBeratoken(tokenInputs[1])
                    ? isNativeBera
                      ? beraToken
                      : wBeraToken
                    : tokenInputs[1]
                }
                value={getSafeNumber(tokenInputs[1]?.amount)}
                price={quoteTokenHoneyPrice}
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
              <InfoBoxListItem
                title={"Total Value"}
                value={formatUsd(totalHoneyPrice)}
              />
              <InfoBoxListItem title={"Slippage"} value={`${slippage}%`} />
            </InfoBoxList>
            {(!isNativeBera && needsApproval.length > 0) ||
            (isNativeBera && needsApprovalNoBera.length > 0) ? (
              <ApproveButton
                amount={
                  isNativeBera
                    ? needsApprovalNoBera[0]?.address.toLowerCase() ===
                      baseToken.address.toLowerCase()
                      ? maxBaseApprovalAmount
                      : maxQuoteApprovalAmount
                    : needsApproval[0]?.address.toLowerCase() ===
                        baseToken.address.toLowerCase()
                      ? maxBaseApprovalAmount
                      : maxQuoteApprovalAmount
                }
                token={isNativeBera ? needsApprovalNoBera[0] : needsApproval[0]}
                spender={crocDexAddress}
                onApproval={() => refreshAllowances()}
              />
            ) : (
              <ActionButton>
                <Button className="w-full" onClick={() => handleAddLiquidity()}>
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
