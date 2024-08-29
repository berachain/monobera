import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { usePrevious, useTpsl } from "@bera/berajs";
import { ActionButton, Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";
import { Button } from "@bera/ui/button";
import { Input } from "@bera/ui/input";
import BigNumber from "bignumber.js";

import { MAX_SL_PERC, MAX_TP_PERC } from "~/utils/constants";
import {
  TPSL_LOSS_TOOLTIP_TEXT,
  TPSL_PROFIT_TOOLTIP_TEXT,
} from "~/utils/tooltip-text";
import { OrderType } from "~/types/order-type";

const InputSelect = ({
  bracket,
  value,
  percent,
  onValueChange,
  onPercentChange,
  variant = "tp",
}: {
  value: string;
  bracket: [string, string, string, string];
  percent: string;
  onValueChange: (percentage: string) => void;
  onPercentChange: (percentage: string) => void;
  variant: "tp" | "sl";
}) => {
  return (
    <div className="flex w-full gap-1">
      <Input
        className="h-8 w-full min-w-[60px] rounded-sm bg-background text-xs sm:min-w-[96px]"
        placeholder="Price"
        type={"number"}
        min={0}
        value={value}
        onKeyDown={(e) =>
          (e.key === "-" || e.key === "e" || e.key === "E") &&
          e.preventDefault()
        }
        onFocus={(e: { target: { value: string } }) =>
          onValueChange(e.target.value)
        }
        onChange={(e: { target: { value: string } }) =>
          onValueChange(e.target.value)
        }
      />
      {bracket.map((amount: string, index: number) => (
        <button
          type="button"
          key={index}
          className={cn(
            "inline-flex h-8 w-full cursor-pointer items-center justify-center rounded-sm border border-border px-2 text-xs font-medium",
            BigNumber(amount).eq(percent)
              ? [
                  variant === "tp" ? "bg-success" : "bg-destructive",
                  variant === "tp"
                    ? "text-success-foreground"
                    : "text-destructive-foreground",
                ]
              : "bg-muted text-muted-foreground",
            variant === "sl" &&
              amount === "" &&
              value === "" &&
              percent === "" &&
              "bg-destructive text-destructive-foreground",
          )}
          onClick={() => {
            onPercentChange(amount);
            if (amount === "") {
              onValueChange("");
            }
          }}
        >
          {amount === "" ? "None" : `${amount}%`}
        </button>
      ))}
    </div>
  );
};

const _TPSLAccordionWrapper = ({
  children,
  renderAccordion,
}: {
  children: React.ReactNode;
  renderAccordion: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return renderAccordion ? (
    <>
      {/**
       * If the input is not rendered, there might be a weird bug if tp is set to 900%,
       * since if price moves, it would be over max tp %
       *
       * There could be a better solution if this feat request on shadcn was implemented
       * @see https://github.com/radix-ui/primitives/issues/1155
       */}
      {!isOpen && <div className="hidden">{children}</div>}
      <Accordion
        onValueChange={(v) => {
          setIsOpen(!!v);
        }}
        type="single"
        collapsible
        defaultValue="tp-sl-lvg"
        className="mt-4"
      >
        <AccordionItem variant="outlined" value="tp-sl-lvg">
          <AccordionTrigger variant="outlined">
            Take Profit / Stop Loss / Leverage
          </AccordionTrigger>
          <AccordionContent>{children}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  ) : (
    children
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
  wrapInAccordion,
  optionType,
  children,
}: PropsWithChildren<{
  tpslOnChange: (value: string, key: string) => void;
  isUpdate?: boolean;
  /**
   * Formatted price of the current asset
   */
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
  wrapInAccordion?: boolean;
  optionType?: OrderType["optionType"];
}>) {
  const previousPrice = usePrevious(formattedPrice);
  const {
    setTpPercent,
    setSlPercent,
    tpPercent,
    slPercent,
    sanitizedTpPercent: realTpPercent,
    sanitizedSlPercent: realSlPercent,
  } = useTpsl({
    tp,
    sl,
    optionType,
    long: long ?? true,
    leverage,
    assetPrice: formattedPrice,
    maxSlPercent: MAX_SL_PERC,
    maxTpPercent: MAX_TP_PERC,
    onChangeTp: (v) => tpslOnChange(v, "tp"),
    onChangeSl: (v) => tpslOnChange(v, "sl"),
  });

  useEffect(() => {
    if (
      previousPrice !== formattedPrice &&
      (formattedPrice === "0" || formattedPrice === "")
    ) {
      tpslOnChange("", "tp");
      tpslOnChange("", "sl");
    }
  }, [previousPrice, formattedPrice, tpslOnChange]);

  const handleTpChange = useCallback(
    (value: string) => {
      setTpPercent("");

      const isNegativeString = /-\d+(\.\d+)?/.test(value);
      // edge case for short positions where minimum take profit should be 0
      if (isNegativeString && !long) {
        tpslOnChange("0", "tp");
      } else {
        tpslOnChange(value, "tp");
      }
    },
    [tpslOnChange, long, formattedPrice, slPercent],
  );

  const handleSlChange = useCallback(
    (value: string) => {
      setSlPercent("");

      const isNegativeString = /-\d+(\.\d+)?/.test(value);
      if (isNegativeString && long) {
        tpslOnChange("0", "sl");
      } else {
        tpslOnChange(value, "sl");
      }
    },
    [tpslOnChange, formattedPrice, slPercent],
  );

  const tpPercentBN = BigNumber(realTpPercent);
  const slPercentBN = BigNumber(realSlPercent);

  return (
    <>
      <_TPSLAccordionWrapper renderAccordion={!!wrapInAccordion}>
        {children}
        <div className={className}>
          <div className="mb-2 flex text-xs font-medium">
            Take Profit{"  "}
            <span className="ml-1 flex-1 text-success-foreground">
              {tp === ""
                ? "(Unset)"
                : `${
                    realTpPercent
                      ? `(${
                          tpPercentBN.lt("0")
                            ? "Less than "
                            : tpPercentBN.gt(MAX_TP_PERC)
                              ? "Greater than "
                              : ""
                        }${tpPercentBN.toString(10)}%)`
                      : ""
                  }`}
            </span>
            <Tooltip text={TPSL_PROFIT_TOOLTIP_TEXT} />
          </div>
          <InputSelect
            value={tp}
            bracket={["50", "100", "300", MAX_TP_PERC]}
            percent={tpPercent}
            onPercentChange={setTpPercent}
            onValueChange={handleTpChange}
            variant="tp"
          />
          {onTpChangeSubmit && (
            <ActionButton>
              <Button
                disabled={isTpSubmitLoading}
                onClick={() => onTpChangeSubmit?.()}
                className="mt-4 h-8 w-full"
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
                realSlPercent
                  ? `(${
                      slPercentBN.lt(MAX_SL_PERC)
                        ? "Less than "
                        : slPercentBN.gt(0)
                          ? "Greater than "
                          : ""
                    }${slPercentBN.toString(10)}%)`
                  : ""
              }`}
            </span>
            <Tooltip text={TPSL_LOSS_TOOLTIP_TEXT} />
          </div>
          <InputSelect
            value={sl}
            bracket={["", "-25", "-50", MAX_SL_PERC]}
            percent={slPercent ?? ""}
            onPercentChange={setSlPercent}
            onValueChange={handleSlChange}
            variant="sl"
          />
          {onSlChangeSubmit && (
            <ActionButton>
              <Button
                disabled={isSlSubmitLoading}
                onClick={() => onSlChangeSubmit?.()}
                className="mt-4 h-8 w-full"
                size="sm"
              >
                Update Stop Loss
              </Button>
            </ActionButton>
          )}
        </div>
      </_TPSLAccordionWrapper>
    </>
  );
}
