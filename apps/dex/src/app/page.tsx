import React from "react";
import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { Documentation, Footer } from "@bera/shared-ui";

import { getMetaTitle } from "~/utils/metadata";
import CreateAPool from "./components/CreateAPool";
import Data from "./components/Data";
import Hero from "./components/Hero";

const getTvl = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/tvldaily/global`,
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pools");
  }

  const result = await res.json();
  return result;
};

const getVolume = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/volumedaily/global`,
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pools");
  }

  const result = await res.json();
  return result;
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
        <div className="container max-w-[1200px]">
          <Hero />
          <Data tvl={data?.tvl?.result} volume={data?.volume?.result} />
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
