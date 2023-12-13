"use client";

import React from "react";

import { type tabEnum as tabEnumT } from "../types";
import Boxes from "./boxes";
import GameConsole from "./game-console";

export default function Content({ tab }: { tab: tabEnumT }) {
  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <GameConsole tab={tab} />
      <hr className="border-border" />
      <Boxes />
    </div>
  );
}
