import { useEffect, useState } from "react";
import {
  BalanceToken,
  TransactionActionType,
  lendPoolImplementationAbi,
  useBeraJs,
  usePollReservesDataList,
  usePollUserAccountData,
  usePollWalletBalances,
} from "@bera/berajs";
import { getLendWithdrawPayload } from "@bera/berajs/actions";
import { lendPoolImplementationAddress } from "@bera/config";
import { TokenInput, useAnalytics, useTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import BigNumber from "bignumber.js";

export default function WithdrawBtnQ({
  token,
  disabled = false,
  variant = "outline",
  className,
}: {
  token: BalanceToken;
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
      track(`withdraw_${token?.symbol.toLowerCase()}`);
      walletBalanceRefetch();
      userAccountRefetch();
      reservesDataRefetch();
    },
    onError: (e: Error | undefined) => {
      track(`withdraw_${token?.symbol.toLowerCase()}_failed`);
      captureException(e);
    },
    actionType: TransactionActionType.WITHDRAW,
  });

  const { refresh: userAccountRefetch } = usePollUserAccountData();
  const { refresh: reservesDataRefetch } = usePollReservesDataList();
  const { refresh: walletBalanceRefetch } = usePollWalletBalances();

  useEffect(() => setOpen(false), [isSuccess]);
  useEffect(() => setAmount(undefined), [open]);
  return (
    <>
      {" "}
      {ModalPortal}
      <Button
        onClick={() => setOpen(true)}
        className={cn("w-full xl:w-fit", className)}
        disabled={disabled || isLoading || !token || token.balance === 0n}
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
  token: BalanceToken;
  amount: string | undefined;
  setAmount: (amount: string | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const userBalance = token.formattedBalance ?? "0";
  const { account = "0x" } = useBeraJs();
  const { data: userAccountData } = usePollUserAccountData();

  const paylaod =
    token &&
    getLendWithdrawPayload({
      token,
      amount: amount ?? "0",
      max: BigNumber(userBalance ?? "0").eq(BigNumber(amount ?? "0")),
      account,
    }).payload;

  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Withdraw</div>
      <div className="rounded-md border border-border bg-input">
        <TokenInput
          selected={{ ...token, symbol: token.symbol }}
          amount={amount}
          balance={userBalance}
          showExceeding={true}
          selectable={false}
          setAmount={(amount) =>
            setAmount(amount === "" ? undefined : (amount as `${number}`))
          }
        />
      </div>

      {userAccountData && userAccountData.totalDebtBase > 0n && (
        <Alert variant="destructive">
          <AlertTitle>
            {" "}
            <Icons.info className="-mt-1 mr-1 inline-block h-4 w-4" />
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
          BigNumber(amount).gt(BigNumber(userBalance)) ||
          !userAccountData ||
          userAccountData.totalDebtBase > 0n
        }
        onClick={() => {
          write({
            address: lendPoolImplementationAddress,
            abi: lendPoolImplementationAbi,
            functionName: "withdraw",
            params: paylaod,
          });
        }}
      >
        {Number(amount) === 0 ? "Enter Amount" : "Withdraw"}
      </Button>
    </div>
  );
};
