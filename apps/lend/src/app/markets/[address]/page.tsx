import React from "react";

import IndividualMarketAnalytics from "./individual-market-analytics";

export default function Page({
  searchParams,
}: {
  searchParams: {
    address: `0x${string}`;
  };
}) {
  return (
    <div className="container my-28">
      <IndividualMarketAnalytics address={searchParams.address} />
    </div>
  );
}
