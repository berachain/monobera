"use client";

import { LongShortTab } from "./components/long-short-tab";
import { PositionSettings } from "./components/position-settings";

export default function CreatePosition() {
  return (
    <div className="h-fit w-full flex-shrink-0 lg:min-h-screen lg:w-[400px] lg:border-r lg:border-border">
      <LongShortTab />
      <PositionSettings />
    </div>
  );
}
