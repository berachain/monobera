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
  const [focused, setFocused] = React.useState(false);
  return (
    <div className="my-4 cursor-not-allowed">
      <div
        className={cn(
          "flex flex-row flex-wrap justify-between gap-3 rounded-lg border border-input bg-input p-3 pr-6",
          focused && "border-border",
        )}
      >
        <Button
          className="hover:text-primary-text flex shrink-0 cursor-not-allowed gap-2 hover:bg-transparent"
          variant="ghost"
        >
          <>
            <TokenIcon token={tokenWeight.token} />
            {tokenWeight.token?.symbol}
            <p className="text-xs text-muted-foreground">
              {tokenWeight.weight}%
            </p>
          </>
        </Button>
        <Input
          type="number"
          step="any"
          min="0"
          placeholder="0.0"
          className="w-100 grow border-0 p-0 text-right text-lg outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={
            tokenWeight.initialLiquidity > 0 ? tokenWeight.initialLiquidity : ""
          }
          disabled={true}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
        />
      </div>
    </div>
  );
}
