import React from "react";
import { type Token } from "@bera/berajs";
import { bgtTokenAddress, nativeTokenAddress } from "@bera/config";
import { SelectToken } from "@bera/shared-ui";

type Props = {
  token: Token | undefined;
  selectedTokens: Token[];
  selectable?: boolean;
  onTokenSelection: (token: Token | undefined) => void;
};

export default function CreatePoolInput({
  token,
  selectedTokens,
  onTokenSelection,
  selectable = true,
}: Props) {
  const handleTokenSelection = (token: Token | undefined) => {
    onTokenSelection(token);
  };
  return (
    <li className={"flex flex-row items-center justify-between gap-1 px-4"}>
      <SelectToken
        token={token}
        onTokenSelection={handleTokenSelection}
        selectedTokens={selectedTokens}
        selectable={selectable}
        filter={[bgtTokenAddress, nativeTokenAddress]}
      />
    </li>
  );
}
