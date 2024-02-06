import React from "react";
import { formatter, usePollAssetWalletBalance } from "@bera/berajs";
import { TokenIcon, Tooltip } from "@bera/shared-ui";

import SupplyBtn from "~/components/modals/supply-button";
import WithdrawBtn from "~/components/modals/withdraw-button";

export default function HoneySupply({ honey }: { honey: any }) {
  const { useSelectedAssetWalletBalance } = usePollAssetWalletBalance();
  const { data: aTokenBalance } = useSelectedAssetWalletBalance(
    honey.reserveData.aTokenAddress,
  );
  if (aTokenBalance) {
    honey.formattedBalance = aTokenBalance.formattedBalance;
    honey.balance = aTokenBalance.balance;
  }

  return (
    <>
      <div>
        <div className="text-2xl font-semibold leading-8">Supply Honey</div>
        <div className="text-sm text-muted-foreground">
          Honey only earns Interest.{" "}
          <b>It cannot be used as collateral to borrow more HONEY</b>
        </div>
      </div>

      <div className="relative rounded-md border border-accent bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100 px-4 py-3 dark:from-lime-950 dark:to-yellow-950 bg-opacity-50">
        <div className="flex flex-row items-center justify-between gap-6">
          <div className="flex flex-shrink-0 items-center gap-4 ">
            <TokenIcon address={honey.address} fetch size="2xl" />
            <div>
              <div className="flex items-center gap-1 text-xs font-medium leading-tight text-muted-foreground">
                Supplied
              </div>
              <div className="h-8 text-lg font-bold uppercase">
                {formatter.format(honey.formattedBalance)} {honey.symbol}
              </div>
              <div className="text-xs font-medium leading-tight">
                $
                {formatter.format(
                  Number(honey.formattedBalance) *
                    Number(
                      honey.reserveData
                        ?.formattedPriceInMarketReferenceCurrency ?? "0",
                    ),
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-shrink-0 flex-col">
            <div className="text-xs font-medium leading-5 text-muted-foreground">
              Earn APY{" "}
              <Tooltip text="Earn APY (Annual Percentage Yield) represents the annualized return on supplied assets. See additional disclaimers in notes below." />
            </div>
            <div className="text-lg font-bold text-success-foreground">
              {(Number(honey.reserveData.supplyAPY) * 100).toFixed(2)}%
            </div>
          </div>

          <div className="grow-1 hidden w-full items-center gap-2 md:flex md:w-fit">
            <SupplyBtn
              token={honey}
              supply
              className="border border-yellow-400 bg-gradient-to-br from-orange-200 to-yellow-400 text-black"
            />
            <WithdrawBtn
              token={honey}
              className="w-fit border border-yellow-900 bg-background bg-opacity-20 py-2 text-lg font-semibold leading-7 text-yellow-900 backdrop-blur-md hover:bg-yellow-900 hover:text-white hover:opacity-90 dark:border-yellow-600 dark:text-yellow-600 dark:hover:bg-yellow-600 dark:hover:text-white"
            />
          </div>
        </div>

        <div className="grow-1 mt-4 flex w-full items-center gap-2 md:hidden">
          <SupplyBtn
            token={honey}
            supply
            className="w-full border border-yellow-400 bg-gradient-to-br from-orange-200 to-yellow-400 text-black"
          />
          <WithdrawBtn
            token={honey}
            className="w-full border border-yellow-900 bg-background bg-opacity-20 py-2 text-lg font-semibold leading-7 text-yellow-900 backdrop-blur-md hover:bg-yellow-900 hover:text-white hover:opacity-90 dark:border-yellow-600 dark:text-yellow-600 dark:hover:bg-yellow-600 dark:hover:text-white"
          />
        </div>
      </div>
    </>
  );
}
