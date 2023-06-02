import React from "react";
import Image from "next/image";
import { useBeraJs, useSelectedAssetWalletBalance } from "@bera/berajs";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Progress } from "@bera/ui/progress";

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
  const [focused, setFocused] = React.useState(false);
  const tokenBalance = Number(
    useSelectedAssetWalletBalance(tokenWeight.token?.address ?? "")?.balance ||
      0,
  );
  const exceeding = tokenWeight.initialLiquidity > tokenBalance;
  const progress =
    tokenBalance && ((tokenWeight.initialLiquidity / tokenBalance) * 100) | 0;

  const { account } = useBeraJs();
  return (
    <div className="my-4">
      <div
        className={cn(
          "flex flex-row justify-between gap-3 rounded-lg border border-input bg-input p-3 pr-6",
          focused && "border-border",
        )}
      >
        <Button
          className="hover:text-primary-text flex shrink-0 gap-2 hover:bg-transparent"
          variant="ghost"
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
            onTokenBalanceChange(index, Number(e.target.value));
          }}
        />
        {account ? (
          <div className="w-full pl-4">
            <div className="flex items-center justify-between">
              <p>
                <Button
                  variant="link"
                  className="text-md text-default h-8 p-0"
                  onClick={() => onTokenBalanceChange(index, tokenBalance || 0)}
                >
                  Balance: {tokenBalance}
                </Button>
              </p>
              <p>${tokenBalance && tokenBalance * 0.69}</p>
            </div>
            <Progress
              value={progress}
              className={cn("h-2", exceeding && "bg-destructive")}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
