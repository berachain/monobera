import {
  formatUsd,
  formatter,
  useBeraJs,
  usePollAssetWalletBalance,
  usePollBgtRewardsForAddress,
  usePollReservesDataList,
  usePollUserAccountData,
  usePollUserReservesData,
} from "@bera/berajs";
import { lendHoneyDebtTokenAddress } from "@bera/config";
import { Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";

import { getLTVColor } from "~/utils/get-ltv-color";
import { getEligibleDepositAmount } from "~/utils/lendTokenHelper";
import { RiskDetails } from "./risk-details";

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
  const { useBgtApr } = usePollBgtRewardsForAddress({
    address: lendHoneyDebtTokenAddress,
  });
  const bgtApr = useBgtApr(
    Number(
      formatUnits(
        data?.totalDebtBase ?? 0n,
        baseCurrency?.marketReferenceCurrencyDecimals ?? 8,
      ),
    ),
  );

  let positiveProportion = 0;
  let negativeProportion = 0;
  if (reservesDictionary && userReservesDictionary) {
    Object.keys(reservesDictionary).forEach((address) => {
      // need to work on
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
  negativeProportion -=
    Number(
      formatUnits(
        data?.totalDebtBase ?? 0n,
        baseCurrency?.marketReferenceCurrencyDecimals ?? 8,
      ),
    ) * Number(bgtApr ?? "0");

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
      title: (
        <div className="flex items-center justify-center">
          Net APY{" "}
          <Tooltip
            text={
              <>
                Net APY (Annual Percentage Yield) is the combined effect of all <br/>
                supply and borrow positions on net worth, including rewards and <br/>
                fees. It is possible to have a negative net APY if debt APY is <br/>
                higher than supply APY + Rewards. See additional disclaimers in <br/>
                notes below.
              </>
            }
          />
        </div>
      ),
      amount: netAPY === 0 ? "~~" : `${(netAPY * 100).toFixed(2)}%`,
    },
    {
      icon: <Icons.warning className="h-8 w-8" />,
      title: "Account Health",
      amount: (
        <div
          className={cn(
            "flex items-center gap-2",
            `text-${getLTVColor(
              Number(formatUnits(data?.healthFactor || "0", 18)),
            )}`,
          )}
        >
          {Number(formatUnits(data?.healthFactor || "0", 18)) > 1000000000000
            ? "∞"
            : formatter.format(
                Number(formatUnits(data?.healthFactor || "0", 18)),
              )}
          <RiskDetails />
        </div>
      ),
    },
  ];
  const info = [
    {
      title: "You can borrow up to",
      amount: formatUsd(
        formatUnits(
          data?.availableBorrowsBase || "0",
          baseCurrency?.marketReferenceCurrencyDecimals ?? 8,
        ),
      ),
    },
    {
      title: "Funds eligible for deposit",
      amount: formatUsd(
        getEligibleDepositAmount(reservesDictionary ?? {}, balanceToken ?? []),
      ),
    },
  ];

  return (
    <div>
      <h2 className="mb-4 text-3xl font-semibold leading-9">Account Status</h2>
      <div className="border-boder flex w-full flex-col justify-between gap-8 rounded-md border bg-muted p-4 md:flex-row ">
        <div className="flex flex-col gap-8 md:flex-row ">
          {status.map((item, index) => (
            <div
              key={index.toString() + item.title}
              className="flex w-fit gap-4"
            >
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
    </div>
  );
}
