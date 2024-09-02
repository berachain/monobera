import React from "react";
import { honeyTokenAddress } from "@bera/config";
import { type Address } from "viem";

import IndividualMarketAnalytics from "./individual-market-analytics";

export default function Page({ params }: { params: { address: Address } }) {
  return <IndividualMarketAnalytics address={params.address} />;
}

export async function generateStaticParams() {
  // TODO: is there any dynamic source of addresses?
  const addresses = [honeyTokenAddress];
  return addresses.map((address) => ({
    address,
  }));
}
