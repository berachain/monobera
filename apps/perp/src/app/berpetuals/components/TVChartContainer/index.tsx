import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

import {
  widget,
  type ChartingLibraryWidgetOptions,
  type LanguageCode,
  type ResolutionString,
} from "../../../../../public/static/charting_library";
import Datafeed from "../../../../utils/tv-datafeed";
import styles from "./index.module.css";

export const TV_BACKGROUND_COLOR = {
  dark: "#0E0803",
  light: "#FAFAF9",
};

export const TVChartContainer = (
  props: Partial<ChartingLibraryWidgetOptions>,
) => {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const { theme: appTheme, systemTheme } = useTheme();
  const theme = (appTheme === "system" ? systemTheme : appTheme) || "dark";

  useEffect(() => {
    const backgroundColor =
      TV_BACKGROUND_COLOR[theme as keyof typeof TV_BACKGROUND_COLOR];
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: props.symbol,
      datafeed: Datafeed,
      interval: props.interval as ResolutionString,
      container: chartContainerRef.current,
      library_path: props.library_path,
      locale: props.locale as LanguageCode,
      enabled_features: [
        "study_templates",
        "iframe_loading_compatibility_mode",
      ],
      disabled_features: [
        "header_symbol_search",
        "use_localstorage_for_settings",
        "header_compare",
        "save_chart_properties_to_local_storage",
        "header_saveload",
        "items_favoriting",
      ],
      charts_storage_url: props.charts_storage_url,
      charts_storage_api_version: props.charts_storage_api_version,
      client_id: props.client_id,
      user_id: props.user_id,
      fullscreen: props.fullscreen,
      theme: theme as "light" | "dark",
      autosize: props.autosize,
      height: 500,
      loading_screen: {
        backgroundColor: backgroundColor,
      },
      overrides: {
        "paneProperties.background": backgroundColor,
        "chartProperties.background": backgroundColor,
        "paneProperties.backgroundType": "solid",
        "symbolWatermarkProperties.transparency": 90,
        "scalesProperties.textColor": "#AAA",
        "mainSeriesProperties.candleStyle.wickUpColor": "#336854",
        "mainSeriesProperties.candleStyle.wickDownColor": "#7f323f",
      },
      toolbar_bg: backgroundColor,
    };

    const tvWidget = new widget({ ...widgetOptions });

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
