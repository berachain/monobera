import React from "react";
import {
  useBeraJs,
  usePollAssetWalletBalance,
  useSelectedAssetWalletBalance,
} from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
  tokenWeight: ITokenWeight;
  index: number;
  onTokenBalanceChange: (index: number, amount: number) => void;
};

export default function CreatePoolInitialLiquidityInput({
  tokenWeight,
  index,
  onTokenBalanceChange,
}: Props) {
  usePollAssetWalletBalance();
  const tokenBalance = Number(
    useSelectedAssetWalletBalance(tokenWeight.token?.address ?? "")
      ?.formattedBalance || 0,
  );
  const exceeding = tokenWeight.initialLiquidity > tokenBalance;

  const { account } = useBeraJs();

  const { isConnected } = useBeraJs();

  return (
    <li className={"flex w-full flex-col  items-center p-2"}>
      <div className="flex w-full flex-row justify-between">
        <Button
          className="flex h-fit w-fit items-center gap-1 self-start p-2"
          variant="outline"
        >
          <>
            <TokenIcon token={tokenWeight.token} />
            {tokenWeight.token?.symbol}
            <p className="text-sm text-muted-foreground">
              {tokenWeight.weight}%
            </p>
          </>
        </Button>
        <Input
          type="number"
          step="any"
          min="0"
          placeholder="0.0"
          className="w-full grow border-0 p-0 text-right text-lg outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={
            tokenWeight.initialLiquidity > 0 ? tokenWeight.initialLiquidity : ""
          }
          onChange={(e) => {
            onTokenBalanceChange(index, Number(e.target.value));
          }}
        />
      </div>
      {isConnected && tokenBalance !== 0 ? (
        <div className="mt-1 h-fit w-full cursor-default">
          <div className="flex w-full items-center justify-between gap-1">
            <div className="flex w-fit flex-row items-center justify-start gap-1 pl-1">
              <Icons.wallet className="h-3 w-3 text-muted-foreground" />
              <p className="w-fit max-w-[48px] overflow-hidden truncate p-0 text-xs text-muted-foreground sm:max-w-[60px]">
                {tokenBalance ? tokenBalance : "0"}
              </p>
              <p
                className="cursor-pointer self-start text-xs text-muted-foreground hover:underline"
                onClick={() => {
                  onTokenBalanceChange(index, tokenBalance);
                }}
              >
                MAX
              </p>
            </div>
            <div className="flex flex-row gap-1">
              <p className="self-center p-0 text-xs text-muted-foreground">
                {/* TODO: change to actual values */}
                {/* {amount !== 0 && formatUsd((amount * 1).toFixed(2))} */}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}
