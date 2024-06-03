import { useState } from "react";
import { Token, usePollWalletBalances } from "@bera/berajs";
import { TokenInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import BigNumber from "bignumber.js";

import { Info } from "./info";

export const DepositLP = ({ lpToken }: { lpToken: Token }) => {
  const { useSelectedWalletBalance, isLoading } = usePollWalletBalances({
    externalTokenList: [lpToken],
  });
  const balance = useSelectedWalletBalance(lpToken.address);
  const [depositAmount, setDepositAmount] = useState<`${number}`>("0");
  const validAmount =
    BigNumber(depositAmount).gt(0) &&
    BigNumber(depositAmount).lte(balance?.formattedBalance ?? "0");
  return (
    <div className="flex flex-col gap-4 rounded-md border border-border p-4">
      <div>
        <div className="text-lg font-semibold leading-7">
          Deposit Receipt Tokens
        </div>
        <div className="mt-1 text-sm leading-5">
          Deposit you receipt token to earn BGT rewards
        </div>
        <div className="mt-4 rounded-md border border-border bg-muted">
          <TokenInput
            selected={lpToken}
            amount={depositAmount}
            balance={balance?.formattedBalance}
            hidePrice
            showExceeding={true}
            selectable={false}
            setAmount={(amount: string) =>
              setDepositAmount(amount as `${number}`)
            }
          />
        </div>
      </div>
      <Info />
      <Button disabled={!validAmount}>Deposit</Button>
    </div>
  );
};
