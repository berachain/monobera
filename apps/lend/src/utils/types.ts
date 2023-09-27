import { type AssetItem } from "./getServerSideData";

export type Asset = AssetItem & {
  borrowed?: number;
  supplied: number;
  borrowStableAPR?: number;
  borrowVariableAPR?: number;
  supplyStableAPR: number;
  supplyVariableAPR: number;
  dollarValue: number;
};
