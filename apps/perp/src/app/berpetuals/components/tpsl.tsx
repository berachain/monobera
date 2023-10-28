import { useMemo, useState } from "react";
import { formatUsd } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Input } from "@bera/ui/input";

const MAX_GAIN = 900;

const getCappedPercentDifference = (
  formattedPrice: number,
  estPrice: number,
  leverage: number,
  long: boolean,
  cap: number,
) => {
  console.log(long);
  const difference =
    long === true
      ? estPrice - formattedPrice
      : Math.abs(estPrice - formattedPrice);
  console.log(difference);
  const percentDifference = (difference / formattedPrice) * (100 * leverage);
  return Math.min(percentDifference, cap);
};

function calculateMaxPnlPrice(
  maxPnl: number,
  leverage: number,
  currentPrice: number,
  long: boolean,
): number {
  // Ensure maxPnl is greater than 0 and leverage is not 0
  if (maxPnl <= 0 || leverage === 0) {
    throw new Error(
      "Invalid input. Please ensure maxPnl is greater than 0 and leverage is not 0.",
    );
  }

  // Calculate the price required for the maximum pnl
  const tpPrice: number = long
    ? currentPrice * (1 + maxPnl / (100 * leverage))
    : currentPrice * (1 - maxPnl / (100 * leverage));

  return tpPrice;
}

const InputSelect = ({
  bracket,
  value,
  type,
  onValueChange,
  onTypeChange,
  variant = "success",
}: {
  value: number;
  bracket: [number, number, number, number, number];
  type: "none" | "percent" | "number";
  onValueChange: (percentage: number) => void;
  onTypeChange?: (type: "none" | "percent" | "number") => void;
  variant: "success" | "destructive";
}) => {
  return (
    <div className="flex w-full gap-1">
      <Input
        className="h-8 w-full rounded-lg bg-background text-xs lg:w-[102px]"
        placeholder="Amount"
        type={"number"}
        value={value === 0 ? "Price" : type === "percent" ? "Price" : value}
        onChange={(e) => {
          console.log(e.target.value === "");
          console.log(value);
          onValueChange(Number(e.target.value));
          onTypeChange &&
            onTypeChange(e.target.value === "" ? "none" : "number");
        }}
      />
      {bracket.map((amount: number, index: number) => (
        <div
          key={index}
          className={cn(
            "inline-flex h-8 w-[20%] cursor-pointer items-center justify-center rounded-lg px-2 text-xs font-medium lg:w-full",
            amount === value
              ? `bg-${variant} text-${variant}-foreground`
              : `bg-muted text-muted-foreground`,
          )}
          onClick={() => {
            onValueChange(amount);
            onTypeChange && onTypeChange(amount === 0 ? "none" : "percent");
          }}
        >
          {amount === 0 ? "None" : `${amount}%`}
        </div>
      ))}
    </div>
  );
};

export function TPSL({
  tpslOnChange,
  isUpdate,
  tp,
  sl,
  leverage,
  liqPrice,
  long,
  formattedPrice,
  isTpSubmitLoading = false,
  isSlSubmitLoading = false,
  onTpChangeSubmit,
  onSlChangeSubmit,
  className,
}: {
  tpslOnChange?: ({ tp, sl }: { tp: number; sl: number }) => void;
  isUpdate?: boolean;
  formattedPrice?: number;
  liqPrice?: number;
  leverage: number;
  long?: boolean;
  tp?: number;
  sl?: number;
  isTpSubmitLoading?: boolean;
  isSlSubmitLoading?: boolean;
  onTpChangeSubmit?: () => void;
  onSlChangeSubmit?: () => void;
  className?: string;
}) {
  const [tpsl, setTpsl] = useState<{
    tp: number;
    sl: number;
  }>({ tp: tp ?? 0, sl: sl ?? 0 });
  const [tpslType, setTpslType] = useState<"none" | "percent" | "number">(
    "none",
  );
  const [slType, setSlType] = useState<"none" | "percent" | "number">("none");

  const estTakeProfit = useMemo(() => {
    let result = 0;
    if (tpslType === "percent") {
      const priceFromPercent = long
        ? (1 + (tpsl.tp ?? 0) / (100 * leverage)) * (formattedPrice ?? 0)
        : (1 - (tpsl.tp ?? 0) / (100 * leverage)) * (formattedPrice ?? 0);
      const pnlTarget = getCappedPercentDifference(
        priceFromPercent ?? 0,
        priceFromPercent,
        leverage,
        long ?? true,
        MAX_GAIN,
      );

      if (pnlTarget === MAX_GAIN) {
        result =
          calculateMaxPnlPrice(
            pnlTarget,
            leverage,
            formattedPrice ?? 0,
            long ?? true,
          ) ?? 0;
      } else {
        result = priceFromPercent;
      }
    }
    if (tpslType === "number") {
      // if over 900% including leverage then set it to 900% with leverage
      const pnlTarget = getCappedPercentDifference(
        formattedPrice ?? 0,
        tpsl.tp,
        leverage,
        long ?? true,
        MAX_GAIN,
      );
      if (pnlTarget === MAX_GAIN) {
        console.log("max gain");
        result =
          calculateMaxPnlPrice(
            pnlTarget,
            leverage,
            formattedPrice ?? 0,
            long ?? true,
          ) ?? 0;
        console.log(result);
      } else {
        result = (tpsl.tp ?? 0) * 1;
      }
    }
    tpslOnChange && tpslOnChange({ tp: result, sl: sl ?? 0 });
    return result;
  }, [sl, tpsl.tp, formattedPrice, tpslType, leverage, long]);

  const estStopLoss = useMemo(() => {
    let result = 0;
    if (slType === "percent") {
      const priceFromPercent = long
        ? (1 - (tpsl.sl ?? 0) / (100 * leverage)) * (formattedPrice ?? 0)
        : (1 + (tpsl.sl ?? 0) / (100 * leverage)) * (formattedPrice ?? 0);
      result = priceFromPercent;
    }
    if (slType === "number") {
      if (liqPrice !== undefined) {
        result = liqPrice < (tpsl.sl ?? 0) ? liqPrice : tpsl.sl ?? 0;
      } else {
        result = (tpsl.sl ?? 0) * 1;
      }
    }
    tpslOnChange && tpslOnChange({ tp: tp ?? 0, sl: result });
    return result;
  }, [tp, tpsl.sl, formattedPrice, slType, leverage, long, liqPrice]);

  const tpPercent = getCappedPercentDifference(
    formattedPrice ?? 0,
    estTakeProfit,
    leverage,
    long ?? true,
    MAX_GAIN,
  );
  const tpPercentDisplay = tpPercent <= 0 ? 0 : tpPercent;

  const slPercent = getCappedPercentDifference(
    formattedPrice ?? 0,
    estStopLoss,
    leverage,
    long ?? true,
    100,
  );

  const slPercentDisplay =
    slPercent <= -100
      ? -100
      : estStopLoss > (formattedPrice ?? 0)
      ? 0 - slPercent
      : slPercent;

  return (
    <div className={className}>
      <div className="mb-2 text-xs font-medium">
        Take Profit{" "}
        <span className="text-success-foreground">
          {tpslType === "none"
            ? ""
            : tpslType === "percent"
            ? `(${formatUsd(estTakeProfit)})`
            : `(${tpPercentDisplay.toFixed(2)}%)`}
        </span>
      </div>
      <InputSelect
        value={tpsl.tp ?? 0}
        bracket={[0, 25, 50, 100, 150]}
        type={tpslType}
        onTypeChange={setTpslType}
        onValueChange={(percentage: number) =>
          setTpsl({ tp: percentage, sl: tpsl.sl })
        }
        variant="success"
      />
      {isUpdate && (
        <Button
          disabled={isTpSubmitLoading}
          onClick={() => onTpChangeSubmit && onTpChangeSubmit()}
          className="mt-4 w-full"
          size="sm"
        >
          Update Take Profit
        </Button>
      )}
      <div className="mb-2 mt-4 text-xs font-medium">
        Stop Loss{" "}
        <span className="text-destructive-foreground">
          {slType === "none"
            ? ""
            : slType === "percent"
            ? `(${formatUsd(estStopLoss)})`
            : `(${slPercentDisplay.toFixed(2)}%)`}
        </span>
      </div>
      <InputSelect
        value={tpsl.sl ?? 0}
        bracket={[0, 5, 10, 15, 25]}
        type={slType}
        onTypeChange={setSlType}
        onValueChange={(percentage: number) =>
          setTpsl({ tp: tpsl.tp, sl: percentage })
        }
        variant="destructive"
      />
      {isUpdate && (
        <Button
          disabled={isSlSubmitLoading}
          onClick={() => onSlChangeSubmit && onSlChangeSubmit()}
          className="mt-4 w-full"
          size="sm"
        >
          Update Stop Loss
        </Button>
      )}
    </div>
  );
}
