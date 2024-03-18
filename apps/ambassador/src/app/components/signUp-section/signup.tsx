"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl } from "@bera/config";
import { Button } from "@bera/ui/button";
import { useTheme } from "next-themes";

export default function SignUp() {
  return (
    <>
      <div className="items-center justify-center">
        <div className="flex items-center justify-between pt-8 sm:px-8">
          <div className="hidden sm:block">
            <Image
              className="z-10 max-[600px]:mx-auto"
              src={`${cloudinaryUrl}/bears/SmokeyBongless_ebu7vl`}
              alt="proposal-bear"
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-col space-x-6 pl-4 pr-8">
            <h1 className="leading-12 pb-6 text-center text-5xl font-extrabold sm:text-center">
              Unlock Your Potential as an {""}
              <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
                Ambassador
              </span>
            </h1>
            <div className="flex flex-col items-center justify-center">
              <p className="font-regular w-full pb-8 pr-6 text-center text-xl leading-tight text-white md:leading-normal">
                Experience the collaboration of numerous creators. Register now
                and become a part of a community comprising over 10,000 local
                and international creators.
              </p>
              <Link href="https://zlhd2dzw2hl.typeform.com/to/ZmYGgsv8">
                <Button variant="outline" className="text-muted-foreground">
                  Sign up as an ambassador
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden sm:block">
            <Image
              className="z-10 max-[600px]:mx-auto"
              src={`${cloudinaryUrl}/bears/RoyalBongless_fgwkmm`}
              alt="proposal-bear"
              style={{ transform: "scaleX(-1)" }}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </>
  );
}
