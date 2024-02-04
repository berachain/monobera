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
    <div className="flex items-start gap-4 pt-8 ">
      <Image
        className="max-[600px]:mx-auto"
        src={`${cloudinaryUrl}/bears/l9oaplrgfkrqw8y6noyp`}
        alt="proposal-bear"
        width={500}
        height={500}
      />
      <h1 className="md:leading-14 leading-24 text-3xl font-extrabold md:text-5xl">
        <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
          Unlock
        </span>
        Your <br />
        Potential as an
        <br />
        <span className="bg-gradient-to-r from-[#FFB571] to-[#FF7A00] bg-clip-text text-transparent">
          Ambassador
        </span>
      </h1>
      <Image
        className="max-[600px]:mx-auto"
        src={`${cloudinaryUrl}/bears/l9oaplrgfkrqw8y6noyp`}
        alt="proposal-bear"
        width={500}
        height={500}
      />
    </div>
    <div className="relative flex flex-col items-center justify-center gap-4 pt-8">
      <div className="mx-auto flex h-[320px] w-full flex-col items-center justify-center bg-[#FF8443]">
        <Image
          className="absolute h-full w-full object-cover"
          src="/orange_bg.png"
          alt="bg"
          layout="fill"
        />
        <div className="absolute z-20 max-w-[653px] pt-8">
          <h1 className="md:leading-14 leading-24 w-[653px] text-2xl font-extrabold text-white md:text-xl">
            Experience the collaboration of numerous creators. Register now and
            become a part of a community comprising over 10,000 local and
            international creators.
          </h1>
          <div className="mt-8">
            <Button variant="outline" className=" text-white">
              Sign up as an Ambassador
            </Button>
          </div>
        </div>
      </div>
    </div>
  </>
);
