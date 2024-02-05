import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap justify-between items-center p-4 sm:px-8 lg:px-32 xl:px-48 mt-[-60px] mb-[-120px]">
      <div className="items-left flex flex-col gap-4 mb-6 sm:mb-0">
        <h1 className="lg:text-[64px] lg:leading-[72px] md:text-[42px] md:leading-[48px] sm:text-[28px] sm:leading-[32px] font-extrabold">
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Become a
          </span>{" "}
          <br className="" />
          Berachain
          <br className="" />
          <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Ambassador
          </span>
        </h1>
        <div className="font-medium leading-normal text-muted-foreground text-sm sm:text-base lg:text-lg">
          Join the Bera Brigade and <br className="sm:hidden lg:block" />
          help foster the vibrant community of bears.
        </div>
        <div className="mt-6 mb-6 sm:mb-0 text-center sm:text-left">
          <Link href="/">
            <Button className="mr-4">Sign up</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary">Learn more</Button>
          </Link>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center gap-4 ">
        <div className="transition-opacity hover:animate-spin-slowly hidden sm:block">
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
