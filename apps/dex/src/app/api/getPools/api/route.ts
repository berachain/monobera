import { NextResponse } from "next/server";
import {
  RouterService,
  defaultConfig,
  parseBigIntToString,
} from "@bera/bera-router";
import {
  client,
  getGlobalCuttingBoard as getCuttingBoard,
  getInflationData,
  type InflationRate,
  type Weight,
} from "@bera/graphql";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { getParsedPools } from "./getPools";

// export const fetchCache = "force-cache";

export const revalidate = 10;

async function getGlobalCuttingBoard() {
  const globalCuttingBoard: Weight[] = await client
    .query({
      query: getCuttingBoard,
      variables: {
        page: 0,
        limit: 1,
      },
    })
    .then((res: any) => {
      return res.data.globalCuttingBoardDatas[0].weights;
    })
    .catch((e) => {
      console.log(e);
      return undefined;
    });

  return globalCuttingBoard;
}

async function getInflation() {
  try {
    const inflationData: InflationRate | undefined = await client
      .query({
        query: getInflationData,
        variables: {
          page: 0,
          limit: 20,
        },
      })
      .then((res: any) => {
        const positiveInflationData = res.data.inflationRates.find(
          (inflationData: InflationRate) =>
            Number(inflationData.difference) > 0,
        );
        return positiveInflationData;
      })
      .catch((e) => {
        console.log(e);
        return undefined;
      });

    return inflationData;
  } catch (e) {
    console.log(e);
  }
}

export async function GET() {
  try {
    const router = new RouterService(defaultConfig);
    const globalCuttingBoard = getGlobalCuttingBoard();
    const inflationRate = getInflation();
    const fetchPools = router.fetchPools();

    const pricesResponse = fetch(`${getAbsoluteUrl()}/api/getPrices/api`, {
      method: "GET",
      headers: {
        "x-vercel-protection-bypass": process.env
          .VERCEL_AUTOMATION_BYPASS_SECRET as string,
      },
    });

    const data = await Promise.all([
      fetchPools,
      globalCuttingBoard,
      pricesResponse,
      inflationRate,
    ]).then(
      ([fetchPools, globalCuttingBoard, pricesResponse, inflationRate]) => ({
        fetchPools: fetchPools,
        globalCuttingBoard: globalCuttingBoard,
        pricesResponse: pricesResponse,
        inflationRate: inflationRate,
      }),
    );
    const pools = router.getPools() ?? [];

    const mappedTokens = await data.pricesResponse.json();

    const parsedPools = getParsedPools(
      pools,
      data.globalCuttingBoard,
      mappedTokens,
      data.inflationRate,
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
