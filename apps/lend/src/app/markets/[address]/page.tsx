import React from "react";
import { notFound } from "next/navigation";
import { isIPFS } from "@bera/config";
import { type Address } from "viem";

import IndividualMarketAnalytics from "./individual-market-analytics";

export default function Page({ params }: { params: { address: Address } }) {
  if (isIPFS) notFound();
  return <IndividualMarketAnalytics address={params.address} />;
}

export async function generateStaticParams() {
  if (isIPFS) {
    const addresses = ["0x"];
    return addresses.map((address) => ({
      address,
    }));
  }
  return [];
}
