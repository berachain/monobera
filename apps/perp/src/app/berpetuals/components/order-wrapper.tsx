"use client";

import React, { useEffect, useMemo, useState } from "react";
import { perpsTradingviewEnabled } from "@bera/config";
import { type GlobalParams } from "@bera/proto/src";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@bera/ui/resizable";

import type { IMarket } from "~/types/market";
import { OrderHistory } from "../components/order-history";
import { CreatePosition } from "./create-position";
import { LoadingContainer } from "./loading-container";

const calcWidth = (width: number) => {
  if (width < 640) {
    return "sm";
  }
  if (width < 1024) {
    return "md";
  }
  return "lg";
};

type Props = {
  markets: IMarket[];
  defaultMarket: IMarket;
  params: GlobalParams;
};
export default function OrderWrapper({
  markets,
  defaultMarket,
  params,
}: Props) {
  const [size, setSize] = useState<"sm" | "md" | "lg">(
    calcWidth(typeof window !== "undefined" ? window?.innerWidth : 0),
  );
  useEffect(() => {
    const handleResize = () => {
      const width = calcWidth(window?.innerWidth);
      width !== size && setSize(width);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [size]);

  const [OrderChart, setOrderChart] = useState<any>(null);
  const [chartReady, setChartReady] = useState(false);
  const [chartError, setChartError] = useState("");

  useEffect(() => {
    const loadOrderChart = async () => {
      if (perpsTradingviewEnabled === "true") {
        const module = await import("../components/order-chart");
        setOrderChart(() => module.OrderChart);
      } else {
        setChartError("TradingView chart unavailable");
      }
    };

    loadOrderChart();
  }, []);

  const tradingChart = useMemo(() => {
    return (
      <>
        {OrderChart && (
          <OrderChart
            markets={markets}
            marketName={defaultMarket?.name}
            chartReady={chartReady}
            setChartReady={setChartReady}
            setChartError={setChartError}
          />
        )}
        {chartError ? (
          <div className="absolute left-0 top-0 h-full w-full content-center text-center">
            {chartError}
          </div>
        ) : !chartReady ? (
          <LoadingContainer />
        ) : null}
      </>
    );
  }, [OrderChart, chartError, chartReady, markets, defaultMarket?.name]);

  return (
    <>
      <div className="mx-2 block h-[500px] rounded-md border border-border lg:hidden relative">
        {size !== "lg" && tradingChart}
      </div>
      <div className="flex h-full w-full flex-col lg:flex-row lg:overflow-auto">
        <CreatePosition market={defaultMarket} params={params} />
        <div className="flex h-full w-full flex-col overflow-auto">
          <ResizablePanelGroup
            className="hidden lg:flex lg:!h-[calc(100%-8px)]"
            direction="vertical"
          >
            <ResizablePanel>
              <div className="mr-2 hidden h-[calc(100%-8px)] flex-shrink-0 rounded-md border border-border lg:block relative">
                {size === "lg" && tradingChart}
              </div>
            </ResizablePanel>
            <ResizableHandle className="mx-2 mb-2 hidden !w-[calc(100%-24px)] lg:flex" />
            <ResizablePanel>
              {size === "lg" && <OrderHistory markets={markets} size={size} />}
            </ResizablePanel>
          </ResizablePanelGroup>
          <div className="block lg:hidden">
            {size !== "lg" && <OrderHistory markets={markets} size={size} />}
          </div>
        </div>
      </div>
    </>
  );
}
