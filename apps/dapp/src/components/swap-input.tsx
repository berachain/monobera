import React from "react";
import Image from "next/image";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Progress } from "@bera/ui/progress";
import { useReadLocalStorage } from "usehooks-ts";

import { LOCAL_STORAGE_KEYS, type Wallet } from "~/utils/constants";
import { type Token } from "~/assets/tokens";

type Props = {
  selected: Token;
  setChoosing: (choosing: boolean) => void;
  amount: number;
  setAmount: (amount: number) => void;
  setOpen: (open: boolean) => void;
  hideBalance?: boolean;
};

export default function SwapInput({
  selected,
  setChoosing,
  amount,
  setAmount,
  setOpen,
  hideBalance = false,
}: Props) {
  const [focused, setFocused] = React.useState(false);
  const wallet = useReadLocalStorage<Wallet>(LOCAL_STORAGE_KEYS.WALLET);
  const tokenBalance = wallet?.tokens.find(
    (t) => t.address === selected.address,
  )?.balance;
  const exceeding = tokenBalance && amount > tokenBalance;
  const progress = tokenBalance && ((amount / tokenBalance) * 100) | 0;
  return (
    <>
      <div
        className={cn(
          "flex flex-row flex-wrap justify-between gap-3 rounded-lg border border-input bg-input p-3",
          focused && "border-border",
        )}
      >
        <Button
          className="hover:text-primary-text flex shrink-0 gap-2 hover:bg-transparent"
          variant="ghost"
          onClick={() => {
            setOpen(true);
            setChoosing(true);
          }}
        >
          <Image
            width={24}
            height={24}
            src={selected.logoURI}
            alt={selected.name}
            className="rounded-full"
          />
          {selected.symbol}
          <Icons.chevronDown className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          step="any"
          min="0"
          placeholder="0.0"
          className="w-100 grow border-0 p-0 text-right text-lg outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={amount > 0 ? amount : ""}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        />
        {wallet?.address ? (
          <div className="w-full pl-4">
            {!hideBalance && exceeding ? (
              <p className="text-destructive">
                You&apos;re exceeding your balance
              </p>
            ) : (
              <div className="flex justify-between">
                <p>Balance: {tokenBalance}</p>
                <p>${tokenBalance && tokenBalance * 0.69}</p>
              </div>
            )}
            {!hideBalance && amount ? (
              <Progress
                value={exceeding ? 100 : progress}
                className={cn("h-2", exceeding && "bg-destructive")}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}
