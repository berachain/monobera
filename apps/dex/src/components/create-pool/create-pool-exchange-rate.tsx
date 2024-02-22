import React, { useState } from "react";
import { TokenIcon } from "@bera/shared-ui";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { getSafeNumber } from "~/utils/getSafeNumber";
import { formatNumber } from "@bera/berajs";
import { getBaseCost, getQuoteCost } from "~/app/pools/fetchPools";

type Props = {
  baseToken: ITokenWeight | undefined;
  quoteToken: ITokenWeight | undefined;
  initialPrice: string;
};

export const MIN_PRICE = 0.000001;

export default function CreatePoolExchangeRate({
  baseToken,
  quoteToken,
  initialPrice,
}: Props) {
  const [isPricingBase, setIsPricingBase] = useState(false);
  const baseCost = getBaseCost(getSafeNumber(initialPrice));
  const quoteCost = getQuoteCost(getSafeNumber(initialPrice));
  return (
    <li className={"flex w-full flex-col  items-center p-2 overflow-x-scroll"}>
      <div className="flex w-fit flex-row justify-between gap-2">
        <div className="w-fit flex flex-row gap-1 self-center font-semibold">
          <TokenIcon address={baseToken?.token?.address} />
          {initialPrice === "" ||
          initialPrice === "0" ||
          getSafeNumber(initialPrice) === 0 ||
          getSafeNumber(initialPrice) < MIN_PRICE
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
          <TokenIcon address={quoteToken?.token?.address} />
          {initialPrice === "" ||
          initialPrice === "0" ||
          getSafeNumber(initialPrice) === 0 ||
          getSafeNumber(initialPrice) < MIN_PRICE
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
