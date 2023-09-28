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

  // const data = React.useMemo(
  //   () =>
  //     markets.slice(2, 4).map((market) => ({
  //       market: (
  //         <div className="flex w-[100px] items-center gap-2 text-sm font-medium leading-none">
  //           <Avatar className="h-6 w-6">
  //             <AvatarImage src="https://github.com/shadcn.png" />
  //             <AvatarFallback className="font-bold">
  //               {market.title}
  //             </AvatarFallback>
  //           </Avatar>
  //           {market.title}
  //         </div>
  //       ),
  //       wallet_balance: (
  //         <div className="flex w-[114px] flex-col pl-1">
  //           <div className="font-base text-base font-medium">
  //             {market.totalSupply}
  //           </div>
  //           <div className="text-xs font-medium leading-tight text-muted-foreground">
  //             $164.74 Million
  //           </div>
  //         </div>
  //       ),
  //       borrow_apy: (
  //         <div className="w-[114px] pl-1 text-base text-success-foreground">
  //           12.38%
  //         </div>
  //       ),
  //       action: <RepayBtn />,
  //     })),
  //   [markets],
  // );
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
