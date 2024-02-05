import { useEffect, useState } from "react";
import { calculateHealthFactorFromBalancesBigUnits } from "@aave/math-utils";
import {
  TransactionActionType,
  formatter,
  lendPoolImplementationABI,
  useBeraJs,
  usePollReservesDataList,
  usePollUserAccountData,
  usePollUserReservesData,
  type Token,
} from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import { TokenInput, Tooltip, useTxn } from "@bera/shared-ui";
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
    message: `Borrowing ${amount} ${token.symbol}`,
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
  return (
    <>
      {ModalPortal}
      <Button
        onClick={() => setOpen(true)}
        className={cn("w-full text-sm leading-5 xl:w-fit", className)}
        disabled={disabled || isLoading || !isReady}
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

  const borrowPower = formatUnits(
    parseUnits(
      BigInt(
        userAccountData?.availableBorrowsBase ?? "0",
      ).toString() as `${number}`,
      baseCurrencyData?.networkBaseTokenPriceDecimals,
    ) /
      parseUnits(
        reserveData?.formattedPriceInMarketReferenceCurrency,
        baseCurrencyData?.networkBaseTokenPriceDecimals,
      ),
    baseCurrencyData?.networkBaseTokenPriceDecimals,
  );

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

  const currentHealthFactor =
    BigInt(userAccountData?.healthFactor || "0") >
    parseUnits("1000000000000", 18)
      ? "∞"
      : formatUnits(userAccountData.healthFactor, 18);

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
          setAmount={(amount) => setAmount(amount as `${number}`)}
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
            <span
              className={cn(
                `text-${getLTVColor(
                  currentHealthFactor === "∞"
                    ? 10
                    : Number(currentHealthFactor),
                )}`,
              )}
            >
              {currentHealthFactor === "∞"
                ? currentHealthFactor
                : Number(currentHealthFactor).toFixed(2)}{" "}
            </span>
            <Icons.moveRight className="inline-block h-6 w-6" />{" "}
            <span
              className={cn(`text-${getLTVColor(Number(newHealthFactor))}`)}
            >
              {Number(newHealthFactor.toFixed(2)) < 0
                ? "∞"
                : newHealthFactor.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm leading-tight">
          <div className="text-muted-foreground">Estimated Value</div>
          <div className="font-semibold">
            $
            {formatter.format(
              Number(amount ?? "0") *
                Number(reserveData?.formattedPriceInMarketReferenceCurrency),
            )}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm leading-tight">
          <div className="text-muted-foreground">
            Variable Borrow APY {""}
            <Tooltip
              text={
                <>
                  variable interest rate will fluctuate based on the market
                  conditions. See additional disclaimers in notes below.
                </>
              }
            />
          </div>
          <div className="font-semibold text-warning-foreground">
            {(Number(reserveData.variableBorrowAPY) * 100).toFixed(2)}%
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
