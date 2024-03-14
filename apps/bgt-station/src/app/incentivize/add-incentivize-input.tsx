import React, { useState } from "react";
import { useBeraJs, useTokenHoneyPrice, type Token } from "@bera/berajs";
import { TokenInput } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

import { IncentivizeToken } from "~/hooks/useCreateIncentivizeTokens";

type Props = {
  selectedToken: IncentivizeToken;
  index: number;
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
}: Props) {
  const handleTokenSelection = (token: Token | undefined) => {
    onTokenSelection(token, index);
  };
  const { data: tokenPrice } = useTokenHoneyPrice(
    selectedToken?.token?.address,
  );

  // TODO: add exceeding and typing state
  const [exceedingBalance, setExceedingBalance] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { isConnected } = useBeraJs();
  return (
    <ul className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-grow items-center">
        <TokenInput
          selected={selectedToken.token}
          onTokenSelection={handleTokenSelection}
          amount={selectedToken.amount ?? ""}
          price={Number(tokenPrice)}
          showExceeding={true}
          setIsTyping={(isTyping: boolean) => setIsTyping(isTyping)}
          onExceeding={(isExceeding: boolean) =>
            setExceedingBalance(isExceeding)
          }
          setAmount={(amount) => {
            onTokenAmountChange(index, Number(amount));
          }}
        />
      </div>

      <div
        className={cn(
          "flex max-w-6 items-center justify-end pr-3",
          isConnected && selectedToken.token && "mb-5",
        )}
      >
        <Button
          variant="ghost"
          className="rounded-full p-0 hover:bg-transparent hover:text-red-500"
          onClick={() => onRemove(index)}
        >
          <Icons.close className="h-4 w-4 " />
        </Button>
      </div>
    </ul>
  );
}
