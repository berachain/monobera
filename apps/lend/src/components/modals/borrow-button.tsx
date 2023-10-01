import { useEffect, useState } from "react";
import Image from "next/image";
import { formatter, useBeraJs, type Token } from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import { Tooltip, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { formatUnits, parseUnits } from "viem";

import { lendPoolImplementationABI } from "~/hooks/abi";
import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";

export default function BorrowBtn({
  token,
  disabled = false,
  variant = "primary",
}: {
  token: Token;
  disabled?: boolean;
  variant?: "primary" | "outline";
}) {
  const { isReady } = useBeraJs();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const { write, isLoading, ModalPortal, isSuccess } = useTxn({
    message: `Borrowing ${amount} ${token.symbol}`,
  });
  useEffect(() => setOpen(false), [isSuccess]);
  return (
    <>
      {ModalPortal}
      <Button
        onClick={() => setOpen(true)}
        className="w-fit text-sm leading-5"
        disabled={disabled || isLoading || !isReady}
        variant={variant}
      >
        {isLoading ? "Loading" : "Borrow"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-fit p-8">
          <BorrowModalContent {...{ token, amount, setAmount, write }} />
        </DialogContent>
      </Dialog>
    </>
  );
}

const BorrowModalContent = ({
  token,
  amount,
  setAmount,
  write,
}: {
  token: Token;
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const maxBorrowAmout = 1000;

  const [apySelected, setApySelected] = useState<"stable" | "variable">(
    "stable",
  );
  const { account } = useBeraJs();
  const { useSelectedReserveData } = usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(token.address);
  const apyOptions = {
    stable:
      (Number(formatUnits(reserveData.currentStableBorrowRate, 18)) * 100 ??
        0) * 100,
    variable:
      (Number(formatUnits(reserveData.currentVariableBorrowRate, 18)) ?? 0) *
      100,
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Borrow</div>
      <Image
        src={"/supply.png"}
        alt="supply-img"
        className="h-36 w-96"
        width={100}
        height={100}
      />
      <Tabs
        defaultValue={apySelected}
        onValueChange={(value: string) =>
          setApySelected(value as "stable" | "variable")
        }
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={"stable"}>
            Stable APY: {apyOptions.stable.toFixed(2)} %
          </TabsTrigger>
          <TabsTrigger value={"variable"}>
            Variable APY: {apyOptions.variable.toFixed(2)} %
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-sm font-semibold leading-tight">
          Amount <Tooltip text="amount" />{" "}
        </div>
        <Input
          type="number"
          id="forum-discussion-link"
          placeholder="0.0"
          endAdornment={token.symbol}
          value={amount}
          onChange={(e) =>
            setAmount(
              Number(e.target.value) === 0 ? undefined : Number(e.target.value),
            )
          }
        />
        <div className="flex h-3 w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
          <Icons.wallet className="relative inline-block h-3 w-3 " />
          {maxBorrowAmout}
          <span
            className="underline hover:cursor-pointer"
            onClick={() => setAmount(maxBorrowAmout)}
          >
            MAX
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground">LTV Health Ratio</div>
          <div className="">0 {"<->"} 1.69</div>
        </div>
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground">Estimated Value</div>
          <div className="">${formatter.format(amount ?? 0 * 1)}</div>
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground">Variable Borrow APY</div>
          <div className="text-warning-foreground">
            {apyOptions[apySelected]}%
          </div>
        </div>
      </div>

      <Button
        disabled={!amount || amount === 0 || amount > maxBorrowAmout}
        onClick={() => {
          write({
            address: lendPoolImplementationAddress,
            abi: lendPoolImplementationABI,
            functionName: "borrow",
            params: [
              token.address,
              parseUnits(`${Number(amount ?? 0)}`, token.decimals),
              apySelected === "stable" ? 1 : 2,
              parseUnits("0", token.decimals),
              account,
            ],
          });
        }}
      >
        {amount === 0 ? "Enter Amount" : "Borrow"}
      </Button>
    </div>
  );
};
