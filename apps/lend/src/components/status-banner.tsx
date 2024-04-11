import {
  useBeraJs,
  usePollAssetWalletBalance,
  usePollBgtRewardsForAddress,
  usePollReservesDataList,
  usePollUserAccountData,
} from "@bera/berajs";
import { lendHoneyDebtTokenAddress } from "@bera/config";
import { FormattedNumber, Tooltip } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Icons } from "@bera/ui/icons";
import { Skeleton } from "@bera/ui/skeleton";
import { formatUnits } from "viem";

import { getLTVColor } from "~/utils/get-ltv-color";
import { getEligibleDepositAmount } from "~/utils/lendTokenHelper";
import { RiskDetails } from "./risk-details";

export default function StatusBanner() {
  const { useUserAccountData, isLoading } = usePollUserAccountData();
  const data = useUserAccountData();

  const { isReady } = useBeraJs();

  const { useReservesDataList, useBaseCurrencyData } =
    usePollReservesDataList();
  const reservesDataList = useReservesDataList();
  const baseCurrency = useBaseCurrencyData();

  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const balanceToken = useCurrentAssetWalletBalances();

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

  reservesDataList.forEach((reserve: any) => {
    const atoken = balanceToken.find(
      (token: any) => token.address === reserve.aTokenAddress,
    );
    if (atoken) {
      positiveProportion +=
        Number(atoken.formattedBalance) *
        Number(reserve.supplyAPY) *
        Number(reserve.formattedPriceInMarketReferenceCurrency);
    }
    const debtToken = balanceToken.find(
      (token: any) => token.address === reserve.variableDebtTokenAddress,
    );
    if (debtToken) {
      negativeProportion +=
        Number(debtToken.formattedBalance) *
        Number(reserve.variableBorrowAPY) *
        Number(reserve.formattedPriceInMarketReferenceCurrency);
    }
  });

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
      amount: (
        <FormattedNumber
          value={formatUnits(
            data?.totalCollateralBase || "0",
            baseCurrency?.marketReferenceCurrencyDecimals ?? 8,
          )}
          symbol="USD"
          compact={false}
        />
      ),
    },
    {
      icon: <Icons.lineChart className="h-8 w-8" />,
      title: (
        <div className="flex items-center">
          Net APY{" "}
          <Tooltip>
            <div className="max-w-[350px]">
              Net APY (Annual Percentage Yield) is the combined effect of all{" "}
              supply and borrow positions on net worth, including rewards and{" "}
              fees. It is possible to have a negative net APY if debt APY is{" "}
              higher than supply APY + Rewards. See additional disclaimers in{" "}
              notes below.
            </div>
          </Tooltip>
        </div>
      ),
      amount: netAPY === 0 ? "~~" : <FormattedNumber value={netAPY} percent />,
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
          <FormattedNumber
            value={formatUnits(data?.healthFactor || "0", 18)}
            maxValue={999}
          />
          <RiskDetails />
        </div>
      ),
    },
  ];
  const info = [
    {
      title: "You can borrow up to",
      amount: (
        <FormattedNumber
          value={formatUnits(
            data?.availableBorrowsBase || "0",
            baseCurrency?.marketReferenceCurrencyDecimals ?? 8,
          )}
          compact={false}
          symbol="USD"
        />
      ),
    },
    {
      title: "Funds eligible for deposit",
      amount: (
        <FormattedNumber
          value={getEligibleDepositAmount(
            reservesDataList ?? [],
            balanceToken ?? [],
          )}
          compact={false}
          symbol="USD"
        />
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
