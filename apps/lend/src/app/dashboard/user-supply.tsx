import React from "react";
import { DataTable } from "@bera/shared-ui";

import UserTokenCard from "~/components/user-token-card";
import { user_supply_columns } from "./column";

export default function UserSupply({
  assets,
  tableView = false,
}: {
  assets: any[];
  tableView?: boolean;
}) {
  return (
    <>
      <div className="text-2xl font-semibold leading-loose">Your Supplies</div>
      <div className=" text-muted-foreground">
        You must supply in order to borrow funds.
      </div>

      {tableView ? (
        <DataTable columns={user_supply_columns} data={assets} />
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
