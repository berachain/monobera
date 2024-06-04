import { useState } from "react";
import {
  BERA_VAULT_REWARDS_ABI,
  type Gauge,
  type Token,
  TransactionActionType,
  usePollWalletBalances,
} from "@bera/berajs";
import { TokenInput, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import BigNumber from "bignumber.js";
import { parseUnits } from "viem";

import { Info } from "./info";

export const DepositLP = ({
  lpToken,
  gauge,
}: {
  lpToken: Token;
  gauge: Gauge;
}) => {
  const { useSelectedWalletBalance, isLoading } = usePollWalletBalances({
    externalTokenList: [lpToken],
  });
  const balance = useSelectedWalletBalance(lpToken.address);
  const [depositAmount, setDepositAmount] = useState<`${number}`>("0");
  const validAmount =
    BigNumber(depositAmount).gt(0) &&
    BigNumber(depositAmount).lte(balance?.formattedBalance ?? "0");

  const { write, ModalPortal } = useTxn({
    message: "Deposit LP Tokens",
    actionType: TransactionActionType.ADD_LIQUIDITY,
    onSuccess: () => {},
  });

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
      <Button
        disabled={!validAmount}
        onClick={() =>
          write({
            address: gauge.vaultAddress,
            abi: BERA_VAULT_REWARDS_ABI,
            functionName: "stake",
            params: [parseUnits(depositAmount, lpToken.decimals)],
          })
        }
      >
        Deposit
      </Button>
      {ModalPortal}
    </div>
  );
};
