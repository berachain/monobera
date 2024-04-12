import { useCallback, useEffect, useState } from "react";
import { ActionButton, Tooltip, usePrevious } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Input } from "@bera/ui/input";
import BigNumber from "bignumber.js";

import { MAX_GAIN, MAX_STOP_LOSS } from "~/utils/constants";
import { getPriceFromPercent } from "~/utils/getPriceFromPercent";
import {
  TPSL_LOSS_TOOLTIP_TEXT,
  TPSL_PROFIT_TOOLTIP_TEXT,
} from "~/utils/tooltip-text";

const getPercentFromPrice = (
  formattedPrice: string,
  estPrice: string,
  leverage: string,
  long: boolean,
) => {
  const formattedPriceBN = BigNumber(formattedPrice);
  const estPriceBN = BigNumber(estPrice);
  const leverageBN = BigNumber(leverage);
  const difference = long
    ? estPriceBN.minus(formattedPriceBN)
    : estPriceBN.minus(formattedPriceBN).abs();

  return difference.div(formattedPriceBN).times(leverageBN.times(100));
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
  bracket: [string, string, string, string, string];
  percent: string;
  onValueChange: (percentage: string) => void;
  onPercentChange: (percentage: string) => void;
  variant: "tp" | "sl";
}) => {
  return (
    <div className="flex w-full gap-1">
      <Input
        className="h-8 w-full min-w-[60px] rounded-sm bg-background text-xs sm:min-w-[98px]"
        placeholder="Amount"
        type={"number"}
        min={0}
        value={value}
        onKeyDown={(e) =>
          (e.key === "-" || e.key === "e" || e.key === "E") &&
          e.preventDefault()
        }
        onChange={(e: { target: { value: string } }) =>
          onValueChange(e.target.value)
        }
      />
      {bracket.map((amount: string, index: number) => (
        <div
          key={index}
          className={cn(
            "inline-flex h-8 w-full cursor-pointer items-center justify-center rounded-sm px-2 text-xs font-medium",
            BigNumber(amount).eq(percent)
              ? `bg-${variant === "tp" ? "success" : "destructive"} text-${
                  variant === "tp" ? "success" : "destructive"
                }-foreground`
              : "bg-muted text-muted-foreground",
            variant === "sl" &&
              amount === "" &&
              percent === "" &&
              "bg-destructive text-destructive-foreground",
          )}
          onClick={() => {
            onPercentChange(amount);
          }}
        >
          {amount === "" ? "None" : `${amount}%`}
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
  long = true,
  formattedPrice = "0",
  isTpSubmitLoading = false,
  isSlSubmitLoading = false,
  onTpChangeSubmit,
  onSlChangeSubmit,
  className,
}: {
  tpslOnChange: (value: string, key: string) => void;
  isUpdate?: boolean;
  formattedPrice?: string;
  liqPrice?: string;
  leverage: string;
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
    stickyTp: boolean;
    stickySl: boolean;
  }>({ tpPercent: "", slPercent: "", stickyTp: false, stickySl: false });
  const [initTpState, setInitTpState] = useState(tp === "");

  const previousPrice = usePrevious(formattedPrice);
  const previousLeverage = usePrevious(leverage);

  useEffect(() => {
    if (leverage !== previousLeverage && BigNumber(leverage).lt(2)) {
      setTpslPercent((prev) => ({
        ...prev,
        tpPercent: "",
        slPercent: "",
        stickyTp: false,
        stickySl: false,
      }));
      tpslOnChange("", "tp");
      tpslOnChange("", "sl");
    }
  }, [previousLeverage, leverage, setTpslPercent, tpslOnChange]);

  useEffect(() => {
    if (
      previousPrice !== formattedPrice &&
      (formattedPrice === "0" || formattedPrice === "")
    ) {
      setTpslPercent((prev) => ({
        ...prev,
        tpPercent: "",
        slPercent: "",
        stickyTp: false,
        stickySl: false,
      }));
      tpslOnChange("", "tp");
      tpslOnChange("", "sl");
    }
  }, [previousPrice, formattedPrice, setTpslPercent, tpslOnChange]);

  const handleTpChange = useCallback(
    (value: string) => {
      const isNegativeString = /-\d+(\.\d+)?/.test(value);
      // edge case for short positions where minimum take profit should be 0
      if (isNegativeString && !long) {
        tpslOnChange("0", "tp");
      } else {
        tpslOnChange(value, "tp");
      }
      setTpslPercent((prev) => ({
        ...prev,
        stickyTp: false,
        tpPercent:
          formattedPrice && formattedPrice !== "0" ? prev.tpPercent : "",
      }));
    },
    [tpslOnChange, long, formattedPrice, setTpslPercent],
  );

  const handleSlChange = useCallback(
    (value: string) => {
      const isNegativeString = /-\d+(\.\d+)?/.test(value);
      if (isNegativeString && long) {
        tpslOnChange("0", "sl");
      } else {
        tpslOnChange(value, "sl");
      }

      if (value === "") {
        setTpslPercent((prev) => ({ ...prev, slPercent: "", stickySl: true }));
      } else {
        setTpslPercent((prev) => ({
          ...prev,
          stickySl: false,
          slPercent:
            formattedPrice && formattedPrice !== "0" ? prev.slPercent : "",
        }));
      }
    },
    [tpslOnChange, formattedPrice, setTpslPercent],
  );

  const handleTpPercentChange = useCallback(
    (percentage: string) => {
      const newPriceBN = getPriceFromPercent(
        long ?? true,
        percentage,
        leverage,
        formattedPrice,
      );
      if (newPriceBN.lte(0) && formattedPrice && formattedPrice !== "0") {
        tpslOnChange("0", "tp");
        setTpslPercent((prev) => ({ ...prev, stickyTp: false }));
      } else {
        tpslOnChange(
          newPriceBN.isFinite() ? newPriceBN.toString(10) : "",
          "tp",
        );
        setTpslPercent((prev) => ({
          ...prev,
          tpPercent: percentage,
          stickyTp: true,
        }));
      }
    },
    [formattedPrice, leverage, long, tpslOnChange],
  );

  const handleSlPercentChange = useCallback(
    (percentage: string) => {
      const newPriceBN = getPriceFromPercent(
        long,
        percentage,
        leverage,
        formattedPrice,
      );
      if (percentage === "") {
        tpslOnChange("", "sl");
        setTpslPercent((prev) => ({
          ...prev,
          slPercent: "",
          stickySl: true,
        }));
      }
      tpslOnChange(newPriceBN.isFinite() ? newPriceBN.toString(10) : "", "sl");
      setTpslPercent((prev) => ({
        ...prev,
        slPercent: percentage,
        stickySl: true,
      }));
    },
    [formattedPrice, leverage, long, tpslOnChange],
  );

  useEffect(() => {
    if (leverage && formattedPrice && formattedPrice !== "0") {
      if (tp === "") {
        // set intial state to max gain
        if (initTpState && long && !isUpdate) {
          const newPriceBN = getPriceFromPercent(
            long,
            MAX_GAIN,
            leverage,
            formattedPrice,
          );
          tpslOnChange(newPriceBN.toString(10), "tp");
          setTpslPercent((prev) => ({
            ...prev,
            tpPercent: MAX_GAIN,
            stickyTp: true,
          }));
          setInitTpState(false);
        } else {
          setTpslPercent((prev) => ({
            ...prev,
            tpPercent: "",
            stickyTp: false,
          }));
          return;
        }
      } else if (tpslPercent.stickyTp) {
        // if sticky, calculate new price from percent
        const newPriceBN = getPriceFromPercent(
          long,
          tpslPercent.tpPercent,
          leverage,
          formattedPrice,
        );
        if (newPriceBN.lt(0)) {
          tpslOnChange("", "tp");
          setTpslPercent((prev) => ({
            ...prev,
            tpPercent: "",
            stickyTp: false,
          }));
        } else {
          tpslOnChange(newPriceBN.toString(10), "tp");
        }
      } else {
        // calculate new percent from tp
        let tpPercentBN = getPercentFromPrice(
          formattedPrice,
          tp,
          leverage,
          long ?? true,
        );
        // edge case for short positions where take profit percent should be negative
        if (
          formattedPrice &&
          BigNumber(tp).gt(BigNumber(formattedPrice)) &&
          !long
        ) {
          tpPercentBN = tpPercentBN.negated();
        }
        setTpslPercent((prev) => ({
          ...prev,
          tpPercent: tpPercentBN.isFinite() ? tpPercentBN.toString(10) : "",
        }));
      }
    }
  }, [
    formattedPrice,
    leverage,
    long,
    tp,
    initTpState,
    tpslOnChange,
    setTpslPercent,
    tpslPercent.stickyTp,
    tpslPercent.tpPercent,
  ]);

  useEffect(() => {
    if (leverage && formattedPrice && formattedPrice !== "0") {
      if (sl === "") {
        return;
      }
      if (tpslPercent.stickySl) {
        const newPriceBN = getPriceFromPercent(
          long,
          tpslPercent.slPercent,
          leverage,
          formattedPrice,
        );
        tpslOnChange(newPriceBN.toString(10), "sl");
      } else {
        const result = sl ?? "0";
        let slPercentBN = getPercentFromPrice(
          formattedPrice ?? "0",
          result,
          leverage,
          long,
        );
        // edge case for short positions where stop loss percent should be negative
        if (formattedPrice && BigNumber(result).gt(formattedPrice) && !long) {
          slPercentBN = slPercentBN.negated();
        }
        setTpslPercent((prev) => ({
          ...prev,
          slPercent: slPercentBN.toString(10),
        }));
      }
    }
  }, [
    sl,
    formattedPrice,
    leverage,
    long,
    liqPrice,
    tpslOnChange,
    tpslPercent.stickySl,
    tpslPercent.slPercent,
  ]);

  const sanitizedTpPercent =
    tpslPercent.tpPercent &&
    `${BigNumber.min(BigNumber.max(tpslPercent.tpPercent, 0), MAX_GAIN).dp(2)}`;

  const sanitizedSlPercent =
    tpslPercent.slPercent &&
    `${BigNumber.min(BigNumber.max(tpslPercent.slPercent, -75), 0).dp(2)}`;

  const tpPercentBN = BigNumber(tpslPercent.tpPercent);
  const slPercentBN = BigNumber(tpslPercent.slPercent);

  return (
    <div className={className}>
      <div className="mb-2 flex text-xs font-medium">
        Take Profit{"  "}
        <span className="ml-1 flex-1 text-success-foreground">
          {tp === "" && !tpslPercent.tpPercent
            ? "(Unset)"
            : `${
                tpslPercent.tpPercent
                  ? `(${
                      tpPercentBN.lt("0")
                        ? "Less than "
                        : tpPercentBN.gt(MAX_GAIN)
                          ? "Greater than "
                          : ""
                    }${sanitizedTpPercent}%)`
                  : ""
              }`}
        </span>
        <Tooltip text={TPSL_PROFIT_TOOLTIP_TEXT} />
      </div>
      <InputSelect
        value={tp}
        bracket={["25", "50", "100", "300", MAX_GAIN]}
        percent={tpslPercent.tpPercent ?? ""}
        onPercentChange={handleTpPercentChange}
        onValueChange={handleTpChange}
        variant="tp"
      />
      {onTpChangeSubmit && (
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
      <div className="mb-2 mt-4 flex text-xs font-medium">
        Stop Loss{" "}
        <span className="ml-1 flex-1 text-destructive-foreground">
          {`${
            tpslPercent.slPercent
              ? `(${
                  slPercentBN.lt(MAX_STOP_LOSS)
                    ? "Less than "
                    : slPercentBN.gt(0)
                      ? "Greater than "
                      : ""
                }${sanitizedSlPercent}%)`
              : ""
          }`}
        </span>
        <Tooltip text={TPSL_LOSS_TOOLTIP_TEXT} />
      </div>
      <InputSelect
        value={sl}
        bracket={["", "-10", "-25", "-50", MAX_STOP_LOSS]}
        percent={tpslPercent.slPercent ?? ""}
        onPercentChange={handleSlPercentChange}
        onValueChange={handleSlChange}
        variant="sl"
      />
      {onSlChangeSubmit && (
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
