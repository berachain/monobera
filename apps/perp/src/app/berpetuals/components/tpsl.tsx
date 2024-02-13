import { useState, useCallback, useEffect, useMemo } from "react";

import { ActionButton, Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Input } from "@bera/ui/input";

import {
  TPSL_PROFIT_TOOLTIP_TEXT,
  TPSL_LOSS_TOOLTIP_TEXT,
} from "../../../utils/tooltip-text";

const MAX_GAIN = 900;
const MAX_STOP_LOSS = -75;

const getPercentDifference = (
  formattedPrice: number,
  estPrice: number,
  leverage: number,
  long: boolean,
) => {
  const difference = long
    ? estPrice - formattedPrice
    : Math.abs(estPrice - formattedPrice);
  const percentDifference = (difference / formattedPrice) * (100 * leverage);
  return percentDifference;
};

const InputSelect = ({
  bracket,
  value,
  percent,
  onValueChange,
  onPercentChange,
  variant = "tp",
}: {
  value: string;
  bracket: [number, number, number, number, number];
  percent: string;
  onValueChange: (percentage: string) => void;
  onPercentChange: (percentage: string) => void;
  variant: "tp" | "sl";
}) => {
  return (
    <div className="flex w-full gap-1">
      <Input
        className="h-8 w-full rounded-sm bg-background text-xs lg:w-[102px]"
        placeholder="Amount"
        type={"number"}
        value={value === "" ? undefined : value}
        onChange={(e: { target: { value: string } }) =>
          onValueChange(e.target.value)
        }
      />
      {bracket.map((amount: number, index: number) => (
        <div
          key={index}
          className={cn(
            "inline-flex h-8 w-[20%] cursor-pointer items-center justify-center rounded-sm px-2 text-xs font-medium lg:w-full",
            amount === Number(percent) && value !== ""
              ? `bg-${variant === "tp" ? "success" : "destructive"} text-${
                  variant === "tp" ? "success" : "destructive"
                }-foreground`
              : "bg-muted text-muted-foreground",
          )}
          onClick={() => {
            onPercentChange(amount.toString());
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
  tp = "",
  sl = "",
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
  tpslOnChange: (value: string, key: string) => void;
  isUpdate?: boolean;
  formattedPrice?: number;
  liqPrice?: number;
  leverage: number;
  long?: boolean;
  tp?: string;
  sl?: string;
  isTpSubmitLoading?: boolean;
  isSlSubmitLoading?: boolean;
  onTpChangeSubmit?: () => void;
  onSlChangeSubmit?: () => void;
  className?: string;
}) {
  const [tpslPercent, setTpslPercent] = useState<{
    tpPercent: string;
    slPercent: string;
  }>({ tpPercent: "", slPercent: "" });
  const [initTpState, setInitTpState] = useState(tp === "");
  const safeLeverage = useMemo(
    () => (leverage || leverage > 0 ? leverage : 1),
    [leverage],
  );

  const handleTpChange = useCallback(
    (value: string) => {
      const isNegativeString = /-\d+(\.\d+)?/.test(value);
      // edge case for short positions where minimum take profit should be 0
      if (isNegativeString && !long) {
        tpslOnChange("0", "tp");
      } else {
        tpslOnChange(value, "tp");
      }
    },
    [tpslOnChange, long],
  );

  const handleSlChange = useCallback(
    (value: string) => {
      tpslOnChange(value, "sl");
    },
    [tpslOnChange],
  );

  // tp percentage has changed
  const handleTpPercentChange = useCallback(
    (percentage: string) => {
      const priceFromPercent = long
        ? (1 + Number(percentage ?? "0") / (100 * safeLeverage)) *
          (formattedPrice ?? 0)
        : (1 - Number(percentage ?? "0") / (100 * safeLeverage)) *
          (formattedPrice ?? 0);
      if (priceFromPercent <= 0) {
        tpslOnChange("0", "tp");
      } else {
        tpslOnChange(priceFromPercent.toFixed(10), "tp");
        setTpslPercent((prev) => ({ ...prev, tpPercent: percentage }));
      }
    },
    [formattedPrice, safeLeverage, long, tpslOnChange],
  );

  const handleSlPercentChange = useCallback(
    (percentage: string) => {
      const priceFromPercent = long
        ? (1 + Number(percentage ?? "0") / (100 * safeLeverage)) *
          (formattedPrice ?? 0)
        : (1 - Number(percentage ?? "0") / (100 * safeLeverage)) *
          (formattedPrice ?? 0);
      tpslOnChange(priceFromPercent.toFixed(10), "sl");
      setTpslPercent((prev) => ({ ...prev, slPercent: percentage }));
    },
    [formattedPrice, safeLeverage, long, tpslOnChange],
  );

  useEffect(() => {
    if (safeLeverage && formattedPrice) {
      if (tp === "") {
        if (initTpState && long) {
          const priceFromPercent =
            (1 + MAX_GAIN / (100 * safeLeverage)) * (formattedPrice ?? 0);
          tpslOnChange(priceFromPercent.toFixed(10), "tp");
          setTpslPercent((prev) => ({
            ...prev,
            tpPercent: MAX_GAIN.toString(),
          }));
          setInitTpState(false);
        } else {
          return;
        }
      } else {
        let result = 0;
        result = (Number(tp) ?? 0) * 1;
        let tpPercent = getPercentDifference(
          formattedPrice ?? 0,
          Number(result.toFixed(10)),
          safeLeverage,
          long ?? true,
        );
        // edge case for short positions where take profit percent should be negative
        if (formattedPrice && result > formattedPrice && !long) {
          tpPercent = -tpPercent;
        }
        // Add this check to prevent NaN from being displayed with undefined props
        if (!Number.isNaN(tpPercent)) {
          setTpslPercent((prev) => ({
            ...prev,
            tpPercent: tpPercent.toFixed(2),
          }));
        }
      }
    }
  }, [formattedPrice, safeLeverage, long, tp, initTpState, tpslOnChange]);

  useEffect(() => {
    if (sl === "") {
      return;
    }
    let result = 0;
    result = Number(sl ?? 0) * 1;
    let slPercent = getPercentDifference(
      formattedPrice ?? 0,
      Number(result.toFixed(10)),
      safeLeverage,
      long ?? true,
    );
    // edge case for short positions where stop loss percent should be negative
    if (formattedPrice && result > formattedPrice && !long) {
      slPercent = -slPercent;
    }
    // Add this check to prevent NaN from being displayed with undefined props
    if (!Number.isNaN(slPercent)) {
      setTpslPercent((prev) => ({
        ...prev,
        slPercent: slPercent.toFixed(2),
      }));
    }
  }, [sl, formattedPrice, safeLeverage, long, liqPrice, tpslOnChange]);

  const isTpUnset = (long && Number(tp) === 0) || tp === "";
  const sanitizedTpPercent =
    !isTpUnset &&
    `(${Math.min(
      Math.max(Number(tpslPercent.tpPercent), -100),
      MAX_GAIN,
    ).toFixed(2)}%)`;
  const sanitizedSlPercent = `(${Math.min(
    Math.max(Number(tpslPercent.slPercent), -100),
    100,
  ).toFixed(2)}%)`;

  return (
    <div className={className}>
      <div className="mb-2 text-xs font-medium flex">
        Take Profit{"  "}
        <span
          className={cn(
            "text-success-foreground ml-1 flex-1",
            !isTpUnset &&
              (Number(tpslPercent.tpPercent) < 0 ||
                Number(tpslPercent.tpPercent) > MAX_GAIN) &&
              "line-through",
          )}
        >
          {tpslPercent.tpPercent
            ? isTpUnset
              ? "(Unset)"
              : `${sanitizedTpPercent}`
            : ""}
        </span>
        <Tooltip text={TPSL_PROFIT_TOOLTIP_TEXT} />
      </div>
      <InputSelect
        value={tp}
        bracket={[25, 50, 100, 300, MAX_GAIN]}
        percent={tpslPercent.tpPercent ?? ""}
        onPercentChange={handleTpPercentChange}
        onValueChange={handleTpChange}
        variant="tp"
      />
      {isUpdate && (
        <ActionButton>
          <Button
            disabled={isTpSubmitLoading}
            onClick={() => onTpChangeSubmit?.()}
            className="mt-4 w-full"
            size="sm"
          >
            Update Take Profit
          </Button>
        </ActionButton>
      )}
      <div className="mb-2 mt-4 text-xs font-medium flex">
        Stop Loss{" "}
        <span
          className={cn(
            "text-destructive-foreground flex-1 ml-1",
            (Number(tpslPercent.slPercent) < MAX_STOP_LOSS ||
              Number(tpslPercent.slPercent) > 0) &&
              "line-through",
          )}
        >
          {sanitizedSlPercent && sl !== "" ? `${sanitizedSlPercent}` : ""}
        </span>
        <Tooltip text={TPSL_LOSS_TOOLTIP_TEXT} />
      </div>
      <InputSelect
        value={sl}
        bracket={[0, -10, -25, -50, MAX_STOP_LOSS]}
        percent={Number(tpslPercent.slPercent).toString() ?? ""}
        onPercentChange={handleSlPercentChange}
        onValueChange={handleSlChange}
        variant="sl"
      />
      {isUpdate && (
        <ActionButton>
          <Button
            disabled={isSlSubmitLoading}
            onClick={() => onSlChangeSubmit?.()}
            className="mt-4 w-full"
            size="sm"
          >
            Update Stop Loss
          </Button>
        </ActionButton>
      )}
    </div>
  );
}
