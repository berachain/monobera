import React from "react";
import { useCurrentAssetWalletBalances } from "@bera/berajs";
import { Switch } from "@bera/ui/switch";

import { getAssetList } from "~/utils/lendTokenHelper";
import { usePollReservesDataList } from "~/hooks/usePollReservesDataList";
import { usePollReservesPrices } from "~/hooks/usePollReservesPrices";
import AvailableBorrows from "./available-borrows";
import AvailableSupply from "./available-supply";
import PageLoading from "./page-loading";
import UserBorrows from "./user-borrows";
import UserSupply from "./user-supply";

export function Dashboard({
  tableView,
  setUseTableView,
}: {
  tableView: boolean;
  setUseTableView: (tableView: boolean) => void;
}) {
  const { useReservesPrices } = usePollReservesPrices();
  const { data: reservesPrices, isLoading: isReservesPricesLoading } =
    useReservesPrices();
  const { useReservesDataList } = usePollReservesDataList();
  const { data: reservesDictionary, isLoading: isReservesDataLoading } =
    useReservesDataList();
  const BalanceToken = useCurrentAssetWalletBalances();
  const assetsDictionary = getAssetList(
    reservesDictionary ?? {},
    BalanceToken ?? [],
    reservesPrices ?? {},
  );

  return (
    <div className="flex flex-col gap-9 md:gap-6">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold">Account Status</h2>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <p className="text-sm text-muted-foreground">Switch to table view</p>
          <Switch
            id="use-tableview"
            className="hidden lg:block"
            checked={tableView}
            onCheckedChange={(checked: boolean) => setUseTableView(checked)}
          />
        </div>
      </div>

      {/* need refactor after data pulling method update */}
      {BalanceToken &&
      BalanceToken.length > 0 &&
      !isReservesPricesLoading &&
      !isReservesDataLoading ? (
        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="flex flex-1 flex-col gap-4">
              <UserSupply
                {...{ assets: assetsDictionary.supplied, tableView }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <UserBorrows
                {...{ assets: assetsDictionary.borrowed, tableView }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="flex flex-1 flex-col gap-4">
              <AvailableSupply
                {...{ assets: assetsDictionary.available_supply, tableView }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <AvailableBorrows
                {...{ assets: assetsDictionary.available_borrow, tableView }}
              />
            </div>
          </div>
        </>
      ) : (
        <PageLoading />
      )}
    </div>
  );
}
