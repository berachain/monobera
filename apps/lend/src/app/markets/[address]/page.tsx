import React from "react";
import { notFound } from "next/navigation";
import { type Address } from "viem";

import IndividualMarketAnalytics from "./individual-market-analytics";

export default function Page({ params }: { params: { address: Address } }) {
  if (process.env.NEXT_PUBLIC_HOST === "ipfs") notFound();
  return <IndividualMarketAnalytics address={params.address} />;
}

export async function generateStaticParams() {
  if (process.env.NEXT_PUBLIC_HOST === "ipfs") {
    const addresses = ["0x"];
    return addresses.map((address) => ({
      address,
    }));
  }
  return [];
}
