import React from "react";
import { type Metadata } from "next";
import { GaugeDetails } from "./components/gauge-details";
import { Address } from "viem";
import { getMetaTitle } from "@bera/shared-ui";
import { bgtName } from "@bera/config";

export function generateMetadata(): Metadata {
  return {
    title: getMetaTitle("Gauge", bgtName),
  };
}

export const revalidate = 5;

export default async function PoolPage({
  params,
}: {
  params: { gaugeAddress: Address };
}) {
  return <GaugeDetails gaugeAddress={params.gaugeAddress} />;
}
