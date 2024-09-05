"use client";

import { useCallback, useEffect, useMemo } from "react";
import { notFound, useRouter } from "next/navigation";
import {
  ADDRESS_ZERO,
  TXN_GAS_USED_ESTIMATES,
  TransactionActionType,
  bexAbi,
  useGasData,
  usePollWalletBalances,
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
import { useAddLiquidity2 } from "./useAddLiquidity2";
import { useSelectedPool } from "~/hooks/useSelectedPool";
import { Skeleton } from "@bera/ui/skeleton";
import { AddLiquiditySuccess } from "@bera/shared-ui/src/txn-modals";

interface IAddLiquidityContent {
  shareAddress: Address;
}

export default function AddLiquidityContent2({
  shareAddress,
}: IAddLiquidityContent) {
  const { data: pool, isLoading } = useSelectedPool(shareAddress);
  useEffect(() => {
    if (!pool && !isLoading) {
      notFound();
    }
  }, [pool, isLoading]);

  const router = useRouter();
  const {
    error,
    tokenInputs,
    needsApproval,
    areAllInputsEmpty,
    refreshAllowances,
    reset,
    updateTokenAmount,
    updateTokenExceeding,
    beraToken,
    wBeraToken,
    isNativeBera,
    setIsNativeBera,
  } = useAddLiquidity2(shareAddress);

  const { refresh } = usePollWalletBalances();
  const { write, ModalPortal } = useTxn({
    message: `Add liquidity to ${pool?.poolName}`,
    onSuccess: () => {
      reset();
      refresh();
    },
    CustomSuccessModal: pool?.vaultAddress ? AddLiquiditySuccess : undefined,
    customSuccessModalProps: pool?.vaultAddress
      ? {
          pool: pool,
        }
      : undefined,
    actionType: TransactionActionType.ADD_LIQUIDITY,
  });

  const slippage = useSlippage();

  const handleAddLiquidity = useCallback(async () => {
    try {
      write({
        address: crocDexAddress,
        abi: bexAbi,
        functionName: "userCmd",
        params: [],
      });
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  }, [
    write,
  ]);

  const needsApprovalNoBera = needsApproval.filter(
    (token) => token.address.toLowerCase() !== beraTokenAddress.toLowerCase(),
  );

  const { estimatedBeraFee } = useGasData({
    gasUsedOverride: TXN_GAS_USED_ESTIMATES.SWAP * 8 * 2, // multiplied by 8 for the multiswap steps assumption in a swap, then by 2 to allow for a follow up swap
  });

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-4">
      {ModalPortal}

      <Card className="mx-6 w-full sm:w-[600px] md:mx-0  border-none">
        <CardHeader>
          <div
            onClick={() => console.log("click")}
            className="flex flex-row items-center gap-1 self-start text-sm font-medium text-muted-foreground cursor-pointer"
          >
            <Icons.arrowLeft className="w-4 h-4" />
            Back to Pool
          </div>
          <CardTitle className="center flex justify-between items-center font-bold text-3xl">
            Add Liquidity
            <SettingsPopover />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 border-border border p-4 rounded-lg">
          {/* <TokenList className="border-none">
            <TokenInput
              key={baseToken?.address}
              selected={baseSelected}
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
              price={Number(baseToken?.usdValue ?? "0")}
              onExceeding={(exceeding: boolean) =>
                updateTokenExceeding(0, exceeding)
              }
              showExceeding={true}
              disabled={!poolPrice}
              beraSafetyMargin={estimatedBeraFee}
            />

            <TokenInput
              key={quoteToken?.address}
              selected={quoteSelected}
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
              price={Number(quoteToken?.usdValue ?? "0")}
              onExceeding={(exceeding: boolean) =>
                updateTokenExceeding(1, exceeding)
              }
              showExceeding={true}
              disabled={!poolPrice}
              beraSafetyMargin={estimatedBeraFee}
            />
          </TokenList> */}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="text-xs">{error}</AlertDescription>
            </Alert>
          )}
         {
            (isNativeBera && needsApprovalNoBera.length > 0) ? (
              <ApproveButton
                amount={0n
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
        </CardContent>
      </Card>
    </div>
  );
}
