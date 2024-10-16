"use client";

import React from "react";
import { usePollGlobalData } from "@bera/berajs";

import GlobalGaugeWeightChart from "~/components/global-gauge-weight-chart";
import GaugeTables from "./gauge-tables";
import GaugeInfoCard from "./gauge-info-card";
import { GaugeCreation } from "./gauge-creation";

export default function Gauge() {
  const { data, isLoading: isGlobalDataLoading } = usePollGlobalData();
  return (
    <div className="flex flex-col gap-12">
      <div className="xs:gap-3 flex flex-col gap-6 lg:flex-row">
        <GaugeInfoCard />
        <GlobalGaugeWeightChart
          gaugeWeights={data?.globalCuttingBoard ?? []}
          isLoading={isGlobalDataLoading}
          totalAmountStaked={data?.bgtInfo?.totalStakeBgt ?? "0"}
          globalAmountStaked={data?.bgtTotalSupply ?? "0"}
        />
      </div>
      <GaugeTables />
      <GaugeCreation />
    </div>
  );
}
