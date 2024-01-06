import { useEffect, useState } from "react";
import { calculateHealthFactorFromBalancesBigUnits } from "@aave/math-utils";
import {
  TransactionActionType,
  formatter,
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
import { ApproveButton, TokenInput, Tooltip, useTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { formatEther, formatUnits, parseUnits } from "viem";

import { getLTVColor } from "~/utils/get-ltv-color";

export default function SupplyBtn({
  token,
  disabled = false,
  variant = "primary",
  supply = false,
}: {
  token: Token;
  disabled?: boolean;
  variant?: "primary" | "outline";
  supply?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string | undefined>(undefined);
  const { write, isLoading, ModalPortal, isSuccess } = useTxn({
    message: `${supply ? "Supplying" : "Depositing"} ${amount} ${
      token?.symbol
    }`,
    onSuccess: () => {
      userAccountRefetch();
      reservesDataRefetch();
      userReservesRefetch();
    },
    actionType: TransactionActionType.SUPPLY,
  });
  const { isReady } = useBeraJs();

  const { refetch: userAccountRefetch } = usePollUserAccountData();
  const { refetch: reservesDataRefetch } = usePollReservesDataList();
  const { refetch: userReservesRefetch } = usePollUserReservesData();

  useEffect(() => setOpen(false), [isSuccess]);
  return (
    <>
      {ModalPortal}
      <Button
        onClick={() => setOpen(true)}
        className="w-full text-sm leading-5 xl:w-fit"
        disabled={disabled || isLoading || !isReady}
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

  const currentHealthFactor =
    Number(formatEther(userAccountData?.healthFactor || "0")) > 1000000000000
      ? "∞"
      : Number(formatEther(userAccountData.healthFactor)).toFixed(2);

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
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Supply</div>
      <div className="rounded-md border border-border bg-input">
        <TokenInput
          selected={token}
          amount={amount}
          balance={balance?.formattedBalance ?? "0"}
          showExceeding={true}
          selectable={false}
          setAmount={(amount) => setAmount(amount as `${number}`)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between  text-sm leading-tight">
          <div className="text-muted-foreground ">Estimated Value</div>
          <div className="font-semibold">
            $
            {formatter.format(
              Number(amount ?? "0") *
                Number(reserveData.formattedPriceInMarketReferenceCurrency),
            )}
          </div>
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
                  algorithmic and subject to change
                </>
              }
            />
          </div>
          <div className="font-semibold text-success-foreground">
            {(Number(reserveData.supplyAPY) * 100).toFixed(2)}%
          </div>
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground ">LTV Health Ratio</div>
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
              {currentHealthFactor}{" "}
            </span>
            <Icons.moveRight className="inline-block h-6 w-6" />
            <span
              className={cn(`text-${getLTVColor(Number(newHealthFactor))}`)}
            >
              {Number(newHealthFactor.toFixed(2)) < 0
                ? "∞"
                : newHealthFactor.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {allowance &&
      Number(allowance.formattedAllowance) >= Number(amount ?? "0") ? (
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
