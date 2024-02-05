import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import PoolPageContent from "./PoolPageContent";
import { isAddress } from "viem";
import { fetchSelectedPool } from "../pools/fetchPools";

export function generateMetadata(): Metadata {
  return {
    title: "Pool | DEX | Berachain",
  };
}

// export const fetchCache = "force-no-store";

export const revalidate = 5;

export default async function PoolPage({
  searchParams,
}: {
  searchParams: { base: string; quote: string };
}) {
  try {
    if (!isAddress(searchParams.base) || !isAddress(searchParams.quote)) {
      notFound();
    }
    const pool = await fetchSelectedPool(searchParams.base, searchParams.quote);

    if (!pool) {
      notFound();
    }
    return <PoolPageContent pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
