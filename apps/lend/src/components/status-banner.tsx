import {
  formatUsd,
  formatter,
  useBeraJs,
  usePollAssetWalletBalance,
  usePollReservesDataList,
  usePollUserAccountData,
  usePollUserReservesData,
} from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
// import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";

import { getEligibleDepositAmount } from "~/utils/lendTokenHelper";

export default function StatusBanner() {
  const { useUserAccountData } = usePollUserAccountData();
  const { data, isLoading } = useUserAccountData();
  const { isReady } = useBeraJs();
  const { useUserReservesData } = usePollUserReservesData();
  const { data: userReservesDictionary } = useUserReservesData();
  const { useReservesDataList, useBaseCurrencyData } =
    usePollReservesDataList();
  const { data: reservesDictionary } = useReservesDataList();
  const { data: baseCurrency } = useBaseCurrencyData();
  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { data: balanceToken } = useCurrentAssetWalletBalances();
  let positiveProportion = 0;
  let negativeProportion = 0;
  if (reservesDictionary && userReservesDictionary) {
    Object.keys(reservesDictionary).forEach((address) => {
      if (reservesDictionary[address] && userReservesDictionary[address]) {
        const useReserve = userReservesDictionary[address];
        const reserve = reservesDictionary[address];
        positiveProportion +=
          Number(
            formatUnits(useReserve.scaledATokenBalance, reserve.decimals),
          ) *
          Number(reserve.supplyAPY) *
          Number(reserve.formattedPriceInMarketReferenceCurrency);
        negativeProportion +=
          Number(formatUnits(useReserve.scaledVariableDebt, reserve.decimals)) *
          Number(reserve.variableBorrowAPY) *
          Number(reserve.formattedPriceInMarketReferenceCurrency);
      }
    });
  }
  const totalLiquidityUSD = Number(
    formatUnits(
      data?.totalCollateralBase || "1",
      baseCurrency?.marketReferenceCurrencyDecimals ?? 8,
    ),
  );
  const totalBorrowsUSD = Number(
    formatUnits(
      data?.totalDebtBase || "1",
      baseCurrency?.marketReferenceCurrencyDecimals ?? 8,
    ),
  );
  const netWorthUSD = totalLiquidityUSD - totalBorrowsUSD;
  const earnedAPY = positiveProportion / totalLiquidityUSD;
  const debtAPY = negativeProportion / totalBorrowsUSD;
  const netAPY =
    ((earnedAPY || 0) * totalLiquidityUSD) /
      (netWorthUSD !== 0 ? netWorthUSD : 1) -
    ((debtAPY || 0) * totalBorrowsUSD) / (netWorthUSD !== 0 ? netWorthUSD : 1);
  const status = [
    {
      icon: <Icons.wallet className="h-8 w-8" />,
      title: "Total Supplied",
      amount: formatUsd(
        Number(
          formatUnits(
            data?.totalCollateralBase || "0",
            baseCurrency?.marketReferenceCurrencyDecimals ?? 8,
          ),
        ),
      ),
    },
    {
      icon: <Icons.lineChart className="h-8 w-8" />,
      title: "Net PRR",
      amount: netAPY === 0 ? "~~" : (netAPY * 100).toFixed(2) + "%",
    },
    {
      icon: <Icons.warning className="h-8 w-8" />,
      title: "Account Health",
      amount: (
        <div className="flex items-center gap-2">
          {Number(formatUnits(data?.healthFactor || "0", 18)) > 1000000000000
            ? "∞"
            : formatter.format(
                Number(formatUnits(data?.healthFactor || "0", 18)),
              )}
          <Badge variant={"info"} className="rounded-md py-0 font-medium">
            Risk Details
          </Badge>
        </div>
      ),
    },
  ];
  const info = [
    {
      title: "You can Borrow Upto",
      amount: formatUsd(
        formatUnits(
          data?.availableBorrowsBase || "0",
          baseCurrency?.marketReferenceCurrencyDecimals ?? 8,
        ),
      ),
    },
    {
      title: "Funds Eligible for deposit",
      amount: formatUsd(
        getEligibleDepositAmount(reservesDictionary ?? {}, balanceToken ?? []),
      ),
    },
  ];

  return (
    <div className="border-boder flex w-full flex-col justify-between gap-8 rounded-md border bg-muted p-4 md:flex-row ">
      <div className="flex flex-col gap-8 md:flex-row ">
        {status.map((item, index) => (
          <div key={index + item.title} className="flex w-fit gap-4">
            <div className="w-fit rounded-lg border p-2 text-muted-foreground">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <div className="text-sm font-normal leading-normal text-muted-foreground">
                {item.title}
              </div>
              {isLoading ? (
                <Skeleton className="h-6 w-full" />
              ) : (
                <div className="h-6 text-xl font-semibold md:text-2xl">
                  {isReady ? item.amount : "~~"}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden gap-4 xl:flex">
        {info.map((item, index) => (
          <div key={index + item.title} className="flex flex-col">
            <div className="text-sm font-normal leading-normal text-muted-foreground">
              {item.title}
            </div>

            {isLoading ? (
              <Skeleton className="h-6 w-full" />
            ) : (
              <div className="h-6 w-full text-left text-lg font-semibold xl:text-right">
                {isReady ? item.amount : "~~"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
