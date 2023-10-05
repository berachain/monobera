import { useState } from "react";
import Image from "next/image";
import { formatter, useBeraJs, type Token } from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import { Tooltip, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Input } from "@bera/ui/input";
import { parseUnits } from "viem";

import { lendPoolImplementationABI } from "~/hooks/abi";

export default function WithdrawBtn({
  token,
  disabled = false,
  variant = "outline",
}: {
  token: Token & {
    source_token?: string;
  };
  disabled?: boolean;
  variant?: "primary" | "outline";
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const { write, isLoading, ModalPortal } = useTxn({
    message: `Supplying ${amount} ${token.symbol}`,
  });
  return (
    <>
      {" "}
      {ModalPortal}
      <Button
        onClick={() => setOpen(true)}
        className="w-fit text-sm leading-5"
        disabled={disabled || isLoading}
        variant={variant}
      >
        {isLoading ? "Loading" : "Withdraw"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-fit p-8">
          <WithdrawModalContent {...{ token, amount, setAmount, write }} />
        </DialogContent>
      </Dialog>
    </>
  );
}

const WithdrawModalContent = ({
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
  const userBalance = Number(token.formattedBalance ?? "0");

  const { account } = useBeraJs();

  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Withdraw</div>
      <Image
        src={"/supply.png"}
        alt="supply-img"
        className="h-36 w-96"
        width={100}
        height={100}
      />

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
          Supply balance: {userBalance.toFixed(2)}
          <span
            className="underline hover:cursor-pointer"
            onClick={() =>
              setAmount(userBalance === 0 ? undefined : userBalance)
            }
          >
            MAX
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Estimated Value</div>
          <div className=""> ${formatter.format(amount ?? 0 * 1)}</div>
        </div>
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Supply APY</div>
          <div className="text-success-foreground">
            {/* {(token.supplyAPR * 100).toFixed(2)}% */}
          </div>
        </div>
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">LTV Health Ratio</div>
          <div className="">0 {"<->"} infinite</div>
          {/* i didnt make this cause design doesnt make sense 2 me */}
        </div>
      </div>

      <Button
        disabled={!amount || amount === 0 || amount > userBalance}
        onClick={() => {
          write({
            address: lendPoolImplementationAddress,
            abi: lendPoolImplementationABI,
            functionName: "withdraw",
            params: [
              //@ts-ignore
              token.source_token ? token.source_token : token.address,
              parseUnits(`${Number(amount)}`, token.decimals),
              account,
            ],
          });
        }}
      >
        {amount === 0 ? "Enter Amount" : "Withdraw"}
      </Button>
    </div>
  );
};
