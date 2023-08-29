"use client";

import React from "react";
import Image from "next/image";
import { useBeraJs } from "@bera/berajs";

import { Connect } from "~/components/header";
import { cloudinaryUrl } from "~/config";
import Portfolio from "./portfolio";

export default function MyBGT() {
  const { isConnected } = useBeraJs();
  return (
    <>
      {isConnected ? (
        <Portfolio />
      ) : (
        <div className="container flex flex-col gap-4">
          <Image
            className="mx-auto"
            src={`${cloudinaryUrl}/bears/exrpxwn6fmll2x0c0jlr`}
            alt="wallet-connect-bear"
            width={535}
            height={285}
          />
          <div className="text-center text-3xl font-bold leading-[48px] text-foreground md:text-5xl">
            Connect your wallet
          </div>
          <div className="text-center text-lg font-semibold leading-7 text-muted-foreground md:text-xl">
            You need to connect your wallet to see delegations and rewards
          </div>
          <div className="max-w-[130px] self-center">
            <Connect className="mx-auto max-w-[130px]" />
          </div>
        </div>
      )}
    </>
  );
}
