import { useMemo } from "react";
import {
  tradingAbi,
  TransactionActionType,
  formatUsd,
  useBeraJs,
  usePollAllowance,
} from "@bera/berajs";
import { honeyAddress } from "@bera/config";
import { ActionButton, ApproveButton } from "@bera/shared-ui";
import {
  useOctTxn,
  useSetSlippage,
  useSlippage,
} from "@bera/shared-ui/src/hooks";
import { DEFAULT_SLIPPAGE, SLIPPAGE_MODE } from "@bera/shared-ui/src/settings";
import { cn } from "@bera/ui";
import { Alert } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Skeleton } from "@bera/ui/skeleton";
import BigNumber from "bignumber.js";
import { parseUnits, type Address } from "viem";

import { formatFromBaseUnit, formatToBaseUnit } from "~/utils/formatBigNumber";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { type OrderType } from "~/types/order-type";
import { beraJsConfig } from "@bera/wagmi";

export function PlaceOrder({
  form,
  price,
  formattedPrice,
  openingFee,
  error,
  liqPrice,
  pairIndex,
}: {
  form: OrderType;
  price: string | undefined;
  formattedPrice: string | undefined;
  openingFee: string;
  error: string | undefined;
  bfLong: string;
  liqPrice: string | undefined;
  bfShort: string;
  pairIndex: string;
}) {
  const { refetch } = usePollOpenPositions();

  const slippage = useSlippage();
  const { setSlippageMode, setSlippage } = useSetSlippage();

  const handleSlippageChange = (e: any) => {
    let newSlippage = Number(e.target.value);
    if (newSlippage < 0) {
      newSlippage = DEFAULT_SLIPPAGE;
    } else if (newSlippage > 100) {
      newSlippage = 100;
    }
    setSlippageMode(SLIPPAGE_MODE.CUSTOM);
    setSlippage(newSlippage);
  };

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
    const positionSize = BigNumber(safeAmount).times(
      BigNumber(form.leverage ?? "1"),
    );
    return positionSize.isNaN() || !positionSize.isFinite()
      ? "0"
      : positionSize.toString(10);
  }, [form.amount, form.leverage]);
  const parsedPositionSize = parseUnits(safeAmount, 18);

  const payload = [
    {
      trader: account,
      pairIndex: Number(pairIndex),
      index: 0,
      initialPosToken: 0,
      positionSizeHoney: parsedPositionSize, // position size
      openPrice:
        form.optionType === "market"
          ? BigInt(price ?? 0)
          : parseUnits(`${form.limitPrice ?? 0}`, 10), // for limit orders
      buy: form.orderType === "long" ? true : false,
      leverage: Number(form.leverage),
      tp: form.tp === "" ? 0n : parseUnits(form?.tp ?? "0", 10),
      sl: form.sl === "" ? 0n : parseUnits(form?.sl ?? "0", 10),
    },
    form.optionType === "market" ? 0 : 1,
    parseUnits(`${slippage ?? 0}`, 10),
  ];

  const honey = {
    symbol: "HONEY",
    address: honeyAddress,
    decimals: 18,
    name: "Honey",
  };

  const { data: allowance } = usePollAllowance({
    args: {
      spender: storageContract,
      token: honey,
    },
    config: beraJsConfig,
  });

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
              formatUsd(formattedPrice ?? "0")
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
              formatUsd(form.limitPrice ?? "0")
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
        <div className="flex flex-1 self-center">SLIPPAGE</div>
        <Input
          endAdornment={<div className="absolute left-1.5">%</div>}
          type="number"
          outerClassName="w-auto"
          className="flex h-6 w-[64px] rounded-sm bg-background pr-6 text-xs"
          required={false}
          min={1}
          max={100}
          onKeyDown={(e) =>
            (e.key === "-" || e.key === "e" || e.key === "E") &&
            e.preventDefault()
          }
          maxLength={3}
          value={slippage === 0 ? undefined : slippage}
          onChange={handleSlippageChange}
        />
      </div>
      <div className="flex w-full justify-between">
        <div>EST. TAKE PROFIT</div>
        <div className="flex flex-row items-center gap-1 text-foreground">
          {form.tp === "" ? (
            "None"
          ) : price === undefined ? (
            <Skeleton className="h-4 w-14" />
          ) : (
            `${formatUsd(form.tp ?? 0)}`
          )}{" "}
          {form.tp !== "" && (
            <Icons.honey className="inline h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>EST. STOP LOSS</div>
        <div className="flex flex-row items-center gap-1 text-foreground">
          {form.sl === "" ? (
            "None"
          ) : price === undefined ? (
            <Skeleton className="h-4 w-14" />
          ) : (
            `${formatUsd(form.sl ?? 0)}`
          )}{" "}
          {form.sl !== "" && (
            <Icons.honey className="inline h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>OPENING FEES</div>
        <div className="text-foreground">
          {formatFromBaseUnit(openingFee, 10).toString(10)}%{" "}
          {/* <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" /> */}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <div>POSITION SIZE</div>
        <div className="align-items flex flex-row items-center gap-1 truncate text-foreground">
          {formatUsd(
            BigNumber(posSize)
              .minus(
                BigNumber(posSize).times(formatFromBaseUnit(openingFee, 10)),
              )
              .toString(10),
          )}{" "}
          <Icons.honey className=" inline h-3 w-3 flex-1 text-muted-foreground" />
        </div>
      </div>
      <ActionButton className="mt-4">
        {allowance?.formattedAllowance === "0" ||
        BigNumber((allowance?.allowance ?? 0n).toString()).isLessThan(
          formatToBaseUnit(safeAmount, 18),
        ) ? (
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
              form.amount === undefined ||
              form.tp === ""
            }
            onClick={() =>
              write({
                address: tradingContract,
                abi: tradingAbi,
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
