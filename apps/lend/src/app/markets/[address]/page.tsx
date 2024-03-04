import React from "react";
import { notFound } from "next/navigation";
import { honeyTokenAddress } from "@bera/config";
import { type Address } from "wagmi";

import IndividualMarketAnalytics from "./individual-market-analytics";

export default function Page({
  params,
}: {
  params: {
    address: Address;
  };
}) {
  if (params.address.toLowerCase() !== honeyTokenAddress.toLowerCase())
    notFound();

  return <IndividualMarketAnalytics address={params.address} />;
}
