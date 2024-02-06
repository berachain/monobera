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

  const bgGradient = theme === "dark" ? "bg-[#371605]" : "bg-[#FF8443]";
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
          <div
            className={cn(
              "mx-auto flex h-[240px] w-full flex-col items-center justify-center",
              bgGradient,
            )}
          ></div>
          <div className="absolute z-20 flex max-w-[653px] flex-col items-center justify-center">
            <h1 className="md:leading-14 leading-24 w-[653px] pb-8 text-center text-2xl font-extrabold text-white md:text-xl">
              Experience the collaboration of numerous creators. Register now
              and become a part of a community comprising over 10,000 local and
              international creators.
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
    </>
  );
}
