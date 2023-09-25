import React from "react";
import { type Token } from "@bera/berajs";
import { SelectToken } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Separator } from "@bera/ui/separator";

import { type ITokenBribe } from "./hooks/useCreateTokenBribes";

type Props = {
  tokenBribe: ITokenBribe;
  proposals: number;
  index: number;
  selectedTokens: Token[];
  selectable?: boolean;
  onTokenSelection: (token: Token, index: number) => void;
  onRemove: (index: number) => void;
  onTokenBribeChange: (index: number, bribe: number, proposals: number) => void;
  onTokenTotalChange: (index: number, total: number, proposals: number) => void;
};

export default function BribeTokenInput({
  tokenBribe,
  index,
  selectedTokens,
  onTokenSelection,
  onRemove,
  onTokenBribeChange,
  onTokenTotalChange,
  proposals,
  selectable = true,
}: Props) {
  const [focused, setFocused] = React.useState(false);
  const handleTokenSelection = (token: Token) => {
    onTokenSelection(token, index);
  };
  return (
    <div className="my-4">
      <div
        className={cn(
          "flex gap-3 rounded-lg border border-input bg-input px-4",
          focused && "border-border",
        )}
      >
        <div className="flex w-3/4 items-center">
          <SelectToken
            token={tokenBribe.token}
            onTokenSelection={handleTokenSelection}
            selectedTokens={selectedTokens}
            selectable={selectable}
          />
          <Input
            type="number"
            step="any"
            min="0"
            placeholder="0.0"
            className="w-full grow border-0 p-0 text-right text-lg outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={tokenBribe.bribe > 0 ? tokenBribe.bribe : ""}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onChange={(e) => {
              onTokenBribeChange(index, Number(e.target.value), proposals);
            }}
          />
        </div>
        <div className="flex w-1/4 items-center">
          <Separator orientation="vertical" className="mr-3 h-6" />
          <Input
            type="number"
            step="any"
            min="0"
            placeholder="0.0"
            className="w-full grow border-0 p-0 text-lg outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={tokenBribe.total > 0 ? tokenBribe.total : ""}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onChange={(e) => {
              onTokenTotalChange(index, Number(e.target.value), proposals);
            }}
          />

          <Button
            variant="ghost"
            className="rounded-full p-0 hover:text-red-500"
            onClick={() => onRemove(index)}
          >
            <Icons.trash className="h-4 w-4 " />
          </Button>
        </div>
      </div>
    </div>
  );
}
