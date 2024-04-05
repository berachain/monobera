"use client";

import type { IMarket } from "~/types/market";
import Stats from "./stats";
import TradingHistory from "./trading-history";
import UserOpenPositions from "./userAssets";

export const PortfolioHome = ({ markets }: { markets: IMarket[] }) => {
  return (
    <div className="mt-8 flex flex-col gap-16">
      <Stats markets={markets} />
      <UserOpenPositions markets={markets} />
      <TradingHistory markets={markets} />
    </div>
  );
};
