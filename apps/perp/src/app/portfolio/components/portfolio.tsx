import AvailableMarket from "~/app/markets/available-markets";
import Portfolio from "../portfolio";
import UserAssets from "../userAssets";

export const PortfolioHome = () => {
  return (
    <div className="container mt-8 flex flex-col gap-16">
      <Portfolio />
      <UserAssets />
      <AvailableMarket markets={[]} />
    </div>
  );
};
