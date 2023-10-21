import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { perpsName } from "@bera/config";
import { type Market } from "@bera/proto/src";

import { MarketImages } from "~/utils/marketImages";
import { getMarkets } from "~/endpoints";
import { GeneralInfoBanner } from "./components/general-info-banner";
import { InstrumentDropdown } from "./components/instrument-dropdown";
import OrderChart from "./components/order-chart";
import { OrderHistory } from "./components/order-history";
import CreatePosition from "./create-position";

const DEFAULT_MARKET = "ETH-USD";

export interface IMarket extends Market {
  imageUri?: string;
  tokenName?: string;
}
export function generateMetadata(): Metadata {
  return {
    title: `BTC-USD | ${perpsName}`,
  };
}

export default async function Home() {
  const m = getMarkets();
  const data: any = await Promise.all([m]).then(([markets]) => ({
    markets,
  }));

  const markets: IMarket[] = data.markets.map((m: Market) => ({
    ...m,
    imageUri: MarketImages[m.name],
  }));

  const defualtMarket = markets.find((m: Market) => m.name === DEFAULT_MARKET);

  if (!data || !defualtMarket) {
    notFound();
  }
  return (
    <div>
      <div className="flex h-fit w-full flex-col lg:flex-row">
        <div className="h-fit w-full flex-shrink-0 flex-grow-0 lg:w-[400px]">
          <InstrumentDropdown
            markets={markets}
            selectedMarket={defualtMarket}
          />
        </div>
        <GeneralInfoBanner market={defualtMarket} />
      </div>
      <span className="block lg:hidden">
        <OrderChart />
      </span>
      <div className="flex w-full flex-col lg:flex-row">
        <CreatePosition market={defualtMarket} />
        <div className="h-full w-full pb-[34px] lg:w-screen-w-400">
          <span className="hidden lg:block">
            <OrderChart />
          </span>
          <OrderHistory />
        </div>
      </div>{" "}
    </div>
  );
}
