import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function Hero() {
  return (
    <div className="mb-[-120px] mt-[-60px] flex flex-col flex-wrap items-center justify-between p-4 sm:flex-row sm:px-8 lg:px-32 xl:px-48">
      <div className="mb-6 flex flex-col items-center justify-center gap-4 lg:items-start">
        <h1 className="font-extrabold sm:text-[28px] sm:leading-[32px] md:text-[42px] md:leading-[48px] lg:text-[64px] lg:leading-[72px]">
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
        <div className="text-sm font-medium leading-normal text-muted-foreground sm:text-base lg:text-lg">
          Join the Bera Brigade and <br className="sm:hidden lg:block" />
          help foster the vibrant community of bears.
        </div>
        <div className="mb-6 mt-6 text-center sm:mb-0 sm:text-left">
          <Link href="/">
            <Button className="mr-4">Sign up</Button>
          </Link>
          <Link href="/">
            <Button variant="secondary">Learn more</Button>
          </Link>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center gap-4 ">
        <div className="hidden animate-spin-slowly transition-opacity sm:block">
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
