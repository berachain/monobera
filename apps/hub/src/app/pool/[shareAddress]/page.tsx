import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { isIPFS } from "@bera/config";
import { Address, isAddress } from "viem";

import PoolPageContent from "../PoolPageContent";

export function generateMetadata(): Metadata {
  return {
    title: "Pool | DEX | Berachain",
  };
}

// THIS IS NOT COMPATIBLE WITH IPFS. CHECK THIS CAUSES BUGS
// export const dynamic = "force-dynamic";

export default async function PoolPage({
  params,
}: {
  params: { shareAddress: string };
}) {
  if (isIPFS) {
    return null;
  }

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

export function generateStaticParams() {
  return [
    {
      shareAddress: "0x",
    },
  ];
}
