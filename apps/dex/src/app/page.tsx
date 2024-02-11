import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { subgraphUrl } from "@bera/config";
import { Documentation, Footer } from "@bera/shared-ui";

import { getMetaTitle } from "~/utils/metadata";
import CreateAPool from "./components/CreateAPool";
import Data from "./components/Data";
import Hero from "./components/Hero";

const getTvl = async () => {
  try {
    const data = await fetch(subgraphUrl, {
      method: "POST",
      body: JSON.stringify({
        query: `{
            pools {
              id
              pool: address
              poolName: name
              tokens: poolTokens {
                denomWeight
                amount
                denom
                address
                symbol
                decimals
                latestPriceUsd {
                  id
                  price
                }
              }
              swapFee
              sharesDenom
              sharesAddress
              totalShares
              tvlUsd
            }}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    })
      .then((res) => res.json())
      .catch((e: any) => {
        console.log("fetching error", e);
        return undefined;
      });

    if (data.error !== undefined) {
      console.error("error fetching cutting board");
    }

    const total = data?.data?.pools?.reduce(
      (
        acc: number,
        curr: {
          tvlUsd: string;
        },
      ) => {
        return acc + Number(curr.tvlUsd);
      },
      0,
    );
    return total ?? 0;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

const getVolume = async () => {
  try {
    const data = await fetch(subgraphUrl, {
      method: "POST",
      body: JSON.stringify({
        query: `{
            bexGlobalDayDatas(first: 1, orderBy: date, orderDirection: desc) {
              id
              volumeUsd
              date
            }}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 },
    })
      .then((res) => res.json())
      .catch((e: any) => {
        console.log("fetching error", e);
        return undefined;
      });

    if (data.error !== undefined) {
      console.error("error fetching cutting board");
    }

    return Number(data.data.bexGlobalDayDatas[0].volumeUsd ?? 0);
  } catch (e) {
    console.log(e);
    return 0;
  }
};

export const metadata: Metadata = {
  title: getMetaTitle("Home"),
  description: `Welcome to ${process.env.NEXT_PUBLIC_DEX_NAME}!`,
};

export const revalidate = 60;

export default async function Homepage() {
  const tvl = getTvl();
  const volume = getVolume();
  try {
    const data: any = await Promise.all([tvl, volume]).then(
      ([tvl, volume]) => ({
        tvl: tvl,
        volume: volume,
      }),
    );

    return (
      <>
        <div className="container max-w-1280 pb-16">
          <Hero />
          <Data tvl={data?.tvl} volume={data?.volume} />
          <Documentation className="my-24" />
        </div>
        <Footer />
      </>
    );
  } catch (e) {
    console.log(e);
    notFound();
  }
}
