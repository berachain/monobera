import { NextResponse } from "next/server";
import {
  RouterService,
  defaultConfig,
  parseBigIntToString,
} from "@bera/bera-router";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { getParsedPools } from "./getPools";

// export const fetchCache = "force-cache";

export const revalidate = 60 * 2;

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

export async function GET() {
  try {
    const router = new RouterService(defaultConfig);
    const globalCuttingBoard = getGlobalCuttingBoard();

    const fetchPools = router.fetchPools();

    const pricesResponse = fetch(`${getAbsoluteUrl()}/api/getPrices/api`);

    const data = await Promise.all([
      fetchPools,
      globalCuttingBoard,
      pricesResponse,
    ]).then(([fetchPools, globalCuttingBoard, pricesResponse]) => ({
      fetchPools: fetchPools,
      globalCuttingBoard: globalCuttingBoard,
      pricesResponse: pricesResponse,
    }));
    const pools = router.getPools() ?? [];

    const mappedTokens = await data.pricesResponse.json();

    const parsedPools = await getParsedPools(
      pools,
      data.globalCuttingBoard,
      mappedTokens,
    );

    if (!parsedPools) {
      return NextResponse.json({ error: "Unable to fetch pools" });
    }

    return NextResponse.json(parseBigIntToString(parsedPools));
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Unable to fetch pools" });
  }
}

export async function generateStaticParams() {
  const _pricesResponse = await fetch(`${getAbsoluteUrl()}/api/getPrices/api`);

  return [];
}
