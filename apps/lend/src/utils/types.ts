import { type Address } from "wagmi";

import { type AssetItem } from "./getServerSideData";

export type AssetDictionary = { [key: Address]: Partial<Asset> };
export type Asset = AssetItem & {
  borrowed?: number;
  supplied: number;
  borrowStableAPR?: number;
  borrowVariableAPR?: number;
  supplyStableAPR: number;
  supplyVariableAPR: number;
  dollarValue: number;
};
