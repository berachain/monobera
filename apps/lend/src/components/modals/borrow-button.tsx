import { useState } from "react";
import Image from "next/image";
import { formatter, useBeraJs } from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import { Tooltip, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";
import { parseUnits } from "viem";

import { type Asset } from "~/utils/types";
import { lendPoolImplementationABI } from "~/hooks/abi";

export default function BorrowBtn({
  asset,
  disabled = false,
  variant = "primary",
}: {
  asset: Asset;
  disabled?: boolean;
  variant?: "primary" | "outline";
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const { write, isLoading, ModalPortal } = useTxn({
    message: `Borrowing ${amount} ${asset.symbol}`,
  });
  return (
    <>
      {ModalPortal}
      <Button
        onClick={() => setOpen(true)}
        className="w-fit text-sm leading-5"
        disabled={disabled || isLoading}
        variant={variant}
      >
        {isLoading ? "Loading" : "Borrow"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-fit p-8">
          <BorrowModalContent {...{ asset, amount, setAmount, write }} />
        </DialogContent>
      </Dialog>
    </>
  );
}

const BorrowModalContent = ({
  asset,
  amount,
  setAmount,
  write,
}: {
  asset: Asset;
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const maxBorrowAmout = 1000;
  const apyOptions = {
    stable: (asset.borrowStableAPR ?? 0) * 100,
    variable: (asset.borrowVariableAPR ?? 0) * 100,
  };
  const [apySelected, setApySelected] = useState<"stable" | "variable">(
    "stable",
  );
  const { account } = useBeraJs();
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
            Stable APY: {apyOptions.stable.toPrecision(4)}%
          </TabsTrigger>
          <TabsTrigger value={"variable"}>
            Variable APY: {apyOptions.variable.toPrecision(4)}%
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
          endAdornment={asset.symbol}
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
          {/* i didnt make this cause design doesnt make sense 2 me */}
        </div>
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground">Estimated Value</div>
          <div className="">
            ${formatter.format(amount ?? 0 * asset.dollarValue ?? 1)}
          </div>
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
              asset.asset_address,
              parseUnits(`${Number(amount ?? 0)}`, asset.decimals),
              apySelected === "stable" ? 1 : 2,
              parseUnits("0", asset.decimals),
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
