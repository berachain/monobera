import React from "react";
import {
  useBeraJs,
  usePollAssetWalletBalance,
  useTokenHoneyPrice,
} from "@bera/berajs";
import { TokenIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";
import { formatUsd } from "@bera/berajs/src/utils/formatUsd";
import { getSafeNumber } from "~/utils/getSafeNumber";

type Props = {
  tokenWeight: ITokenWeight;
  disabled: boolean;
  onTokenBalanceChange: (amount: string) => void;
};

export default function CreatePoolInitialLiquidityInput({
  tokenWeight,
  disabled,
  onTokenBalanceChange,
}: Props) {
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { data: token } = useSelectedAssetWalletBalance(
    tokenWeight.token?.address ?? "",
  );
  const tokenBalance = Number(token?.formattedBalance || 0);

  const { isConnected } = useBeraJs();

  const { data: tokenHoneyPrice } = useTokenHoneyPrice(
    tokenWeight?.token?.address,
  );

  return (
    <li className={"flex w-full flex-col  items-center p-3"}>
      <div className="flex w-full flex-row justify-between">
        <Button
          className="flex h-fit w-fit items-center gap-1 self-start border-border bg-background text-base text-foreground shadow"
          variant="secondary"
        >
          <>
            <TokenIcon address={tokenWeight.token?.address ?? ""} />
            {tokenWeight.token?.symbol}
          </>
        </Button>
        <Input
          disabled={disabled}
          type="number"
          step="any"
          min="0"
          placeholder="0"
          className="w-full grow border-0 bg-transparent p-0 text-right text-lg font-semibold outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={tokenWeight.initialLiquidity}
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
                className="cursor-pointer self-start text-xs text-muted-foreground hover:underline"
                onClick={() => {
                  onTokenBalanceChange(tokenBalance.toString());
                }}
              >
                MAX
              </p>
            </div>
            <div className="flex flex-row gap-1">
              <p className="self-center p-0 text-xs text-muted-foreground">
                {tokenWeight.initialLiquidity !== "0" &&
                  tokenWeight.initialLiquidity !== "" &&
                  formatUsd(
                    getSafeNumber(tokenWeight.initialLiquidity) *
                      (tokenHoneyPrice ?? 0),
                  )}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </li>
  );
}
