import React from "react";
import { type Token } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import SelectToken from "~/components/select-token";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

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

  const handleTokenSelection = (token: Token) => {
    onTokenSelection(token, index);
  };
  return (
    <div className="my-4">
      <div
        className={cn(
          "flex flex-row items-center justify-between gap-3 rounded-lg border border-input bg-input px-4",
          focused && "border-border",
        )}
      >
        <SelectToken
          token={tokenWeight.token}
          onTokenSelection={handleTokenSelection}
          selectedTokens={selectedTokens}
        />
        <Input
          type="number"
          step="any"
          min="0"
          placeholder="0.0"
          className="w-full grow border-0 p-0 text-right text-lg outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
    </div>
  );
}
