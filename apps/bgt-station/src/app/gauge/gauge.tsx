"use client";

import React from "react";
import { SearchInput } from "@bera/shared-ui";
import { Skeleton } from "@bera/ui/skeleton";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import GlobalGaugeWeightTable from "~/components/global-gauge-weight-table";
import GaugeInfoCard from "./gauge-info-card";

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
  const [keywords, setKeywords] = React.useState<string | undefined>(undefined);
  // TODO: switch to use the new subgraph
  return (
    <div className="flex flex-col gap-12">
      <div className="xs:gap-3 flex flex-col items-center gap-8 md:flex-row">
        <GaugeInfoCard />
        <GlobalGaugeWeightChart gaugeWeights={mockChartData} />
      </div>
      <div className="flex flex-col">
        <SearchInput
          placeholder="Search..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setKeywords(e.target.value)
          }
        />
        <div className="py-4">
          {/* {isLoading || !data || !data.length ? (
            <div className="mt-10 flex w-full flex-col gap-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <GlobalGaugeWeightTable
              gaugeWeights={data ?? []}
              keywords={keywords}
            />
          )} */}
        </div>
      </div>
    </div>
  );
}
