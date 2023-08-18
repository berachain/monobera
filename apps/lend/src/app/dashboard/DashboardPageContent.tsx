"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatUsd } from "@bera/berajs";
import { Tooltip } from "@bera/shared-ui";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";
import { Switch } from "@bera/ui/switch";

import RewardBanner from "~/components/reward-banner";
import StatusBanner from "~/components/status-banner";
import SupplyBtn from "~/components/supply-button";
import { useMarkets } from "~/hooks/useMarkets";

export default function DashboardPageContent() {
  const [useTableView, setUseTableView] = React.useState(false);
  const markets = useMarkets();
  const router = useRouter();
  return (
    <>
      <div className="mb-12">
        <RewardBanner />
      </div>
      <div className="mb-12">
        <StatusBanner />
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <h2 className="mb-2 text-5xl font-bold">Account Status</h2>
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
      ccxc
      <div className="">
        <div className="mt-6 grid grid-cols-1 gap-4">
          {markets.map((market) => (
            <div
              className="flex items-center justify-between rounded-2xl border bg-background p-4 shadow"
              key={market.title}
            >
              <div className="flex">
                <div className="mr-10 flex items-center gap-4">
                  <Image
                    src={market.icon}
                    alt={market.title}
                    className="rounded-full"
                    width={32}
                    height={32}
                  />
                  <div>
                    <p className="text-xs	leading-5 text-muted-foreground">
                      {market.title}
                    </p>
                    <p className="text-lg font-bold">
                      $8.28M <Tooltip text={market.totalSupply} />
                    </p>
                  </div>
                </div>

                <div className="grow-1 flex gap-6">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs leading-5 text-muted-foreground">
                      Deposit APY
                    </p>
                    <p className="text-lg font-bold">
                      {market.dailyPercentChange > 0 ? (
                        <span className="text-positive">
                          +{market.dailyPercentChange}%
                        </span>
                      ) : (
                        <span className="text-negative">
                          -{market.dailyPercentChange}%
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs leading-5 text-muted-foreground">
                      Variable Borrow APR
                    </p>
                    <p className="text-xl font-bold">
                      {market.dailyPercentChange}%
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs leading-5 text-muted-foreground">
                      Stable Borrow APR
                    </p>
                    <p className="text-xl font-bold">
                      {market.dailyPercentChange}%
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-xs leading-5 text-muted-foreground">
                      Total borrows
                    </p>
                    <p className="text-xl font-bold">
                      {formatUsd(market.dailyBorrows)}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="grow-1 flex items-center gap-2">
                  <SupplyBtn />
                  <Button variant={"secondary"}>Borrow</Button>
                  <Button
                    variant={"secondary"}
                    onClick={() =>
                      router.push(
                        "/individual-market-analytics?address=0x20f33CE90A13a4b5E7697E3544c3083B8F8A51D4",
                      )
                    }
                  >
                    <Icons.info />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
