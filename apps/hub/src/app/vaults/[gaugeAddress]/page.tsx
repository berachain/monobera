import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getGauge } from "@bera/berajs/actions";
import { bgtName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { unstable_serialize } from "swr";
import { Address, isAddress } from "viem";

import { GaugeDetails } from "./components/gauge-details";

export function generateMetadata(): Metadata {
  return {
    title: getMetaTitle("Gauge", bgtName),
  };
}

export const revalidate = 10;

export default async function PoolPage({
  params,
}: {
  params: { gaugeAddress: Address };
}) {
  if (process.env.NEXT_PUBLIC_HOST === "ipfs") {
    return notFound();
  }
  if (!isAddress(params.gaugeAddress)) {
    console.error("Invalid gauge address", params.gaugeAddress);
    notFound();
  }
  const gauge = await getGauge(params.gaugeAddress);

  if (!gauge) {
    console.error("gauge not found", gauge);
    notFound();
  }

  return <GaugeDetails gaugeAddress={params.gaugeAddress} />;
}
