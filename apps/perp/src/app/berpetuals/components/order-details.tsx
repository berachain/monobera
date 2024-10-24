import { useMemo } from "react";
import { formatUsd } from "@bera/berajs";
import { useSetSlippage, useSlippage } from "@bera/shared-ui";
import { DEFAULT_SLIPPAGE, SLIPPAGE_MODE } from "@bera/shared-ui/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Skeleton } from "@bera/ui/skeleton";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { type OrderType } from "~/types/order-type";

export function OrderDetails({
  form,
  price,
  openingFee,
  liqPrice,
}: {
  form: OrderType;
  price: string;
  openingFee: string;
  liqPrice: string | undefined;
}) {
  const slippage = useSlippage();
  const { setSlippageMode, setSlippage } = useSetSlippage();
  const orderOpeningFees = formatFromBaseUnit(openingFee, 10);

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

  const posSize = useMemo(() => {
    const positionSize = BigNumber(safeAmount).times(
      BigNumber(form.leverage ?? "1"),
    );
    return positionSize.isNaN() || !positionSize.isFinite()
      ? "0"
      : positionSize.toString(10);
  }, [form.amount, form.leverage]);

  return (
    <Accordion
      type="single"
      defaultValue="order-details"
      collapsible
      className="mt-4"
    >
      <AccordionItem value="order-details" variant="outlined">
        <AccordionTrigger variant="outlined">Trade details</AccordionTrigger>
        <AccordionContent className=" pt-2 text-muted-foreground">
          {form.optionType === "market" ? (
            <div className="flex w-full justify-between">
              <div>Est. Execution Price</div>
              <div className="text-muted-foreground">
                {price === "0" ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  formatUsd(price)
                )}
              </div>
            </div>
          ) : (
            <div className="flex w-full justify-between">
              <div>Limit Order Price</div>
              <div className="text-muted-foreground">
                {price === "0" ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  formatUsd(form.limitPrice ?? "0")
                )}
              </div>
            </div>
          )}
          <div className="flex w-full justify-between">
            <div>Est. Liq. Price</div>
            <div className="flex flex-row text-muted-foreground">
              {price === "0" || liqPrice === undefined ? (
                <Skeleton className="h-4 w-14" />
              ) : (
                formatUsd(liqPrice)
              )}
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div>Leverage</div>
            <div className="text-muted-foreground">{form.leverage}x</div>
          </div>
          <div className="flex w-full justify-between">
            <div className="flex flex-1 self-center">Slippage</div>
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
            <div>Est. Take Profit</div>
            <div className="flex flex-row items-center gap-1 text-muted-foreground">
              {form.tp === "" ? (
                "None"
              ) : price === "0" ? (
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
            <div>Est. Stop Loss</div>
            <div className="flex flex-row items-center gap-1 text-muted-foreground">
              {form.sl === "" ? (
                "None"
              ) : price === "0" ? (
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
            <div>Opening Fees {`(${orderOpeningFees.toString(10)}%)`}</div>
            <div className="truncate text-muted-foreground">
              {formatUsd(
                BigNumber(posSize)
                  .times(orderOpeningFees)
                  .div(100)
                  .toString(10),
              )}{" "}
              <Icons.honey className="-mt-1 inline h-3 w-3 text-muted-foreground" />
            </div>
          </div>
          <div className="flex w-full justify-between">
            <div>Position Size</div>
            <div className="align-items flex flex-row items-center gap-1 truncate text-muted-foreground">
              {formatUsd(
                BigNumber(posSize)
                  .minus(
                    BigNumber(posSize)
                      .times(orderOpeningFees)
                      .div(100)
                      .times(form.leverage ?? "1"),
                  )
                  .toString(10),
              )}{" "}
              <Icons.honey className=" inline h-3 w-3 flex-1 text-muted-foreground" />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
