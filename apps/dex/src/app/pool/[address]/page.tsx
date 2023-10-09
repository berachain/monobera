import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import PoolPageContent from "./PoolPageContent";

type Props = {
  params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: `${address} Pool | DEX | Berachain`,
  };
}

// export const fetchCache = "force-no-store";

export const revalidate = 60;

export default async function PoolPage({
  params,
}: {
  params: { address: string };
}) {
  try {
    const poolResponse = await fetch(
      `${getAbsoluteUrl()}/api/getSelectedPool/api?address=${params.address}`,
    );
    const pricesResponse = await fetch(`${getAbsoluteUrl()}/api/getPrices/api`);

    const pool = await poolResponse.json();
    const prices = await pricesResponse.json();

    return <PoolPageContent prices={prices} pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
