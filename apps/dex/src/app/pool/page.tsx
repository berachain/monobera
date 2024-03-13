import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { isAddress } from "viem";

import { fetchSelectedPool } from "../pools/fetchPools";
import PoolPageContent from "./PoolPageContent";

export function generateMetadata(): Metadata {
  return {
    title: "Pool | DEX | Berachain",
  };
}

export const revalidate = 5;

export default async function PoolPage({
  searchParams,
}: {
  searchParams: { shareAddress: string };
}) {
  try {
    if (!isAddress(searchParams.shareAddress)) {
      notFound();
    }
    const pool = await fetchSelectedPool(searchParams.shareAddress);

    if (!pool) {
      notFound();
    }
    return <PoolPageContent pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
