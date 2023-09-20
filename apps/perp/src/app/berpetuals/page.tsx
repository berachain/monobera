import React from "react";

import { GeneralInfoBanner } from "./components/general-info-banner";
import { InstrumentDropdown } from "./components/instrument-dropdown";
import CreatePosition from "./create-position";

export default function Home() {
  return (
    <div>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="w-full flex-shrink-0 flex-grow-0 lg:w-[400px]">
          <InstrumentDropdown />
        </div>
        <GeneralInfoBanner />
      </div>
      <div className="flex w-full">
        <CreatePosition />
        <div className="h-full w-full">Right</div>
      </div>{" "}
    </div>
  );
}
