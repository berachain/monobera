"use client";

import React, { useContext } from "react";
import { useBeraJs } from "@/../../packages/berajs/dist";
import { ConnectWalletBear } from "@bera/shared-ui";

import { TableContext } from "~/context/table-context";
import { usePollAccountTradingSummary } from "~/hooks/usePollAccountTradingSummary";
import { usePollOpenPositions } from "~/hooks/usePollOpenPositions";
import { useTradingSummaryChart } from "~/hooks/useTradingSummaryChart";
import type { IMarket } from "~/types/market";
import LoadingPortfolio from "./loading";
import { PortfolioHome } from "./portfolio";

export default function Home({ markets }: { markets: IMarket[] }) {
  const { account } = useBeraJs();
  const { tableState } = useContext(TableContext);
  const { isLoading: isPositionSizeLoading } = usePollOpenPositions(tableState);
  const { isLoading: isAccountSummaryLoading } = usePollAccountTradingSummary();
  const { isLoading: isChartLoading } = useTradingSummaryChart({
    interval: "90d" as any,
  });
  const [isMounted, setIsMounted] = React.useState(false);

  const isLoading =
    isPositionSizeLoading || isAccountSummaryLoading || isChartLoading;
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      {!isMounted && isLoading && <LoadingPortfolio />}
      {isMounted && !account && (
        <div className="mt-20">
          <ConnectWalletBear message="Connect Wallet to view portfolio" />
        </div>
      )}
      {isMounted && account && <PortfolioHome markets={markets} />}
    </>
  );
}
