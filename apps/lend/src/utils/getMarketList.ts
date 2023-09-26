import { type Address } from "wagmi";

import { type Asset } from "./types";

export function getAssetsList(
  assets: any[],
  borrowedAssets: any[],
  suppliedAssets: any[],
  borrowAPR: any[],
  supplyAPR: any[],
): Asset[] {
  if (
    !assets ||
    assets.length === 0 ||
    !borrowAPR ||
    !supplyAPR ||
    !borrowedAssets ||
    !suppliedAssets
  )
    return [];

  // honey address hard coded ;()
  // hard code af, waiting for new api
  return assets.map((asset, index) => ({
    address: "0x3a995543A9c6a9c5FE56d2d9024195aE7f3373e8" as Address,
    totalSupplied: Number(suppliedAssets[index].amount),
    totalBorrowed: Number(borrowedAssets[index].amount),
    supplyAPR: Number(supplyAPR[index].rate),
    borrowAPR: Number(borrowAPR[index].rate),
    dollarValue: 1,
  }));
}
