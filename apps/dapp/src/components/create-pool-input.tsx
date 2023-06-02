import React from "react";
import Image from "next/image";
import { type Token } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import TokenDialog from "./token-dialog";

type Props = {
  tokenWeight: ITokenWeight;
  index: number;
  selectedTokens: Token[];
  onTokenSelection: (token: Token, index: number) => void;
  onRemove: (index: number) => void;
  onTokenWeightChange: (index: number, weight: number) => void;
  onLock: (index: number) => void;
  onUnlock: (index: number) => void;
};

export default function CreatePoolInput({
  tokenWeight,
  index,
  selectedTokens,
  onTokenSelection,
  onRemove,
  onTokenWeightChange,
  onLock,
  onUnlock,
}: Props) {
  const [focused, setFocused] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  return (
    <div className="my-4">
      <div
        className={cn(
          "flex flex-row justify-between gap-3 rounded-lg border border-input bg-input p-3 pr-6",
          focused && "border-border",
        )}
      >
        {tokenWeight.token ? (
          <Button
            className="hover:text-primary-text flex shrink-0 gap-2 hover:bg-transparent"
            variant="ghost"
            onClick={() => setOpen(true)}
          >
            <Image
              width={24}
              height={24}
              src={`/icons/${tokenWeight.token?.symbol.toLowerCase()}.jpg`}
              alt={tokenWeight.token?.symbol ?? ""}
              className="rounded-full"
            />
            {tokenWeight.token?.symbol}
            <Icons.chevronDown className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            className="hover:text-primary-text flex shrink-0 gap-2 hover:bg-transparent"
            variant="ghost"
            onClick={() => setOpen(true)}
          >
            Select Token <Icons.chevronDown className="h-4 w-4" />
          </Button>
        )}
        <Input
          type="number"
          step="any"
          min="0"
          placeholder="0.0"
          className="w-100 grow border-0 p-0 text-right text-lg outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={tokenWeight.weight > 0 ? tokenWeight.weight : ""}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          onChange={(e) => {
            onTokenWeightChange(index, Number(e.target.value));
          }}
        />
        <Button
          variant="ghost"
          className="rounded-full p-0 hover:text-blue-500"
          onClick={() => (tokenWeight.locked ? onUnlock(index) : onLock(index))}
        >
          {tokenWeight.locked ? (
            <Icons.lock className="h-4 w-4 text-blue-500" />
          ) : (
            <Icons.unlock className="h-4 w-4 " />
          )}
        </Button>
        <Button
          variant="ghost"
          className="rounded-full p-0 hover:text-red-500"
          onClick={() => onRemove(index)}
        >
          <Icons.trash className="h-4 w-4 " />
        </Button>
      </div>
      <TokenDialog
        open={open}
        onSelectedToken={(token: Token) => onTokenSelection(token, index)}
        setOpen={setOpen}
        selectedTokens={selectedTokens}
      />
    </div>
  );
}
