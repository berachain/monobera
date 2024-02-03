import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function Hero() {
  return (
    <div className="flex justify-between">
      <div className="items-left flex flex-col gap-4">
        <h1 className="leading-24 leading-14 text-5xl font-extrabold md:text-5xl ">
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Become a
          </span>{" "}
          <br />
          Berachain
          <br />
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Ambassador
          </span>
        </h1>
        <div className="font-medium leading-normal text-muted-foreground">
          Join the Bera Brigade and help foster the vibrant community of bears.
        </div>
        <div className="mb-6 text-center md:text-left">
          <Link href="/">
            <Button className="mr-4">Sign up</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary">Learn more</Button>
          </Link>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center gap-4 ">
        <div className="transition-opacity hover:animate-spin-slower">
          <Image
            src="/circle.png"
            alt="bera circle"
            width={460}
            height={460}
            priority
            loading="eager"
          />
        </div>
        <div className="absolute">
          <Image
            src="/bear_center.png"
            alt="bera circle"
            width={144}
            height={144}
            priority
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
