import React, { useState } from "react";
import { TokenIcon } from "@bera/shared-ui";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { getSafeNumber } from "~/utils/getSafeNumber";
import { formatNumber } from "@bera/berajs";

type Props = {
  baseToken: ITokenWeight | undefined;
  quoteToken: ITokenWeight | undefined;
  initialPrice: string;
};

export default function CreatePoolExchangeRate({
  baseToken,
  quoteToken,
  initialPrice,
}: Props) {
  const [isPricingBase, setIsPricingBase] = useState(true);
  const baseCost = 1 * getSafeNumber(initialPrice);
  const quoteCost = 1 / getSafeNumber(initialPrice);
  return (
    <li className={"flex w-full flex-col  items-center p-2 overflow-x-scroll"}>
      <div className="flex w-fit flex-row justify-between gap-2">
        <div className="w-fit flex flex-row gap-1 self-center font-semibold">
          <TokenIcon token={baseToken?.token} />
          {initialPrice === "" || initialPrice === "0"
            ? 0
            : isPricingBase
              ? 1
              : formatNumber(quoteCost)}{" "}
          {baseToken?.token?.symbol}
        </div>
        <Button
          variant={"secondary"}
          className="p-2"
          onClick={() => setIsPricingBase(!isPricingBase)}
        >
          <Icons.repeat className="h-4 w-4" />
        </Button>
        <div className="w-fit flex flex-row gap-1 self-center font-semibold">
          <TokenIcon token={quoteToken?.token} />
          {initialPrice === "" || initialPrice === "0"
            ? 0
            : isPricingBase
              ? formatNumber(baseCost)
              : 1}{" "}
          {quoteToken?.token?.symbol}
        </div>
      </div>
    </li>
  );
}
