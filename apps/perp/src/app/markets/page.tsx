import React from "react";

import GeneralInfo from "../components/general-info";
import Markets from "../components/positions";
import AvailableMarket from "./available-markets";

export default function Home() {
  return (
    <div className="container mt-8 flex flex-col gap-16">
      <Markets />
      <GeneralInfo />
      <AvailableMarket />
    </div>
  );
}
