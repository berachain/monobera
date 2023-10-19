import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { type Market } from "@/../../packages/proto/src";
import { cloudinaryUrl } from "@bera/config";
import { Footer } from "@bera/shared-ui";

import { MarketImages } from "~/utils/marketImages";
import { MarketTokenNames } from "~/utils/marketTokenNames";
import { getMarkets } from "~/endpoints";
import { type IMarket } from "./berpetuals/page";
import GeneralInfo from "./components/general-info";
import Help from "./components/help";
import Hero from "./components/hero";
import Markets from "./components/positions";
import Tutorial from "./components/tutorial";

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
        <GeneralInfo />
        <Markets showBtn markets={markets} />
        <Tutorial />
        <Help />
      </div>
      <Footer />
    </div>
  );
}
