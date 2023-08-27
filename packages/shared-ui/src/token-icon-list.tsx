import React from "react";

import { TokenIcon } from "./token-icon";

interface ITokenIconList {
  tokenList: string[];
  size?: number;
  showCount?: number;
}

export function TokenIconList({
  tokenList,
  size = 32,
  showCount,
}: ITokenIconList) {
  const length = tokenList?.length;
  if (showCount && showCount < length) {
    tokenList = tokenList.slice(0, showCount);
  }

  return (
    <div className="ml-[5px] flex items-center">
      {tokenList?.map((icon, index) => (
        <TokenIcon
          address={icon}
          fetch={true}
          className={`ml-[-5px] w-[${size}px] h-[${size}px]`}
        />
      ))}
      {showCount && length > showCount && (
        <div className="ml-2 text-muted-foreground">+{length - showCount}</div>
      )}
    </div>
  );
}
