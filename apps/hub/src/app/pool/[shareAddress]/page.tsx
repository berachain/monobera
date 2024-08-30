import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Address, isAddress } from "viem";

import PoolPageContent from "../PoolPageContent";

export function generateMetadata(): Metadata {
  return {
    title: "Pool | DEX | Berachain",
  };
}

export const dynamic = "force-dynamic";

export default async function PoolPage({
  params,
}: {
  params: { shareAddress: string };
}) {
  try {
    if (!isAddress(params.shareAddress)) {
      notFound();
    }
    return <PoolPageContent shareAddress={params.shareAddress as Address} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
