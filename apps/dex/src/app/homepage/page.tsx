// This will be the home page - just don't want to cause a merge conflict while homepage is used as `/swap`
// TODO Error Boundary + Loading State
import React from "react";
import { type Pool } from "@bera/bera-router/dist/services/PoolService/types";

import { getAbsoluteUrl } from "~/utils/vercel-utils";
import CreateAPool from "./components/CreateAPool";
import Data from "./components/Data";
import Help from "./components/Help";
import Hero from "./components/Hero";
import HotPools from "./components/HotPools";

async function getPools() {
  const res = await fetch(
    `${getAbsoluteUrl()}/pool/api?page=1&perPage=3&hotPools=true`,
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch pools");
  }

  return res.json();
}

export default async function Homepage() {
  const pools: Pool[] = await getPools();

  return (
    <div className="container">
      <Hero />
      <Data />
      <HotPools pools={pools} />
      <div className="-mx-2 overflow-hidden">
        <CreateAPool />
      </div>
      <Help />
    </div>
  );
}
