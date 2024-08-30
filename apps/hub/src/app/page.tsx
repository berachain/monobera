"use client";

import { Explore } from "~/components/explore";
import { Hero } from "~/components/hero";
import { HeroCards } from "~/components/hero-card";
import { Resources } from "~/components/resources";
import { HowToEarn } from "../components/how-to-earn";

export default function Page() {
  return (
    <div className="container flex flex-col gap-20 mb-20">
      <Hero />
      <HeroCards />
      <HowToEarn />
      <Resources />
      <Explore />
      {/* test */}
    </div>
  );
}
