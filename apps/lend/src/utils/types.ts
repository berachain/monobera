import { type Token } from "@bera/berajs";
import { type Address } from "wagmi";

import { type AssetItem } from "./getServerSideData";

export type AssetDictionary = { [key: Address]: Partial<Asset> };
export type Asset = AssetItem & {
  borrowed?: number;
  supplied: number;
  borrowStableAPR?: number;
  borrowVariableAPR?: number;
  supplyAPR: number;
  dollarValue: number;
  token?: Token;
  atoken?: Token;
  stable_debt_token?: Token;
  variable_debt_token?: Token;
};
