import React, { useState } from "react";
import { formatNumber, type Token } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { getSafeNumber } from "~/utils/getSafeNumber";
import { getBaseCostBN, getQuoteCostBN } from "~/app/pools/fetchPools";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  baseToken: Token | undefined;
  quoteToken: Token | undefined;
  initialPrice: string;
};

export const MIN_PRICE = 0.00000001;

export default function CreatePoolExchangeRate({
  baseToken,
  quoteToken,
  initialPrice,
}: Props) {
  const baseCost = getBaseCostBN(initialPrice);
  const quoteCost = getQuoteCostBN(initialPrice);
  return (
    <li className={"flex w-full flex-col  items-center overflow-x-auto"}>
      <div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
        <div className="flex w-full min-w-0 flex-col gap-1 self-center rounded-sm bg-muted p-2 font-semibold sm:w-1/2 ">
          <div className="flex flex-row gap-1 truncate">
            <TokenIcon
              address={baseToken?.address}
              symbol={baseToken?.symbol}
            />
            {initialPrice === "" ||
            initialPrice === "0" ||
            getSafeNumber(initialPrice) === 0
              ? 0
              : quoteCost}{" "}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {baseToken?.symbol} per {quoteToken?.symbol}
          </p>
        </div>

        <div className="flex w-full  min-w-0 flex-col gap-1 self-center rounded-sm bg-muted  p-2 font-semibold sm:w-1/2">
          <div className="flex flex-row gap-1 truncate">
            <TokenIcon
              address={quoteToken?.address}
              symbol={quoteToken?.symbol}
            />
            {initialPrice === "" ||
            initialPrice === "0" ||
            getSafeNumber(initialPrice) === 0
              ? 0
              : baseCost}{" "}
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {quoteToken?.symbol} per {baseToken?.symbol}
          </p>
        </div>
      </div>
    </li>
  );
}
