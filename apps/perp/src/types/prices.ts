import { PriceUpdate } from "@pythnetwork/hermes-client";

export type PythIds = { id: string; symbol: string; name: string }[];

export type HermesPrice = NonNullable<PriceUpdate["parsed"]>[number];

export type PricesMap = Record<string | number, HermesPrice>;

export type PricesListener = (updatedPrices: {
  prices: PricesMap;
  source: "fetch" | "stream";
}) => void;
