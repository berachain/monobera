"use client";

import type { IMarket } from "~/app/berpetuals/page";
import TradingHistory from "~/app/leaderboard/trading-history";
import Portfolio from "../portfolio";
import UserOpenPositions from "../userAssets";

export const PortfolioHome = ({ markets }: { markets: IMarket[] }) => {
  return (
    <div className="container mt-8 flex max-w-[1200px] flex-col gap-16">
      <Portfolio markets={markets} />
      <UserOpenPositions markets={markets} />
      <TradingHistory markets={markets} />
    </div>
  );
};
