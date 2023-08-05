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
    <li className={"flex w-full flex-row items-center  justify-between p-2"}>
      <div className="flex cursor-not-allowed items-center justify-center gap-2">
        <>
          <TokenIcon token={tokenWeight.token} />
          {tokenWeight.token?.symbol}
          <p className="text-sm text-muted-foreground">{tokenWeight.weight}%</p>
        </>
      </div>
      <div className="flex grow-0 cursor-not-allowed border-0 p-0 text-right text-lg text-muted-foreground outline-none">
        {tokenWeight.initialLiquidity}
      </div>
    </li>
  );
}
