import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { Icons } from "@bera/ui/icons";

export default function Tutorial() {
  return (
    <div className="flex w-full flex-col items-center justify-between px-[172px] md:flex-row">
      <div className="w-3/5">
        <Image
          src={`${cloudinaryUrl}/BERPS/ui-demo_af08ak`}
          width={936}
          height={1020}
          className="w-full max-w-[936px]"
          alt="demo image"
        />
      </div>
      <div className="flex flex-shrink-0 flex-col gap-4">
        <h1 className="md:leading-14 text-center text-3xl font-extrabold leading-9 md:text-left md:text-5xl">
          <span className="whitespace-nowrap bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
            Familiar Experience
          </span>{" "}
          <br />
          and Tooling
        </h1>
        <div className=" text-center font-medium leading-normal text-muted-foreground md:text-left ">
          Enabling a full suite of features <br className="block md:hidden" />{" "}
          for both <br className="hidden md:block" /> veteran and novice
          <br className="block md:hidden" />
          traders to transact.
        </div>
        <div className="mb-6 flex items-center text-left md:text-left">
          <Link href="/berpetuals">
            <Button className="mr-4">
              <Icons.play className="mr-1 h-6 w-6" />
              Tutorial
            </Button>
          </Link>
          <Link href="/markets">
            <Button variant="secondary">Trading Guide</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
