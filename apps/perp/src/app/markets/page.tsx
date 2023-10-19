import React from "react";
import { notFound } from "next/navigation";
import { type Market } from "@/../../packages/proto/src";

import { MarketImages } from "~/utils/marketImages";
import { MarketTokenNames } from "~/utils/marketTokenNames";
import { getMarkets } from "~/endpoints";
import { type IMarket } from "../berpetuals/page";
import GeneralInfo from "../components/general-info";
import Markets from "../components/positions";
import AvailableMarket from "./available-markets";

export default async function Home() {
  const m = getMarkets();
  const data: any = await Promise.all([m]).then(([markets]) => ({
    markets,
  }));

  const markets: IMarket[] = data.markets.map((m: Market) => ({
    ...m,
    imageUri: MarketImages[m.name],
    tokenName: MarketTokenNames[m.name],
  }));

  if (!data) {
    notFound();
  }
  return (
    <div className="container mt-8 flex flex-col gap-16">
      <Markets markets={markets} />
      <GeneralInfo />
      <AvailableMarket markets={markets} />
    </div>
  );
}
