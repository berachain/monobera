import React from "react";
import { type Metadata } from "next";
import { GaugeDetails } from "./gauge-details";
import { Address } from "viem";

export function generateMetadata(): Metadata {
  return {
    title: "Gauge | BGT | Berachain",
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
