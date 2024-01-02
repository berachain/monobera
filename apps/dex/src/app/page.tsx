import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPools, getGlobalDexData, ssrClient } from "@bera/graphql";
import { Documentation, Footer } from "@bera/shared-ui";

import { getMetaTitle } from "~/utils/metadata";
import CreateAPool from "./components/CreateAPool";
import Data from "./components/Data";
import Hero from "./components/Hero";

const getTvl = async () => {
  const allPools = await ssrClient
    .query({
      query: getAllPools,
      variables: {
        limit: 1,
      },
    })
    .then((res: any) => res.data.pools)
    .catch((e) => {
      console.log(e);
      return undefined;
    });

  const total = allPools?.reduce(
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
  return total;
};

const getVolume = async () => {
  const globalDexData = await ssrClient
    .query({
      query: getGlobalDexData,
      variables: {
        limit: 1,
      },
    })
    .then((res: any) => res.data.bexGlobalDayDatas)
    .catch((e) => {
      console.log(e);
      return undefined;
    });

  return Number(globalDexData[0].volumeUsd);
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
          <div className="-mx-full overflow-hidden">
            <CreateAPool />
          </div>
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
