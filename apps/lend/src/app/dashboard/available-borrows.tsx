import React from "react";
import { DataTable } from "@bera/shared-ui";
import { parseEther } from "viem";

import UserTokenCard from "~/components/user-token-card";
import { usePollReservesPrices } from "~/hooks/usePollReservesPrices";
import { usePollUserAccountData } from "~/hooks/usePollUserAccountData";
import { available_borrows_columns } from "./column";

export default function AvailableBorrows({
  assets,
  tableView = false,
}: {
  assets: any[];
  tableView?: boolean;
}) {
  const { useReservesPrices } = usePollReservesPrices();
  const { data: reservesPrices } = useReservesPrices();
  const { useUserAccountData } = usePollUserAccountData();
  const { data } = useUserAccountData();
  assets.forEach((asset) => {
    if (reservesPrices && data && reservesPrices[asset.address]) {
      const tokenPrice = parseEther(
        asset.reserveData.formattedPriceInMarketReferenceCurrency,
      );
      asset.balance = data.availableBorrowsBase / tokenPrice;
      asset.formattedBalance = BigInt(asset.balance).toString();
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
