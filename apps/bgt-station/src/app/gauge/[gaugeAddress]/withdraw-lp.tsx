import { useState } from "react";
import {
  BERA_VAULT_REWARDS_ABI,
  Gauge,
  Token,
  TransactionActionType,
  usePollVaultsInfo,
} from "@bera/berajs";
import { TokenInput, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Slider } from "@bera/ui/slider";
import BigNumber from "bignumber.js";
import { parseUnits } from "viem";

import { Info } from "./info";

export const WithdrawLP = ({
  lpToken,
  gauge,
}: {
  lpToken: Token;
  gauge: Gauge;
}) => {
  const [withdrawAmount, setWithdrawAmount] = useState<`${number}`>("0");
  const [withdrawPercent, setWithdrawPercent] = useState<number>(0);
  const { data, isLoading, refresh } = usePollVaultsInfo({
    vaultAddress: gauge.vaultAddress,
  });
  const validAmount =
    BigNumber(withdrawAmount).gt(0) &&
    BigNumber(withdrawAmount).lte(data?.balance ?? "0");

  const { write, ModalPortal } = useTxn({
    message: "Withdraw LP Tokens",
    actionType: TransactionActionType.WITHDRAW_LIQUIDITY,
    onSuccess: () => {},
  });
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
            selected={lpToken}
            amount={withdrawAmount}
            balance={data?.balance ?? "0"}
            hidePrice
            showExceeding={true}
            selectable={false}
            setAmount={(amount: string) =>
              setWithdrawAmount(amount as `${number}`)
            }
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
      <Button
        disabled={!validAmount}
        onClick={() =>
          write({
            address: gauge.vaultAddress,
            abi: BERA_VAULT_REWARDS_ABI,
            functionName: "withdraw",
            params: [parseUnits(withdrawAmount, lpToken.decimals)],
          })
        }
      >
        Withdraw
      </Button>
      {ModalPortal}
    </div>
  );
};
