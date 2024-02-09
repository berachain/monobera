"use client";

import React from "react";
import { type Bribe } from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";

type Props = {
  bribes: Bribe | undefined;
};
export default function BribesList({ bribes }: Props) {
  return (
    <div className="flex flex-row">
      {bribes?.proposers.map((token: string, index: number) => (
        <div key={index} className="ml-[-15px]">
          <TokenIcon address={token} />
        </div>
      ))}
    </div>
  );
}
