"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { useTokens } from "@bera/berajs";
import {
  DataTable,
  Dropdown,
  HoneyBanner,
  SearchInput,
  TokenIcon,
} from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Switch } from "@bera/ui/switch";

import { getAssetsList } from "~/utils/getMarketList";
import { type Asset } from "~/utils/types";
import StatusBanner from "~/components/status-banner";
import TokenCard from "~/components/token-card";
import { market_table_columns } from "./market-table-column";

interface MarketsProps {
  assets: any[];
  borrowedAssets: any[];
  suppliedAssets: any[];
  borrowAPR: any[];
  supplyAPR: any[];
}
export default function MarketsPageContent({
  assets,
  borrowedAssets,
  suppliedAssets,
  borrowAPR,
  supplyAPR,
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
        borrowAPR,
        supplyAPR,
      ).sort((a, b) => {
        switch (sortBy) {
          case "Deposit-APY":
            return b.supplyAPR - a.supplyAPR;
          case "Total-Borrows":
            return (b.totalBorrowed ?? 0) - (a.totalBorrowed ?? 0);
          case "Systems":
            return 0;
          default:
            return 0;
        }
      }),
    [assets, borrowedAssets, suppliedAssets, borrowAPR, supplyAPR, sortOptions],
  );

  const assetsData = React.useMemo(
    () =>
      assetsList.map((asset: Asset) => ({
        ...asset,
        token: (
          <>
            {tokenDictionary && Object.keys(tokenDictionary).length !== 0 ? (
              <div className="flex items-center gap-2 text-sm font-medium leading-none">
                <TokenIcon
                  token={tokenDictionary[asset.address]}
                  size="lg"
                  key={asset.address}
                />
                {tokenDictionary[asset.address]!.name}
              </div>
            ) : (
              <>Loading</>
            )}
          </>
        ),
        details: (
          <Link href={`/markets/address=${asset.address}`}>
            <Button variant={"outline"}>details </Button>
          </Link>
        ),
      })),
    [assetsList, tokenDictionary],
  );

  return (
    <>
      <div className="mb-12">
        <HoneyBanner />
      </div>
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
