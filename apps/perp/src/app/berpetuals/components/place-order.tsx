import { useMemo } from "react";
import {
  TRADING_ABI,
  formatUsd,
  useBeraJs,
  usePollAllowance,
} from "@bera/berajs";
import { honeyAddress } from "@bera/config";
import { ActionButton } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import {
  DEFAULT_SLIPPAGE,
  SLIPPAGE_MODE,
  SLIPPAGE_TOLERANCE_TYPE,
  SLIPPAGE_TOLERANCE_VALUE,
} from "@bera/shared-ui/src/settings";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { useLocalStorage } from "usehooks-ts";
import { formatUnits, parseUnits } from "viem";
import { type Address } from "wagmi";

import ApproveTokenButton from "~/app/components/approve-token-button";
import { useCalculateLiqPrice } from "~/hooks/useCalculateLiqPrice";
import { type OrderType } from "../type";

export function PlaceOrder({
  form,
  price,
  openingFee,
  bfLong,
  bfShort,
  pairIndex,
}: {
  form: OrderType;
  price: number | undefined;
  openingFee: number;
  bfLong: string;
  bfShort: string;
  pairIndex: number;
}) {
  const formattedPrice = Number(formatUnits(BigInt(price ?? 0n), 10));
  const { isLoading, write } = useOctTxn({
    message:
      form.orderType === "long"
        ? `Longing ${form.assets}`
        : `Shorting ${form.assets}`,
  });

  const dailyBfLong = Number(bfLong) * 24;
  const dailyBfShort = Number(bfShort) * 24;

  const estTakeProfit = useMemo(() => {
    const tp = (1 + (form.tp ?? 0) / 100) * (formattedPrice ?? 0);
    return tp;
  }, [form.tp, price]);

  const estStopLoss = useMemo(() => {
    const sl = (1 - (form.sl ?? 0) / 100) * (formattedPrice ?? 0);
    return sl;
  }, [form.sl, price]);

  const liqPrice = useCalculateLiqPrice({
    bfLong,
    bfShort,
    orderType: form.orderType,
    price: formattedPrice,
    leverage: form.leverage?.toString(),
  });

  const { account } = useBeraJs();

  const tradingContract = process.env
    .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address;
  const posSize = useMemo(() => {
    const positionSize = (form.amount ?? 0) * (form.leverage ?? 1);
    return Number.isNaN(positionSize) || positionSize === undefined
      ? 0
      : positionSize;
  }, [form.amount, form.leverage]);
  const parsedPositionSize = parseUnits(`${posSize ?? 0}`, 18);

  const [slippageMode] = useLocalStorage<SLIPPAGE_MODE>(
    SLIPPAGE_TOLERANCE_TYPE,
    SLIPPAGE_MODE.AUTO,
  );
  const [slippage] = useLocalStorage<number>(
    SLIPPAGE_TOLERANCE_VALUE,
    DEFAULT_SLIPPAGE,
  );

  const slippageTolerance = useMemo(() => {
    if (slippageMode === SLIPPAGE_MODE.AUTO) {
      return DEFAULT_SLIPPAGE;
    }
    if (slippageMode === SLIPPAGE_MODE.CUSTOM) {
      return slippage;
    }
    if (slippageMode === SLIPPAGE_MODE.DEGEN) {
      return 80;
    }
  }, [slippageMode, slippage]);

  const payload = [
    {
      trader: account,
      pairIndex: pairIndex,
      index: 0,
      initialPosToken: 0,
      positionSizeDai: parsedPositionSize, // position size
      openPrice: price ?? 0, // for limit orders
      buy: form.orderType === "long" ? true : false,
      leverage: form.leverage,
      tp: form.tp === 0 ? 0 : estTakeProfit,
      sl: form.sl === 0 ? 0 : estStopLoss,
    },
    form.optionType === "market" ? 0 : 2,
    0,
    parseUnits(`${slippageTolerance ?? 0}`, 10),
  ];

  console.log("payload", payload);

  const honey = {
    symbol: "HONEY",
    address: honeyAddress,
    decimals: 18,
    name: "Honey",
  };

  const { useAllowance } = usePollAllowance({
    contract: tradingContract,
    token: honey,
  });

  const allowance = useAllowance();

  console.log(payload);

  return (
    <div className="flex w-full flex-col gap-1 rounded-xl border border-border bg-muted px-4 py-3 text-xs font-medium leading-5 text-muted-foreground">
      {form.optionType === "market" ? (
        <div className="flex w-full justify-between">
          <div>EST. EXECUTION PRICE</div>
          <div className="text-foreground">
            {price === undefined ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              formatUsd(formattedPrice ?? 0)
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-between">
          <div>LIMIT ORDER PRICE</div>
          <div className="text-foreground">
            {price === undefined ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              formatUsd(formattedPrice ?? 0)
            )}
          </div>
        </div>
      )}
      <div className="flex w-full justify-between">
        <div>EST. LIQ. PRICE</div>
        <div className="flex flex-row text-foreground">
          {price === undefined || liqPrice === undefined ? (
            <Skeleton className="h-4 w-14" />
          ) : (
            formatUsd(liqPrice)
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>LEVERAGE</div>
        <div className="text-foreground">{form.leverage}x</div>
      </div>
      <div className="flex w-full justify-between">
        <div>EST. TAKE PROFIT</div>
        <div className="flex flex-row items-center gap-1 text-foreground">
          {form.tp === 0 ? (
            "None"
          ) : price === undefined ? (
            <Skeleton className="h-4 w-14" />
          ) : (
            `${formatUsd(estTakeProfit)}`
          )}{" "}
          {form.sl !== 0 && (
            <Icons.honey className="inline h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>EST. STOP LOSS</div>
        <div className="flex flex-row items-center gap-1 text-foreground">
          {form.sl === 0 ? (
            "None"
          ) : price === undefined ? (
            <Skeleton className="h-4 w-14" />
          ) : (
            `${formatUsd(estStopLoss)}`
          )}{" "}
          {form.sl !== 0 && (
            <Icons.honey className="inline h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>POSITION SIZE</div>
        <div className="align-items flex flex-row items-center gap-1 text-foreground">
          {formatUsd(posSize)}{" "}
          <Icons.honey className=" inline h-3 w-3 text-muted-foreground" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>OPENING FEES</div>
        <div className="text-foreground">
          {openingFee.toFixed(2)}%{" "}
          <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>DAILY (24H) BORROW FEE</div>
        <div className="text-foreground">
          {form.orderType === "long"
            ? dailyBfLong.toFixed(2)
            : dailyBfShort.toFixed(2)}
          %{" "}
          <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
        </div>
      </div>
      <ActionButton className="mt-4">
        {allowance?.formattedAllowance === "0" ? (
          <ApproveTokenButton token={honey} spender={tradingContract} />
        ) : (
          <Button
            className={cn(
              "w-full capitalize hover:opacity-80",
              form.orderType === "long"
                ? "bg-success text-success-foreground"
                : "bg-destructive text-destructive-foreground",
            )}
            disabled={isLoading}
            onClick={() =>
              write({
                address: tradingContract,
                abi: TRADING_ABI,
                functionName: "openTrade",
                params: payload,
              })
            }
          >
            Place {form.optionType} {form.orderType} order
          </Button>
        )}
      </ActionButton>
    </div>
  );
}
