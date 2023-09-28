import React, { useEffect } from "react";
import { honeyAddress } from "@bera/config";
import { Switch } from "@bera/ui/switch";

import { type Asset, type AssetDictionary } from "~/utils/types";
import StatusBanner from "~/components/status-banner";
// import { usePollUserAccountData } from "~/hooks/usePollUserAccountData";
import AvailableBorrows from "./available-borrows";
import AvailableSupply from "./available-supply";
import UserBorrows from "./user-borrows";
import UserSupply from "./user-supply";

export default function Dashboard({
  assetDictionary,
}: {
  assetDictionary: AssetDictionary;
}) {
  const [tableView, setUseTableView] = React.useState(false);

  // const { useUserAccountData } = usePollUserAccountData();
  // const { data, isLoading } = useUserAccountData();
  //   console.log("useUserAccountData", data, isLoading);

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

  const availableSupply: Asset[] = Object.keys(assetDictionary).map(
    (key) => assetDictionary[key as keyof typeof assetDictionary] as Asset,
  );
  const availableBorrow: Asset[] = assetDictionary[honeyAddress]
    ? [assetDictionary[honeyAddress] as Asset]
    : [];

  return (
    <div className="flex flex-col gap-9 md:gap-6">
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

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="flex flex-1 flex-col gap-4">
          <UserSupply {...{ assets: availableSupply, tableView }} />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <UserBorrows {...{ assets: availableSupply, tableView }} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="flex flex-1 flex-col gap-4">
          <AvailableSupply {...{ assets: availableSupply, tableView }} />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <AvailableBorrows {...{ assets: availableBorrow, tableView }} />
        </div>
      </div>
    </div>
  );
}
