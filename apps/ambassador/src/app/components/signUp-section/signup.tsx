"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { useTheme } from "next-themes";

type SignUpProps = {
  cloudinaryUrl: string;
};

export default function SignUp() {
  const { theme, systemTheme } = useTheme();
  // This assumes 'light' is the default theme.
  const t = !theme || theme === "system" ? systemTheme || "dark" : theme;
  console.log("ttttt", t, systemTheme);
  const bgGradient =
    t === "dark"
      ? "bg-gradient-to-t from-[#371605] to-[#4E2C1A]"
      : "bg-gradient-to-t from-[#FFB571] to-[#FF7A00]";

  return (
    <>
      <div className="items-center justify-center">
        <div className="flex items-center justify-between pt-8 lg:mb-[-160px]">
          <div className="hidden sm:block">
            <Image
              className="z-10 max-[600px]:mx-auto"
              src={
                "https://res.cloudinary.com/duv0g402y/image/upload/v1707152345/bears/r035ky4zgyilzdbxzr08.png"
              }
              alt="proposal-bear"
              width={500}
              height={500}
            />
          </div>
          <div>
            <h1 className="mb-[24px] text-center text-5xl font-extrabold leading-10">
              <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
                Unlock
                <br />
              </span>{" "}
              {""} Your Potential as an {""}
              <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
                Ambassador
              </span>
            </h1>
          </div>
          <div className="hidden sm:block">
            <Image
              className="z-10 max-[600px]:mx-auto"
              src={
                "https://res.cloudinary.com/duv0g402y/image/upload/v1707152345/bears/xsbwqslzlgw5q1des79i.png"
              }
              alt="proposal-bear"
              width={500}
              height={500}
            />
          </div>
        </div>
        <div className="relative mb-[-32px] flex flex-col items-center justify-center gap-4">
          <div
            className="
              z-[-10] mx-auto flex h-[240px] w-full flex-col items-center justify-center bg-gradient-to-t from-[#371605] to-[#4E2C1A]"
          >
            <Image
              className="absolute h-full w-full object-cover"
              src="/orange_bg.png"
              alt="bg"
              layout="fill"
            />
            <div className="absolute z-20 flex max-w-[653px] flex-col flex-wrap items-center justify-center px-4 md:px-0">
              <h1 className="w-full pb-8 text-center text-2xl font-extrabold leading-tight text-white md:leading-normal">
                Experience the collaboration of numerous creators. Register now
                and become a part of a community comprising over 10,000 local
                and international creators.
              </h1>
              <Button
                variant="outline"
                className="text-white"
                style={{ backgroundColor: "", borderColor: "#fff" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#F5F5F5")
                }
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "")}
              >
                Sign up as an Ambassador
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
