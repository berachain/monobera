import React from "react";
import { DataTable } from "@bera/shared-ui";

import UserTokenCard from "~/components/user-token-card";
import { available_supply_columns } from "./column";

export default function AvailableSupply({
  assets,
  tableView = false,
}: {
  assets: any[];
  tableView?: boolean;
}) {
  return (
    <>
      <div className="text-2xl font-semibold leading-loose">
        Available to Supply
      </div>
      {tableView ? (
        <DataTable columns={available_supply_columns} data={assets} />
      ) : (
        <>
          {assets.map((asset, index) => (
            <UserTokenCard asset={asset} key={index} type="supply" />
          ))}
        </>
      )}
    </>
  );
}
