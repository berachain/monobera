import { useEffect, useState } from "react";
import { calculateHealthFactorFromBalancesBigUnits } from "@aave/math-utils";
import {
  TransactionActionType,
  lendPoolImplementationABI,
  useBeraJs,
  usePollReservesDataList,
  usePollUserAccountData,
  usePollWalletBalances,
} from "@bera/berajs";
import { lendPoolImplementationAddress } from "@bera/config";
import {
  FormattedNumber,
  POLLING,
  TokenInput,
  Tooltip,
  useAnalytics,
  useTxn,
} from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { beraJsConfig } from "@bera/wagmi";
import BigNumber from "bignumber.js";
import { formatUnits, parseUnits } from "viem";

import { getLTVColor } from "~/utils/get-ltv-color";

export default function BorrowBtn({
  honeyBorrowAllowance,
  reserve,
  disabled = false,
  variant = "primary",
  className,
}: {
  honeyBorrowAllowance: string;
  reserve: any;
  disabled?: boolean;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const { captureException, track } = useAnalytics();
  const { write, isLoading, ModalPortal, isSuccess } = useTxn({
    message: `Borrowing ${
      Number(amount) < 0.01 ? "<0.01" : Number(amount).toFixed(2)
    } ${reserve?.symbol}`,
    onSuccess: () => {
      track(`borrow_${reserve?.symbol.toLowerCase()}`);
      userAccountRefetch();
      reservesDataRefetch();
    },
    onError: (e: Error | undefined) => {
      track(`borrow_${reserve?.symbol.toLowerCase()}_failed`);
      captureException(e);
    },
    actionType: TransactionActionType.BORROW,
  });

  const { refetch: userAccountRefetch } = usePollUserAccountData({
    config: beraJsConfig,
    opts: {
      refreshInterval: POLLING.FAST,
    },
  });
  const { refetch: reservesDataRefetch } = usePollReservesDataList({
    config: beraJsConfig,
  });

  useEffect(() => setOpen(false), [isSuccess]);
  useEffect(() => setAmount(undefined), [open]);
  return (
    <>
      {ModalPortal}
      <Button
        onClick={() => setOpen(true)}
        className={cn("w-full xl:w-fit", className)}
        disabled={
          disabled || isLoading || BigNumber(honeyBorrowAllowance).lte(0)
        }
        variant={variant}
      >
        {isLoading ? "Loading" : "Borrow"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full p-8 md:w-[480px]">
          <BorrowModalContent
            {...{ reserve, honeyBorrowAllowance, amount, setAmount, write }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const BorrowModalContent = ({
  reserve,
  honeyBorrowAllowance,
  amount,
  setAmount,
  write,
}: {
  reserve: any;
  honeyBorrowAllowance: string;
  amount: string | undefined;
  setAmount: (amount: string | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const { account } = useBeraJs();
  const { useBaseCurrencyData } = usePollReservesDataList({
    config: beraJsConfig,
  });
  const baseCurrencyData = useBaseCurrencyData();
  const { useUserAccountData } = usePollUserAccountData({
    config: beraJsConfig,
    opts: {
      refreshInterval: POLLING.FAST,
    },
  });
  const userAccountData = useUserAccountData();

  const { useSelectedWalletBalance } = usePollWalletBalances({
    config: beraJsConfig,
  });
  const token = useSelectedWalletBalance(reserve?.underlyingAsset);

  const availableLiquidity = formatUnits(
    BigInt(reserve.availableLiquidity ?? "0"),
    reserve.decimals,
  );

  const borrowAmout = BigNumber(honeyBorrowAllowance as `${number}`).gt(
    BigNumber(availableLiquidity as `${number}`),
  )
    ? availableLiquidity
    : honeyBorrowAllowance;

  const currentHealthFactor = formatUnits(
    userAccountData?.healthFactor ?? 0n,
    18,
  );
  const newHealthFactor = userAccountData
    ? calculateHealthFactorFromBalancesBigUnits({
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
            Number(reserve.formattedPriceInMarketReferenceCurrency),

        currentLiquidationThreshold: formatUnits(
          userAccountData.currentLiquidationThreshold,
          4,
        ),
      })
    : BigNumber(0);

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
          price={Number(reserve.formattedPriceInMarketReferenceCurrency)}
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
              Number(reserve.formattedPriceInMarketReferenceCurrency)
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
            <FormattedNumber value={reserve.variableBorrowAPY} percent />
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
              token?.address,
              parseUnits(`${amount}` as `${number}`, token?.decimals ?? 18),
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
