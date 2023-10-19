import { useEffect, useRef, useState } from "react";
import {
  widget,
  type ChartingLibraryWidgetOptions,
  type LanguageCode,
  type ResolutionString,
} from "@/public/static/charting_library";
import { useTheme } from "next-themes";
import { useMediaQuery } from "usehooks-ts";

import styles from "./index.module.css";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

export const TVChartContainer = (
  props: Partial<ChartingLibraryWidgetOptions>,
) => {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { theme: appTheme } = useTheme();
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);

  useEffect(() => {
    if (appTheme === "system") {
      if (isDarkOS) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    } else if (appTheme !== undefined) {
      setTheme(appTheme as "light" | "dark");
    }
  }, [appTheme, isDarkOS]);

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: props.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        "http://k8s-devnet-btsapinl-bb091436b1-463c707996917350.elb.us-east-2.amazonaws.com",
        undefined,
        {
          maxResponseLength: 1000,
          expectedOrder: "latestFirst",
        },
      ),
      interval: props.interval as ResolutionString,
      container: chartContainerRef.current,
      library_path: props.library_path,
      locale: props.locale as LanguageCode,
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      charts_storage_url: props.charts_storage_url,
      charts_storage_api_version: props.charts_storage_api_version,
      client_id: props.client_id,
      user_id: props.user_id,
      fullscreen: props.fullscreen,
      theme,
      autosize: props.autosize,
      height: 500,
    };

    const tvWidget = new widget(widgetOptions);

    tvWidget.onChartReady(() => {
      void tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute("title", "Click to show a notification popup");
        button.classList.add("apply-common-tooltip");
        button.addEventListener("click", () =>
          tvWidget.showNoticeDialog({
            title: "Notification",
            body: "TradingView Charting Library API works correctly",
            callback: () => {
              console.log("Noticed!");
            },
          }),
        );

        button.innerHTML = "Check API";
      });
    });

    return () => {
      tvWidget.remove();
    };
  }, [props, theme]);

  return <div ref={chartContainerRef} className={styles.TVChartContainer} />;
};
