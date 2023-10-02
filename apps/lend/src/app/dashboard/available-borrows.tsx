import React from "react";
import { DataTable } from "@bera/shared-ui";

import UserTokenCard from "~/components/user-token-card";
import { available_borrows_columns } from "./column";

export default function AvailableBorrows({
  assets,
  tableView = false,
}: {
  assets: any[];
  tableView?: boolean;
}) {
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
