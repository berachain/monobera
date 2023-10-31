"use client";

import React from "react";
import { useBeraJs } from "@/../../packages/berajs/dist";
import { ConnectWalletBear } from "@bera/shared-ui";

import type { IMarket } from "../berpetuals/page";
import LoadingPortfolio from "./components/loading-portfolio";
import { PortfolioHome } from "./components/portfolio";

export default function Home({ markets }: { markets: IMarket[] }) {
  const { account } = useBeraJs();

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      {!isMounted && <LoadingPortfolio />}
      {isMounted && !account && (
        <ConnectWalletBear message="Connect Wallet to view portfolio" />
      )}
      {isMounted && account && <PortfolioHome markets={markets} />}
    </>
  );
}
