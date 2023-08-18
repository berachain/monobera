import React from "react";

import IndividualMarketAnalytics from "./individual-market-analytics";

export default function Page({
  searchParams,
}: {
  searchParams: {
    address: `0x${string}`;
  };
}) {
  return <IndividualMarketAnalytics address={searchParams.address} />;
}
