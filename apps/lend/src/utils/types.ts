import { type Token } from "@bera/berajs";

export type Asset = {
  token: Token;
  totalSupplied: number;
  totalBorrowed: number | undefined;
  supplyAPR: number;
  borrowAPR: number | undefined;
  dollarValue: number;
};
