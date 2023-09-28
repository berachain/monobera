import React from "react";
import { DataTable, TokenIcon } from "@bera/shared-ui";

import { type Asset } from "~/utils/types";
import SupplyBtn from "~/components/modals/supply-button";
import WithdrawBtn from "~/components/modals/withdraw-button";
import UserTokenCard from "~/components/user-token-card";
import { user_supply_columns } from "./column";

export default function UserSupply({
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
        walletBalance: 100,
        walletBalanceUS: 100 * asset.dollarValue,
        action: (
          <div className="flex gap-2">
            <SupplyBtn asset={asset} />
            <WithdrawBtn asset={asset} />
          </div>
        ),
      })),
    [assets],
  );

  return (
    <>
      <div className="text-2xl font-semibold leading-loose">Your Supplies</div>
      <div className=" text-muted-foreground">
        You must supply in order to borrow funds.
      </div>
      {tableView ? (
        <DataTable columns={user_supply_columns} data={data} />
      ) : (
        <>
          {assets.map((asset, index) => (
            <UserTokenCard asset={asset} key={index} type="user-supply" />
          ))}
        </>
      )}
    </>
  );
}
