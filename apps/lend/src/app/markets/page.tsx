import React from "react";
import { type Metadata } from "next";
import { lendName } from "@bera/config";

import {
  getAssets,
  getAssetsBorrowed,
  getAssetsSupplied,
  getBorrowAPR,
  getSupplyAPR,
} from "~/utils/getServerSideData";
import MarketsPageContent from "./markets-page-content";

export const metadata: Metadata = {
  title: `Markets | ${lendName}`,
  description: `Welcome to ${lendName}!`, // need text
};

export default async function MarketsPage() {
  const [assets, borrowedAssets, suppliedAssets, borrowAPR, supplyAPR] =
    await Promise.all([
      getAssets(),
      getAssetsBorrowed(),
      getAssetsSupplied(),
      getBorrowAPR(),
      getSupplyAPR(),
    ]);

  return (
    <div className="container my-28">
      <MarketsPageContent
        {...{
          assets,
          borrowedAssets: [borrowedAssets],
          suppliedAssets: [suppliedAssets],
          borrowAPR: [borrowAPR],
          supplyAPR: [supplyAPR],
        }}
      />
    </div>
  );
}
