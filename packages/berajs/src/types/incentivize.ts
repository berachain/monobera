import { Address } from "viem";

export type Gauge = {
  logoURI?: string;
  address: Address;
  url?: string;
  categoryName?: string;
  categoryIcon?: string;
  name: string;
  default?: boolean;
  normalizedWeight?: number;
  weight?: string | number;
};
