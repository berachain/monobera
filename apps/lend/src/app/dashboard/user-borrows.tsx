import React from "react";
import { DataTable } from "@bera/shared-ui";

import Card from "~/components/card";
import UserTokenCard from "~/components/user-token-card";
import { user_borrows_columns } from "./column";

export default function UserBorrows({
  assets,
  tableView = false,
}: {
  assets: any[];
  tableView?: boolean;
}) {
  return (
    <>
      <div className="text-2xl font-semibold leading-loose">Your Borrows</div>
      <div className="text-muted-foreground">
        These assets are borrowed against your supplied collateral.
      </div>
      {tableView ? (
        <DataTable columns={user_borrows_columns} data={assets} />
      ) : (
        <>
          {assets.length === 0 ? (
            <Card className="flex h-[72px] items-center justify-between px-6 py-4 text-muted-foreground">
              You have not borrowed any assets
              {/* <Link href="/markets">
                <Button variant="outline">
                  <Icons.add className="mr-1 h-6 w-6" /> Borrow
                </Button>
              </Link> */}
            </Card>
          ) : (
            <>
              {assets.map((asset, index) => (
                <UserTokenCard asset={asset} key={index} type="user-borrow" />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
