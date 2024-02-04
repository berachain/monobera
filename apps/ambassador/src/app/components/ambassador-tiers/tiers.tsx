import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "@bera/ui/avatar";

// Define the ambassadors
export const brigadeGeneral = {
  name: "Brigade General",
  image: "/bear_center.png",
  tier: "Tier 3",
  intro: "Amet avec adios abibas abelao donde",
};

export const kingsOath = {
  name: "The King’s Oath",
  image: "/bear_center.png",
  tier: "Tier 1",
  intro: "Amet avec adios abibas abelao donde",
};

export const footSoldier = {
  name: "Foot Solider",
  image: "/bear_center.png",
  tier: "Tier 2",
  intro: "Amet avec adios abibas abelao donde",
};

export function AmbassadorCard({ ambassador }) {
  function getAmbassadorStyle(tier: string) {
    switch (tier) {
      case "Tier 1":
        return 'dark:bg-gradient-to-b dark:from-amber-800 dark:to-amber-900 dark:border-amber-600 bg-gradient-to-b from-amber-200 to-amber-50 border-amber-200 opacity-75 backdrop-blur';
      case "Tier 2":
        return 'dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-700 dark:border-slate-600 bg-gradient-to-b from-slate-300 to-slate-100 border-slate-200 opacity-75 backdrop-blur';
      case "Tier 3":
        return 'dark:bg-gradient-to-b dark:from-orange-900 dark:to-orange-700 dark:border-orange-600 bg-gradient-to-b from-orange-100 to-orange-50 border-orange-200 opacity-75 backdrop-blur';
      default:
        return '';
    }
  }

  return (
    <Link href="" target="_blank">
      <div
        className={`relative col-span-1 flex h-[440px] w-[300px] flex-col rounded-lg border border-solid ${getAmbassadorStyle(
          ambassador.tier,
        )}`}
      >
        <div className="flex flex-col items-center gap-4 px-6 pb-4 pt-6">
          <div className="text-xl font-semibold text-foreground">
            {ambassador.tier}
          </div>
          <Avatar className="h-20 w-20">
            <AvatarImage src={ambassador.image} className="rounded-full" />
          </Avatar>
          <div className="text-xl font-semibold text-foreground">
            {ambassador.name}
          </div>
          <div className="text-base font-normal text-foreground">
            {ambassador.intro}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Tiers() {
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-12 pb-12">
        <h1 className="md:leading-14 leading-24 pb-8 text-3xl font-extrabold md:text-5xl">
          Stages of an{" "}
          <span className="bg-gradient-to-r from-[rgba(255,181,113,0.9)] to-[rgba(255,122,0,0.9)] bg-clip-text text-transparent backdrop-blur-md">
            Ambassador
          </span>
        </h1>
        <div className="flex flex-wrap justify-between gap-1 p-4 pb-4">
          <AmbassadorCard ambassador={brigadeGeneral} />
          <AmbassadorCard ambassador={kingsOath} />
          <AmbassadorCard ambassador={footSoldier} />
        </div>
      </div>
    </>
  );
}
