import React from "react";
import { DataTable, TokenIcon } from "@bera/shared-ui";

import { type Asset } from "~/utils/types";
import InfoButton from "~/components/info-button";
import BorrowBtn from "~/components/modals/borrow-button";
import UserTokenCard from "~/components/user-token-card";
import { available_borrows_columns } from "./column";

export default function AvailableBorrows({
  assets,
  tableView = false,
}: {
  assets: Asset[];
  tableView?: boolean;
}) {
  const data = React.useMemo(
    () =>
      assets.map((asset) => ({
        ...asset,
        market: (
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            <TokenIcon address={asset.asset_address} fetch size="lg" />
            {asset.symbol}
          </div>
        ),
        avaliable: 100,
        avaliableUS: 100 * asset.dollarValue,
        action: (
          <div className="flex gap-2">
            <BorrowBtn asset={asset} />
            <InfoButton address={asset.asset_address} />
          </div>
        ),
      })),
    [assets],
  );

  return (
    <>
      <div className="text-2xl font-semibold leading-loose">
        Available Borrows
      </div>
      {
        <>
          {tableView ? (
            <DataTable columns={available_borrows_columns} data={data} />
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
