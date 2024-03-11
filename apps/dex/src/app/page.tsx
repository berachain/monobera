import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { chainId, crocIndexerEndpoint } from "@bera/config";
import { Documentation, Footer } from "@bera/shared-ui";
import { useAnalytics } from "@bera/shared-ui/src/utils/analytics";

import { getMetaTitle } from "~/utils/metadata";
import Data from "./components/Data";
import Hero from "./components/Hero";

const getTvlAndVolume = (): Promise<{ tvl?: number; volume?: number }> => {
  return new Promise((res, rej) =>
    fetch(
      `${crocIndexerEndpoint}/v2/global_stats?chainId=0x${chainId.toString(
        16,
      )}`,
    )
      .then((response) => response.json())
      .then((data) => {
        res({
          tvl: data?.data?.formattedTVL,
          volume: data?.data?.formattedVolume24H,
        });
      })
      .then()
      .catch((e) => {
        rej(e);
      }),
  );
};

export const metadata: Metadata = {
  title: getMetaTitle("Home"),
  description: `Welcome to ${process.env.NEXT_PUBLIC_DEX_NAME}!`,
};

export const revalidate = 60;

export default async function Homepage() {
  const { captureException } = useAnalytics();
  const data = await getTvlAndVolume()
    .then((res) => res)
    .catch((e) => {
      captureException(e);
    });

  try {
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
