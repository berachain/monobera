import React from "react";
import { Icons } from "@bera/ui/icons";

import { CreateGaugeCard } from "./components/create-gauge-card";

export default function Page() {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <span className=" leading-15 mb-6 gaspan-2 text-4xl font-bold">
          <Icons.logo className="inline-block" width={64} height={64} />{" "}
          Rewards Vault
        </span>
      </div>
      <CreateGaugeCard />
    </div>
  );
}
