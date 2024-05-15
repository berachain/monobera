"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import { BGTRewardsTable } from "./bgt-rewards-table";
import { GeneralInfo } from "./general-info";
import { MyIncentivesTableTable } from "./my-incentives-table";

export default function Rewards() {
  return (
    <div className="flex flex-col gap-11">
      <GeneralInfo />
      <Tabs defaultValue="bgt" className="flex flex-col gap-4">
        <TabsList className="w-full md:w-fit">
          <TabsTrigger value="bgt" className="w-full md:w-fit">
            All Gauges
          </TabsTrigger>
          <TabsTrigger value="incentives" className="w-full md:w-fit">
            My Gauges
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
  );
}
