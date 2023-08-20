"use client";

import React from "react";
import { Dropdown, HoneyBanner, SearchInput } from "@bera/shared-ui";
import { Switch } from "@bera/ui/switch";

import StatusBanner from "~/components/status-banner";
import TokenCard from "~/components/token-card";
import { useMarkets, type Market } from "~/hooks/useMarkets";

export default function MarketsPageContent() {
  const [useTableView, setUseTableView] = React.useState(false);
  const markets = useMarkets();
  const sortOptions = ["Deposit-APY", "Total-Borrows", "Systems"];
  const [sortBy, setSortBy] = React.useState<string>(sortOptions[2]!);
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
        <div className="hidden items-center gap-4 md:flex ">
          <p className="text-sm text-muted-foreground">Switch to table view</p>
          <Switch
            id="use-tableview"
            checked={useTableView}
            onCheckedChange={(checked: boolean) => setUseTableView(checked)}
          />
        </div>
      </div>
      <div className="mt-6 flex justify-between gap-4">
        <div className="flex-1">
          <SearchInput placeholder="Search for BAAVE Markets..." />
        </div>
        <Dropdown
          selected={sortBy}
          selectionList={sortOptions}
          onSelect={setSortBy}
          className="hidden md:block"
        />
      </div>
      <div className="">
        <div className="mt-6 grid grid-cols-1 gap-4">
          {markets.map((market: Market, index) => (
            <TokenCard market={market} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
