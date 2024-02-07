/* eslint no-use-before-define: 0 */ // --> OFF

"use client";

import { useRouter } from "next/navigation";
import {
  formatNumber,
  formatUsd,
  type Token,
  TransactionActionType,
  CROCSWAP_DEX,
  useTokenHoneyPrice,
} from "@bera/berajs";
import { cloudinaryUrl, crocDexAddress } from "@bera/config";
import {
  ActionButton,
  InfoBoxList,
  InfoBoxListItem,
  PreviewToken,
  TokenIcon,
  TokenList,
  TxnPreview,
  useSlippage,
  useTxn,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import { useWithdrawLiquidity } from "./useWithdrawLiquidity";
import { getPoolUrl, type PoolV2 } from "../pools/fetchPools";
import { SettingsPopover } from "~/components/settings-popover";
import { Slider } from "@bera/ui/slider";
import { usePollUserPosition } from "~/hooks/usePollUserPosition";
import { formatUnits } from "viem";
import { useCallback, useMemo } from "react";
import { useCrocPositionSeeds } from "~/hooks/useCrocPositionSeeds";
import { type PriceRange } from "@bera/beracrocswap";
import { getSafeNumber } from "~/utils/getSafeNumber";
import { useCrocPool } from "~/hooks/useCrocPool";
interface IWithdrawLiquidityContent {
  pool: PoolV2;
}

interface ITokenSummary {
  title: string;
  baseToken: Token;
  quoteToken: Token;
  baseAmount: string;
  quoteAmount: string;
  isLoading: boolean;
}
export const TokenSummary = ({
  title,
  baseToken,
  quoteToken,
  baseAmount,
  quoteAmount,
  isLoading,
}: ITokenSummary) => {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-lg p-3 bg-muted gap-3">
      <p className="text-lg font-semibold text-left w-full">{title}</p>
      <div className="w-full justify-between items-center flex flex-row">
        <p className="text-sm text-muted-foreground">
          Pooled {baseToken.symbol}
        </p>
        <div className="flex flex-row items-center gap-1 font-medium">
          {isLoading ? "..." : baseAmount} <TokenIcon token={baseToken} />
        </div>
      </div>
      <div className="w-full justify-between items-center flex flex-row">
        <p className="text-sm text-muted-foreground">
          Pooled {quoteToken.symbol}
        </p>
        <div className="flex flex-row items-center gap-1 font-medium">
          {isLoading ? "..." : quoteAmount} <TokenIcon token={quoteToken} />
        </div>{" "}
      </div>
    </div>
  );
};

export default function WithdrawLiquidityContent({
  pool,
}: IWithdrawLiquidityContent) {
  const reset = () => {
    setPreviewOpen(false);

    setAmount(0);
  };

  const router = useRouter();

  const { amount, setAmount, previewOpen, setPreviewOpen, poolPrice } =
    useWithdrawLiquidity(pool);

  const slippage = useSlippage();

  const baseToken = pool.baseInfo;
  const quoteToken = pool.quoteInfo;

  const {
    usePosition,
    isLoading: isPositionBreakdownLoading,
    refresh,
  } = usePollUserPosition(pool);

  const userAmbientPosition = usePosition();
  const userPositionBreakdown = userAmbientPosition?.userPosition;

  const baseAmountWithdrawn = useMemo(() => {
    if (!userPositionBreakdown || amount === 0) {
      return 0;
    }
    return formatUnits(
      (userPositionBreakdown.baseAmount * BigInt(amount)) / 100n,
      baseToken.decimals,
    );
  }, [userPositionBreakdown?.baseAmount, amount]);

  const quoteAmountWithdrawn = useMemo(() => {
    if (!userPositionBreakdown || amount === 0) {
      return 0;
    }
    return formatUnits(
      (userPositionBreakdown.quoteAmount * BigInt(amount)) / 100n,
      quoteToken.decimals,
    );
  }, [userPositionBreakdown?.quoteAmount, amount]);

  const { usePositionSeeds } = useCrocPositionSeeds(pool);
  const seeds = usePositionSeeds();

  const { data: baseTokenHoneyPrice } = useTokenHoneyPrice(baseToken?.address);
  const { data: quoteTokenHoneyPrice } = useTokenHoneyPrice(
    quoteToken?.address,
  );

  const totalHoneyPrice = useMemo(() => {
    if (!baseTokenHoneyPrice || !quoteTokenHoneyPrice) return 0;
    return (
      Number(baseTokenHoneyPrice) * Number(baseAmountWithdrawn) +
      Number(quoteTokenHoneyPrice) * Number(quoteAmountWithdrawn)
    );
  }, [
    baseTokenHoneyPrice,
    quoteTokenHoneyPrice,
    baseAmountWithdrawn,
    quoteAmountWithdrawn,
  ]);
  const liquidityToBurn = useMemo(
    () => seeds?.mul(amount).div(100),
    [seeds, amount],
  );
  const crocPool = useCrocPool(pool);
  const { write, ModalPortal } = useTxn({
    message: `Withdraw liquidity from ${pool?.poolName}`,
    onSuccess: () => {
      reset();
      refresh();
    },
    actionType: TransactionActionType.WITHDRAW_LIQUIDITY,
  });
  const handleWithdrawLiquidity = useCallback(async () => {
    try {
      if (!liquidityToBurn) {
        return;
      }
      const priceLimits = {
        min: getSafeNumber(poolPrice) * (1 - (slippage ?? 1) / 100),
        max: getSafeNumber(poolPrice) * (1 + (slippage ?? 1) / 100),
      };
      const limits: PriceRange = [priceLimits.min, priceLimits.max];

      let calldata = "";
      if (amount === 100) {
        const response = await crocPool?.burnAmbientAll(limits);
        calldata = response?.calldata ?? "";
      } else {
        const response = await crocPool?.burnAmbientLiq(
          liquidityToBurn,
          limits,
        );
        calldata = response?.calldata ?? "";
      }

      const payload = [2, calldata];

      write({
        address: crocDexAddress,
        abi: CROCSWAP_DEX,
        functionName: "userCmd",
        params: payload,
      });
    } catch (error) {
      console.error("Error creating pool:", error);
    }
  }, [liquidityToBurn, amount, crocPool, write]);

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
            Withdraw Liquidity
            <SettingsPopover />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TokenSummary
            title="Your Tokens In the Pool"
            baseToken={baseToken}
            quoteToken={quoteToken}
            baseAmount={userPositionBreakdown?.formattedBaseAmount ?? "0"}
            quoteAmount={userPositionBreakdown?.formattedQuoteAmount ?? "0"}
            isLoading={isPositionBreakdownLoading}
          />
          <div className="w-full p-4 border rounded-lg">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="text-lg font-semibold">{amount.toFixed(2)}%</p>
              <div className="flex flex-row gap-2">
                {[25, 50, 75, 100].map((percent) => {
                  return (
                    <Button
                      key={percent.toString()}
                      variant={"secondary"}
                      size={"sm"}
                      className="w-full text-foreground"
                      onClick={() => setAmount(percent)}
                    >
                      {percent.toString()}%
                    </Button>
                  );
                })}
              </div>
            </div>
            <Slider
              defaultValue={[0]}
              value={[amount]}
              max={100}
              min={0}
              onValueChange={(value: number[]) => {
                setAmount(value[0] ?? 0);
              }}
            />
          </div>
          <InfoBoxList>
            <InfoBoxListItem
              title={`Removing ${baseToken.symbol}`}
              value={
                <div className="flex flex-row gap-1 items-center justify-end">
                  <p>{baseAmountWithdrawn}</p>
                  <TokenIcon token={baseToken} size={"md"} />
                </div>
              }
            />
            <InfoBoxListItem
              title={`Removing ${quoteToken.symbol}`}
              value={
                <div className="flex flex-row gap-1 items-center justify-end">
                  <p>{quoteAmountWithdrawn}</p>
                  <TokenIcon token={quoteToken} size={"md"} />
                </div>
              }
            />
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
              title={"Estimated Value"}
              value={formatUsd(totalHoneyPrice)}
            />
            <InfoBoxListItem title={"Slippage"} value={`${slippage}%`} />
          </InfoBoxList>
          <TxnPreview
            open={previewOpen}
            title={"Confirm LP Withdrawal Details"}
            imgURI={`${cloudinaryUrl}/placeholder/preview-swap-img_ucrnla`}
            triggerText={"Preview"}
            setOpen={setPreviewOpen}
            disabled={
              amount === 0 ||
              isPositionBreakdownLoading ||
              userPositionBreakdown === undefined ||
              userPositionBreakdown.baseAmount === 0n ||
              userPositionBreakdown.quoteAmount === 0n
            }
          >
            <TokenList className="divide-muted bg-muted">
              <PreviewToken
                key={baseToken.address}
                token={baseToken}
                value={Number(baseAmountWithdrawn)}
                price={baseTokenHoneyPrice}
              />
              <PreviewToken
                key={quoteToken.address}
                token={quoteToken}
                value={Number(quoteAmountWithdrawn)}
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
                title={"Estimated Value"}
                value={formatUsd(totalHoneyPrice)}
              />
              <InfoBoxListItem title={"Slippage"} value={`${slippage}%`} />
            </InfoBoxList>
            <ActionButton>
              <Button
                className="w-full"
                onClick={() => handleWithdrawLiquidity()}
              >
                Withdraw Liquidity
              </Button>
            </ActionButton>
          </TxnPreview>
        </CardContent>
      </Card>
    </div>
  );
}
