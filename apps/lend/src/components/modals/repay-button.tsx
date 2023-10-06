import { useEffect, useState } from "react";
import Image from "next/image";
import { calculateHealthFactorFromBalancesBigUnits } from "@aave/math-utils";
import {
  formatter,
  useBeraJs,
  useSelectedAssetWalletBalance,
  type Token,
} from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import { TokenIcon, Tooltip, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { formatEther, formatUnits, parseUnits } from "viem";

import { maxUint256 } from "~/utils/constants";
import { lendPoolImplementationABI } from "~/hooks/abi";
import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";
import { usePollUserAccountData } from "~/hooks/usePollUserAccountData";

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
  const [amount, setAmount] = useState<string | undefined>(undefined);
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
  token: Token;
  amount: string | undefined;
  setAmount: (amount: string | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const debtBalance = token.formattedBalance;
  const tokenB = useSelectedAssetWalletBalance(token.address);
  const tokenBalance = tokenB.formattedBalance;

  const { account } = useBeraJs();
  const { useSelectedReserveData } = usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(token.address);
  const { useUserAccountData } = usePollUserAccountData();
  const { data: userAccountData } = useUserAccountData();

  console.log(reserveData);
  const balance =
    Number(debtBalance) > Number(tokenBalance) ? tokenBalance : debtBalance;

  const currentHealthFactor =
    Number(formatEther(userAccountData?.healthFactor || "0")) > 1000000000000
      ? "∞"
      : Number(formatEther(userAccountData.healthFactor)).toFixed(2);

  const newHealthFactor = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency: formatEther(
      userAccountData.totalCollateralBase,
    ),
    borrowBalanceMarketReferenceCurrency:
      Number(formatEther(userAccountData.totalDebtBase)) -
      (Number(amount) ?? 0) *
        Number(reserveData?.formattedPriceInMarketReferenceCurrency),

    currentLiquidationThreshold: formatUnits(
      userAccountData.currentLiquidationThreshold,
      4,
    ),
  });

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
          endAdornment={
            <div className="flex items-center gap-1">
              <TokenIcon token={token} size={"md"} />
              {token.symbol}
            </div>
          }
          value={amount}
          onChange={(e) =>
            setAmount(Number(e.target.value) === 0 ? undefined : e.target.value)
          }
        />
        <div className="flex h-3 w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
          <Icons.wallet className="relative inline-block h-3 w-3 " />
          {Number(balance).toFixed(2)}
          <span
            className="underline hover:cursor-pointer"
            onClick={() =>
              setAmount(Number(balance) === 0 ? undefined : balance)
            }
          >
            MAX
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Estimated Value</div>
          <div className="flex items-center font-semibold">
            $
            {formatter.format(
              Number(amount ?? 0) *
                Number(reserveData.formattedPriceInMarketReferenceCurrency),
            )}
          </div>
        </div>

        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">LTV Health Ratio</div>
          <div className="flex items-center gap-1 gap-2 font-semibold">
            {currentHealthFactor}{" "}
            <Icons.moveRight className="inline-block h-6 w-6" />{" "}
            {Number(newHealthFactor.toFixed(2)) < 0
              ? "∞"
              : newHealthFactor.toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">Loan APY</div>
          <div className="font-semibold text-warning-foreground">
            {(Number(reserveData.variableBorrowAPY) * 100).toFixed(2)}%
          </div>
        </div>
      </div>

      <Button
        disabled={
          !amount || Number(amount) === 0 || Number(amount) > Number(balance)
        }
        onClick={() => {
          write({
            address: lendPoolImplementationAddress,
            abi: lendPoolImplementationABI,
            functionName: "repay",
            params: [
              token.address,
              Number(amount) === Number(debtBalance)
                ? maxUint256
                : parseUnits(amount as `${number}`, token.decimals),
              2,
              account,
            ],
          });
        }}
      >
        {Number(amount) === 0 ? "Enter Amount" : "Repay"}
      </Button>
    </div>
  );
};
