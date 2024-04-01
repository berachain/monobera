import React from "react";
import type { Metadata } from "next";
import { perpsName } from "@bera/config";
import type { Market } from "@bera/proto/src";

import { MarketImages } from "~/utils/marketImages";
import { MarketTokenNames } from "~/utils/marketTokenNames";
import { getMarkets } from "~/endpoints";
import type { IMarket } from "~/types/market";
import Home from "./components/portfolio-home";

export function generateMetadata(): Metadata {
  return {
    title: `Portfolio | ${perpsName}`,
  };
}

export const revalidate = 30;

export default async function Page() {
  const m = await getMarkets();
  const markets: IMarket[] = m?.map((m: Market) => ({
    ...m,
    imageUri: MarketImages[m.name],
    tokenName: MarketTokenNames[m.name],
  })) as IMarket[];
  return <Home markets={markets} />;
}
