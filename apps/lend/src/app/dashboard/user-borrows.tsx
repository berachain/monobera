import React from "react";
import { DataTable, TokenIcon } from "@bera/shared-ui";

import { type Asset } from "~/utils/types";
import RepayBtn from "~/components/modals/repay-button";
// import BorrowBtn from "~/components/modals/borrow-button";
import UserTokenCard from "~/components/user-token-card";
import { user_borrows_columns } from "./column";

export default function UserBorrows({
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
        debtBalance: 100,
        debtBalanceUS: 100 * asset.dollarValue,
        loanAPY: true ? asset.supplyStableAPR : asset.supplyVariableAPR,
        action: (
          <div className="flex gap-2">
            {/* <BorrowBtn asset={asset} /> */}
            <RepayBtn asset={asset} />
          </div>
        ),
      })),
    [assets],
  );

  return (
    <>
      <div className="text-2xl font-semibold leading-loose">Your Borrows</div>
      <div className="text-muted-foreground">
        These assets are borrowed against your supplied collateral.
      </div>
      {tableView ? (
        <DataTable columns={user_borrows_columns} data={data} />
      ) : (
        <>
          {assets.map((asset, index) => (
            <UserTokenCard asset={asset} key={index} type="user-borrow" />
          ))}
        </>
      )}
    </>
  );
}
