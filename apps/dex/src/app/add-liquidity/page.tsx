import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getMetaTitle } from "~/utils/metadata";
import AddLiquidityContent from "./AddLiquidityContent";
import { dexName } from "@bera/config";
import { isAddress } from "viem";
import { fetchSelectedPool } from "../pools/fetchPools";

export function generateMetadata(): Metadata {
  return {
    title: getMetaTitle("Add Liquidity"),
    description: `Add liquidity to ${dexName}`,
  };
}

export const fetchCache = "force-no-store";

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
    return <AddLiquidityContent pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
