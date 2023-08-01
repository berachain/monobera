// This will be the home page - just don't want to cause a merge conflict while homepage is used as `/swap`

import React from "react";

import CreateAPool from "./components/CreateAPool";
import Data from "./components/Data";
import Help from "./components/Help";
import Hero from "./components/Hero";
import HotPools from "./components/HotPools";

export default function Homepage() {
  return (
    <div className="container">
      <Hero />
      <Data />
      <HotPools />
      <CreateAPool />
      <Help />
    </div>
  );
}
