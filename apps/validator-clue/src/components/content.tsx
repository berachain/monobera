import React from "react";

import { type tabEnum as tabEnumT } from "../app/types";
import Boxes from "./boxes";
import GameConsole from "./game-console";
import PersonalInfo from "./personal-info";

export default function Content({
  pools,
  epoch,
  ...props
}: {
  tab: tabEnumT;
  validators: any[];
  pools: any[];
  obituaries: any[];
  epoch: any;
}) {
  return (
    <div className="flex w-full flex-1 flex-col gap-4">
      <GameConsole {...{ epoch, pools, ...props }} />
      <PersonalInfo epoch={epoch} />
      <hr className="border-border" />
      <Boxes />
    </div>
  );
}
