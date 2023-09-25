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
      <span className="block lg:hidden">
        <OrderChart />
      </span>
      <div className="flex w-full flex-col lg:flex-row">
        <CreatePosition />
        <div className="h-full w-full pb-[34px] lg:w-screen-w-400">
          <span className="hidden lg:block">
            <OrderChart />
          </span>
          <OrderHistory />
        </div>
      </div>{" "}
    </div>
  );
}
