import { type AssetItem } from "./getServerSideData";
import { type Address } from "wagmi";

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
