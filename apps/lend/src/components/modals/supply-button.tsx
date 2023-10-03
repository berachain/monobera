import { useEffect, useState } from "react";
import Image from "next/image";
import {
  formatter,
  useBeraJs,
  usePollAllowance,
  useSelectedAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import { Tooltip, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { formatUnits, parseUnits } from "viem";

import { lendPoolImplementationABI } from "~/hooks/abi";
import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";
import ApproveButton from "../approve-button";

export default function SupplyBtn({
  token,
  disabled = false,
  variant = "primary",
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
  const { isReady } = useBeraJs();
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
        {isLoading ? "Loading" : "Supply"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-fit p-8">
          <SupplyModalContent {...{ token, amount, setAmount, write }} />
        </DialogContent>
      </Dialog>
    </>
  );
}

const SupplyModalContent = ({
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
  const { account } = useBeraJs();
  const balance = useSelectedAssetWalletBalance(token.address);
  const { useAllowance } = usePollAllowance({
    contract: lendPoolImplementationAddress,
    token,
  });

  const allowance = useAllowance();
  const { useSelectedReserveData } = usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(token.address);

  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Supply</div>
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
          {balance?.formattedBalance}
          <span
            className="underline hover:cursor-pointer"
            onClick={() =>
              setAmount(
                Number(balance?.formattedBalance) === 0
                  ? undefined
                  : Number(balance?.formattedBalance),
              )
            }
          >
            MAX
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Estimated Value</div>
          <div>${formatter.format(amount ?? 0 * 1)}</div>
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">Supply APY</div>
          <div className="text-success-foreground">
            {(
              Number(formatUnits(reserveData.currentLiquidityRate, 18)) * 100
            ).toFixed(2)}
            %
          </div>
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">LTV Health Ratio</div>
          <div className="">0 {"<->"} infinite</div>
        </div>
      </div>

      {allowance && Number(allowance.formattedAllowance) > (amount ?? 0) ? (
        <Button
          disabled={
            !amount || amount === 0 || amount > Number(balance.formattedBalance)
          }
          onClick={() => {
            write({
              address: lendPoolImplementationAddress,
              abi: lendPoolImplementationABI,
              functionName: "supply",
              params: [
                token.address,
                parseUnits(`${Number(amount)}`, token.decimals),
                account,
                parseUnits("0", token.decimals),
              ],
            });
          }}
        >
          {amount === 0 ? "Enter Amount" : "Supply"}
        </Button>
      ) : (
        <ApproveButton token={token} spender={lendPoolImplementationAddress} />
      )}
    </div>
  );
};
