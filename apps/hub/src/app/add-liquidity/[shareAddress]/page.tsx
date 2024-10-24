import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { dexName } from "@bera/config";
import { Address, isAddress } from "viem";

import AddLiquidityContent from "../AddLiquidityContent";
import { balancerClient } from "@bera/berajs/actions";

export function generateMetadata(): Metadata {
  return {
    title: "Add Liquidity",
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
    // if (!isAddress(params.shareAddress)) {
    //   notFound();
    // }
    const pool = await balancerClient.pools.find(params.shareAddress);
    if (!pool) {
      notFound();
    }

    return (
      <AddLiquidityContent shareAddress={params.shareAddress as Address} />
    );
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}

export function generateStaticParams() {
  return [
    {
      shareAddress: "0x",
    },
  ];
}
