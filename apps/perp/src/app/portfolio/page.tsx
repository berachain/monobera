import React from "react";

import Portfolio from "./portfolio";
import UserAssets from "./userAssets";

export default function Home() {
  return (
    <div className="container mt-8 flex flex-col gap-16">
      <Portfolio />
      <UserAssets />
    </div>
  );
}
