import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Market } from "@/../../packages/proto/src";
import { perpsName } from "@bera/config";
import { formatUnits } from "viem";

import { MarketImages } from "~/utils/marketImages";
import { MarketTokenNames } from "~/utils/marketTokenNames";
import {
  getDailyPriceChange,
  getMarkets,
  getTradingSummary,
} from "~/endpoints";
import { type IMarket } from "../berpetuals/page";
import GeneralInfo from "../components/general-info";
import Markets from "../components/positions";
import AvailableMarket from "./available-markets";

export function generateMetadata(): Metadata {
  return {
    title: `Markets | ${perpsName}`,
  };
}
export default async function Home() {
  const m = getMarkets();
  const pc = getDailyPriceChange();
  const ts = getTradingSummary();

  const data: any = await Promise.all([m, pc, ts]).then(
    ([markets, priceChange, tradingSummary]) => ({
      markets,
      priceChange,
      tradingSummary,
    }),
  );

  if (!data) {
    notFound();
  }
  const markets: IMarket[] = data.markets.map((m: Market) => ({
    ...m,
    imageUri: MarketImages[m.name],
    tokenName: MarketTokenNames[m.name],
    dailyHistoricPrice: Number(data.priceChange[Number(m.pair_index)]),
  }));

  let oi = 0;
  const oiLong = markets?.reduce((acc: number, market: IMarket) => {
    return (
      acc + Number(formatUnits(BigInt(market.open_interest?.oi_long ?? 0n), 18))
    );
  }, 0);
  const oiShort = markets?.reduce((acc: number, market: IMarket) => {
    return (
      acc +
      Number(formatUnits(BigInt(market.open_interest?.oi_short ?? 0n), 18))
    );
  }, 0);

  oi = oiLong + oiShort;

  const tradingSummary = {
    ...data.tradingSummary,
    oi,
  };
  return (
    <div className="container mt-8 flex flex-col gap-16">
      <Markets markets={markets} />
      <GeneralInfo tradingSummary={tradingSummary} />
      <AvailableMarket markets={markets} />
    </div>
  );
}
