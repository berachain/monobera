import React from "react";

import { GeneralInfoBanner } from "./components/general-info-banner";
import { InstrumentDropdown } from "./components/instrument-dropdown";
import { OrderChart } from "./components/order-chart";
import { OrderHistory } from "./components/order-history";
import CreatePosition from "./create-position";

export default function Home() {
  return (
    <div>
      <div className="flex h-fit w-full flex-col lg:flex-row">
        <div className="h-fit w-full flex-shrink-0 flex-grow-0 lg:w-[400px]">
          <InstrumentDropdown />
        </div>
        <GeneralInfoBanner />
      </div>
      <div className="flex w-full flex-col lg:flex-row">
        <CreatePosition />
        <div className="h-full w-full pb-[32px] lg:w-screen-w-400">
          <OrderChart />
          <OrderHistory />
        </div>
      </div>{" "}
    </div>
  );
}
