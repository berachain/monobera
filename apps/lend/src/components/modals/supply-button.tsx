import { useEffect, useState } from "react";
import { calculateHealthFactorFromBalancesBigUnits } from "@aave/math-utils";
import {
  getLendSupplyPayload,
  TransactionActionType,
  lendPoolImplementationAbi,
  useBeraJs,
  usePollAllowance,
  usePollReservesDataList,
  usePollUserAccountData,
  usePollWalletBalances,
  type Token,
} from "@bera/berajs";
import { honeyTokenAddress, lendPoolImplementationAddress } from "@bera/config";
import {
  ApproveButton,
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
import { formatEther, formatUnits, parseUnits } from "viem";

import { getLTVColor } from "~/utils/get-ltv-color";

export default function SupplyBtn({
  reserve,
  disabled = false,
  variant = "primary",
  className,
}: {
  reserve: any;
  disabled?: boolean;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const supply = reserve?.underlyingAsset === honeyTokenAddress;

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const { captureException, track } = useAnalytics();
  const { write, isLoading, ModalPortal, isSuccess } = useTxn({
    message: `${supply ? "Supplying" : "Depositing"} ${
      Number(amount) < 0.01 ? "<0.01" : Number(amount).toFixed(2)
    } ${reserve?.symbol}`,
    onSuccess: () => {
      track(`supply_${reserve?.symbol.toLowerCase()}`);
      userAccountRefetch();
      reservesDataRefetch();
    },
    onError: (e: Error | undefined) => {
      track(`supply_${reserve?.symbol.toLowerCase()}_failed`);
      captureException(e);
    },
    actionType: TransactionActionType.SUPPLY,
  });

  const { useSelectedWalletBalance } = usePollWalletBalances({
    config: beraJsConfig,
  });
  const token = useSelectedWalletBalance(reserve.underlyingAsset);

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
        disabled={disabled || isLoading || !token || token.balance === 0n}
        variant={variant}
      >
        {isLoading ? "Loading" : supply ? "Supply" : "Deposit"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full p-8 md:w-[480px]">
          <SupplyModalContent
            {...{ reserve, token: token!, amount, setAmount, write }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const SupplyModalContent = ({
  reserve,
  token,
  amount,
  setAmount,
  write,
}: {
  reserve: any;
  token: Token;
  amount: string | undefined;
  setAmount: (amount: string | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const supply = token.address === honeyTokenAddress;
  const { account = "0x" } = useBeraJs();

  const { useAllowance } = usePollAllowance({
    contract: lendPoolImplementationAddress,
    token,
  });
  const allowance = useAllowance();

  const { useUserAccountData } = usePollUserAccountData({
    config: beraJsConfig,
    opts: {
      refreshInterval: POLLING.FAST,
    },
  });
  const userAccountData = useUserAccountData();

  const currentHealthFactor = formatEther(userAccountData?.healthFactor ?? 0n);
  const newHealthFactor = userAccountData
    ? calculateHealthFactorFromBalancesBigUnits({
        collateralBalanceMarketReferenceCurrency:
          Number(formatUnits(userAccountData.totalCollateralBase, 8)) +
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
      })
    : BigNumber(0);

  const payload =
    token &&
    getLendSupplyPayload({ args: { token, amount: amount ?? "0", account } }).payload;
  return (
    <div className="flex flex-col gap-6 pb-4">
      <div className="text-lg font-semibold leading-7">
        {supply ? "Supply" : "Deposit"}
      </div>

      <div className="rounded-md border border-border bg-input">
        <TokenInput
          selected={token}
          amount={amount}
          balance={token.formattedBalance}
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
              Number(reserve.formattedPriceInMarketReferenceCurrency)
            }
            symbol="USD"
            className="w-[200px] justify-end truncate text-right font-semibold"
          />
        </div>

        {supply && (
          <div className="flex justify-between text-sm leading-tight">
            <div className="flex items-center align-middle text-muted-foreground">
              Supply APY{" "}
              <Tooltip
                text={
                  <>
                    APY (Annual Percentage Yield) is calculated based on the
                    fees and rewards <br />
                    generated by the platform over the last 24 hours. The APY
                    displayed is <br />
                    algorithmic and subject to change. See additional
                    disclaimers in notes below.
                  </>
                }
              />
            </div>
            <div className="font-semibold text-success-foreground">
              <FormattedNumber value={reserve.supplyAPY} percent />
            </div>
          </div>
        )}

        {!supply && (
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
                value={newHealthFactor.lte(0) ? 999 : newHealthFactor}
                className={cn(
                  `text-${getLTVColor(
                    Number(newHealthFactor.lte(0) ? 999 : newHealthFactor),
                  )}`,
                )}
                maxValue={999}
              />
            </div>
          </div>
        )}
      </div>

      {allowance &&
      BigNumber(allowance.formattedAllowance).gte(BigNumber(amount ?? "0")) ? (
        <Button
          disabled={
            !amount ||
            Number(amount) <= 0 ||
            Number(amount) > Number(token.formattedBalance)
          }
          onClick={() => {
            write({
              address: lendPoolImplementationAddress,
              abi: lendPoolImplementationAbi,
              functionName: "supply",
              params: payload,
            });
          }}
        >
          {!amount ? "Enter Amount" : supply ? "Supply" : "Deposit"}
        </Button>
      ) : (
        <ApproveButton
          token={token}
          spender={lendPoolImplementationAddress}
          amount={parseUnits(`${amount ?? "0"}` as `${number}`, token.decimals)}
        />
      )}
    </div>
  );
};
