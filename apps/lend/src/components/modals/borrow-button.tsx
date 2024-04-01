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
import { lendPoolImplementationAddress } from "@bera/config";
import { FormattedNumber, TokenInput, Tooltip, useTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { formatUnits, parseUnits } from "viem";

import { getLTVColor } from "~/utils/get-ltv-color";

export default function BorrowBtn({
  token,
  disabled = false,
  variant = "primary",
  className,
}: {
  token: Token;
  disabled?: boolean;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const { isReady } = useBeraJs();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const { write, isLoading, ModalPortal, isSuccess } = useTxn({
    message: `Borrowing ${
      Number(amount) < 0.01 ? "<0.01" : Number(amount).toFixed(2)
    } ${token.symbol}`,
    onSuccess: () => {
      userAccountRefetch();
      reservesDataRefetch();
      userReservesRefetch();
    },
    actionType: TransactionActionType.BORROW,
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
        disabled={disabled || isLoading || !isReady || token.balance === 0n}
        variant={variant}
      >
        {isLoading ? "Loading" : "Borrow"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full p-8 md:w-[480px]">
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
  token: Token;
  amount: string | undefined;
  setAmount: (amount: string | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const { account } = useBeraJs();
  const { useSelectedReserveData, useBaseCurrencyData } =
    usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(token.address);
  const { data: baseCurrencyData } = useBaseCurrencyData();
  const { useUserAccountData } = usePollUserAccountData();
  const { data: userAccountData } = useUserAccountData();

  const borrowPower = token.formattedBalance;

  const availableLiquidity = formatUnits(
    BigInt(reserveData?.availableLiquidity ?? "0") *
      parseUnits(
        reserveData?.formattedPriceInMarketReferenceCurrency,
        token.decimals,
      ),
    token.decimals * 2,
  );

  const borrowAmout =
    Number(borrowPower as `${number}`) >
    Number(availableLiquidity as `${number}`)
      ? availableLiquidity
      : borrowPower;

  const currentHealthFactor = formatUnits(userAccountData.healthFactor, 18);

  const newHealthFactor = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency: formatUnits(
      userAccountData.totalCollateralBase,
      baseCurrencyData?.networkBaseTokenPriceDecimals ?? 8,
    ),
    borrowBalanceMarketReferenceCurrency:
      Number(
        formatUnits(
          userAccountData.totalDebtBase,
          baseCurrencyData?.networkBaseTokenPriceDecimals ?? 8,
        ),
      ) +
      Number(amount ?? "0") *
        Number(reserveData?.formattedPriceInMarketReferenceCurrency),

    currentLiquidationThreshold: formatUnits(
      userAccountData.currentLiquidationThreshold,
      4,
    ),
  });
  return (
    <div className="flex flex-col gap-6 pb-4">
      <div className="text-lg font-semibold leading-7">Borrow</div>
      <div className="rounded-md border border-border bg-input">
        <TokenInput
          selected={token}
          amount={amount}
          balance={borrowAmout}
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
          <div className="items-center text-muted-foreground">
            LTV Health Ratio{" "}
            <Tooltip
              text={
                <>
                  Your health factor and loan to value determine the assurance
                  of your collateral. <br />
                  To avoid liquidations you can supply more collateral or repay
                  borrow positions.
                </>
              }
            />
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <FormattedNumber
              value={currentHealthFactor}
              maxValue={999}
              className={cn(`text-${getLTVColor(Number(currentHealthFactor))}`)}
            />
            <Icons.moveRight className="inline-block h-4 w-6" />
            <FormattedNumber
              value={newHealthFactor}
              className={cn(`text-${getLTVColor(Number(newHealthFactor))}`)}
              maxValue={999}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-sm leading-tight">
          <div className="text-muted-foreground">Estimated Value</div>
          <FormattedNumber
            value={
              Number(amount ?? "0") *
              Number(reserveData.formattedPriceInMarketReferenceCurrency)
            }
            symbol="USD"
            className="w-[200px] justify-end truncate text-right font-semibold"
          />
        </div>
        <div className="flex items-center justify-between text-sm leading-tight">
          <div className="text-muted-foreground">
            Variable Borrow APY {""}
            <Tooltip>
              <div className="max-w-[300px]">
                Variable interest rate will fluctuate based on the market
                conditions. See additional disclaimers in notes below.
              </div>
            </Tooltip>
          </div>
          <div className="font-semibold text-warning-foreground">
            <FormattedNumber value={reserveData.variableBorrowAPY} percent />
          </div>
        </div>
      </div>

      <Button
        disabled={
          !amount || Number(amount) <= 0 || Number(amount) > Number(borrowAmout)
        }
        onClick={() => {
          write({
            address: lendPoolImplementationAddress,
            abi: lendPoolImplementationABI,
            functionName: "borrow",
            params: [
              token.address,
              parseUnits(`${amount}` as `${number}`, token.decimals),
              2,
              0,
              account,
            ],
          });
        }}
      >
        {!amount ? "Enter Amount" : "Borrow"}
      </Button>
    </div>
  );
};
