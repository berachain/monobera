"use client";

import React from "react";
import { SearchInput } from "@bera/shared-ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@bera/ui/select";
import { Switch } from "@bera/ui/switch";

import HoneyBanner from "~/components/honey-banner";
import StatusBanner from "~/components/status-banner";
import TokenCard from "~/components/token-card";
import { useMarkets, type Market } from "~/hooks/useMarkets";

export default function MarketsPageContent() {
  const [useTableView, setUseTableView] = React.useState(false);
  const markets = useMarkets();
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
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">Switch to table view</p>
          <Switch
            id="use-tableview"
            checked={useTableView}
            onCheckedChange={(checked: boolean) => setUseTableView(checked)}
          />
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <SearchInput placeholder="Search for BAAVE Markets..." />
        <div className="flex shrink-0 items-center gap-2">
          <p>Sort by</p>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Deposit APY" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="depositAPY">Deposit APY</SelectItem>
              <SelectItem value="totalBorrows">Total borrows</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
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
