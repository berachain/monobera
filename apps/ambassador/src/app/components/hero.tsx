import React from "react";
import Link from "next/link";
import { Button } from "@bera/ui/button";

export default function Hero() {
  return (
    <div className="items-left flex w-full flex-col gap-4">
      <h1 className="md:leading-14 leading-24 text-3xl font-extrabold md:text-5xl">
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
  );
}
