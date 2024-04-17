import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchPoolByAddress } from "@bera/berajs/utils";
import { dexName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { isAddress } from "viem";

import AddLiquidityContent from "../AddLiquidityContent";

export function generateMetadata(): Metadata {
  return {
    title: getMetaTitle("Add Liquidity", dexName),
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
    const pool = await fetchPoolByAddress(params.shareAddress);

    if (!pool) {
      notFound();
    }
    return <AddLiquidityContent pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
