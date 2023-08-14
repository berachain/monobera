import React from "react";
import { truncateHash, useBeraJs } from "@bera/berajs";
import { Button } from "@bera/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

import YellowCard from "~/components/yellow-card";
import AverageGaugeWeight from "./components/average-gauge-weight";
import UnbondingQueue from "./components/unbonding-queue";
import YourDelegations from "./components/your-delegations";
import { BGTSelectionEnum, type BGTselection } from "./types";

export default function Portfolio() {
  const { account } = useBeraJs();
  const [tab, setTab] = React.useState<BGTselection>(
    BGTSelectionEnum.YOUR_DELEGATIONS,
  );

  return (
    <div className="container">
      <div className=" flex h-[100px] items-center justify-center text-5xl font-bold leading-[48px] text-foreground">
        👋 Hey {truncateHash(account ?? "0x", 6)} you have...
      </div>
      <div className="flex gap-8">
        <YellowCard tooltip="sample1" className="flex-1">
          <div className="text-5xl font-bold leading-[48px] text-foreground">
            6,666
          </div>
          <div className="py-[14px] text-center text-sm font-semibold leading-tight text-muted-foreground">
            BGT delegated
            <br />
            across 3 validators
          </div>
          <Button variant="outline">Manage delegations</Button>
        </YellowCard>
        <YellowCard className="flex-1">
          <div className="text-5xl font-bold leading-[48px] text-foreground">
            $3,000
          </div>
          <div className="py-[14px] text-center text-sm font-semibold leading-tight text-muted-foreground">
            in claimable rewards
          </div>
          <Button className="w-full max-w-[223px]">Claim</Button>
        </YellowCard>
        <YellowCard tooltip="sample1" className="flex-1">
          <div className="text-5xl font-bold leading-[48px] text-foreground">
            1,200
          </div>
          <div className="py-[14px] text-center text-sm font-semibold leading-tight text-muted-foreground">
            in claimable rewards
          </div>
          <Button variant="outline">See my queue</Button>
        </YellowCard>
      </div>
      <div className="mt-16 flex flex-col gap-4">
        <div className="mx-auto">
          <Tabs defaultValue={tab}>
            <TabsList>
              {Object.values(BGTSelectionEnum).map((selection) => (
                <TabsTrigger
                  value={selection}
                  key={selection}
                  className="capitalize"
                  onClick={() => setTab(selection)}
                >
                  {selection.replaceAll("-", " ")}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        {tab === BGTSelectionEnum.YOUR_DELEGATIONS && <YourDelegations />}
        {tab === BGTSelectionEnum.UNBONDING_QUEUE && <UnbondingQueue />}
        {tab === BGTSelectionEnum.AVERAGE_GAUGE_WEIGHT && (
          <AverageGaugeWeight />
        )}
      </div>
    </div>
  );
}
