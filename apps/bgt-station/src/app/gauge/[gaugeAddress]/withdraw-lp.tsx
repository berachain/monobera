import { useState } from "react";
import { Token, usePollWalletBalances } from "@bera/berajs";
import { TokenInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Slider } from "@bera/ui/slider";
import BigNumber from "bignumber.js";
import { Info } from "./info";

export const WithdrawLP = ({ lpReceiptToken }: { lpReceiptToken: Token }) => {
  const [withdrawAmount, setWithdrawAmount] = useState<`${number}`>("0");
  const [withdrawPercent, setWithdrawPercent] = useState<number>(0);
  const { useSelectedWalletBalance, isLoading } = usePollWalletBalances({
    externalTokenList: [lpReceiptToken],
  });
  const balance = useSelectedWalletBalance(lpReceiptToken.address);
  const validAmount =
    BigNumber(withdrawAmount).gt(0) &&
    BigNumber(withdrawAmount).lte(balance?.formattedBalance ?? "0");
  return (
    <div className="flex flex-col gap-4 rounded-md border border-border p-4">
      <div>
        <div className="text-lg font-semibold leading-7">
          Withdraw Receipt Tokens
        </div>
        <div className="mt-1 text-sm leading-5">
          Withdrawing your receipt tokens will also claim your outstanding BGT
          rewards
        </div>
        <div className="mt-4 rounded-md border border-border bg-muted">
          <TokenInput
            selected={lpReceiptToken}
            amount={withdrawAmount}
            balance={balance?.formattedBalance}
            hidePrice
            showExceeding={true}
            selectable={false}
            setAmount={(amount) => setWithdrawAmount(amount as `${number}`)}
          />
        </div>
      </div>
      <div className="w-full rounded-lg border p-4">
        <div className="flex w-full flex-row items-center justify-between gap-1">
          <p className="text-sm font-semibold sm:text-lg">
            {withdrawPercent.toFixed(2)}%
          </p>
          <div className="flex flex-row gap-2">
            {[25, 50, 75, 100].map((percent) => {
              return (
                <Button
                  key={percent.toString()}
                  variant={"secondary"}
                  size={"sm"}
                  className="w-full text-foreground"
                  onClick={() => setWithdrawPercent(percent)}
                >
                  {percent.toString()}%
                </Button>
              );
            })}
          </div>
        </div>
        <Slider
          defaultValue={[0]}
          value={[withdrawPercent]}
          max={100}
          min={0}
          onValueChange={(value: number[]) => {
            setWithdrawPercent(value[0] ?? 0);
          }}
        />
      </div>
      <Info />
      <Button disabled={!validAmount}>Withdraw</Button>
    </div>
  );
};
