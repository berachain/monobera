import React from "react";
import { useBeraJs, type Token } from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { SelectToken } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { IncentivizeToken } from "~/hooks/useCreateIncentivizeTokens";

type Props = {
  incentivizeToken: IncentivizeToken;
  index: number;
  selectedTokens: Token[];
  selectable?: boolean;
  onTokenSelection: (token: Token | undefined, index: number) => void;
  onRemove: (index: number) => void;
  onTokenAmountChange: (index: number, amount: number) => void;
};

export default function AddIncentivizeToken({
  incentivizeToken,
  index,
  selectedTokens,
  onTokenSelection,
  onRemove,
  onTokenAmountChange,
  selectable = true,
}: Props) {
  const handleTokenSelection = (token: Token | undefined) => {
    onTokenSelection(token, index);
  };
  const { isConnected } = useBeraJs();
  return (
    <li className={"flex flex-row items-center justify-between gap-1 px-4"}>
      <SelectToken
        token={incentivizeToken.token}
        onTokenSelection={handleTokenSelection}
        selectedTokens={selectedTokens}
        selectable={selectable}
        filter={[bgtTokenAddress]}
      />
      <Input
        type="number"
        step="any"
        min="0"
        placeholder="0.0"
        className="w-full grow self-end border-0 bg-transparent p-0 text-right text-lg font-semibold outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        value={
          Number(incentivizeToken.amount) > 0 ? incentivizeToken.amount : ""
        }
        onChange={(e) => {
          onTokenAmountChange(index, Number(e.target.value));
        }}
      />
      <Button
        variant="ghost"
        className="rounded-full p-0 hover:bg-transparent hover:text-red-500"
        onClick={() => onRemove(index)}
      >
        <Icons.close className="h-4 w-4 " />
      </Button>
      {isConnected && selected && tokenBalance !== 0 ? (
        <div className="mb-4 h-fit w-full cursor-default">
          {hideBalance ? null : (
            <div className="mt-[-10px] flex w-full items-center justify-between gap-1">
              <div className="flex flex-row items-center justify-start gap-1 px-1">
                <Icons.wallet className="h-3 w-3 text-muted-foreground" />
                <p className="w-fit max-w-[60px] overflow-hidden truncate p-0 text-xs text-muted-foreground">
                  {tokenBalance ? tokenBalance : "0"}
                </p>
                {!hideMax && (
                  <p
                    className="cursor-pointer select-none text-xs text-muted-foreground underline hover:text-foreground"
                    onClick={() => {
                      setAmount &&
                        tokenBalance !== "" &&
                        tokenBalance !== "0" &&
                        setAmount(tokenBalance?.toString() ?? "");
                    }}
                  >
                    MAX
                  </p>
                )}
              </div>
              <div className="flex flex-row gap-1">
                {!hidePrice && (
                  <p className="self-center p-0 text-xs text-muted-foreground">
                    {safeNumberAmount !== 0 &&
                      !Number.isNaN(safeNumberAmount) &&
                      formatUsd((safeNumberAmount * price).toFixed(2))}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </li>
  );
}
