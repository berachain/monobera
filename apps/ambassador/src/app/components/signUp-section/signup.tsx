"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { useTheme } from "next-themes";
import { cloudinaryUrl } from "@bera/config";
import { transform } from "next/dist/build/swc";

type SignUpProps = {
  cloudinaryUrl: string;
};

export default function SignUp() {
  const { theme, systemTheme } = useTheme();
  const t = !theme || theme === "system" ? systemTheme || "dark" : theme;
  const bgGradient =
    t === "dark"
      ? "bg-gradient-to-t from-[#371605] to-[#4E2C1A]"
      : "bg-gradient-to-t from-[#FFB571] to-[#FF7A00]";

  return (
    <>
      <div className="items-center justify-center">
        <div className="flex items-center justify-between pt-8">
          <div className="hidden sm:block">
            <Image
              className="z-10 max-[600px]:mx-auto"
              src={`${cloudinaryUrl}/bears/SmokeyBongless_ebu7vl`}
              alt="proposal-bear"
              width={500}
              height={500}
            />
          </div>
          <div className="flex flex-col space-x-6 pr-8 pl-4">
            <h1 className="text-center sm:text-center text-5xl font-extrabold leading-12 pb-6">
              Unlock Your Potential as an {""}
              <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
                Ambassador
              </span>
            </h1>
            <div className="flex flex-col items-center justify-center">
              <p className="w-full pb-8 pr-6 text-center text-xl font-regular leading-tight text-white md:leading-normal">
                Experience the collaboration of numerous creators. Register now
                and become a part of a community comprising over 10,000 local
                and international creators.
              </p>
              <Button variant="outline" className="text-muted-foreground">
                Sign up as an ambassador
              </Button>
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
