// This will be the home page - just don't want to cause a merge conflict while homepage is used as `/swap`
// TODO Error Boundary + Loading State
import React from "react";

// import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";

// import { getAbsoluteUrl } from "~/utils/vercel-utils";
import CreateAPool from "./components/CreateAPool";
import Data from "./components/Data";
import Help from "./components/Help";
import Hero from "./components/Hero";

// async function getPools() {
// const res = await fetch(
//   `${getAbsoluteUrl()}/pool/api?page=1&perPage=3&hotPools=true`,{ next: { revalidate: 3600 } }
// );

// if (!res.ok) {
//   // This will activate the closest `error.js` Error Boundary
//   throw new Error("Failed to fetch pools");
// }

// return res.json();
// }

// const getTvl = async () => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/tvldaily/global`
//   );

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch pools");
//   }

//   const result = await res.json();
//   return result;
// }

// const getVolume = async () => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_ANALYTICS}/analytics/volumedaily/global`
//   );

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch pools");
//   }

//   const result = await res.json();
//   return result;
// }

export default function Homepage() {
  // const pools: Pool[] = await getPools();
  // const tvl = getTvl();
  // const volume = getVolume();
  // const data: any = await Promise.all([tvl, volume]).then(
  //   ([tvl, volume]) => ({
  //     tvl: tvl,
  //     volume: volume,
  //   }),
  // );
  return (
    <div className="container max-w-[1200px]">
      <Hero />
      <Data />
      {/* <HotPools isMainPage /> */}
      <div className="-mx-full overflow-hidden">
        <CreateAPool />
      </div>
      <Help />
    </div>
  );
}
