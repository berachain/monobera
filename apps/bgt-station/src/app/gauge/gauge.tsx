"use client";

import React, { useState } from "react";
import { useBeraJs } from "@bera/berajs";
import { SearchInput } from "@bera/shared-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@bera/ui/tabs";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import GlobalGaugeWeightTable from "~/components/global-gauge-weight-table";
import GaugeInfoCard from "./gauge-info-card";
import MarketSelector from "./market-selector";

const mockChartData = [
  {
    label: "Gauge 1",
    address: "0x101f52c804C1C02c0A1D33442ecA30ecb6fB2434",
    percentage: 0.2,
    amount: 100,
  },
  {
    label: "Gauge 2",
    address: "0x605fD73B339b82413B862966428eD8Ac52eC4227",
    percentage: 0.3,
    amount: 100,
  },
  {
    label: "Gauge 3",
    address: "0x751524E7bAdd31d018A4CAF4e4924a21b0c13CD0",
    percentage: 0.5,
    amount: 100,
  },
  {
    label: "Gauge 4",
    address: "0x751524E7bAdd31d018A4CAF4e4924a21b0c13CD0",
    percentage: 0.5,
    amount: 100,
  },
  {
    label: "Gauge 5",
    address: "0x751524E7bAdd31d018A4CAF4e4924a21b0c13CD0",
    percentage: 0.5,
    amount: 100,
  },
  {
    label: "Gauge 6",
    address: "0x751524E7bAdd31d018A4CAF4e4924a21b0c13CD0",
    percentage: 0.5,
    amount: 100,
  },
  {
    label: "Gauge 7",
    address: "0x751524E7bAdd31d018A4CAF4e4924a21b0c13CD0",
    percentage: 0.5,
    amount: 100,
  },
  {
    label: "Gauge 8",
    address: "0x751524E7bAdd31d018A4CAF4e4924a21b0c13CD0",
    percentage: 0.039,
    amount: 10,
  },
  {
    label: "Gauge 9",
    address: "0x751524E7bAdd31d018A4CAF4e4924a21b0c13CD0",
    percentage: 0.039,
    amount: 10,
  },
  {
    label: "Gauge 10",
    address: "0x751524E7bAdd31d018A4CAF4e4924a21b0c13CD0",
    percentage: 0.039,
    amount: 10,
  },
  {
    label: "Gauge 11",
    address: "0x751524E7bAdd31d018A4CAF4e4924a21b0c13CD0",
    percentage: 0.039,
    amount: 10,
  },
];

export default function Gauge() {
  const { isConnected } = useBeraJs();
  const [keywords, setKeywords] = useState<string | undefined>(undefined);
  return (
    <div className="flex flex-col gap-12">
      <div className="xs:gap-3 flex flex-col items-center gap-8 md:flex-row">
        <GaugeInfoCard />
        <GlobalGaugeWeightChart gaugeWeights={mockChartData} />
      </div>

      <Tabs defaultValue="all-gauges" className="flex flex-col gap-4">
        <div className="flex justify-between">
          <TabsList className="w-fit">
            <TabsTrigger value="all-gauges">All Gauges</TabsTrigger>
            <TabsTrigger value="my-gauges" disabled={!isConnected}>
              My Gauges
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-3">
            <SearchInput
              placeholder="Search..."
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKeywords(e.target.value)
              }
            />
            <MarketSelector />
          </div>
        </div>
        <TabsContent value="all-gauges">
          {/* <GlobalGaugeWeightTable gaugeWeights={[]} keywords={keywords} /> */}
        </TabsContent>
        <TabsContent value="my-gauges">
          {/* <GlobalGaugeWeightTable gaugeWeights={[]} keywords={keywords} /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
