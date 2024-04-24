import { type Price } from "@pythnetwork/pyth-evm-js";

export type PythIds = { id: string; symbol: string; name: string }[];

export type PricesMap = Record<string, Price>;

export type PricesListener = (updatedPrices: {
  prices: PricesMap;
  source: "fetch" | "stream";
}) => void;
