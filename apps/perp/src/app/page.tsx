import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { type Market } from "@/../../packages/proto/src";
import { cloudinaryUrl, perpsDocsUrl, perpsName } from "@bera/config";
import { Documentation, Footer } from "@bera/shared-ui";
import BigNumber from "bignumber.js";

import { formatFromBaseUnit } from "~/utils/formatBigNumber";
import { MarketImages } from "~/utils/marketImages";
import { MarketTokenNames } from "~/utils/marketTokenNames";
import {
  getDailyPriceChange,
  getMarkets,
  getTradingSummary,
} from "~/endpoints";
import { type IMarket } from "~/types/market";
import GeneralInfo from "./components/general-info";
import Hero from "./components/hero";
import Markets from "./components/positions";
import Tutorial from "./components/tutorial";

export function generateMetadata(): Metadata {
  return {
    title: `Home | ${perpsName}`,
    description: `Welcome to ${perpsName}!`,
  };
}

export const revalidate = 30;

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
  const markets: IMarket[] = data.markets.map((m: Market) => ({
    ...m,
    imageUri: MarketImages[m.name],
    tokenName: MarketTokenNames[m.name],
    dailyHistoricPrice: Number(data.priceChange[Number(m.pair_index)]),
  }));

  if (!data) {
    notFound();
  }
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
    <div className="relative">
      <Image
        src={`${cloudinaryUrl}/BERPS/grid-hero_ht7fz0`}
        alt="dashboard"
        priority
        className="absolute left-1/2 z-0 w-full max-w-[1280px] -translate-x-1/2 transform opacity-20 dark:opacity-100"
        width={1280}
        height={100}
      />
      <div className="relative z-10 mx-auto flex max-w-1280 flex-col gap-[128px] bg-lend bg-contain bg-no-repeat pb-[72px] pt-20 md:pt-[116px] lg:pt-[140px]">
        <Hero />
        <GeneralInfo tradingSummary={tradingSummary} />
        <Markets showBtn markets={markets} />
        <Tutorial />
        <Documentation
          docLink={perpsDocsUrl}
          className="mx-auto w-full max-w-[1280px] px-8"
        />
      </div>
      <Footer />
    </div>
  );
}
