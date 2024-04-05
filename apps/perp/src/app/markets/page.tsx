import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { type Market } from "@/../../packages/proto/src";
import { perpsName } from "@bera/config";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { MarketImages } from "~/utils/marketImages";
import { MarketTokenNames } from "~/utils/marketTokenNames";
import GeneralInfo from "~/app/components/general-info";
import Markets from "~/app/components/positions";
import {
  getDailyPriceChange,
  getHistoricalSummary,
  getMarkets,
  getTradingSummary,
} from "~/endpoints";
import type { IMarket } from "~/types/market";
import AvailableMarket from "./components/available-markets";

export function generateMetadata(): Metadata {
  return {
    title: `Markets | ${perpsName}`,
  };
}

export const revalidate = 5;

export default async function Home() {
  const m = getMarkets();
  const pc = getDailyPriceChange();
  const ts = getTradingSummary();
  const hs = getHistoricalSummary();

  const data: any = await Promise.all([m, pc, ts, hs]).then(
    ([markets, priceChange, tradingSummary, historicalSummary]) => ({
      markets,
      priceChange,
      tradingSummary,
      historicalSummary,
    }),
  );

  if (!data) {
    notFound();
  }
  const markets: IMarket[] = data.markets.map((m: Market) => {
    const historicalInfo = data.historicalSummary.find(
      (h: any) => h.pair_index === m.pair_index,
    );

    return {
      ...m,
      imageUri: MarketImages[m.name],
      tokenName: MarketTokenNames[m.name],
      dailyHistoricPrice: Number(data.priceChange[Number(m.pair_index)]),
      dailyVolume: historicalInfo === undefined ? 0 : historicalInfo.volume,
      dailyNumOfTrades:
        historicalInfo === undefined ? 0 : historicalInfo.num_trades,
    };
  });

  const oiLong = markets?.reduce((acc: BigNumber, market: IMarket) => {
    return acc.plus(formatFromBaseUnit(market.open_interest?.oi_long ?? 0, 18));
  }, BigNumber(0));
  const oiShort = markets?.reduce((acc: BigNumber, market: IMarket) => {
    return acc.plus(
      formatFromBaseUnit(market.open_interest?.oi_short ?? 0, 18),
    );
  }, BigNumber(0));

  const oi = oiLong.plus(oiShort).toString(10);

  const tradingSummary = {
    ...data.tradingSummary,
    oi,
  };
  return (
    <div className="mt-8 flex flex-col gap-16">
      <Markets markets={markets} />
      <GeneralInfo tradingSummary={tradingSummary} />
      <AvailableMarket markets={markets} />
    </div>
  );
}
