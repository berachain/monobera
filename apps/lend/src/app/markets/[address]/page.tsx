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
    getGraphData(params.address, "interest", "1D", "supply"),
    getGraphData(params.address, "interest", "7D", "supply"),
    getGraphData(params.address, "interest", "30D", "supply"),
    getGraphData(params.address, "interest", "ALL", "supply"),
    getGraphData(params.address, "interest", "1D", "variable"),
    getGraphData(params.address, "interest", "7D", "variable"),
    getGraphData(params.address, "interest", "30D", "variable"),
    getGraphData(params.address, "interest", "ALL", "variable"),
    getGraphData(params.address, "utilization", "1D"),
    getGraphData(params.address, "utilization", "7D"),
    getGraphData(params.address, "utilization", "30D"),
    getGraphData(params.address, "utilization", "ALL"),
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
