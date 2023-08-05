import React from "react";
import { TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Input } from "@bera/ui/input";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  tokenWeight: ITokenWeight;
};

export default function CreatePoolPreviewInput({ tokenWeight }: Props) {
  return (
    <li className={"flex w-full flex-row justify-between  items-center p-2"}>

        <div
          className="flex cursor-not-allowed gap-2 items-center justify-center"
        >
          <>
            <TokenIcon token={tokenWeight.token} />
            {tokenWeight.token?.symbol}
            <p className="text-sm text-muted-foreground">
              {tokenWeight.weight}%
            </p>
          </>
        </div>
        <div           className="flex grow-0 border-0 p-0 text-right text-lg outline-none cursor-not-allowed text-muted-foreground"
>
    {tokenWeight.initialLiquidity}
        </div>
      </li>
  );
}
