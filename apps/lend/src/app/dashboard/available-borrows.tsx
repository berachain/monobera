import React from "react";
import {
  usePollReservesDataList,
  usePollReservesPrices,
  usePollUserAccountData,
} from "@bera/berajs";
import { DataTable } from "@bera/shared-ui";
import BigNumber from "bignumber.js";
import { formatUnits, parseUnits } from "viem";

import UserTokenCard from "~/components/user-token-card";
import { available_borrows_columns } from "./column";

export default function AvailableBorrows({
  assets,
  tableView = false,
}: {
  assets: any[];
  tableView?: boolean;
}) {
  const { useBaseCurrencyData } = usePollReservesDataList();
  const { data: baseCurrencyData } = useBaseCurrencyData();
  const { useReservesPrices } = usePollReservesPrices();
  const { data: reservesPrices } = useReservesPrices();
  const { useUserAccountData } = usePollUserAccountData();
  const { data } = useUserAccountData();
  assets.forEach((asset) => {
    if (reservesPrices && data && reservesPrices[asset.address]) {
      const tokenPrice = parseUnits(
        asset.reserveData.formattedPriceInMarketReferenceCurrency,
        baseCurrencyData?.marketReferenceCurrencyDecimals ?? 8,
      );
      asset.balance = data.availableBorrowsBase / tokenPrice;
      asset.formattedBalance = BigNumber(
        formatUnits(
          data.availableBorrowsBase,
          baseCurrencyData?.marketReferenceCurrencyDecimals ?? 8,
        ),
      )
        .dividedBy(asset.reserveData.formattedPriceInMarketReferenceCurrency)
        .toString();
    }
  });

  return (
    <>
      <div className="text-2xl font-semibold leading-loose">
        Available Borrows
      </div>
      {
        <>
          {tableView ? (
            <DataTable columns={available_borrows_columns} data={assets} />
          ) : (
            <>
              {assets.map((asset, index) => (
                <UserTokenCard asset={asset} key={index} type="borrow" />
              ))}
            </>
          )}
        </>
      }
    </>
  );
}
