import React from "react";
import {
  usePollAssetWalletBalance,
  usePollReservesDataList,
  usePollUserReservesData,
} from "@bera/berajs";

import { getAssetList } from "~/utils/lendTokenHelper";
import AvailableBorrows from "./available-borrows";
import AvailableSupply from "./available-supply";
import PageLoading from "./page-loading";
import UserBorrows from "./user-borrows";
import UserSupply from "./user-supply";

export function Dashboard() {
  const { useReservesDataList } = usePollReservesDataList();
  const { data: reservesDictionary, isLoading: isReservesDataLoading } =
    useReservesDataList();
  const { useUserReservesData } = usePollUserReservesData();
  const { data: userReservesData, isLoading: isUserReserveDataLoading } =
    useUserReservesData();
  const { useCurrentAssetWalletBalances } = usePollAssetWalletBalance();
  const { data: BalanceToken } = useCurrentAssetWalletBalances();

  const assetsDictionary = getAssetList(
    reservesDictionary ?? {},
    userReservesData ?? {},
    BalanceToken ?? [],
  );

  return (
    <div className="flex flex-col gap-9 md:gap-6">
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold">Account Status</h2>
        </div>
      </div>

      {BalanceToken &&
      BalanceToken.length > 0 &&
      !isReservesDataLoading &&
      !isUserReserveDataLoading ? (
        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="flex flex-1 flex-col gap-4">
              <UserSupply {...{ assets: assetsDictionary.supplied }} />
              <AvailableSupply
                {...{ assets: assetsDictionary.available_supply }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              {/* this is not user borrow anymore, its supply honey :) */}
              <UserBorrows {...{ assets: assetsDictionary.borrowed }} />
              {/* this is not avaliable borrow anymore, its borrow honey :p */}
              {/* feel free to rename/refactor, i am lazy zzz */}
              <AvailableBorrows
                {...{ assets: assetsDictionary.available_borrow }}
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
