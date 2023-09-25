import React from "react";

import AvailableMarket from "../markets/available-markets";
import Portfolio from "./portfolio";
import UserAssets from "./userAssets";

export default function Home() {
  return (
    <div className="container mt-8 flex flex-col gap-16">
      <Portfolio />
      <UserAssets />
      <AvailableMarket />
    </div>
  );
}
