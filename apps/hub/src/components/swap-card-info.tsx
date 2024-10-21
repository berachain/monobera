import { useSlippage } from "@bera/shared-ui";
import { getPriceImpactColorClass } from "@bera/shared-ui/utils";
import { cn } from "@bera/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@bera/ui/accordion";
import { Icons } from "@bera/ui/icons";
import { useMemo, useState } from "react";

export const NetworkFee = ({
  gasPrice,
}: {
  gasPrice: string;
}) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <Icons.lightning />
      <span className="text-[#E1C782] text-xs font-semibold">{gasPrice}</span>
    </div>
  );
};
export const SwapCardInfo = ({
  priceImpact,
  exchangeRate,
  gasPrice,
}: {
  priceImpact: number;
  exchangeRate: string | undefined;
  gasPrice: string;
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const priceImpactColorClass = useMemo(() => {
    return getPriceImpactColorClass(priceImpact);
  }, [priceImpact]);

  const slippage = useSlippage();
  return (
    <Accordion
      type="single"
      collapsible
      onValueChange={() => setIsSelected(!isSelected)}
    >
      <AccordionItem value="item-1" className="w-full" disabled={!exchangeRate}>
        <AccordionTrigger
          decorator={!isSelected && <NetworkFee gasPrice={gasPrice} />}
          className="flex gap-4 text-sm min-w-full w-full font-normal text-muted-foreground"
        >
          <span className="text-white font-semibold text-xs">
            {exchangeRate && exchangeRate}
          </span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col w-full gap-2">
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-muted-foreground text-xs font-semibold">
                Price Impact
              </span>
              <span
                className={`text-right text-xs font-semibold  ${
                  priceImpactColorClass ?? ""
                }`}
              >
                {priceImpact ? `~${Math.abs(priceImpact).toFixed(2)}%` : "-"}
              </span>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-muted-foreground text-xs font-semibold">
                Slippage Tolerance
              </span>
              <span className={"text-right text-xs font-semibold"}>
                {slippage}%
              </span>
            </div>
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-muted-foreground text-xs font-semibold">
                Network Fee
              </span>
              <NetworkFee gasPrice={gasPrice} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
