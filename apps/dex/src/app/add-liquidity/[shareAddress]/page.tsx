import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { dexName } from "@bera/config";
import { isAddress } from "viem";

import { getMetaTitle } from "~/utils/metadata";
import { fetchSelectedPool } from "../../pools/fetchPools";
import AddLiquidityContent from "../AddLiquidityContent";

export function generateMetadata(): Metadata {
  return {
    title: getMetaTitle("Add Liquidity"),
    description: `Add liquidity to ${dexName}`,
  };
}

export const fetchCache = "force-no-store";

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
    return <AddLiquidityContent pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
