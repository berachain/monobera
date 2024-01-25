import { NextResponse } from "next/server";
import {
  RouterService,
  defaultConfig,
  parseBigIntToString,
} from "@bera/bera-router";
import { subgraphUrl } from "@bera/config";
import { type InflationRate } from "@bera/graphql";
import { type Address } from "wagmi";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import { getParsedPools } from "../../getPools/api/getPools";

// export const fetchCache = "force-cache";

export const revalidate = 10;

async function getBeraPrice() {
  const data = await fetch(subgraphUrl, {
    method: "POST",
    body: JSON.stringify({
      query: `{
        tokenHoneyPrice(id: "0x5806e416da447b267cea759358cf22cc41fae80f") {
          id
          price
        }
      }`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 10 },
  })
    .then((res) => res.json())
    .catch((e: any) => console.log("fetching error", e));

  if (data.error !== undefined) {
    console.error("error fetching cutting board");
  }
  return data.data.tokenHoneyPrice.price;
}

async function getGlobalCuttingBoard() {
  // const globalCuttingBoard: Weight[] = await client
  //   .query({
  //     query: getCuttingBoard,
  //     variables: {
  //       page: 0,
  //       limit: 1,
  //     },
  //   })
  //   .then((res: any) => {
  //     return res.data.globalCuttingBoardDatas[0].weights;
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     return undefined;
  //   });

  const data = await fetch(subgraphUrl, {
    method: "POST",
    body: JSON.stringify({
      query: `{
            globalCuttingBoardDatas(
              skip: 0
              first: 1
              orderBy: epoch
              orderDirection: desc
            ) {
              id
              epoch
              weights {
                id
                receiver
                amount
                epoch
              }
            }}
          `,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 10 },
  })
    .then((res) => res.json())
    .catch((e: any) => console.log("fetching error", e));

  if (data.error !== undefined) {
    console.error("error fetching cutting board");
  }
  return data.data.globalCuttingBoardDatas[0].weights;
}

async function getInflation() {
  try {
    // const inflationData: InflationRate | undefined = await client
    //   .query({
    //     query: getInflationData,
    //     variables: {
    //       page: 0,
    //       limit: 20,
    //     },
    //   })
    //   .then((res: any) => {
    //     const positiveInflationData = res.data.inflationRates.find(
    //       (inflationData: InflationRate) =>
    //         Number(inflationData.difference) > 0,
    //     );
    //     return positiveInflationData;
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     return undefined;
    //   });

    const data = await fetch(subgraphUrl, {
      method: "POST",
      body: JSON.stringify({
        query: `{
            inflationRates(
              skip: 0
              first: 20
              orderBy: currentBlock
              orderDirection: desc
            ) {
              id
              currentBlockSupply
              lastBlockSupply
              lastBlock
              currentBlock
              difference
              inflationRate
              bgtPerYear
            }}
          `,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    })
      .then((res) => res.json())
      .catch((e: any) => console.log("fetching error", e));

    if (data.error !== undefined) {
      console.error("error fetching cutting board");
    }
    const positiveInflationData = data.data.inflationRates.find(
      (inflationData: InflationRate) => Number(inflationData.difference) > 0,
    );
    return positiveInflationData;
  } catch (e) {
    console.log(e);
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const address = searchParams.get("address");

  if (address === null) {
    return NextResponse.json({ error: "Unable to fetch pools" });
  }
  try {
    const router = new RouterService(defaultConfig);
    const globalCuttingBoard = getGlobalCuttingBoard();
    const inflationRate = getInflation();
    const fetchPools = router.fetchSelectedPool(address as Address);

    const beraPrice = getBeraPrice()

    const data = await Promise.all([
      fetchPools,
      globalCuttingBoard,
      beraPrice,
      inflationRate,
    ]).then(
      ([fetchPools, globalCuttingBoard, beraPrice, inflationRate]) => ({
        fetchPools: fetchPools,
        globalCuttingBoard: globalCuttingBoard,
        beraPrice: beraPrice,
        inflationRate: inflationRate,
      }),
    );
    const pools = data.fetchPools;


    const parsedPools = getParsedPools(
      pools as any,
      data.globalCuttingBoard,
      data.beraPrice,
      data.inflationRate,
    );

    if (!parsedPools) {
      return NextResponse.json({ error: "Unable to fetch pools" });
    }

    return NextResponse.json(parseBigIntToString(parsedPools[0]));
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Unable to fetch pools" });
  }
}

export async function generateStaticParams() {
  const _pricesResponse = await fetch(`${getAbsoluteUrl()}/api/getPrices/api`);

  return [];
}
