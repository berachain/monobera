import React from "react";
import { honeyTokenAddress } from "@bera/config";
import { DataTable } from "@bera/shared-ui";
import { Card } from "@bera/ui/card";

import UserTokenCard from "~/components/user-token-card";
import { user_supply_columns } from "./column";
//rename to user deposits
export default function UserSupply({
  assets,
  tableView = false,
}: {
  assets: any[];
  tableView?: boolean;
}) {
  return (
    <>
      <div>
        <div className="text-2xl font-semibold leading-8">Your Deposits</div>
        <div className="text-sm text-muted-foreground">
          You must deposit collateral in order to borrow HONEY
        </div>
      </div>
      {tableView ? (
        <DataTable columns={user_supply_columns} data={assets} />
      ) : (
        <>
          {assets.length === 0 ? (
            <Card className="flex h-[72px] items-center justify-between px-6 py-4 text-muted-foreground">
              You have not supplied any assets
              {/* <Link href="/markets">
                <Button variant="outline">
                  <Icons.add className="mr-1 h-6 w-6" /> Supply
                </Button>
              </Link> */}
            </Card>
          ) : (
            <>
              {assets
                .filter((assets) => assets.address !== honeyTokenAddress)
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
