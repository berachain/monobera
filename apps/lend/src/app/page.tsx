import React from "react";

import Data from "~/components/data";
import Help from "~/components/help";
import Hero from "~/components/hero";
import HowItWorks from "~/components/how-it-works";
import Markets from "~/components/markets";

export default function Home() {
  return (
    <>
      <div className="container mt-14 bg-lend bg-contain bg-no-repeat">
        <Hero />
      </div>
      <div className="container">
        <Data />
      </div>
      <Markets />
      <div className="container">
        <HowItWorks />
        <Help />
      </div>
    </>
  );
}
