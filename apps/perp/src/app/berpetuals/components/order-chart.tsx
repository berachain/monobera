"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  type ChartingLibraryWidgetOptions,
  type ResolutionString,
} from "@/public/static/charting_library/charting_library";

const defaultWidgetProps: Partial<ChartingLibraryWidgetOptions> = {
  symbol: "BTC-USD",
  interval: "1D" as ResolutionString,
  library_path: "/static/charting_library/",
  locale: "en",
  charts_storage_url: "https://saveload.tradingview.com",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
};

const TVChartContainer = dynamic(
  () => import("./TVChartContainer").then((mod) => mod.TVChartContainer),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] w-full flex-col items-center justify-center">
        Loading
      </div>
    ),
  },
);

export default function OrderChart() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className="h-[500px] w-full">
      {isMounted ? (
        // <TVChartContainer {...defaultWidgetProps} />
        <></>
      ) : (
        // <></>
        <div className="flex h-[500px] w-full flex-col items-center justify-center">
          Loading
        </div>
      )}
    </div>
  );
}
