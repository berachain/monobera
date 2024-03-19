import { usePollAssetWalletBalance } from "@bera/berajs";
import { honeyAddress } from "@bera/config";
import { FormattedNumber, TokenIcon, Tooltip } from "@bera/shared-ui";
import { Alert, AlertTitle } from "@bera/ui/alert";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";

import AssetInfo from "./asset-info";
import Card from "./card";
import BorrowBtn from "./modals/borrow-button";
import RepayBtn from "./modals/repay-button";
import SupplyBtn from "./modals/supply-button";
import WithdrawBtn from "./modals/withdraw-button";

export default function UserTokenCard({
  asset,
  type,
}: {
  asset: any;
  type: "user-supply" | "user-borrow" | "supply" | "borrow";
  // no more "user-borrow" and "borrow", i just dont wanna delete them all, they are all my babies ;-;
  // feel free to delete them you baby killer
}) {
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { data: debtTokenBalance } = useSelectedAssetWalletBalance(
    asset.reserveData.variableDebtTokenAddress,
  );
  const { data: aTokenBalance } = useSelectedAssetWalletBalance(
    asset.reserveData.aTokenAddress,
  );
  let balance;
  if (type === "borrow") {
    balance =
      Number(
        formatUnits(
          asset.reserveData?.availableLiquidity ?? "0",
          asset.decimals,
        ),
      ) > Number(asset.formattedBalance)
        ? asset.formattedBalance
        : formatUnits(
            asset.reserveData?.availableLiquidity ?? "0",
            asset.decimals,
          );
  } else if (type === "user-borrow") {
    if (debtTokenBalance) {
      asset.formattedBalance = debtTokenBalance.formattedBalance;
      asset.balance = debtTokenBalance.balance;
    }
    balance = debtTokenBalance
      ? debtTokenBalance.formattedBalance
      : asset.formattedBalance;
  } else if (type === "user-supply") {
    if (aTokenBalance) {
      asset.formattedBalance = aTokenBalance.formattedBalance;
      asset.balance = aTokenBalance.balance;
    }
    balance = aTokenBalance
      ? aTokenBalance.formattedBalance
      : asset.formattedBalance;
  } else {
    balance = asset.formattedBalance;
  }

  return (
    <Card key={asset.symbol} className="bg-muted p-4">
      <div className="flex flex-row items-center justify-between gap-6">
        <div className="flex flex-shrink-0 items-center gap-4 ">
          <TokenIcon address={asset.address} size="2xl" />
          <div>
            <div className="flex items-center gap-1 text-xs font-medium leading-tight text-muted-foreground">
              {type === "user-supply" && "Deposited"}
              {type === "user-borrow" && <>{asset.symbol} Debt</>}
              {type === "supply" && (
                <>
                  <Icons.wallet className="relative h-3 w-3 rounded-lg" />
                  Wallet Balance
                </>
              )}
              {type === "borrow" && <>{asset.symbol} Avaliable</>}
            </div>

            <div className="flex h-8 items-center gap-1 text-lg font-bold uppercase">
              <FormattedNumber value={balance} symbol={asset.symbol} />
              <Tooltip text={<AssetInfo asset={asset} />} />
            </div>
            <div className="text-xs font-medium leading-tight">
              <FormattedNumber
                symbol="USD"
                value={
                  Number(balance) *
                  Number(
                    asset.reserveData
                      ?.formattedPriceInMarketReferenceCurrency ?? "0",
                  )
                }
              />
            </div>
          </div>
        </div>

        {(type === "user-supply" || type === "supply") &&
          asset.address === honeyAddress && (
            <div className="flex flex-shrink-0 flex-col">
              <div className="text-xs font-medium leading-5 text-muted-foreground">
                Supply APY{" "}
                <Tooltip
                  text={
                    <>
                      Supply APY (Annual Percentage Yield) represents the <br />
                      annualized return on supplied assets. See additional{" "}
                      <br />
                      disclaimers in notes below.
                    </>
                  }
                />
              </div>
              <div className="text-lg font-bold text-success-foreground">
                <FormattedNumber
                  value={asset.reserveData?.supplyAPY ?? 0}
                  percent
                />
              </div>
            </div>
          )}

        {type === "borrow" && (
          <div className="flex flex-shrink-0 flex-col">
            <div className="text-xs font-medium leading-5 text-muted-foreground">
              Variable APY{" "}
              <Tooltip
                text={
                  <>
                    Variable interest rate will fluctuate based on the market{" "}
                    <br />
                    conditions. See additional disclaimers in notes below.
                  </>
                }
              />
            </div>
            <div className="text-lg font-bold text-warning-foreground">
              <FormattedNumber
                value={asset.reserveData?.variableBorrowAPY ?? 0}
                percent
              />
            </div>
          </div>
        )}

        {type === "user-borrow" && (
          <div className="flex flex-shrink-0 flex-col">
            <div className="text-xs font-medium leading-5 text-muted-foreground">
              Loan APY{" "}
              <Tooltip text="Variable interest rate will fluctuate based on the market conditions. See additional disclaimers in notes below." />
            </div>
            <div className="text-lg font-bold text-warning-foreground">
              <FormattedNumber
                value={asset.reserveData.variableBorrowAPY}
                percent
              />
            </div>
          </div>
        )}

        <div className="grow-1 hidden w-full items-center gap-2 md:flex md:w-fit">
          {(type === "user-supply" || type === "supply") && (
            <SupplyBtn token={asset} supply={asset.address === honeyAddress} />
          )}
          {type === "user-supply" && <WithdrawBtn token={asset} />}
          {(type === "user-borrow" || type === "borrow") && (
            <BorrowBtn token={asset} />
          )}
          {type === "user-borrow" && <RepayBtn token={asset} />}
          {/* {(type === "borrow" || type === "supply") && (
            <InfoButton address={asset.address} />
          )} */}
        </div>
      </div>
      <div className="grow-1 mt-8 flex w-full items-center gap-2 md:hidden md:w-fit">
        {(type === "user-supply" || type === "supply") && (
          <SupplyBtn token={asset} supply={asset.address === honeyAddress} />
        )}
        {type === "user-supply" && <WithdrawBtn token={asset} />}
        {(type === "user-borrow" || type === "borrow") && (
          <BorrowBtn token={asset} />
        )}
        {type === "user-borrow" && <RepayBtn token={asset} />}
        {/* {(type === "borrow" || type === "supply") && (
          <InfoButton address={asset.address} />
        )} */}
      </div>
      {type === "borrow" && Number(asset.formattedBalance) === 0 && (
        <Alert variant="warning" className="mt-4">
          <AlertTitle>
            {" "}
            <Icons.info className="mr-1 inline-block h-4 w-4" />
            To borrow, you need to provide assets that are not HONEY
          </AlertTitle>
          The amount you can borrow is based on the assets you have provided,
          excluding HONEY.
        </Alert>
      )}
      {type === "supply" && asset.address === honeyAddress && (
        <Alert variant="warning" className="mt-4">
          <AlertTitle>
            {" "}
            <Icons.info className="mr-1 inline-block h-4 w-4" />
            Cannot Borrow Against HONEY
          </AlertTitle>
          You can only earn interest on HONEY deposits. You cannot borrow
          against them.
        </Alert>
      )}
      {type === "user-borrow" && asset.address === honeyAddress && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>
            {" "}
            <Icons.info className="mr-1 inline-block h-4 w-4" />
            Must Repay Entire Loan to Withdraw Collateral
          </AlertTitle>
          Please be sure to pay your entire honey debt, you will not be able to
          withdraw your collateral until you repay your honey loan.
        </Alert>
      )}
      {type === "borrow" &&
        Number(
          formatUnits(
            asset.reserveData?.availableLiquidity ?? "0",
            asset.decimals,
          ),
        ) === 0 && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>
              {" "}
              <Icons.info className="mr-1 inline-block h-4 w-4" />
              Borrow Cap Reached
            </AlertTitle>
            Borrowing more HONEY is not possible right now, as the Pool has
            reached its maximum borrowing capacity. You&apos;ll be able to
            borrow more HONEY when the pool ratio is healthier.
          </Alert>
        )}
    </Card>
  );
}

export function UserTokenLoading() {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border px-6 py-4">
      <div className=" flex gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-[92px]" />
          <Skeleton className="h-5 w-[128px]" />
          <Skeleton className="h-3 w-[92px]" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-3 w-[128px]" />
        <Skeleton className="h-5 w-[92px]" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-[112px]" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
  );
}
