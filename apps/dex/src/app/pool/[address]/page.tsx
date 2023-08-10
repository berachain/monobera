import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { RouterService, defaultConfig } from "@bera/bera-router";

import { getWBeraPriceDictForPoolTokens } from "../api/getPrice";
import PoolPageContent from "./PoolPageContent";
import { type MappedTokens } from "./types";

type Props = {
  params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: `${address} Pool | DEX | Berachain`,
  };
}

interface IData {
  prices: MappedTokens;
}

export default async function PoolPage({
  params,
}: {
  params: { address: string };
}) {
  const router = new RouterService(defaultConfig);
  try {
    await router.fetchPools();
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
  }
  const pool = router.getPool(params.address);

  if (!pool) {
    notFound();
  }
  const prices = getWBeraPriceDictForPoolTokens(pool ? [pool] : [], router);

  const data: IData = await Promise.all([prices]).then(([prices]) => ({
    prices: prices as unknown as MappedTokens,
  }));

  return <PoolPageContent prices={data.prices} pool={pool} />;
}
