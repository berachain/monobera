import React from "react";

import { InstrumentDropdown } from "./components/instrument-dropdown";
import PanelLeft from "./panel-left";

export default function Home() {
  return (
    <div>
      <div className="flex w-full flex-col lg:flex-row">
        <div className="w-full flex-shrink-0 flex-grow-0 lg:w-[400px]">
          <InstrumentDropdown />
        </div>
        <div className="h-[65px] w-full border-b border-border">Total Info</div>
      </div>
      <div className="flex w-full">
        <PanelLeft />
        <div className="h-full w-full">Right</div>
      </div>{" "}
    </div>
  );
}
