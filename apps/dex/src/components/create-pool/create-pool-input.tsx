import React from "react";
import { type Token } from "@bera/berajs";
import { bgtTokenAddress, nativeTokenAddress } from "@bera/config";
import { SelectToken } from "@bera/shared-ui";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  tokenWeight: ITokenWeight;
  index: number;
  selectedTokens: Token[];
  selectable?: boolean;
  onTokenSelection: (token: Token | undefined, index: number) => void;
  isQuoteAsset: boolean;
};

export default function CreatePoolInput({
  tokenWeight,
  index,
  selectedTokens,
  onTokenSelection,
  selectable = true,
  isQuoteAsset = true,
}: Props) {
  const handleTokenSelection = (token: Token | undefined) => {
    onTokenSelection(token, index);
  };
  return (
    <li className={"flex flex-row items-center justify-between gap-1 px-4"}>
      <SelectToken
        token={tokenWeight.token}
        onTokenSelection={handleTokenSelection}
        selectedTokens={selectedTokens}
        selectable={selectable}
        filter={[bgtTokenAddress, nativeTokenAddress]}
      />
    </li>
  );
}
