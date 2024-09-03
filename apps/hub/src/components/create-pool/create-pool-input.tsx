import React from "react";
import { POOLID, type Token } from "@bera/berajs";
import { bgtTokenAddress, nativeTokenAddress } from "@bera/config";
import { SelectToken } from "@bera/shared-ui";
import { ITokenWeight } from "~/hooks/useCreateBalancerPool";
import { Icons } from "@bera/ui/icons";
import { Button } from "@bera/ui/button";
import { Input } from "@bera/ui/input";

type Props = {
  tokenWeight: ITokenWeight;
  selectedTokens: Token[];
  selectable?: boolean;
  poolIdx: number;
  index: number;
  onTokenSelection: (token: Token | undefined) => void;
  onRemove: (index: number) => void;
  onTokenRateProviderChange: (index: number, rateProvider: string) => void;
  onTokenCacheTimeChange: (index: number, cacheTime: number) => void;
};

export default function CreatePoolInput({
  tokenWeight,
  selectedTokens,
  index,
  onTokenSelection,
  onTokenCacheTimeChange,
  onTokenRateProviderChange,
  onRemove,
  selectable = true,
  poolIdx,
}: Props) {
  const handleTokenSelection = (token: Token | undefined) => {
    onTokenSelection(token);
  };
  return (
    <div className="flex flex-row p-2 boder-border border rounded-lg w-full items-center justify-between">
      <SelectToken
        token={tokenWeight.token}
        onTokenSelection={handleTokenSelection}
        selectedTokens={selectedTokens}
        selectable={selectable}
        filter={[bgtTokenAddress, nativeTokenAddress]}
        filteredTokenTags={["debt", "aToken", "rewardToken", "aHONEY"]}
        filteredSymbols={["BGT"]}
        className="w-fit max-w-full"
        btnClassName="rounded-sm justify-between p-6 border-none"
      />
      <div className="flex flex-row w-full items-center justify-end gap-1">
        {poolIdx === POOLID.WEIGHTED && (
          <span className="font-medium">{tokenWeight.weight}%</span>
        )}
        {/* {tokenWeight.locked ? (
          <Button variant="ghost" size="sm" onClick={() => onUnlock(index)}>
            <Icons.lock className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="ghost" size="sm" onClick={() => onLock(index)}>
            <Icons.unlock className="w-4 h-4" />
          </Button>
        )} */}
        {poolIdx === POOLID.METASTABLE && (
          <div className="flex flex-row gap-1">
            <Input
              value={tokenWeight.rateProvider}
              placeholder="rate provider"
              className="bg-transparent"
              onChange={(e: any) =>
                onTokenRateProviderChange(index, e.target.value)
              }
            />
            <Input
              value={tokenWeight.cacheTime}
              placeholder="cache time"
              className="bg-transparent"
              type="number-enhanced"
              allowMinus={false}
              allowDecimal={false}
              onChange={(e: any) =>
                onTokenCacheTimeChange(index, e.target.value)
              }
            />
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={() => onRemove(index)}>
          <Icons.trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
