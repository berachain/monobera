import React from "react";
import { DataTable } from "@bera/shared-ui";

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
    if (
      reservesPrices &&
      data &&
      reservesPrices[asset.address] &&
      data.availableBorrowsBase
    ) {
      asset.balance =
        data.availableBorrowsBase / reservesPrices[asset.address].price;
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
