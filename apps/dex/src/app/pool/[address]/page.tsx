import React from "react";
import { type Metadata } from "next";

import PoolPageContent from "./PoolPageContent";

type Props = {
  params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: `${address} Pool | DEX | Berachain`,
  };
}

async function getData(address: string) {
  const res = await fetch(
    `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/liquidity/events?pool=${address}`,
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PoolPage({
  params,
}: {
  params: { address: string };
}) {
  const liquidityEvents = await getData(params.address);

  return (
    <PoolPageContent
      params={params}
      liquidityEvents={liquidityEvents["result"]}
    />
  );
}
