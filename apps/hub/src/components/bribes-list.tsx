"use client";

import React from "react";
import { TokenIcon } from "@bera/shared-ui";

type Props = {
  bribes: any | undefined;
};
export default function BribesList({ bribes }: Props) {
  return (
    <div className="flex flex-row">
      {bribes?.proposers.map((token: string, index: number) => (
        <div key={`${index}-${token}`} className="ml-[-15px]">
          <TokenIcon address={token} />
        </div>
      ))}
    </div>
  );
}
