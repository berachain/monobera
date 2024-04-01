import { useEffect, useState } from "react";
import { calculateHealthFactorFromBalancesBigUnits } from "@aave/math-utils";
import {
  TransactionActionType,
  lendPoolImplementationABI,
  useBeraJs,
  usePollReservesDataList,
  usePollUserAccountData,
  usePollUserReservesData,
  type Token,
} from "@bera/berajs";
import {
  honeyAddress,
  honeyTokenAddress,
  lendPoolImplementationAddress,
} from "@bera/config";
import {
  FormattedNumber,
  TokenInput,
  useTxn,
  useAnalytics,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import BigNumber from "bignumber.js";
import { formatEther, formatUnits, parseUnits } from "viem";

import { maxUint256 } from "~/utils/constants";
import { getLTVColor } from "~/utils/get-ltv-color";

export default function WithdrawBtn({
  token,
  disabled = false,
  variant = "outline",
  className,
}: {
  token: Token;
  disabled?: boolean;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const { captureException, track } = useAnalytics();
  const { write, isLoading, ModalPortal, isSuccess } = useTxn({
    message: `Withdrawing ${
      Number(amount) < 0.01 ? "<0.01" : Number(amount).toFixed(2)
    } ${token?.symbol}`,
    onSuccess: () => {
      track(`withdraw_${token.symbol.toLowerCase()}`);
      userAccountRefetch();
      reservesDataRefetch();
      userReservesRefetch();
    },
    onError: (e: Error | undefined) => {
      track(`withdraw_${token.symbol.toLowerCase()}_failed`);
      captureException(e);
    },
    actionType: TransactionActionType.WITHDRAW,
  });
  const { refetch: userAccountRefetch } = usePollUserAccountData();
  const { refetch: reservesDataRefetch } = usePollReservesDataList();
  const { refetch: userReservesRefetch } = usePollUserReservesData();

  useEffect(() => setOpen(false), [isSuccess]);
  useEffect(() => setAmount(undefined), [open]);
  return (
    <>
      {" "}
      {ModalPortal}
      <Button
        onClick={() => setOpen(true)}
        className={cn("w-full xl:w-fit", className)}
        disabled={disabled || isLoading || token.balance === 0n}
        variant={variant}
      >
        {isLoading ? "Loading" : "Withdraw"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full p-8 md:w-[480px]">
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
  amount: string | undefined;
  setAmount: (amount: string | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const userBalance = token.formattedBalance ?? "0";
  const { useSelectedReserveData } = usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(token.address);
  const { account } = useBeraJs();
  const { useUserAccountData } = usePollUserAccountData();
  const { data: userAccountData } = useUserAccountData();

  const currentHealthFactor = formatEther(userAccountData?.healthFactor || "0");

  const newHealthFactor = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency:
      Number(formatUnits(userAccountData.totalCollateralBase, 8)) -
      Number(amount ?? "0") *
        Number(reserveData?.formattedPriceInMarketReferenceCurrency),
    borrowBalanceMarketReferenceCurrency: formatUnits(
      userAccountData.totalDebtBase,
      8,
    ),
    currentLiquidationThreshold: formatUnits(
      userAccountData.currentLiquidationThreshold,
      4,
    ),
  });

  const maxWithdrawalAllowance = BigNumber(
    formatUnits(
      (userAccountData.totalCollateralBase as bigint) -
        (userAccountData.totalDebtBase * 10000n) /
          (userAccountData.currentLiquidationThreshold === 0n
            ? 8000n
            : userAccountData.currentLiquidationThreshold),
      8,
    ),
  )
    .div(reserveData?.formattedPriceInMarketReferenceCurrency ?? 1n)
    .toFixed(token.decimals ?? 18);

  const balance =
    token.address === honeyTokenAddress
      ? Number(maxWithdrawalAllowance) > Number(userBalance)
        ? userBalance
        : maxWithdrawalAllowance
      : userBalance;

  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Withdraw</div>
      <div className="rounded-md border border-border bg-input">
        <TokenInput
          selected={token}
          amount={amount}
          balance={balance}
          showExceeding={true}
          selectable={false}
          setAmount={(amount) =>
            setAmount(amount === "" ? undefined : (amount as `${number}`))
          }
          price={Number(reserveData?.formattedPriceInMarketReferenceCurrency)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">Estimated Value</div>
          <FormattedNumber
            value={
              Number(amount ?? "0") *
              Number(reserveData?.formattedPriceInMarketReferenceCurrency)
            }
            symbol="USD"
            className="w-[200px] justify-end truncate text-right font-semibold"
          />
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">Supply APY</div>
          <div className="font-semibold text-success-foreground">
            <FormattedNumber value={reserveData.supplyAPY} percent />
          </div>
        </div>
        {token.address !== honeyTokenAddress && (
          <div className="flex justify-between text-sm leading-tight">
            <div className="text-muted-foreground ">LTV Health Ratio</div>
            <div className="flex items-center gap-1 font-semibold">
              <FormattedNumber
                value={currentHealthFactor}
                maxValue={999}
                className={cn(
                  `text-${getLTVColor(Number(currentHealthFactor))}`,
                )}
              />
              <Icons.moveRight className="inline-block h-4 w-6" />
              <FormattedNumber
                value={newHealthFactor}
                className={cn(`text-${getLTVColor(Number(newHealthFactor))}`)}
                maxValue={999}
              />
            </div>
          </div>
        )}
      </div>

      {token.address !== honeyAddress && userAccountData.totalDebtBase > 0n && (
        <Alert variant="destructive">
          <AlertTitle>
            {" "}
            <Icons.info className="mr-1 inline-block h-4 w-4 -mt-1" />
            Must Repay Entire Loan to Withdraw Collateral
          </AlertTitle>
          Please be sure to pay your entire honey debt, you will not be able to
          withdraw your collateral until you repay your honey loan.
        </Alert>
      )}

      <Button
        disabled={
          !amount ||
          BigNumber(amount).lte(BigNumber(0)) ||
          BigNumber(amount).gt(BigNumber(balance)) ||
          (userAccountData.totalDebtBase > 0n && token.address !== honeyAddress)
        }
        onClick={() => {
          write({
            address: lendPoolImplementationAddress,
            abi: lendPoolImplementationABI,
            functionName: "withdraw",
            params: [
              token.address,
              BigNumber(balance ?? "0").eq(BigNumber(amount ?? "0"))
                ? maxUint256
                : parseUnits((amount ?? "0") as `${number}`, token.decimals),
              account,
            ],
          });
        }}
      >
        {Number(amount) === 0 ? "Enter Amount" : "Withdraw"}
      </Button>
    </div>
  );
};
