import React, { useState } from "react";
import { TokenIcon } from "@bera/shared-ui";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { getSafeNumber } from "~/utils/getSafeNumber";
import { type Token, formatNumber } from "@bera/berajs";
import { getBaseCostBN, getQuoteCostBN } from "~/app/pools/fetchPools";

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
    <li className={"flex w-full flex-col  items-center overflow-x-scroll"}>
      <div className="flex w-full flex-col sm:flex-row justify-between gap-2">
        <div className="w-full sm:w-1/2 min-w-0 flex flex-col gap-1 self-center font-semibold bg-muted p-2 rounded-sm ">
          <div className="flex flex-row gap-1 truncate">
            <TokenIcon address={baseToken?.address} />
            {initialPrice === "" ||
            initialPrice === "0" ||
            getSafeNumber(initialPrice) === 0
              ? 0
              : baseCost}{" "}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {baseToken.symbol} per {quoteToken.symbol}
          </p>
        </div>

        <div className="w-full sm:w-1/2  min-w-0 flex flex-col gap-1 self-center font-semibold  bg-muted p-2 rounded-sm">
          <div className="flex flex-row gap-1 truncate">
            <TokenIcon address={quoteToken?.address} />
            {initialPrice === "" ||
            initialPrice === "0" ||
            getSafeNumber(initialPrice) === 0
              ? 0
              : quoteCost}{" "}
          </div>
          <p className="text-xs text-muted-foreground truncate">
            {quoteToken.symbol} per {baseToken.symbol}
          </p>
        </div>
      </div>
    </li>
  );
}
