import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { perpsName } from "@bera/config";
import { type Market } from "@bera/proto/src";

import { MarketImages } from "~/utils/marketImages";
import { getDailyPriceChange, getGlobalParams, getMarkets } from "~/endpoints";
import { GeneralInfoBanner } from "../components/general-info-banner";
import { InstrumentDropdown } from "../components/instrument-dropdown";
import OrderChart from "../components/order-chart";
import { OrderHistory } from "../components/order-history";
import CreatePosition from "../create-position";
import { type IMarket } from "../page";

type Props = {
  params: { market: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { market } = params;
  return {
    title: `${market} | ${perpsName}`,
  };
}

export default async function Home({ params }: Props) {
  try {
    const m = getMarkets();
    const p = getGlobalParams();
    const pc = getDailyPriceChange();

    const data: any = await Promise.all([m, p, pc]).then(
      ([markets, params, priceChange]) => ({
        markets,
        params,
        priceChange,
      }),
    );

    const markets: IMarket[] = data.markets.map((m: Market) => ({
      ...m,
      imageUri: MarketImages[m.name],
    }));

    const defualtMarket = markets.find((m: Market) => m.name === params.market);

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
              priceChange={data.priceChange}
            />
          </div>
          <GeneralInfoBanner
            market={defualtMarket}
            priceChange={data.priceChange}
          />{" "}
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
  } catch (e) {
    notFound();
  }
}
