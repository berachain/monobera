import React from "react";
import { type Address } from "wagmi";

import {
  getAssetBorrowVariableAPR,
  getAssetBorrowVariableAPRInterval,
  getAssetBorrowed,
  getAssetSupplied,
  getAssetSupplyAPR,
  getAssetSupplyAPRInterval,
  getAssetUtilization,
  getAssetVolume,
} from "~/utils/getServerSideData";
import IndividualMarketAnalytics from "./individual-market-analytics";

export default async function Page({
  params,
}: {
  params: {
    address: Address;
  };
}) {
  const [
    supplied,
    borrowed,
    volume,
    utilization,
    supplyAPR,
    borrowVariableAPR,
    supplyAPR1D,
    supplyAPR7D,
    supplyAPR30D,
    borrowVariableAPR1D,
    borrowVariableAPR7D,
    borrowVariableAPR30D,
  ] = await Promise.all([
    getAssetSupplied(params.address),
    getAssetBorrowed(params.address),
    getAssetVolume(params.address),
    getAssetUtilization(params.address),
    getAssetSupplyAPR(params.address),
    getAssetBorrowVariableAPR(params.address),
    getAssetSupplyAPRInterval(params.address, "1D"),
    getAssetSupplyAPRInterval(params.address, "7D"),
    getAssetSupplyAPRInterval(params.address, "30D"),
    getAssetBorrowVariableAPRInterval(params.address, "1D"),
    getAssetBorrowVariableAPRInterval(params.address, "7D"),
    getAssetBorrowVariableAPRInterval(params.address, "30D"),
  ]);
  const assetInfo = {
    supplied,
    borrowed,
    volume,
    utilization,
    supplyAPR,
    borrowVariableAPR,
    supplyAPR1D,
    supplyAPR7D,
    supplyAPR30D,
    borrowVariableAPR1D,
    borrowVariableAPR7D,
    borrowVariableAPR30D,
  };
  console.log(assetInfo);
  return (
    <div className="container my-28">
      <IndividualMarketAnalytics
        address={params.address}
        assetInfo={assetInfo}
      />
    </div>
  );
}
