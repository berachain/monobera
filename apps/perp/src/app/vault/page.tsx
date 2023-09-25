import React from "react";

import Claim from "./claim";
import DepositWithdraw from "./deposit-withdraw";
import HoneyVault from "./honey-vault";

export default function Home() {
  return (
    <div className="mx-auto mt-8 flex w-full max-w-[1200px] flex-col gap-4 p-8">
      <Claim />
      <DepositWithdraw />
      <HoneyVault />
    </div>
  );
}
