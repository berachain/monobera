import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { type Market } from "@/../../packages/proto/src";
import { cloudinaryUrl, perpsName } from "@bera/config";
import { Footer } from "@bera/shared-ui";
import { formatUnits } from "viem";

import { MarketImages } from "~/utils/marketImages";
import { MarketTokenNames } from "~/utils/marketTokenNames";
import {
  getDailyPriceChange,
  getMarkets,
  getTradingSummary,
} from "~/endpoints";
import { type IMarket } from "./berpetuals/page";
import GeneralInfo from "./components/general-info";
import Help from "./components/help";
import Hero from "./components/hero";
import Markets from "./components/positions";
import Tutorial from "./components/tutorial";

export function generateMetadata(): Metadata {
  return {
    title: `Home | ${perpsName}`,
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
    <div className="relative">
      <Image
        src={`${cloudinaryUrl}/BERPS/grid-hero_ht7fz0`}
        alt="dashboard"
        priority
        className="absolute left-1/2 z-0 w-full max-w-[1280px] -translate-x-1/2 transform opacity-20 dark:opacity-100"
        width={1280}
        height={100}
      />
      <div className="relative z-10 flex flex-col gap-[128px] bg-lend bg-contain bg-no-repeat pb-[72px] pt-20 md:pt-[116px] lg:pt-[140px]">
        <Hero />
        <GeneralInfo tradingSummary={tradingSummary} />
        <Markets showBtn markets={markets} />
        <Tutorial />
        <Help />
      </div>
      <Footer />
    </div>
  );
}
