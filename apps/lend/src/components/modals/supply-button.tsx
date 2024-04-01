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
import { honeyTokenAddress, lendPoolImplementationAddress } from "@bera/config";
import {
  ApproveButton,
  FormattedNumber,
  TokenInput,
  Tooltip,
  useTxn,
} from "@bera/shared-ui";
import { useAnalytics } from "@bera/shared-ui/src/utils";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import BigNumber from "bignumber.js";
import { formatEther, formatUnits, parseUnits } from "viem";

import { getLTVColor } from "~/utils/get-ltv-color";

export default function SupplyBtn({
  token,
  disabled = false,
  variant = "primary",
  supply = false,
  className,
}: {
  token: Token;
  disabled?: boolean;
  variant?: "primary" | "outline";
  supply?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const { captureException, track } = useAnalytics();
  const { write, isLoading, ModalPortal, isSuccess } = useTxn({
    message: `${supply ? "Supplying" : "Depositing"} ${
      Number(amount) < 0.01 ? "<0.01" : Number(amount).toFixed(2)
    } ${token?.symbol}`,
    onSuccess: () => {
      track(`supply_${token.symbol.toLowerCase()}`);
      userAccountRefetch();
      reservesDataRefetch();
      userReservesRefetch();
    },
    onError: (e: Error | undefined) => {
      track(`supply_${token.symbol.toLowerCase()}_failed`);
      captureException(e);
    },
    actionType: TransactionActionType.SUPPLY,
  });
  const { isReady } = useBeraJs();

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
        {isLoading ? "Loading" : supply ? "Supply" : "Deposit"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full p-8 md:w-[480px]">
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
  amount: string | undefined;
  setAmount: (amount: string | undefined) => void;
  write: (arg0: any) => void;
}) => {
  const { account } = useBeraJs();
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { data: balance } = useSelectedAssetWalletBalance(token.address);
  const { useAllowance } = usePollAllowance({
    contract: lendPoolImplementationAddress,
    token,
  });

  const allowance = useAllowance();
  const { useSelectedReserveData } = usePollReservesDataList();
  const { data: reserveData } = useSelectedReserveData(token.address);
  const { useUserAccountData } = usePollUserAccountData();
  const { data: userAccountData } = useUserAccountData();

  const currentHealthFactor = formatEther(userAccountData?.healthFactor || "0");

  const newHealthFactor = calculateHealthFactorFromBalancesBigUnits({
    collateralBalanceMarketReferenceCurrency:
      Number(formatUnits(userAccountData.totalCollateralBase, 8)) +
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

  return (
    <div className="flex flex-col gap-6 pb-4">
      <div className="text-lg font-semibold leading-7">Supply</div>
      <div className="rounded-md border border-border bg-input">
        <TokenInput
          selected={token}
          amount={amount}
          balance={balance?.formattedBalance ?? "0"}
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
              Number(reserveData.formattedPriceInMarketReferenceCurrency)
            }
            symbol="USD"
            className="w-[200px] justify-end truncate text-right font-semibold"
          />
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="flex items-center align-middle text-muted-foreground">
            Supply APY{" "}
            <Tooltip
              text={
                <>
                  APY (Annual Percentage Yield) is calculated based on the fees
                  and rewards <br />
                  generated by the platform over the last 24 hours. The APY
                  displayed is <br />
                  algorithmic and subject to change. See additional disclaimers
                  in notes below.
                </>
              }
            />
          </div>
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
            Number(amount) > Number(balance.formattedBalance)
          }
          onClick={() => {
            write({
              address: lendPoolImplementationAddress,
              abi: lendPoolImplementationABI,
              functionName: "supply",
              params: [
                token.address,
                parseUnits(`${amount ?? "0"}` as `${number}`, token.decimals),
                account,
                parseUnits("0", token.decimals),
              ],
            });
          }}
        >
          {!amount ? "Enter Amount" : "Supply"}
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
