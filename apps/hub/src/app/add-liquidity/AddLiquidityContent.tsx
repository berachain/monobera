"use client";

import { useCallback, useEffect, useMemo } from "react";
import { notFound, useRouter } from "next/navigation";
import {
  TXN_GAS_USED_ESTIMATES,
  TransactionActionType,
  bexAbi,
  useGasData,
  usePollWalletBalances,
  usePool,
  type Token,
} from "@bera/berajs";
import { getAddLiquidityPayload } from "@bera/berajs/actions";
import { beraTokenAddress, cloudinaryUrl, crocDexAddress } from "@bera/config";
import {
  ActionButton,
  ApproveButton,
  FormattedNumber,
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
import { Address, formatUnits, parseUnits } from "viem";

import { isBera, isBeratoken } from "~/utils/isBeraToken";
import { SettingsPopover } from "~/components/settings-popover";
import { getBaseCost, getPoolUrl, getQuoteCost } from "../pools/fetchPools";
import { useAddLiquidity } from "./useAddLiquidity";
import { useSelectedPool } from "~/hooks/useSelectedPool";
import { Skeleton } from "@bera/ui/skeleton";
import { AddLiquiditySuccess } from "@bera/shared-ui/src/txn-modals";
import Link from "next/link";

interface IAddLiquidityContent {
  shareAddress: Address;
}

export default function AddLiquidityContent({
  shareAddress,
}: IAddLiquidityContent) {
  const { data, isLoading } = usePool({ id: shareAddress });

  const { v2Pool: pool, v3Pool } = data ?? {};

  console.log("POOL", pool, v3Pool);

  useEffect(() => {
    if (!pool && !isLoading) {
      notFound();
    }
  }, [pool, isLoading]);

  // const {
  //   baseToken,
  //   quoteToken,
  //   poolPrice,
  //   error,
  //   previewOpen,
  //   tokenInputs,
  //   needsApproval,
  //   areAllInputsEmpty,
  //   isBaseInput,
  //   setIsBaseInput,
  //   refreshAllowances,
  //   reset,
  //   updateTokenAmount,
  //   updateTokenExceeding,
  //   setPreviewOpen,
  //   beraToken,
  //   wBeraToken,
  //   isNativeBera,
  //   setIsNativeBera,
  // } = useAddLiquidity(pool);

  const { refresh } = usePollWalletBalances();
  const { write, ModalPortal } = useTxn({
    message: `Add liquidity to ${pool?.name}`,
    onSuccess: () => {
      // reset();
      refresh();
    },
    CustomSuccessModal: pool?.address ? AddLiquiditySuccess : undefined,
    customSuccessModalProps: pool?.address
      ? {
          pool: pool,
        }
      : undefined,
    actionType: TransactionActionType.ADD_LIQUIDITY,
  });

  // const baseCost = useMemo(() => {
  //   if (!poolPrice) {
  //     return 0;
  //   }
  //   return getBaseCost(poolPrice);
  // }, [poolPrice]);

  // const quoteCost = useMemo(() => {
  //   if (!poolPrice) {
  //     return 0;
  //   }
  //   return getQuoteCost(poolPrice);
  // }, [poolPrice]);

  // const handleBaseAssetAmountChange = (value: string): void => {
  //   updateTokenAmount(0, value);
  //   const parsedBaseCost = parseUnits(
  //     baseCost.toString(),
  //     quoteToken?.decimals ?? 18,
  //   );
  //   const parsedValue = parseUnits(value, quoteToken?.decimals ?? 18);
  //   const quoteAmount =
  //     (parsedBaseCost * parsedValue) /
  //     BigInt(10 ** (quoteToken?.decimals ?? 18));
  //   updateTokenAmount(
  //     1,
  //     quoteAmount === 0n
  //       ? ""
  //       : formatUnits(quoteAmount, quoteToken?.decimals ?? 18),
  //   );
  // };

  // const handleQuoteAssetAmountChange = (value: string): void => {
  //   updateTokenAmount(1, value);
  //   const parsedQuoteCost = parseUnits(
  //     quoteCost.toString(),
  //     baseToken?.decimals ?? 18,
  //   );
  //   const parsedValue = parseUnits(value, baseToken?.decimals ?? 18);
  //   const baseAmount =
  //     (parsedQuoteCost * parsedValue) /
  //     BigInt(10 ** (baseToken?.decimals ?? 18));
  //   updateTokenAmount(
  //     0,
  //     baseAmount === 0n
  //       ? ""
  //       : formatUnits(baseAmount, baseToken?.decimals ?? 18),
  //   );
  // };

  const slippage = useSlippage();
  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-4">
      {ModalPortal}
      <Card className="mx-6 w-full items-center bg-background p-4 sm:mx-0 sm:w-[480px] flex flex-col">
        {isLoading ? (
          <Skeleton className="h-8 w-40 self-center" />
        ) : (
          <p className="text-center text-2xl font-semibold">{pool?.name}</p>
        )}
        <div className="flex w-full flex-row items-center justify-center rounded-lg p-4">
          {isLoading ? (
            <Skeleton className="h-12 w-24" />
          ) : (
            pool?.tokens?.map((token, i) => {
              return (
                <TokenIcon
                  symbol={token.symbol}
                  address={token.address}
                  className={cn("h-12 w-12", i !== 0 && "ml-[-16px]")}
                  key={token.address}
                />
              );
            })
          )}
        </div>
        <Link
          href={getPoolUrl(pool)}
          className="flex items-center justify-center text-sm font-normal leading-tight text-muted-foreground hover:cursor-pointer hover:underline"
        >
          View Pool Details
          <Icons.arrowRight className="W-4 h-4" />
        </Link>
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
            {pool?.tokens?.map((token) => (
              <TokenInput
                key={token?.address}
                selected={token}
                selectable={false}
                customTokenList={[token]}
                // amount={token[0]?.amount ?? ""}
                setAmount={(amount: string) => {
                  // setIsBaseInput(true);
                  // handleBaseAssetAmountChange(amount);
                }}
                price={Number(token?.token?.latestUSDPrice ?? "0")}
                onExceeding={
                  (exceeding: boolean) => false // updateTokenExceeding(0, exceeding)
                }
                showExceeding={true}
                // disabled={!poolPrice}
                // beraSafetyMargin={estimatedBeraFee}
              />
            ))}
          </TokenList>
          <InfoBoxList>
            {/* <InfoBoxListItem
              title={"Pool Price"}
              value={
                poolPrice ? (
                  <span>
                    <FormattedNumber
                      value={poolPrice}
                      symbol={baseToken?.symbol ?? ""}
                    />{" "}
                    = 1 {quoteToken?.symbol}
                  </span>
                ) : (
                  <span>{"-"}</span>
                )
              }
            />
            <InfoBoxListItem
              title={"Total Value"}
              value={
                <FormattedNumber
                  value={totalHoneyPrice}
                  symbol="USD"
                  compact={false}
                />
              }
            /> */}

            <InfoBoxListItem title={"Slippage"} value={`${slippage}%`} />
          </InfoBoxList>
          {/* {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          )} */}
          {/* <TxnPreview
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
                value={tokenInputs[0]?.amount}
                price={Number(baseToken?.usdValue ?? 0)}
              />
              <PreviewToken
                token={
                  isBeratoken(tokenInputs[1])
                    ? isNativeBera
                      ? beraToken
                      : wBeraToken
                    : tokenInputs[1]
                }
                value={tokenInputs[1]?.amount}
                price={Number(quoteToken?.usdValue ?? 0)}
              />
            </TokenList>
            <InfoBoxList>
              <InfoBoxListItem
                title={"Pool Price"}
                value={
                  poolPrice ? (
                    <span>
                      <FormattedNumber
                        value={poolPrice}
                        symbol={baseToken?.symbol ?? ""}
                      />{" "}
                      = 1 {quoteToken?.symbol}
                    </span>
                  ) : (
                    <span>{"-"}</span>
                  )
                }
              />
              <InfoBoxListItem
                title={"Total Value"}
                value={
                  <FormattedNumber
                    value={totalHoneyPrice}
                    symbol="USD"
                    compact={false}
                  />
                }
              />
              <InfoBoxListItem title={"Slippage"} value={`${slippage}%`} />
            </InfoBoxList>
            {(!isNativeBera && needsApproval.length > 0) ||
            (isNativeBera && needsApprovalNoBera.length > 0) ? (
              <ApproveButton
                amount={
                  isNativeBera
                    ? needsApprovalNoBera[0]?.address.toLowerCase() ===
                      baseToken?.address.toLowerCase()
                      ? maxBaseApprovalAmount
                      : maxQuoteApprovalAmount
                    : needsApproval[0]?.address.toLowerCase() ===
                        baseToken?.address.toLowerCase()
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
          </TxnPreview> */}
        </CardContent>
      </Card>
    </div>
  );
}
