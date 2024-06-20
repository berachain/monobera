import React from "react";
import { honeyTokenAddress } from "@bera/config";
import IndividualMarketAnalytics from "./individual-market-analytics";

export default function MarketsPage() {
  // if (params.address.toLowerCase() !== honeyTokenAddress.toLowerCase())
  //   notFound();

  return <IndividualMarketAnalytics address={honeyTokenAddress} />;
}
