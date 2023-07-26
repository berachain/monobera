/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { RouterService, defaultConfig } from "@bera/bera-router";

import { getWBeraPriceDictForPoolTokens } from "../api/getPrice";
import PoolPageContent from "./PoolPageContent";
import { type MappedTokens, type SwapData } from "./types";

type Props = {
  params: { address: string };
};

async function getSwaps(address: string) {
  try {
    const res: any = await fetch(
      `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/events/dex/swap?pool=${address}`,
      { cache: "no-store" },
    );
    const jsonRes = await res.json();
    if (!jsonRes) {
      throw new Error("Failed to fetch swap data");
    }
    return jsonRes;
  } catch (e) {
    notFound();
  }
}

async function getAddLiquidity(address: string) {
  try {
    const res: any = await fetch(
      `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/events/dex/add_liquidity?pool=${address}`,
      { cache: "no-store" },
    );
    const jsonRes = await res.json();
    if (!jsonRes) {
      throw new Error("Failed to fetch add liquidity data");
    }
    return jsonRes;
  } catch (e) {
    notFound();
  }
}

async function getRemoveLiquidity(address: string) {
  try {
    const res: any = await fetch(
      `http://k8s-devnet-apinlb-25cc83ec5c-24b3d2c710b46250.elb.us-east-2.amazonaws.com/events/dex/remove_liquidity?pool=${address}`,
      { cache: "no-store" },
    );
    const jsonRes = await res.json();
    if (!jsonRes) {
      throw new Error("Failed to fetch remove liquidity data");
    }
    return jsonRes;
  } catch (e) {
    notFound();
  }
}

export function generateMetadata({ params }: Props): Metadata {
  const { address } = params;
  return {
    title: `${address} Pool | DEX | Berachain`,
  };
}

interface IData {
  swaps: SwapData[];
  adds: any;
  removes: any;
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
  const swaps = getSwaps(params.address);
  const adds = getAddLiquidity(params.address);
  const removes = getRemoveLiquidity(params.address);
  const prices = getWBeraPriceDictForPoolTokens(pool ? [pool] : [], router);

  const data: IData = await Promise.all([swaps, adds, removes, prices]).then(
    ([swaps, adds, removes, prices]) => ({
      swaps: swaps.result,
      adds: adds.result,
      removes: removes.result,
      prices: prices as unknown as MappedTokens,
    }),
  );

  return (
    <PoolPageContent
      swaps={data.swaps}
      adds={data.adds}
      removes={data.removes}
      prices={data.prices}
      pool={pool}
    />
  );
}
