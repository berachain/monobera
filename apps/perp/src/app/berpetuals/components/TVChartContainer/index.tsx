import { useCallback, useEffect, useRef, useState } from "react";
import { usePrevious } from "@bera/shared-ui";
import { useTheme } from "next-themes";

import {
  widget,
  type ChartingLibraryWidgetOptions,
  type IChartingLibraryWidget,
  type IPositionLineAdapter,
  type LanguageCode,
  type ResolutionString,
} from "../../../../../public/static/charting_library";
import Datafeed from "../../../../utils/tv-datafeed";
import { type OrderLine } from "../order-chart";
import styles from "./index.module.css";

export const TV_BACKGROUND_COLOR = {
  dark: "#0E0803",
  light: "#FAFAF9",
};

export type ChartProps = Partial<ChartingLibraryWidgetOptions> & {
  orderLines?: OrderLine[];
  chartReady: boolean;
  setChartReady: (ready: boolean) => void;
};

export const TVChartContainer = (props: ChartProps) => {
  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const tvWidgetRef = useRef<IChartingLibraryWidget | null>(null);
  const orderLineRefs = useRef<IPositionLineAdapter[] | undefined>([]);
  const toggleLinesButton = useRef<HTMLElement | null>(null);
  const toggleListener = useRef<(() => void) | null>(null);
  const [showOrderLines, setShowOrderLines] = useState(true);

  const { theme: appTheme, systemTheme } = useTheme();
  const theme = (appTheme === "system" ? systemTheme : appTheme) || "dark";
  const prevTheme = usePrevious(theme);

  const handleToggleShowOrderLines = useCallback(() => {
    setShowOrderLines((prev) => !prev);
  }, [setShowOrderLines]);

  useEffect(() => {
    if (prevTheme !== theme && props.chartReady) {
      props.setChartReady(false);
    }
  }, [prevTheme, theme, props.chartReady, props.setChartReady]);

  const renderOrderLines = () => {
    tvWidgetRef.current?.onChartReady(() => {
      tvWidgetRef.current?.chart().dataReady(() => {
        clearOrderLines();
        orderLineRefs.current = props.orderLines?.reduce(
          (acc, order, index) => {
            if (order.price) {
              const orderLine = tvWidgetRef.current
                ?.chart()
                .createPositionLine()
                .onClose("onClose called", () => {
                  order.onClose();
                })
                .onModify("onModify called", () => {
                  order.onHighlight();
                })
                .setText(order.type)
                .setPrice(order.price)
                .setQuantity(order.positionSize.toString())
                .setProtectTooltip("Highlight Position")
                .setLineStyle(2)
                .setLineColor("#57534E")
                .setBodyTextColor("#FFFFFF")
                .setQuantityTextColor("#FFFFFF")
                .setCloseButtonIconColor("#FFFFFF")
                .setBodyBackgroundColor("#57534E")
                .setQuantityBackgroundColor("#57534E")
                .setCloseButtonBackgroundColor("#57534E")
                .setBodyBorderColor("#57534E")
                .setQuantityBorderColor("#57534E")
                .setCloseButtonBorderColor("#57534E")
                .setCloseTooltip("Close position");
              if (orderLine) acc.push(orderLine);
              if (order.tp) {
                const tpLine = tvWidgetRef.current
                  ?.chart()
                  .createPositionLine()
                  .setText("TP")
                  .setTooltip(`TP at ${order.positionSize}`)
                  .setPrice(order.tp)
                  .setQuantity(order.positionSize.toString())
                  .setLineStyle(2)
                  .setLineColor("#059669")
                  .setBodyTextColor("#FFFFFF")
                  .setQuantityTextColor("#FFFFFF")
                  .setBodyBackgroundColor("#059669")
                  .setQuantityBackgroundColor("#059669")
                  .setBodyBorderColor("#059669")
                  .setQuantityBorderColor("#059669");
                if (tpLine) acc.push(tpLine);
              }
              if (order.sl) {
                const slLine = tvWidgetRef.current
                  ?.chart()
                  .createPositionLine()
                  .setText("SL")
                  .setTooltip(`SL at ${order.positionSize}`)
                  .setPrice(order.sl)
                  .setQuantity(order.positionSize.toString())
                  .setLineStyle(2)
                  .setLineColor("#DC2626")
                  .setBodyTextColor("#FFFFFF")
                  .setQuantityTextColor("#FFFFFF")
                  .setBodyBackgroundColor("#DC2626")
                  .setQuantityBackgroundColor("#DC2626")
                  .setBodyBorderColor("#DC2626")
                  .setQuantityBorderColor("#DC2626");
                if (slLine) acc.push(slLine);
              }
            }
            return acc;
          },
          [] as IPositionLineAdapter[],
        );
      });
    });
  };

  const clearOrderLines = () => {
    orderLineRefs.current?.forEach((ref) => {
      ref?.remove();
    });
    orderLineRefs.current = [];
  };

  useEffect(() => {
    if (handleToggleShowOrderLines) {
      toggleListener.current &&
        toggleLinesButton.current?.removeEventListener(
          "click",
          toggleListener.current,
        );
      toggleLinesButton.current?.addEventListener(
        "click",
        handleToggleShowOrderLines,
      );
      toggleListener.current = handleToggleShowOrderLines;
    }
  }, [handleToggleShowOrderLines]);

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
      custom_css_url: "./theme.css",
      autosize: props.autosize,
      height: 498,
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
    tvWidgetRef.current = tvWidget;

    tvWidgetRef.current?.onChartReady(() => {
      widgetOptions.overrides &&
        tvWidgetRef.current?.applyOverrides(widgetOptions.overrides);
      props.setChartReady(true);
    });

    tvWidgetRef.current?.headerReady().then(() => {
      if (!tvWidgetRef.current || !handleToggleShowOrderLines) return;
      toggleLinesButton.current = tvWidgetRef.current.createButton();
      toggleLinesButton.current.classList.add("custom-button");
      toggleLinesButton.current.setAttribute("title", "Hide / Show Orders");
      toggleLinesButton.current.textContent = showOrderLines
        ? "Hide Orders"
        : "Show Orders";
      toggleLinesButton.current.addEventListener(
        "click",
        handleToggleShowOrderLines,
      );
      toggleListener.current = handleToggleShowOrderLines;
    });

    return () => {
      tvWidget.remove();
    };
  }, [
    props.symbol,
    props.interval,
    props.library_path,
    props.locale,
    props.charts_storage_url,
    props.charts_storage_api_version,
    props.client_id,
    props.user_id,
    props.fullscreen,
    props.autosize,
    theme,
    props.setChartReady,
  ]);

  useEffect(() => {
    if (props.chartReady) {
      if (showOrderLines) {
        tvWidgetRef.current?.onChartReady(() => {
          tvWidgetRef.current?.chart().dataReady(() => {
            renderOrderLines();
          });
        });
      } else {
        clearOrderLines();
      }
    }
  }, [props.orderLines, showOrderLines, tvWidgetRef, props.chartReady]);

  useEffect(() => {
    if (toggleLinesButton.current) {
      toggleLinesButton.current.textContent = showOrderLines
        ? "Hide Orders"
        : "Show Orders";
    }
  }, [showOrderLines]);

  return <div ref={chartContainerRef} className={styles.TVChartContainer} />;
};
