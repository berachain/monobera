"use client";

import React from "react";
import { Switch } from "@bera/ui/switch";

import RewardBanner from "~/components/reward-banner";
import StatusBanner from "~/components/status-banner";
import UserTokenCard from "~/components/user-token-card";
import { useMarkets } from "~/hooks/useMarkets";

export default function DashboardPageContent() {
  const [useTableView, setUseTableView] = React.useState(false);
  const markets = useMarkets();

  return (
    <div className="flex flex-col gap-9 md:gap-6">
      <RewardBanner />

      <StatusBanner />

      <div className="flex flex-row justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold">Account Status</h2>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <p className="text-sm text-muted-foreground">Switch to table view</p>
          <Switch
            id="use-tableview"
            checked={useTableView}
            onCheckedChange={(checked: boolean) => setUseTableView(checked)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <div className="text-2xl font-semibold leading-loose">
            Your Supplies
          </div>
          <div className=" text-muted-foreground">
            You must supply in order to borrow funds.
          </div>
          {markets.slice(0, 5).map((market, index) => (
            <UserTokenCard market={market} key={index} type="user-supply" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="text-2xl font-semibold leading-loose">
            Your Borrows
          </div>
          <div className="text-muted-foreground">
            These assets are borrowed against your supplied collateral.
          </div>
          {markets.slice(5, 10).map((market, index) => (
            <UserTokenCard market={market} key={index} type="user-borrow" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <div className="text-2xl font-semibold leading-loose">
            Available to Supply
          </div>
          {markets.slice(10, 15).map((market, index) => (
            <UserTokenCard market={market} key={index} type="supply" />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div className="text-2xl font-semibold leading-loose">
            Your Borrows
          </div>
          {markets.slice(15, 20).map((market, index) => (
            <UserTokenCard market={market} key={index} type="borrow" />
          ))}
        </div>
      </div>
    </div>
  );
}
