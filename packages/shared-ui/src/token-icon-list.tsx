import React from "react";

import { TokenIcon } from "./token-icon";
import { Token } from "@bera/berajs";
import { cn } from "@bera/ui";

interface ITokenIconList {
  tokenList: Token[];
  size?: "3xl" | "2xl" | "xl" | "lg" | "md" | "sm" | "xs";
  showCount?: number;
  className?: string;
}

export function TokenIconList({
  tokenList,
  showCount = 3,
  size = "lg",
  className,
}: ITokenIconList) {
  const length = tokenList?.length;
  if (showCount && showCount < length) {
    tokenList = tokenList.slice(0, showCount);
  }

  return (
    <div className={cn("ml-[5px] flex items-center", className)}>
      {tokenList?.map((token: Token) => (
        <TokenIcon
          key={token.address}
          address={token.address}
          symbol={token.symbol}
          className="ml-[-5px]"
          size={size}
        />
      ))}
      {showCount && length > showCount && (
        <div className="ml-2 text-muted-foreground">+{length - showCount}</div>
      )}
    </div>
  );
}
