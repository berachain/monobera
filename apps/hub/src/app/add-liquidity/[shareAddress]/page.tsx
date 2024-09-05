import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { dexName } from "@bera/config";
import { getMetaTitle } from "@bera/shared-ui";
import { Address, isAddress } from "viem";

import AddLiquidityContent2 from "../AddLiquidityContent2";

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

    return (
      <AddLiquidityContent2 shareAddress={params.shareAddress as Address} />
    );
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
