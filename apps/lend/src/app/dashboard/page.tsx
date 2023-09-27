import React from "react";
import { type Metadata } from "next";
import { lendName } from "@bera/config";

import {
  getAssets,
  getAssetsBorrowed,
  getAssetsSupplied,
  getBorrowStableAPR,
  getBorrowVariableAPR,
  getSupplyStableAPR,
} from "~/utils/getServerSideData";
import DashboardPageContent from "./dashboard-page-content";

export const metadata: Metadata = {
  title: `Dashboard | ${lendName}`,
  description: `Welcome to ${lendName}!`,
};

export default async function DashboardPage() {
  const [
    assets,
    borrowedAssets,
    suppliedAssets,
    borrowStableAPR,
    borrowVariableAPR,
    supplyStableAPR,
  ] = await Promise.all([
    getAssets(),
    getAssetsBorrowed(),
    getAssetsSupplied(),
    getBorrowStableAPR(),
    getBorrowVariableAPR(),
    getSupplyStableAPR(),
  ]);

  return (
    <div className="container my-28">
      <DashboardPageContent
        {...{
          assets,
          borrowedAssets,
          suppliedAssets,
          borrowStableAPR,
          borrowVariableAPR,
          supplyStableAPR,
        }}
      />
    </div>
  );
}
