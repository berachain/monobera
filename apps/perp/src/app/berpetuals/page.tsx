import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { perpsName } from "@bera/config";
import { type Market } from "@bera/proto/src";

import { MarketImages } from "~/utils/marketImages";
import { MarketTokenNames } from "~/utils/marketTokenNames";
import {
  getDailyPriceChange,
  getGlobalParams,
  getHistoricalSummary,
  getMarkets,
} from "~/endpoints";
import { GeneralInfoBanner } from "./components/general-info-banner";
import { InstrumentDropdown } from "./components/instrument-dropdown";
import OrderChart from "./components/order-chart";
import { OrderHistory } from "./components/order-history";
import CreatePosition from "./create-position";

const DEFAULT_MARKET = "ETH-USD";

export interface IMarket extends Market {
  imageUri?: string;
  tokenName?: string;
  dailyHistoricPrice?: number;
  dailyVolume?: number;
  dailyNumOfTrades?: number;
}
export function generateMetadata(): Metadata {
  return {
    title: `${DEFAULT_MARKET} | ${perpsName}`,
  };
}

export default async function Home() {
  const m = getMarkets();
  const p = getGlobalParams();
  const pc = getDailyPriceChange();
  const hs = getHistoricalSummary();
  const data: any = await Promise.all([m, p, pc, hs]).then(
    ([markets, params, priceChange, historicalSummary]) => ({
      markets,
      params,
      priceChange,
      historicalSummary,
    }),
  );

  const markets: IMarket[] = data.markets.map((m: Market) => {
    const historicalInfo = data.historicalSummary.find(
      (h: any) => h.pair_index === m.pair_index,
    );
    return {
      ...m,
      imageUri: MarketImages[m.name],
      tokenName: MarketTokenNames[m.name],
      dailyVolume: historicalInfo === undefined ? 0 : historicalInfo.volume,
      dailyNumOfTrades:
        historicalInfo === undefined ? 0 : historicalInfo.num_trades,
    };
  });

  const defualtMarket = markets.find((m: Market) => m.name === DEFAULT_MARKET);

  if (!data || !defualtMarket || !data.params) {
    notFound();
  }

  return (
    <div>
      <div className="flex h-fit w-full flex-col lg:flex-row">
        <div className="h-fit w-full flex-shrink-0 flex-grow-0 lg:w-[400px]">
          <InstrumentDropdown
            markets={markets}
            selectedMarket={defualtMarket}
            priceChange={data.priceChange}
          />
        </div>
        <GeneralInfoBanner
          market={defualtMarket}
          priceChange={data.priceChange}
        />
      </div>
      <span className="block lg:hidden">
        <OrderChart marketName={defualtMarket.name} />
      </span>
      <div className="flex w-full flex-col lg:flex-row">
        <CreatePosition market={defualtMarket} params={data.params} />
        <div className="h-full w-full pb-[34px] lg:w-screen-w-400">
          <span className="hidden lg:block">
            <OrderChart marketName={defualtMarket.name} />
          </span>
          <OrderHistory markets={markets} />
        </div>
      </div>{" "}
    </div>
  );
}
