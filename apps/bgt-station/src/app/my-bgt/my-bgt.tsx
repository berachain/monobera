"use client";

import React from "react";
import Image from "next/image";
import { useBeraJs } from "@bera/berajs";

import { Connect } from "~/components/header";
import Nothing from "./nothing";
import Portfolio from "./portfolio";

export default function MyBGT() {
  const { isConnected } = useBeraJs();
  const noDelegatorFound = false;
  return (
    <>
      {isConnected ? (
        noDelegatorFound ? (
          <Nothing />
        ) : (
          <Portfolio />
        )
      ) : (
        <div className="container flex flex-col gap-4">
          <Image
            className="mx-auto"
            src="/bears/wallet-connect-bear.png"
            alt="wallet-connect-bear"
            width={535}
            height={285}
          />
          <div className="text-center text-3xl font-bold leading-[48px] text-foreground sm:text-5xl">
            Connect your wallet
          </div>
          <div className="text-center text-lg font-semibold leading-7 text-muted-foreground sm:text-xl">
            You need to connect your wallet to see delegations and rewards
          </div>
          <Connect className="mx-auto w-[130px]" />
        </div>
      )}
    </>
  );
}
