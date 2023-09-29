import React from "react";
import { DataTable, TokenIcon } from "@bera/shared-ui";

import { type Asset } from "~/utils/types";
import InfoButton from "~/components/info-button";
import SupplyBtn from "~/components/modals/supply-button";
import UserTokenCard from "~/components/user-token-card";
import { available_supply_columns } from "./column";

export default function AvailableSupply({
  assets,
  tableView = false,
}: {
  assets: Asset[];
  tableView?: boolean;
}) {
  const data = React.useMemo(
    () =>
      assets.map((asset) => {
        const balance = asset.token?.formattedBalance ?? "0";
        return {
          ...asset,
          market: (
            <div className="flex items-center gap-2 text-sm font-medium leading-none">
              <TokenIcon address={asset.asset_address} fetch size="lg" />
              {asset.symbol}
            </div>
          ),
          walletBalance: Number(balance),
          walletBalanceUS: Number(balance) * asset.dollarValue,
          action: (
            <div className="flex gap-2">
              <SupplyBtn asset={asset} />
              <InfoButton address={asset.asset_address} />
            </div>
          ),
        };
      }),
    [assets],
  );
  return (
    <>
      <div className="text-2xl font-semibold leading-loose">
        Available to Supply
      </div>
      {tableView ? (
        <DataTable columns={available_supply_columns} data={data} />
      ) : (
        <>
          {assets.map((asset, index) => (
            <UserTokenCard
              asset={asset}
              key={index}
              type="supply"
              balance={asset.token?.formattedBalance ?? "0"}
            />
          ))}
        </>
      )}
    </>
  );
}
