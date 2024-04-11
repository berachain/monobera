import { useEffect, useState } from "react";
import { calculateHealthFactorFromBalancesBigUnits } from "@aave/math-utils";
import {
  TransactionActionType,
  lendPoolImplementationABI,
  useBeraJs,
  usePollAssetWalletBalance,
  usePollReservesDataList,
  usePollUserAccountData,
  type BalanceToken,
} from "@bera/berajs";
import { honeyTokenAddress, lendPoolImplementationAddress } from "@bera/config";
import {
  FormattedNumber,
  TokenInput,
  useAnalytics,
  useTxn,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Alert, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import BigNumber from "bignumber.js";
import { formatEther, formatUnits, maxUint256, parseUnits } from "viem";

import { getLTVColor } from "~/utils/get-ltv-color";

export default function WithdrawBtn({
  reserve,
  disabled = false,
  variant = "outline",
  className,
}: {
  reserve: any;
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
    } ${reserve?.symbol}`,
    onSuccess: () => {
      track(`withdraw_${reserve?.symbol.toLowerCase()}`);
      userAccountRefetch();
      reservesDataRefetch();
    },
    onError: (e: Error | undefined) => {
      track(`withdraw_${reserve?.symbol.toLowerCase()}_failed`);
      captureException(e);
    },
    actionType: TransactionActionType.WITHDRAW,
  });

  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const atoken = useSelectedAssetWalletBalance(reserve?.aTokenAddress);
  const otoken = useSelectedAssetWalletBalance(reserve?.underlyingAsset);
  const token = {
    ...otoken,
    balance: atoken?.balance ?? 0n,
    formattedBalance: atoken?.formattedBalance ?? "0",
  } as BalanceToken;

  const { refetch: userAccountRefetch } = usePollUserAccountData();
  const { refetch: reservesDataRefetch } = usePollReservesDataList();

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
          <WithdrawModalContent
            {...{ reserve, token: token, amount, setAmount, write }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const WithdrawModalContent = ({
  reserve,
  token,
  amount,
  setAmount,
  write,
}: {
  reserve: any;
  token: BalanceToken;
  amount: string | undefined;
  setAmount: (amount: string | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const isHoney = reserve?.underlyingAsset === honeyTokenAddress;
  const userBalance = token.formattedBalance ?? "0";
  const { account } = useBeraJs();
  const { useUserAccountData } = usePollUserAccountData();
  const userAccountData = useUserAccountData();

  const currentHealthFactor = formatEther(userAccountData?.healthFactor || "0");
  const newHealthFactor = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency:
      Number(formatUnits(userAccountData.totalCollateralBase, 8)) -
      Number(amount ?? "0") *
        Number(reserve?.formattedPriceInMarketReferenceCurrency),
    borrowBalanceMarketReferenceCurrency: formatUnits(
      userAccountData.totalDebtBase,
      8,
    ),
    currentLiquidationThreshold: formatUnits(
      userAccountData.currentLiquidationThreshold,
      4,
    ),
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Withdraw</div>
      <div className="rounded-md border border-border bg-input">
        <TokenInput
          selected={{ ...token, symbol: reserve.symbol }}
          amount={amount}
          balance={userBalance}
          showExceeding={true}
          selectable={false}
          setAmount={(amount) =>
            setAmount(amount === "" ? undefined : (amount as `${number}`))
          }
          price={Number(reserve?.formattedPriceInMarketReferenceCurrency)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">Estimated Value</div>
          <FormattedNumber
            value={
              Number(amount ?? "0") *
              Number(reserve?.formattedPriceInMarketReferenceCurrency)
            }
            symbol="USD"
            className="w-[200px] justify-end truncate text-right font-semibold"
          />
        </div>
        {isHoney && (
          <div className="flex justify-between text-sm leading-tight">
            <div className="text-muted-foreground ">Supply APY</div>
            <div className="font-semibold text-success-foreground">
              <FormattedNumber value={reserve.supplyAPY} percent />
            </div>
          </div>
        )}
        {!isHoney && (
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

      {!isHoney && userAccountData.totalDebtBase > 0n && (
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
          (userAccountData.totalDebtBase > 0n && !isHoney)
        }
        onClick={() => {
          write({
            address: lendPoolImplementationAddress,
            abi: lendPoolImplementationABI,
            functionName: "withdraw",
            params: [
              token.address,
              BigNumber(userBalance ?? "0").eq(BigNumber(amount ?? "0"))
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
