import React from "react";
import {
  useCurrentAssetWalletBalances,
  usePollAssetWalletBalance,
} from "@bera/berajs";
import { DataTable, TokenIcon } from "@bera/shared-ui";
import { formatUnits } from "viem";

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
  usePollAssetWalletBalance();
  const walletBalance = useCurrentAssetWalletBalances() ?? [];
  const data = React.useMemo(
    () =>
      assets.map((asset) => {
        const balance = formatUnits(
          walletBalance.find(
            (token) =>
              token.address.toLowerCase() === asset.asset_address.toLowerCase(),
          )?.balance ?? BigInt(0),
          asset.decimals,
        );
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
              balance={formatUnits(
                walletBalance.find(
                  (token: any) =>
                    token.address.toLowerCase() ===
                    asset.asset_address.toLowerCase(),
                )?.balance ?? BigInt(0),
                asset.decimals,
              )}
            />
          ))}
        </>
      )}
    </>
  );
}
