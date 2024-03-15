import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { isAddress } from "viem";

import { fetchSelectedPool } from "../../pools/fetchPools";
import PoolPageContent from "../PoolPageContent";

export function generateMetadata(): Metadata {
  return {
    title: "Pool | DEX | Berachain",
  };
}

export const revalidate = 5;

export default async function PoolPage({
  params,
}: {
  params: { shareAddress: string };
}) {
  try {
    if (!isAddress(params.shareAddress)) {
      notFound();
    }
    const pool = await fetchSelectedPool(params.shareAddress);

    if (!pool) {
      notFound();
    }
    return <PoolPageContent pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
