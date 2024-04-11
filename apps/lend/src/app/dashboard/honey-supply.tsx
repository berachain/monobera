import React from "react";
import { usePollWalletBalances, usePollReservesDataList } from "@bera/berajs";
import { aHoneyTokenAddress, honeyTokenAddress } from "@bera/config";
import { FormattedNumber, TokenIcon, Tooltip } from "@bera/shared-ui";

import SupplyBtn from "~/components/modals/supply-button";
import WithdrawBtn from "~/components/modals/withdraw-button";
import { beraJsConfig } from "@bera/wagmi";
import { UserTokenLoading } from "~/components/user-token-card";

export default function HoneySupply() {
  const { useSelectedWalletBalance } = usePollWalletBalances({
    config: beraJsConfig,
  });
  const aHoneyToken = useSelectedWalletBalance(aHoneyTokenAddress);
  const { useSelectedReserveData } = usePollReservesDataList();
  const honeyReserve = useSelectedReserveData(honeyTokenAddress);
  return (
    <>
      <div>
        <div className="text-2xl font-semibold leading-8">Supply Honey</div>
        <div className="text-sm text-muted-foreground">
          Honey only earns Interest.{" "}
          <b>It cannot be used as collateral to borrow more HONEY</b>
        </div>
      </div>

      {honeyReserve ? (
        <div className="relative rounded-md border border-accent bg-opacity-50 bg-gradient-to-br from-stone-50 via-amber-50 to-orange-100 px-4 py-3 dark:from-[#1A1608] dark:via-[#201E09] dark:to-[#312A09]">
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="flex flex-shrink-0 items-center gap-4 ">
              <TokenIcon address={honeyTokenAddress} size="2xl" />
              <div>
                <div className="flex items-center gap-1 text-xs font-medium leading-tight text-muted-foreground">
                  Supplied
                </div>
                <div className="h-8 text-lg font-bold uppercase">
                  <FormattedNumber
                    value={aHoneyToken?.formattedBalance ?? "0"}
                  />{" "}
                  {honeyReserve?.symbol}
                </div>
                <div className="text-xs font-medium leading-tight">
                  <FormattedNumber
                    value={
                      Number(aHoneyToken?.formattedBalance ?? "0") *
                      Number(
                        honeyReserve.formattedPriceInMarketReferenceCurrency ??
                          "0",
                      )
                    }
                    symbol="USD"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-shrink-0 flex-col">
              <div className="text-xs font-medium leading-5 text-muted-foreground">
                Earn APY{" "}
                <Tooltip>
                  <div className="max-w-[300px]">
                    Earn APY (Annual Percentage Yield) represents the annualized{" "}
                    return on supplied assets. See additional disclaimers in
                    notes below.
                  </div>
                </Tooltip>
              </div>
              <div className="text-lg font-bold text-success-foreground">
                <FormattedNumber value={honeyReserve.supplyAPY} percent />
              </div>
            </div>

            <div className="grow-1 hidden w-full items-center gap-2 md:flex md:w-fit">
              <SupplyBtn
                reserve={honeyReserve}
                className="border border-yellow-400 bg-gradient-to-br from-orange-200 to-yellow-400 text-black"
              />
              <WithdrawBtn
                reserve={honeyReserve}
                className="w-fit border border-yellow-900 bg-background bg-opacity-20 py-2 text-lg font-semibold leading-7 text-yellow-900 backdrop-blur-md hover:bg-yellow-900 hover:text-white hover:opacity-90 dark:border-yellow-600 dark:text-yellow-600 dark:hover:bg-yellow-600 dark:hover:text-white"
              />
            </div>
          </div>

          <div className="grow-1 mt-4 flex w-full items-center gap-2 md:hidden">
            <SupplyBtn
              reserve={honeyReserve}
              className="w-full border border-yellow-400 bg-gradient-to-br from-orange-200 to-yellow-400 text-black"
            />
            <WithdrawBtn
              reserve={honeyReserve}
              className="w-full border border-yellow-900 bg-background bg-opacity-20 py-2 text-lg font-semibold leading-7 text-yellow-900 backdrop-blur-md hover:bg-yellow-900 hover:text-white hover:opacity-90 dark:border-yellow-600 dark:text-yellow-600 dark:hover:bg-yellow-600 dark:hover:text-white"
            />
          </div>
        </div>
      ) : (
        <UserTokenLoading />
      )}
    </>
  );
}
