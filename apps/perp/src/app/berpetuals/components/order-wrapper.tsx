"use client";

import React, { useEffect, useState } from "react";
import { type GlobalParams } from "@bera/proto/src";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@bera/ui/resizable";

import type { IMarket } from "~/types/market";
import { OrderChart } from "../components/order-chart";
import { OrderHistory } from "../components/order-history";
import { CreatePosition } from "./create-position";

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

  return (
    <>
      <div className="mx-2 block h-[500px] rounded-md border border-border lg:hidden">
        {size !== "lg" && (
          <OrderChart markets={markets} marketName={defaultMarket?.name} />
        )}
      </div>
      <div className="flex h-full w-full flex-col lg:flex-row lg:overflow-auto">
        <CreatePosition market={defaultMarket} params={params} />
        <div className="flex h-full w-full flex-col overflow-auto">
          <ResizablePanelGroup
            className="hidden lg:flex lg:!h-[calc(100%-8px)]"
            direction="vertical"
          >
            <ResizablePanel>
              <div className="mr-2 hidden h-[calc(100%-8px)] flex-shrink-0 rounded-md border border-border lg:block">
                {size === "lg" && (
                  <OrderChart
                    key="lg"
                    markets={markets}
                    marketName={defaultMarket?.name}
                  />
                )}
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
