import React from "react";
import { type Metadata } from "next";

import { getMetaTitle } from "~/utils/metadata";
import CreateAPool from "./components/CreateAPool";
import Data from "./components/Data";
import Help from "./components/Help";
import Hero from "./components/Hero";
import { notFound } from "next/navigation";

const getTvl1 = async () => {
  console.log(`${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/volumedaily/global`)
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

const getVolume1 = async () => {
  console.log(`${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/volumedaily/global`)
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

export default async function Homepage() {

  try {
    // const data: any = await Promise.all([tvl, volume]).then(([tvl, volume]) => ({
    //   tvl: tvl,
    //   volume: volume,
    // }));
    const tvl = await getTvl1();
    const volume = await getVolume1();
  return (
    <div className="container max-w-[1200px]">
      <Hero />
      <Data tvl={tvl?.result} volume={volume?.result} />
      <div className="-mx-full overflow-hidden">
        <CreateAPool />
      </div>
      <Help />
    </div>
  );
  } catch(e) {
    console.log(e)
    notFound()
  }

}
