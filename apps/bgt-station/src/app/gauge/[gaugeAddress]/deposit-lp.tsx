import { useState } from "react";
import { TokenInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";

import { Info } from "./info";

export const DepositLP = () => {
  const [depositAmount, setDepositAmount] = useState<`${number}`>("0");
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
            selected={undefined}
            amount={depositAmount}
            balance={"420.69"}
            hidePrice
            showExceeding={true}
            selectable={false}
            setAmount={(amount) => setDepositAmount(amount as `${number}`)}
          />
        </div>
      </div>
      <Info />
      <Button>Deposit</Button>
    </div>
  );
};
