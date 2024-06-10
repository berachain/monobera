"use client";

import React from "react";
import { useBeraJs } from "@bera/berajs";
import { ConnectWalletBear } from "@bera/shared-ui";

import Portfolio from "./portfolio";

export default function MyBGT() {
  const { isReady } = useBeraJs();
  return (
    <>
      {isReady ? (
        <Portfolio />
      ) : (
        <ConnectWalletBear message="You need to connect your wallet to see delegations and rewards" />
      )}
    </>
  );
}
