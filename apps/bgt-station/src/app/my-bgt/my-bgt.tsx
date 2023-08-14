"use client";

import React from "react";
import Image from "next/image";
import { useBeraJs } from "@bera/berajs";

import { Connect } from "~/components/header";
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
            src="/bears/wallet-connect-bear.png"
            alt="wallet-connect-bear"
            width={535}
            height={285}
          />
          <div className="text-center text-5xl font-bold leading-[48px] text-foreground">
            Connect your wallet
          </div>
          <div className="text-center text-xl font-semibold leading-7 text-muted-foreground">
            You need to connect your wallet to see delegations and rewards
          </div>
          <Connect className="mx-auto w-[130px]" />
        </div>
      )}
    </>
  );
}
