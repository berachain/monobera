import { useEffect, useState } from "react";
import Image from "next/image";
import { formatter, useBeraJs, type Token } from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import { Tooltip, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Input } from "@bera/ui/input";
import { formatUnits, parseUnits } from "viem";

import { lendPoolImplementationABI } from "~/hooks/abi";
import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";
import { usePollUserAccountData } from "~/hooks/usePollUserAccountData";

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
        className="w-full text-sm leading-5 xl:w-fit"
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
  token: Token & {
    source_token?: string;
    debtType?: "variable" | "stable";
  };
  amount: number | undefined;
  setAmount: (amount: number | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const { account } = useBeraJs();
  const { useSelectedReserveData, useBaseCurrencyData } =
    usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(
    token.source_token ? token.source_token : token.address,
  );
  const { data: baseCurrencyData } = useBaseCurrencyData();
  const { useUserAccountData } = usePollUserAccountData();
  const { data: userAccountData } = useUserAccountData();

  const borrowPower =
    Number(
      formatUnits(
        userAccountData?.availableBorrowsBase ?? "0",
        baseCurrencyData?.networkBaseTokenPriceDecimals,
      ),
    ) / Number(reserveData?.formattedPriceInMarketReferenceCurrency);

  const availableLiquidity =
    Number(reserveData?.totalLiquidity) *
    Number(reserveData?.formattedPriceInMarketReferenceCurrency) *
    Number(1 - reserveData?.borrowUsageRatio);

  const borrowAmout =
    borrowPower > availableLiquidity ? availableLiquidity : borrowPower;
  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Borrow </div>
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
          Availabe to borrow: {borrowAmout.toFixed(2)}
          <span
            className="underline hover:cursor-pointer"
            onClick={() => setAmount(borrowAmout)}
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
            {(Number(reserveData.variableBorrowAPY) * 100).toFixed(2)}%
          </div>
        </div>
      </div>

      <Button
        disabled={!amount || amount === 0 || amount > borrowAmout}
        onClick={() => {
          write({
            address: lendPoolImplementationAddress,
            abi: lendPoolImplementationABI,
            functionName: "borrow",
            params: [
              token.source_token ? token.source_token : token.address,
              parseUnits(`${Number(amount ?? 0)}`, token.decimals),
              2,
              0,
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
