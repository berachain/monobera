import React from "react";
import { type Token } from "@bera/berajs";
import { bgtTokenAddress, nativeTokenAddress } from "@bera/config";
import { SelectToken } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  tokenWeight: ITokenWeight;
  index: number;
  selectedTokens: Token[];
  selectable?: boolean;
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
  selectable = true,
}: Props) {
  const handleTokenSelection = (token: Token) => {
    onTokenSelection(token, index);
  };
  return (
    <li className={"flex flex-row items-center justify-between gap-1 px-4"}>
      <SelectToken
        token={tokenWeight.token}
        onTokenSelection={handleTokenSelection}
        selectedTokens={selectedTokens}
        selectable={selectable}
        filter={[nativeTokenAddress, bgtTokenAddress]}
      />
      <Input
        type="number"
        step="any"
        min="0"
        placeholder="0.0"
        className="w-full grow self-end border-0 bg-transparent p-0 text-right text-lg font-semibold outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        value={tokenWeight.weight > 0 ? tokenWeight.weight : ""}
        onChange={(e) => {
          onTokenWeightChange(index, Number(e.target.value));
        }}
      />
      <Button
        variant="ghost"
        className="rounded-full p-0 hover:bg-transparent hover:text-blue-500"
        onClick={() => (tokenWeight.locked ? onUnlock(index) : onLock(index))}
      >
        {tokenWeight.locked ? (
          <Icons.lock className="h-4 w-4 text-blue-500" />
        ) : (
          <Icons.unlock className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
      <Button
        variant="ghost"
        className="rounded-full p-0 hover:bg-transparent hover:text-red-500"
        onClick={() => onRemove(index)}
      >
        <Icons.close className="h-4 w-4 " />
      </Button>
    </li>
  );
}
