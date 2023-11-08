import { useEffect, useState } from "react";
import Image from "next/image";
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
import { TokenIcon, Tooltip, useTxn } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Dialog, DialogContent } from "@bera/ui/dialog";
import { Icons } from "@bera/ui/icons";
import { Input } from "@bera/ui/input";
import { formatUnits, parseEther, parseUnits } from "viem";

export default function BorrowBtn({
  token,
  disabled = false,
  variant = "primary",
}: {
  token: Token;
  disabled?: boolean;
  variant?: "primary" | "outline";
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
        className="w-full text-sm leading-5 xl:w-fit"
        disabled={disabled || isLoading || !isReady}
        variant={variant}
      >
        {isLoading ? "Loading" : "Borrow"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-fit p-8">
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
    parseEther(borrowPower as `${number}`) >
    parseEther(availableLiquidity as `${number}`)
      ? availableLiquidity
      : borrowPower;

  const currentHealthFactor =
    BigInt(userAccountData?.healthFactor || "0") >
    parseUnits(
      "1000000000000",
      18,
    )
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
    <div className="flex flex-col gap-6">
      <div className="text-lg font-semibold leading-7">Borrow</div>
      <Image
        src={"/supply.png"}
        alt="supply-img"
        className="h-36 w-96"
        width={100}
        height={100}
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1 text-sm font-semibold leading-tight">
          Amount <Tooltip text="amount" />{" "}
        </div>
        <Input
          type="number"
          id="forum-discussion-link"
          placeholder="0.0"
          endAdornment={
            <div className="flex items-center gap-1">
              <TokenIcon token={token} size={"md"} />
              {token.symbol}
            </div>
          }
          value={amount}
          onChange={(e) =>
            setAmount(Number(e.target.value) === 0 ? undefined : e.target.value)
          }
        />
        <div className="flex h-3 w-full items-center justify-end gap-1 text-[10px] text-muted-foreground">
          Availabe to borrow: {Number(borrowAmout).toFixed(2)}
          <span
            className="underline hover:cursor-pointer"
            onClick={() => setAmount(borrowAmout)}
          >
            MAX
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground">LTV Health Ratio</div>
          <div className="flex items-center gap-1 font-semibold">
            {currentHealthFactor === "∞"
              ? currentHealthFactor
              : Number(currentHealthFactor).toFixed(2)}{" "}
            <Icons.moveRight className="inline-block h-6 w-6" />{" "}
            {Number(newHealthFactor.toFixed(2)) < 0
              ? "∞"
              : newHealthFactor.toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground">Estimated Value</div>
          <div className="font-semibold">
            $
            {formatter.format(
              Number(amount ?? "0") *
                Number(reserveData?.formattedPriceInMarketReferenceCurrency),
            )}
          </div>
        </div>
        <div className="flex justify-between text-sm leading-tight">
          <div className="text-muted-foreground">Variable Borrow PRR</div>
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
