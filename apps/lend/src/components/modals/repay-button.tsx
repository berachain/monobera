import { useEffect, useState } from "react";
import { calculateHealthFactorFromBalancesBigUnits } from "@aave/math-utils";
import {
  TransactionActionType,
  lendPoolImplementationABI,
  useBeraJs,
  usePollAllowance,
  usePollAssetWalletBalance,
  usePollReservesDataList,
  usePollUserAccountData,
  usePollUserReservesData,
  type Token,
} from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import {
  ApproveButton,
  FormattedNumber,
  TokenInput,
  useTxn,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import BigNumber from "bignumber.js";
import { formatEther, formatUnits, maxUint256, parseUnits } from "viem";

import { getLTVColor } from "~/utils/get-ltv-color";

export default function RepayBtn({
  token,
  disabled = false,
  variant = "outline",
  className = "",
}: {
  token: Token;
  disabled?: boolean;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const { write, isLoading, ModalPortal, isSuccess } = useTxn({
    message: `Repaying ${
      Number(amount) < 0.01 ? "<0.01" : Number(amount).toFixed(2)
    } ${token.symbol}`,
    onSuccess: () => {
      userAccountRefetch();
      reservesDataRefetch();
      userReservesRefetch();
    },
    actionType: TransactionActionType.REPAY,
  });

  const { refetch: userAccountRefetch } = usePollUserAccountData();
  const { refetch: reservesDataRefetch } = usePollReservesDataList();
  const { refetch: userReservesRefetch } = usePollUserReservesData();

  useEffect(() => setOpen(false), [isSuccess]);
  useEffect(() => setAmount(undefined), [open]);
  return (
    <>
      {ModalPortal}
      <Button
        onClick={() => setOpen(true)}
        className={cn("w-full xl:w-fit", className)}
        disabled={disabled || isLoading || token.balance === 0n}
        variant={variant}
      >
        {isLoading ? "Loading" : "Repay"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full p-8 md:w-[480px]">
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
  const { useAllowance } = usePollAllowance({
    contract: lendPoolImplementationAddress,
    token,
  });

  const allowance = useAllowance();
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const debtBalance = token.formattedBalance;
  const { data: tokenB } = useSelectedAssetWalletBalance(token.address);
  const tokenBalance = tokenB?.formattedBalance;

  const { account } = useBeraJs();
  const { useSelectedReserveData } = usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(token.address);
  const { useUserAccountData } = usePollUserAccountData();
  const { data: userAccountData } = useUserAccountData();

  const balance =
    Number(debtBalance) > Number(tokenBalance) ? tokenBalance : debtBalance;

  const currentHealthFactor = formatEther(userAccountData.healthFactor);

  const newHealthFactor = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency: formatUnits(
      userAccountData.totalCollateralBase,
      8,
    ),
    borrowBalanceMarketReferenceCurrency:
      Number(formatUnits(userAccountData.totalDebtBase, 8)) -
      Number(amount ?? "0") *
        Number(reserveData?.formattedPriceInMarketReferenceCurrency),
    currentLiquidationThreshold: formatUnits(
      userAccountData.currentLiquidationThreshold,
      4,
    ),
  });

  return (
    <div className="flex flex-col gap-6 pb-4">
      <div className="text-lg font-semibold leading-7">Repay</div>
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
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Estimated Value</div>
          <FormattedNumber
            value={
              Number(amount ?? "0") *
              Number(reserveData.formattedPriceInMarketReferenceCurrency)
            }
            symbol="USD"
            className="w-[200px] justify-end truncate text-right font-semibold"
          />
        </div>

        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">LTV Health Ratio</div>
          <div className="flex items-center gap-2 font-semibold">
            <FormattedNumber
              value={currentHealthFactor}
              maxValue={999_999_999}
              className={cn(`text-${getLTVColor(Number(currentHealthFactor))}`)}
            />
            <Icons.moveRight className="inline-block h-6 w-6" />
            <FormattedNumber
              value={newHealthFactor.lte(0) ? 9_999_999_999 : newHealthFactor}
              className={cn(`text-${getLTVColor(Number(newHealthFactor))}`)}
              maxValue={999_999_999}
            />
          </div>
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">Loan APY</div>
          <div className="font-semibold text-warning-foreground">
            <FormattedNumber value={reserveData.variableBorrowAPY} percent />
          </div>
        </div>
      </div>
      {allowance &&
      BigNumber(allowance.formattedAllowance).gte(BigNumber(amount ?? "0")) ? (
        <Button
          disabled={
            !amount || Number(amount) <= 0 || Number(amount) > Number(balance)
          }
          onClick={() => {
            write({
              address: lendPoolImplementationAddress,
              abi: lendPoolImplementationABI,
              functionName: "repay",
              params: [
                token.address,
                (amount ?? "0") === (debtBalance ?? "0")
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
      ) : (
        <ApproveButton
          token={token}
          spender={lendPoolImplementationAddress}
          amount={parseUnits(
            BigNumber(amount ?? "0")
              .times(2)
              .toString() as `${number}`,
            token.decimals,
          )}
        />
      )}
    </div>
  );
};
