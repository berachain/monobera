import React from "react";
import type { Token } from "@bera/berajs";
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
    <SelectToken
      token={token}
      onTokenSelection={handleTokenSelection}
      selectedTokens={selectedTokens}
      selectable={selectable}
      filter={[bgtTokenAddress, nativeTokenAddress]}
      filteredTokenTags={["debt", "aToken", "rewardToken", "aHONEY"]}
      filteredSymbols={["BGT"]}
      className="w-full max-w-full"
      btnClassName="rounded-sm justify-between p-6"
    />
  );
}
