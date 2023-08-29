import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { RouterService, defaultConfig } from "@bera/bera-router";
import { type CuttingBoard } from "@bera/berajs";

import { getWBeraPriceDictForPoolTokens } from "../api/getPrice";
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

export const fetchCache = "force-no-store";

async function getGlobalCuttingBoard() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_INDEXER_ENDPOINT}/bgt/rewards`,
    );
    const jsonRes = await res.json();
    return jsonRes.result;
  } catch (e) {
    console.log(e);
  }
}

export default async function PoolPage({
  params,
}: {
  params: { address: string };
}) {
  try {
    const router = new RouterService(defaultConfig);

    const globalCuttingBoard = getGlobalCuttingBoard();

    const fetchPools = router.fetchPools();
    const data: any = await Promise.all([fetchPools, globalCuttingBoard]).then(
      ([fetchPools, globalCuttingBoard]) => ({
        fetchPools: fetchPools,
        globalCuttingBoard: globalCuttingBoard,
      }),
    );
    const pool = router.getPool(params.address);

    if (!pool) {
      notFound();
    }
    const prices = await getWBeraPriceDictForPoolTokens(
      pool ? [pool] : [],
      data?.globalCuttingBoard as CuttingBoard[],
      router,
    );
    return <PoolPageContent prices={prices} pool={pool} />;
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
