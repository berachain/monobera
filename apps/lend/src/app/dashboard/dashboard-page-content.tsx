"use client";

import React, { useEffect } from "react";
import { Switch } from "@bera/ui/switch";

import StatusBanner from "~/components/status-banner";
import { useMarkets } from "~/hooks/useMarkets";
import AvailableBorrows from "./available-borrows";
import AvailableSupply from "./available-supply";
import UserBorrows from "./user-borrows";
import UserSupply from "./user-supply";

export default function DashboardPageContent() {
  const [tableView, setUseTableView] = React.useState(false);
  const markets = useMarkets();

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

  return (
    <div className="flex flex-col gap-9 md:gap-6">
      {/* <RewardBanner /> */}
      <StatusBanner />
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-bold">Account Status</h2>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <p className="text-sm text-muted-foreground">Switch to table view</p>
          <Switch
            id="use-tableview"
            className="hidden lg:block"
            checked={tableView}
            onCheckedChange={(checked: boolean) => setUseTableView(checked)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <UserSupply markets={markets} tableView={tableView} />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <UserBorrows markets={markets} tableView={tableView} />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <AvailableSupply markets={markets} tableView={tableView} />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <AvailableBorrows markets={markets} tableView={tableView} />
        </div>
      </div>
    </div>
  );
}
