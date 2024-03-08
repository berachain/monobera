import React from "react";
import { useBeraJs, useTokenHoneyPrice, type Token } from "@bera/berajs";
import { bgtTokenAddress } from "@bera/config";
import { SelectToken, TokenInput } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";

import { IncentivizeToken } from "~/hooks/useCreateIncentivizeTokens";

type Props = {
  selectedToken: IncentivizeToken;
  index: number;
  selectable?: boolean;
  onTokenSelection: (token: Token | undefined, index: number) => void;
  onRemove: (index: number) => void;
  onTokenAmountChange: (index: number, amount: number) => void;
};

export default function AddIncentivizeToken({
  selectedToken,
  index,
  onTokenSelection,
  onRemove,
  onTokenAmountChange,
  selectable = true,
}: Props) {
  const handleTokenSelection = (token: Token | undefined) => {
    onTokenSelection(token, index);
  };
  console.log(selectedToken, "selected token");
  const { data: tokenPrice } = useTokenHoneyPrice(
    selectedToken?.token?.address,
  );
  return (
    <ul className={"flex flex-row items-center justify-between gap-1 px-4"}>
      <TokenInput
        selected={selectedToken.token}
        onTokenSelection={handleTokenSelection}
        amount={selectedToken.amount ?? ""}
        price={Number(tokenPrice)}
        showExceeding={true}
        // setIsTyping={(isTyping: boolean) => setIsTyping(isTyping)}
        // onExceeding={(isExceeding: boolean) => setExceedingBalance(isExceeding)}
        setAmount={(amount) => {
          onTokenAmountChange(index, Number(amount));
        }}
      />
      <Button
        variant="ghost"
        className="rounded-full p-0 hover:bg-transparent hover:text-red-500"
        onClick={() => onRemove(index)}
      >
        <Icons.close className="h-4 w-4 " />
      </Button>
    </ul>
  );
}
