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
  getSupplyVariableAPR,
} from "~/utils/getServerSideData";
import MarketsPageContent from "./markets-page-content";

export const metadata: Metadata = {
  title: `Markets | ${lendName}`,
  description: `Welcome to ${lendName}!`, // need text
};

export default async function MarketsPage() {
  const [
    assets,
    borrowedAssets,
    suppliedAssets,
    borrowStableAPR,
    borrowVariableAPR,
    supplyStableAPR,
    supplyVariableAPR,
  ] = await Promise.all([
    getAssets(),
    getAssetsBorrowed(),
    getAssetsSupplied(),
    getBorrowStableAPR(),
    getBorrowVariableAPR(),
    getSupplyStableAPR(),
    getSupplyVariableAPR(),
  ]);

  return (
    <div className="container my-28">
      <MarketsPageContent
        {...{
          assets,
          borrowedAssets,
          suppliedAssets,
          borrowStableAPR,
          borrowVariableAPR,
          supplyStableAPR,
          supplyVariableAPR,
        }}
      />
    </div>
  );
}
