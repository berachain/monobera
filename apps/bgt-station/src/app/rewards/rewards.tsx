"use client";

import { useBeraJs } from "@bera/berajs";
import { ConnectWalletBear } from "@bera/shared-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { BGTRewardsTable } from "./bgt-rewards-table";
import { GeneralInfo } from "./general-info";
import { MyIncentivesTableTable } from "./my-incentives-table";

export default function Rewards() {
  const { isReady } = useBeraJs();
  return (
    <>
      {isReady ? (
        <div className="flex flex-col gap-11">
          <GeneralInfo />
          <Tabs defaultValue="bgt" className="flex flex-col gap-4">
            <TabsList className="w-full md:w-fit">
              <TabsTrigger value="bgt" className="w-full md:w-fit">
                My BGT Rewards
              </TabsTrigger>
              <TabsTrigger value="incentives" className="w-full md:w-fit">
                My Incentives
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bgt">
              <BGTRewardsTable />
            </TabsContent>
            <TabsContent value="incentives">
              <MyIncentivesTableTable />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <ConnectWalletBear message="You need to connect your wallet to see delegations and rewards" />
      )}
    </>
  );
}
