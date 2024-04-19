import React from "react";
import {
  defaultBeraConfig,
  usePollReservesDataList,
  usePollWalletBalances,
} from "@bera/berajs";

import AvailableDeposit from "./available-deposit";
import HoneyBorrow from "./honey-borrow";
import HoneySupply from "./honey-supply";
import PageLoading from "./page-loading";
import UserDeposits from "./user-deposits";

export function Dashboard() {
  const { isLoading: isReservesDataLoading } = usePollReservesDataList({
    config: defaultBeraConfig,
  });
  const { isLoading: isWalletBalanceLoading } = usePollWalletBalances({
    config: defaultBeraConfig,
  });
  const isLoading = isReservesDataLoading || isWalletBalanceLoading;
  return (
    <div className="flex flex-col gap-9 md:gap-6">
      {!isLoading ? (
        <>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="flex flex-1 flex-col gap-4">
              <UserDeposits />
              <AvailableDeposit />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <HoneySupply />
              <HoneyBorrow />
            </div>
          </div>
        </>
      ) : (
        <PageLoading />
      )}
    </div>
  );
}
