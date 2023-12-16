import React from "react";

import { type tabEnum as tabEnumT } from "../app/types";
import Boxes from "./boxes";
import GameConsole from "./game-console";
import PersonalInfo from "./personal-info";

export default function Content({
  ...props
}: {
  tab: tabEnumT;
  validators: any[];
  pools: any[];
  obituaries: any[];
}) {
  return (
    <div className="flex w-full flex-1 flex-col flex-wrap gap-4">
      <GameConsole {...props} />
      <PersonalInfo />
      <hr className="border-border" />
      <Boxes />
    </div>
  );
}
