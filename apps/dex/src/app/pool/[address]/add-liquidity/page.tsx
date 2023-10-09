import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { RouterService, defaultConfig } from "@bera/bera-router";
import { type CuttingBoard } from "@bera/berajs";

import { getMetaTitle } from "~/utils/metadata";
import { getWBeraPriceDictForPoolTokens } from "../../api/getPrice";
import { type MappedTokens } from "../types";
import AddLiquidityContent from "./AddLiquidityContent";

type Props = {
  params: { address: string };
};

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: getMetaTitle("Add Liquidity"),
    description: `Add liquidity from pool ${address}`,
  };
}

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

export const fetchCache = "force-no-store";

export default async function AddLiquidity({
  params,
}: {
  params: { address: string };
}) {
  const router = new RouterService(defaultConfig);
  const globalCuttingBoard = getGlobalCuttingBoard();
  try {
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
    return (
      <AddLiquidityContent
        pool={pool}
        prices={prices as unknown as MappedTokens}
      />
    );
  } catch (e) {
    console.log(`Error fetching pools: ${e}`);
    notFound();
  }
}
