import React from "react";

import AvailableMarket from "./available-markets";

export default function Home() {
  return (
    <div className="container mt-8 flex flex-col gap-16">
      <AvailableMarket />
    </div>
  );
}
