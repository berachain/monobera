import React from "react";
import { type Metadata } from "next";
import { GaugeDetails } from "./gauge-details";

export function generateMetadata(): Metadata {
  return {
    title: "Gaugue | BGT | Berachain",
  };
}

export const revalidate = 5;

export default async function PoolPage({
  params,
}: {
  params: { gaugeAddress: string };
}) {
  return <GaugeDetails gaugeAddress={params.gaugeAddress} />;
}
