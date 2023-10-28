import TradingHistory from "~/app/history/trading-history";
import Portfolio from "../portfolio";
import UserAssets from "../userAssets";

export const PortfolioHome = () => {
  return (
    <div className="container mt-8 flex max-w-[1200px] flex-col gap-16">
      <Portfolio />
      <UserAssets />
      <TradingHistory />
    </div>
  );
};
