import { useEffect, useState } from "react";
import Image from "next/image";
import {
  formatter,
  useBeraJs,
  useSelectedAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import { Tooltip, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { parseUnits } from "viem";

import { lendPoolImplementationABI } from "~/hooks/abi";
import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";

export default function RepayBtn({
  token,
  disabled = false,
  variant = "outline",
}: {
  token: Token;
  disabled?: boolean;
  variant?: "primary" | "outline";
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const { write, isLoading, ModalPortal, isSuccess } = useTxn({
    message: `Supplying ${amount} ${token.symbol}`,
  });
  useEffect(() => setOpen(false), [isSuccess]);

  return (
    <>
      {ModalPortal}
      <Button
        onClick={() => setOpen(true)}
        className="w-fit text-sm leading-5"
        disabled={disabled || isLoading}
        variant={variant}
      >
        {isLoading ? "Loading" : "Repay"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-fit p-8">
          <RepayModalContent {...{ token, amount, setAmount, write }} />
        </DialogContent>
      </Dialog>
    </>
  );
}

const RepayModalContent = ({
  token,
  amount,
  setAmount,
  write,
}: {
  token: Token & {
    source_token?: string;
    debtType?: "variable" | "stable";
  };
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const debtBalance = useSelectedAssetWalletBalance(token.address);
  const tokenBalance = useSelectedAssetWalletBalance(
    token.source_token ? token.source_token : token.address,
  );
  const { account } = useBeraJs();
  const { useSelectedReserveData } = usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(
    token.source_token ? token.source_token : token.address,
  );
  const balance =
    Number(debtBalance.formattedBalance) > Number(tokenBalance.formattedBalance)
      ? Number(tokenBalance.formattedBalance)
      : Number(debtBalance.formattedBalance);
  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Repay</div>
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
          <Icons.wallet className="relative inline-block h-3 w-3 " />
          {balance.toFixed(2)}
          <span
            className="underline hover:cursor-pointer"
            onClick={() => setAmount(balance === 0 ? undefined : balance)}
          >
            MAX
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Estimated Value</div>
          <div>
            $
            {formatter.format(
              (amount ?? 0) *
                Number(reserveData.formattedPriceInMarketReferenceCurrency),
            )}
          </div>
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">Loan APY</div>
          <div className="text-warning-foreground">
            {(Number(reserveData.variableBorrowAPY) * 100).toFixed(2)}%
          </div>
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">LTV Health Ratio</div>
          <div className="">0 {"<->"} infinite</div>
        </div>
      </div>

      <Button
        disabled={!amount || amount === 0 || amount > balance}
        onClick={() => {
          write({
            address: lendPoolImplementationAddress,
            abi: lendPoolImplementationABI,
            functionName: "repay",
            params: [
              token.source_token ? token.source_token : token.address,
              parseUnits(`${Number(amount)}`, token.decimals),
              token.debtType === "variable" ? 2 : 1,
              account,
            ],
          });
        }}
      >
        {amount === 0 ? "Enter Amount" : "Repay"}
      </Button>
    </div>
  );
};
