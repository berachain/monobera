"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@bera/ui/button";
import { cloudinaryUrl } from "@bera/config";

type SignUpProps = {
  cloudinaryUrl: string;
};

export const SignUp: React.FC<SignUpProps> = ({ cloudinaryUrl }) => (
  <>
    <div className="items-center justify-center">
      <div className="flex items-center justify-between pt-8 mb-[-160px]">
        <Image
          className="max-[600px]:mx-auto"
          src={
            "https://res.cloudinary.com/duv0g402y/image/upload/v1707152345/bears/r035ky4zgyilzdbxzr08.png"
          }
          alt="proposal-bear"
          width={500}
          height={500}
        />
        <h1 className="text-center text-lg font-extrabold md:text-[42px] leading-10 mb-[24px]">
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
      <div className="relative flex flex-col items-center justify-center gap-4 mb-[-32px]">
        <div className="mx-auto flex h-[240px] w-full flex-col items-center justify-center bg-[#FF8443]">
          <Image
            className="absolute h-full w-full object-cover"
            src="/orange_bg.png"
            alt="bg"
            layout="fill"
          />
          <div className="flex flex-col items-center absolute justify-center z-20 max-w-[653px]">
            <h1 className="text-center md:leading-14 leading-24 w-[653px] text-2xl font-extrabold text-white md:text-xl pb-8">
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
    </div>
  </>
);
