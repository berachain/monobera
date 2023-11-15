import React from "react";
import Link from "next/link";
import { DataTable } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Card } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

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
          {assets.length === 0 ? (
            <Card className="flex h-[72px] items-center justify-between px-6 py-4 text-muted-foreground">
              You have not supplied any assets
              <Link href="/markets">
                <Button variant="outline">
                  <Icons.add className="mr-1 h-6 w-6" /> Supply
                </Button>
              </Link>
            </Card>
          ) : (
            <>
              {assets
                .sort(
                  (a, b) =>
                    Number(b.formattedBalance) - Number(a.formattedBalance),
                )
                .map((asset, index) => (
                  <UserTokenCard asset={asset} key={index} type="user-supply" />
                ))}
            </>
          )}
        </>
      )}
    </>
  );
}
