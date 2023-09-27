"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useTokens } from "@bera/berajs";
import { DataTable, Dropdown, SearchInput, TokenIcon } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Switch } from "@bera/ui/switch";

import { getAssetsList } from "~/utils/getMarketList";
import {
  type AmountItem,
  type AssetItem,
  type RateItem,
} from "~/utils/getServerSideData";
import { type Asset } from "~/utils/types";
import StatusBanner from "~/components/status-banner";
import TokenCard from "~/components/token-card";
import { market_table_columns } from "./market-table-column";

interface MarketsProps {
  assets: AssetItem[];
  borrowedAssets: AmountItem[];
  suppliedAssets: AmountItem[];
  borrowStableAPR: RateItem[];
  borrowVariableAPR: RateItem[];
  supplyStableAPR: RateItem[];
  supplyVariableAPR: RateItem[];
}
export default function MarketsPageContent({
  assets,
  borrowedAssets,
  suppliedAssets,
  borrowStableAPR,
  borrowVariableAPR,
  supplyStableAPR,
  supplyVariableAPR,
}: MarketsProps) {
  const { tokenDictionary } = useTokens();
  const [tableView, setUseTableView] = React.useState(false);
  const sortOptions = ["Deposit-APY", "Total-Borrows", "Systems"];
  const [sortBy, setSortBy] = React.useState<string>(sortOptions[2]!);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (tableView && window.innerWidth < 1024) {
        setUseTableView(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [tableView]);

  const assetsList = React.useMemo(
    () =>
      getAssetsList(
        assets,
        borrowedAssets,
        suppliedAssets,
        borrowStableAPR,
        borrowVariableAPR,
        supplyStableAPR,
        supplyVariableAPR,
      ).sort((a: Asset, b: Asset) => {
        switch (sortBy) {
          case "Deposit-APY":
            return b.supplyStableAPR - a.supplyStableAPR;
          case "Total-Borrows":
            return (b.borrowed ?? 0) - (a.borrowed ?? 0);
          case "Systems":
            return b.asset_address.localeCompare(a.asset_address);
          default:
            return 0;
        }
      }),
    [
      assets,
      borrowedAssets,
      suppliedAssets,
      borrowStableAPR,
      borrowVariableAPR,
      supplyStableAPR,
      supplyVariableAPR,
      sortOptions,
    ],
  );

  console.log(assetsList, tokenDictionary);
  const assetsData = React.useMemo(
    () =>
      assetsList.map((asset: Asset) => ({
        ...asset,
        token: (
          <>
            {tokenDictionary &&
            Object.keys(tokenDictionary).length !== 0 &&
            tokenDictionary[asset.asset_address] ? (
              <div className="flex items-center gap-2 text-sm font-medium leading-none">
                <TokenIcon
                  token={tokenDictionary[asset.asset_address]}
                  size="lg"
                  key={asset.asset_address}
                />
                {tokenDictionary[asset.asset_address]!.name}
              </div>
            ) : (
              <>Loading</>
            )}
          </>
        ),
        details: (
          <Link href={`/markets/address=${asset.asset_address}`}>
            <Button variant={"outline"}>details </Button>
          </Link>
        ),
      })),
    [assetsList, tokenDictionary],
  );

  return (
    <>
      <div className="mb-12">
        <StatusBanner />
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="mb-2 text-5xl font-bold">All Markets</h2>
          <p className="text-muted-foreground">
            You must supply collateral in order to borrow funds.
          </p>
        </div>
        <div className="hidden items-center gap-4 lg:flex ">
          <p className="text-sm text-muted-foreground">Switch to table view</p>
          <Switch
            id="use-tableview"
            checked={tableView}
            onCheckedChange={(checked: boolean) => setUseTableView(checked)}
            ref={ref}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-4">
        <SearchInput
          placeholder="Search for BEND Markets..."
          className="w-full"
        />
        <Dropdown
          selected={sortBy}
          selectionList={sortOptions}
          onSelect={setSortBy}
          className="hidden md:block"
        />
      </div>
      <div className="mt-6">
        {tableView ? (
          <DataTable columns={market_table_columns} data={assetsData} />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {assetsList.map((asset: Asset, index) => (
              <TokenCard asset={asset} key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
