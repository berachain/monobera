import React, { useMemo, useState } from "react";
import {
  useBeraJs,
  usePollWalletBalances,
  useSubgraphTokenInformation,
  type Token,
} from "@bera/berajs";
import { formatUsd } from "@bera/berajs/utils";
import { TokenIcon } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { getSafeNumber } from "~/utils/getSafeNumber";

type Props = {
  token: Token;
  disabled: boolean;
  tokenAmount: string;
  onTokenBalanceChange: (amount: string) => void;
};

export default function CreatePoolInitialLiquidityInput({
  token,
  tokenAmount,
  disabled,
  onTokenBalanceChange,
}: Props) {
  const { useSelectedWalletBalance } = usePollWalletBalances();
  const tokenBalanceData = useSelectedWalletBalance(token?.address ?? "0x");
  const [exceeding, setExceeding] = useState<boolean | undefined>(undefined);
  const tokenBalance = Number(tokenBalanceData?.formattedBalance || 0);

  const { isConnected } = useBeraJs();

  const { data: tokenHoneyPrice } = useSubgraphTokenInformation({
    tokenAddress: token?.address,
  });

  useMemo(() => {
    if (tokenBalanceData) {
      if (
        getSafeNumber(tokenBalanceData.formattedBalance) <
        getSafeNumber(tokenAmount)
      ) {
        setExceeding(true);
      } else {
        setExceeding(false);
      }
    }
  }, [tokenBalanceData, tokenAmount]);
  return (
    <li className={"flex w-full flex-col  items-center p-3"}>
      <div className="flex w-full flex-row justify-between">
        <Button
          className="flex h-fit w-fit items-center gap-1 self-start border-border bg-background text-base text-foreground shadow"
          variant="secondary"
        >
          <>
            <TokenIcon address={token?.address ?? ""} symbol={token?.symbol} />
            {token?.symbol}
          </>
        </Button>
        <Input
          disabled={disabled}
          type="number"
          step="any"
          min="0"
          placeholder="0"
          className={cn(
            "w-full grow border-0 bg-transparent p-0 text-right text-lg font-semibold outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0",
            exceeding && "text-destructive-foreground",
          )}
          value={tokenAmount}
          onChange={(e) => {
            onTokenBalanceChange(e.target.value);
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
                className="cursor-pointer select-none self-start text-xs text-muted-foreground hover:underline"
                onClick={() => {
                  !disabled && onTokenBalanceChange(tokenBalance.toString());
                }}
              >
                MAX
              </p>
            </div>
            <div className="flex flex-row gap-1">
              <p className="self-center p-0 text-xs text-muted-foreground">
                {tokenAmount !== "0" &&
                  tokenAmount !== "" &&
                  formatUsd(
                    getSafeNumber(tokenAmount) *
                      Number(tokenHoneyPrice?.usdValue ?? 0),
                  )}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}
