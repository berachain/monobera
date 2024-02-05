import { useMemo } from "react";
import {
  TRADING_ABI,
  TransactionActionType,
  formatUsd,
  useBeraJs,
  usePollAllowance,
} from "@bera/berajs";
import { honeyAddress } from "@bera/config";
import { ActionButton, ApproveButton } from "@bera/shared-ui";
import { useOctTxn } from "@bera/shared-ui/src/hooks";
import { cn } from "@bera/ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits, parseUnits } from "viem";
import { type Address } from "wagmi";

import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { type OrderType } from "../type";

export function PlaceOrder({
  form,
  price,
  openingFee,
  error,
  liqPrice,
  pairIndex,
}: {
  form: OrderType;
  price: number | undefined;
  openingFee: number;
  error: string | undefined;
  bfLong: string;
  liqPrice: number | undefined;
  bfShort: string;
  pairIndex: number;
}) {
  const formattedPrice = Number(formatUnits(BigInt(price ?? 0n), 10));
  const { refetch } = usePollOpenPositions();

  const safeAmount = form.amount === "" ? "0" : form.amount;

  const { isLoading, write, ModalPortal } = useOctTxn({
    actionType:
      form.optionType === "market"
        ? form.orderType === "long"
          ? TransactionActionType.MARKET_LONG
          : TransactionActionType.MARKET_SHORT
        : form.orderType === "long"
          ? TransactionActionType.LIMIT_LONG
          : TransactionActionType.LIMIT_SHORT,
    message:
      form.optionType === "market"
        ? form.orderType === "long"
          ? `Longing ${form.assets}`
          : `Shorting ${form.assets}`
        : form.orderType === "long"
          ? `Placing Limit Long Order ${form.assets}`
          : `Placing Limit Short Order ${form.assets}`,
    onSuccess: () => {
      refetch();
    },
  });

  const { account } = useBeraJs();

  const tradingContract = process.env
    .NEXT_PUBLIC_TRADING_CONTRACT_ADDRESS as Address;

  const storageContract = process.env
    .NEXT_PUBLIC_STORAGE_CONTRACT_ADDRESS as Address;
  const posSize = useMemo(() => {
    const positionSize = Number(safeAmount) * (form.leverage ?? 1);
    return Number.isNaN(positionSize) || positionSize === undefined
      ? 0
      : positionSize;
  }, [form.amount, form.leverage]);
  const parsedPositionSize = parseUnits(safeAmount, 18);

  // const slippageTolerance = useSlippage();

  const payload = [
    {
      trader: account,
      pairIndex: pairIndex,
      index: 0,
      initialPosToken: 0,
      positionSizeDai: parsedPositionSize, // position size
      openPrice:
        form.optionType === "market"
          ? BigInt(price ?? 0)
          : parseUnits(`${form.limitPrice ?? 0}`, 10), // for limit orders
      buy: form.orderType === "long" ? true : false,
      leverage: form.leverage,
      tp: form.tp === "" ? 0n : parseUnits(form?.tp ?? "0", 10),
      sl: form.sl === "" ? 0n : parseUnits(form?.sl ?? "0", 10),
    },
    form.optionType === "market" ? 0 : 1,
    // parseUnits(`${slippageTolerance ?? 0}`, 10),
    parseUnits("100", 10),
  ];

  const honey = {
    symbol: "HONEY",
    address: honeyAddress,
    decimals: 18,
    name: "Honey",
  };

  const { useAllowance } = usePollAllowance({
    contract: storageContract,
    token: honey,
  });

  const allowance = useAllowance();

  return (
    <div className="flex w-full flex-col gap-1 rounded-md border border-border bg-muted px-4 py-3 text-xs font-medium leading-5 text-muted-foreground">
      {ModalPortal}
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
              formatUsd(form.limitPrice ?? 0)
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
        <div className="flex flex-row items-center gap-1 text-foreground truncate">
          <span className="truncate">
            {form.tp === "" ? (
              "None"
            ) : price === undefined ? (
              <Skeleton className="h-4 w-14" />
            ) : (
              `${formatUsd(form.tp ?? 0)}`
            )}{" "}
          </span>
          {form.tp !== "" && (
            <Icons.honey className="inline h-3 w-3 text-muted-foreground flex-1" />
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>EST. STOP LOSS</div>
        <div className="flex flex-row items-center gap-1 text-foreground truncate">
          <span className="truncate">
            {form.sl === "" ? (
              "None"
            ) : price === undefined ? (
              <Skeleton className="h-4 w-14" />
            ) : (
              `${formatUsd(form.sl ?? 0)}`
            )}{" "}
          </span>
          {form.sl !== "" && (
            <Icons.honey className="inline h-3 w-3 text-muted-foreground flex-1" />
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>POSITION SIZE</div>
        <div className="align-items flex flex-row items-center gap-1 text-foreground truncate">
          <span className="truncate">{formatUsd(posSize)} </span>
          <Icons.honey className="inline h-3 w-3 text-muted-foreground flex-1" />
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>OPENING FEES</div>
        <div className="text-foreground">
          {openingFee}%{" "}
          {/* <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" /> */}
        </div>
      </div>
      <ActionButton className="mt-4">
        {allowance?.formattedAllowance === "0" ||
        allowance?.allowance < parseUnits(safeAmount, 18) ? (
          <ApproveButton
            token={honey}
            spender={storageContract}
            amount={parseUnits(safeAmount, 18)}
          />
        ) : (
          <Button
            className={cn(
              "w-full capitalize hover:opacity-80",
              form.orderType === "long"
                ? "bg-success-foreground text-white"
                : "bg-destructive-foreground text-white",
            )}
            disabled={
              isLoading ||
              error !== undefined ||
              form.amount === "" ||
              safeAmount === "0" ||
              form.amount === undefined
            }
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
      {error !== undefined && (
        <Alert variant="destructive" className="mt-2">
          {error}
        </Alert>
      )}
    </div>
  );
}
