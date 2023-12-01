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
  ] = await Promise.all([
    getGraphData(params.address, "1d", "supply"),
    getGraphData(params.address, "7d", "supply"),
    getGraphData(params.address, "30d", "supply"),
    getGraphData(params.address, "all", "supply"),
    getGraphData(params.address, "1d", "variable"),
    getGraphData(params.address, "7d", "variable"),
    getGraphData(params.address, "30d", "variable"),
    getGraphData(params.address, "all", "variable"),
  ]);
  return (
    <IndividualMarketAnalytics
      {...{
        address: params.address,
        supplyAPR1D: [...supplyAPR1D.reverse()],
        supplyAPR7D: [...supplyAPR7D.reverse()],
        supplyAPR30D: [...supplyAPR30D.reverse()],
        supplyAPRALL: [...supplyAPRALL.reverse()],
        borrowVariableAPR1D: [...borrowVariableAPR1D.reverse()],
        borrowVariableAPR7D: [...borrowVariableAPR7D.reverse()],
        borrowVariableAPR30D: [...borrowVariableAPR30D.reverse()],
        borrowVariableAPRALL: [...borrowVariableAPRALL.reverse()],
      }}
    />
  );
}
