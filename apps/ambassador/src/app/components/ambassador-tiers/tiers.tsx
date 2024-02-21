import React from "react";
// import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage } from "@bera/ui/avatar";
import { Button } from "@bera/ui/button";

// Define the ambassadors
export const Legates = {
  name: "Legates",
  image: "/smokey.png",
  tier: "Tier 1",
  intro:
    "Advocates for Berachain's vision, leveraging their influence to amplify Berachain's presence across various platforms.",
};

export const Centurions = {
  name: "Centurions",
  image: "/zeus.png",
  tier: "Tier 2",
  intro:
    "Guardians of community harmony, ensuring positive user experiences and fostering inclusivity.",
};

export const Optios = {
  name: "Optios",
  image: "/kng.png",
  tier: "Tier 3",
  intro:
    "Architects of memetic influence, crafting impactful memes to enhance brand awareness and community engagement.",
};

export const Imaginifiers = {
  name: "Imaginifiers",
  image: "/kng.png",
  tier: "Tier 4",
  intro:
    "Champions of educational content, enriching the Berachain ecosystem through informative and insightful content creation.",
};

export function AmbassadorCard({ ambassador }: { ambassador: any }) {
  function getAmbassadorStyle(tier: string) {
    switch (tier) {
      case "Tier 1":
        return "dark:bg-gradient-to-b dark:from-[rgba(255,193,7,0.30)] dark:to-[rgba(255,235,59,0.05)] dark:border-amber-600 bg-gradient-to-b from-[rgba(255,210,93,0.50)] to-[rgba(255,231,169,0.05)] border-amber-200 backdrop-blur dark:box-shadow-[rgba(255, 214, 129, 0.56)] shadow-lg";
      case "Tier 2":
        return "dark:bg-gradient-to-b dark:from-[rgba(112,128,144,0.30)] dark:to-[rgba(192,192,192,0.05)] dark:border-slate-600 bg-gradient-to-b from-[rgba(235,235,235,0.99)] to-[rgba(235,235,235,0.05)] border-slate-200 backdrop-blur shadow-lg";
      case "Tier 3":
        return "dark:bg-gradient-to-b dark:from-[rgba(255,165,0,0.30)] dark:to-[rgba(255,140,0,0.05)] dark:border-orange-600 bg-gradient-to-b from-[rgba(255,231,203,0.99)] to-[rgba(255,205,169,0.05)] border-orange-200 backdrop-blur shadow-lg";
      case "Tier 4":
        return "dark:bg-gradient-to-b dark:from-[rgba(0,128,0,0.30)] dark:to-[rgba(0,255,0,0.05)] dark:border-green-600 bg-gradient-to-b from-[rgba(235,255,235,0.99)] to-[rgba(235,255,235,0.05)] border-green-200 backdrop-blur shadow-lg";
      default:
        return "";
    }
  }

  return (
    <div
      className={`relative col-span-1 flex h-[440px] w-[300px] flex-col rounded-lg border border-solid ${getAmbassadorStyle(
        ambassador.tier,
      )}`}
    >
      <div className="flex flex-col items-center gap-4 px-6 pb-4 pt-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={ambassador.image} className="rounded-full" />
        </Avatar>
        <div className="text-xl font-semibold text-foreground">
          {ambassador.tier}
        </div>
        <div className="text-xl font-semibold text-foreground">
          {ambassador.name}
        </div>
        <div className="text-center text-base font-normal text-foreground">
          {ambassador.intro}
        </div>
      </div>
    </div>
  );
}

export function Tiers(): React.JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center justify-center px-32 pb-12 pt-12">
        <h1 className="md:leading-14 leading-24 pb-8 text-3xl font-extrabold md:text-5xl">
          Stages of an{" "}
          <span className="bg-gradient-to-r from-[rgba(255,181,113,0.9)] to-[rgba(255,122,0,0.9)] bg-clip-text text-transparent backdrop-blur-md">
            Ambassador
          </span>
        </h1>
        <div className="flex flex-wrap justify-between gap-4 p-4 pb-4">
          <AmbassadorCard ambassador={Legates} />
          <AmbassadorCard ambassador={Centurions} />
          <AmbassadorCard ambassador={Optios} />
          <AmbassadorCard ambassador={Imaginifiers} />
        </div>
        <Button variant="outline" className="mb-8 mt-12">
          View more events
        </Button>
      </div>
    </>
  );
}
