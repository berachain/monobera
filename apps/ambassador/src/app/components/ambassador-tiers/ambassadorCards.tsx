import React from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";

import { AmbassadorCard, brigadeGeneral, colonel, kingsOath } from "./tiers";

export default function AmbassadorCards() {
  return (
    <div className="flex flex-col items-center justify-center pb-12 pt-12">
      <h1 className="md:leading-14 leading-24 pb-12 text-3xl font-extrabold md:text-5xl">
        Tiers of an{" "}
        <span className="bg-gradient-to-r from-[rgba(255,181,113,0.9)] to-[rgba(255,122,0,0.9)] bg-clip-text text-transparent backdrop-blur-md">
          Ambassador
        </span>
      </h1>
      <div className="flex flex-wrap justify-center gap-8 p-4 pb-4">
        <div className="order-2 sm:order-1">
          <AmbassadorCard ambassador={brigadeGeneral} />
        </div>
        <div className="order-1">
          <AmbassadorCard ambassador={kingsOath} />
        </div>
        <div className="order-3">
          <AmbassadorCard ambassador={colonel} />
        </div>
      </div>
      <Link href="/program-details">
        <Button variant="outline" className="mb-8 mt-12">
          Learn more about Tiers
        </Button>
      </Link>
    </div>
  );
}
