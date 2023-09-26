import { type Address } from "wagmi";

export type Asset = {
  address: Address;
  totalSupplied: number;
  totalBorrowed: number | undefined;
  supplyAPR: number;
  borrowAPR: number | undefined;
  dollarValue: number;
};
