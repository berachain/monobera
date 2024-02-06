"use client";

import React from "react";
import Image from "next/image";
import { cloudinaryUrl } from "@bera/config";
import { cn } from "@bera/ui";
import { Button } from "@bera/ui/button";
import { useTheme } from "next-themes";

type SignUpProps = {
  cloudinaryUrl: string;
};

export default function SignUp({ cloudinaryUrl }) {
  const { theme, systemTheme } = useTheme();
  const t = theme === "system" ? systemTheme : theme;
  const bgGradient =
    t === "dark"
      ? "bg-gradient-to-t from-[#371605] to-[#4E2C1A]"
      : "bg-gradient-to-t from-[#FFB571] to-[#FF7A00]";

  return (
    <>
      <div className="items-center justify-center">
        <div className="mb-[-160px] flex items-center justify-between pt-8">
          <Image
            className="max-[600px]:mx-auto"
            src={
              "https://res.cloudinary.com/duv0g402y/image/upload/v1707152345/bears/r035ky4zgyilzdbxzr08.png"
            }
            alt="proposal-bear"
            width={500}
            height={500}
          />
          <h1 className="mb-[24px] text-center text-lg font-extrabold leading-10 md:text-[42px]">
            <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
              Unlock
              <br />
            </span>{" "}
            {""} Your Potential as an {""}
            <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
              Ambassador
            </span>
          </h1>
          <Image
            className="max-[600px]:mx-auto"
            src={
              "https://res.cloudinary.com/duv0g402y/image/upload/v1707152345/bears/xsbwqslzlgw5q1des79i.png"
            }
            alt="proposal-bear"
            width={500}
            height={500}
          />
        </div>
        <div className="relative mb-[-32px] flex flex-col items-center justify-center gap-4">
          <div
            className={cn(
              "mx-auto flex h-[240px] w-full flex-col items-center justify-center",
              bgGradient,
            )}
          >
            <Image
              className="absolute h-full w-full object-cover"
              src="/orange_bg.png"
              alt="bg"
              layout="fill"
            />
            <div className="absolute z-20 flex max-w-[653px] flex-col items-center justify-center">
              <h1 className="md:leading-14 leading-24 w-[653px] pb-8 text-center text-2xl font-extrabold text-white md:text-xl">
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
