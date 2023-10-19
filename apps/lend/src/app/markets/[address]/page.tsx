import React from "react";
import { type Address } from "wagmi";

import { getGraphData } from "~/utils/getServerSideData";
import IndividualMarketAnalytics from "./individual-market-analytics";

export default async function Page({
  params,
}: {
  params: {
    address: Address;
  };
}) {
  const [
    supplyAPR1D,
    supplyAPR7D,
    supplyAPR30D,
    supplyAPRALL,
    borrowVariableAPR1D,
    borrowVariableAPR7D,
    borrowVariableAPR30D,
    borrowVariableAPRALL,
    utilizationRate1D,
    utilizationRate7D,
    utilizationRate30D,
    utilizationRateALL,
  ] = await Promise.all([
    getGraphData(params.address, "interest", "1d", "supply"),
    getGraphData(params.address, "interest", "7d", "supply"),
    getGraphData(params.address, "interest", "30d", "supply"),
    getGraphData(params.address, "interest", "all", "supply"),
    getGraphData(params.address, "interest", "1d", "variable"),
    getGraphData(params.address, "interest", "7d", "variable"),
    getGraphData(params.address, "interest", "30d", "variable"),
    getGraphData(params.address, "interest", "all", "variable"),
    getGraphData(params.address, "utilization", "1d"),
    getGraphData(params.address, "utilization", "7d"),
    getGraphData(params.address, "utilization", "30d"),
    getGraphData(params.address, "utilization", "all"),
  ]);
  return (
    <div className="container my-28">
      <IndividualMarketAnalytics
        {...{
          address: params.address,
          supplyAPR1D,
          supplyAPR7D,
          supplyAPR30D,
          supplyAPRALL,
          borrowVariableAPR1D,
          borrowVariableAPR7D,
          borrowVariableAPR30D,
          borrowVariableAPRALL,
          utilizationRate1D,
          utilizationRate7D,
          utilizationRate30D,
          utilizationRateALL,
        }}
      />
    </div>
  );
}
