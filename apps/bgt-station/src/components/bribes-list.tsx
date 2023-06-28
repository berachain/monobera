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
      {bribes?.proposers.map((token: string, index) => (
        <div key={index} className="ml-[-15px]">
          <TokenIcon
            fetch
            token={{
              address: token,
              decimals: 18,
              symbol: "",
              name: "",
              default: true,
            }}
          />
        </div>
      ))}
    </div>
  );
}
