import { formatUsd, formatter, useBeraJs } from "@bera/berajs";
import { Badge } from "@bera/ui/badge";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatEther, formatUnits } from "viem";

import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";
import { usePollUserAccountData } from "~/hooks/usePollUserAccountData";
import { usePollUserReservesData } from "~/hooks/usePollUserReservesData";

export default function StatusBanner() {
  const { useUserAccountData } = usePollUserAccountData();
  const { data, isLoading } = useUserAccountData();
  const { isReady } = useBeraJs();

  const { useUserReservesData } = usePollUserReservesData();
  const { data: userReservesDictionary } = useUserReservesData();
  const { useReservesDataList } = usePollReservesDataList();
  const { data: reservesDictionary } = useReservesDataList();

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
    formatEther(data?.totalCollateralBase || "1"),
  );
  const totalBorrowsUSD = Number(formatEther(data?.totalDebtBase || "1"));
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
      title: "Total Sypplied",
      amount: formatUsd(Number(formatEther(data?.totalCollateralBase || "0"))),
    },
    {
      icon: <Icons.lineChart className="h-8 w-8" />,
      title: "Net APY",
      amount: netAPY === 0 ? "~~" : (netAPY * 100).toFixed(2) + "%",
    },
    {
      icon: <Icons.warning className="h-8 w-8" />,
      title: "Account Health",
      amount: (
        <div className="flex items-center gap-2">
          {Number(formatEther(data?.healthFactor || "0")) > 1000000000000
            ? "∞"
            : formatter.format(Number(formatEther(data?.healthFactor || "0")))}
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
      amount: formatUsd(formatEther(data?.availableBorrowsBase || "0")),
    },
    {
      title: "Funds Eligible for deposit",
      amount: formatUsd(formatEther(data?.totalCollateralBase || "0")),
    },
  ];

  return (
    <div className="border-boder flex w-full flex-col justify-between gap-8 rounded-18 border bg-muted p-4 md:flex-row ">
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

      <div className="hidden gap-4 lg:flex">
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
