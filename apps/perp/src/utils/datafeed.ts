import type {
  HistoryCallback,
  IDatafeedChartApi,
  IExternalDatafeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  ResolveCallback,
  SearchSymbolsCallback,
  SubscribeBarsCallback,
} from "public/static/charting_library/charting_library";
import { perpsPricesBenchmark } from "@bera/config";
import { PricesListener } from "~/types/prices";
import { formatPythPrice } from "./formatPyth";
import { PYTH_IDS } from "./constants";

export type ChartBar = {
  high: number;
  low: number;
  open: number;
  close: number;
  time: number;
};

const latestChartBar: {
  current: { bar: ChartBar; symbol: string } | undefined;
} = {
  current: undefined,
};

const splitBaseQuote = (symbolName: string) => {
  const split_data = symbolName.split(/[-/]/);
  const base = split_data[0];
  const quote = split_data[1];
  return { base, quote };
};

const formatToPythSymbol = (
  asset: string,
  quote: string | undefined,
): string => {
  return `Crypto.${asset}/${!quote || quote === "USDC" ? "USD" : quote}`;
};

const formatFromPythSymbol = (asset: string): string => {
  const pythSymbol = asset.startsWith("Crypto.") ? asset.slice(7) : asset;
  return pythSymbol.endsWith("/USD")
    ? pythSymbol.replace("/USD", "-USDC")
    : pythSymbol;
};

const resolutionToSeconds = (resolution: ResolutionString): number => {
  if (!Number.isNaN(Number(resolution))) {
    return Number(resolution) * 60;
  }

  const period =
    resolution === "1D"
      ? 86400
      : resolution === "3D"
        ? 86400 * 3
        : resolution === "7D"
          ? 86400 * 7
          : resolution === "30D"
            ? 86400 * 30
            : 3600;
  return period;
};

const updateBar = (bar: ChartBar, price: number) => {
  const high = Math.max(bar.high ?? 0, price);
  const low = Math.min(bar.low ?? 0, price);
  return {
    ...bar,
    low,
    high,
    close: price,
  };
};

export const subscribeOffChainPrices = (
  symbol: LibrarySymbolInfo,
  resolution: ResolutionString,
  callback: SubscribeBarsCallback,
) => {
  const listener: PricesListener = ({ prices }) => {
    const symbolName = formatFromPythSymbol(symbol.ticker ?? "");
    const pairIndex = PYTH_IDS.find(
      (price) => symbolName === price.name,
    )?.pairIndex;
    const currentPrice = prices[pairIndex ?? ""]?.getPriceUnchecked();
    if (currentPrice) {
      if (latestChartBar.current?.symbol !== symbol.ticker) return;
      const priceNum = Number(formatPythPrice(currentPrice));
      if (
        latestChartBar.current &&
        priceNum !== latestChartBar.current.bar.close
      ) {
        const updatedBar = updateBar(latestChartBar.current?.bar, priceNum);
        const resolutionMs = resolutionToSeconds(resolution) * 1000;
        const timeSinceUpdate = Date.now() - (updatedBar?.time ?? 0);

        if (timeSinceUpdate > resolutionMs) {
          const lastClose = latestChartBar.current?.bar.close;
          const latestBar = {
            high: lastClose,
            low: lastClose,
            open: lastClose,
            close: lastClose,
            time: Date.now(),
          };
          callback(latestBar);
          latestChartBar.current = {
            bar: latestBar,
            symbol: symbol.ticker ?? "",
          };
        } else {
          callback(updatedBar);
          latestChartBar.current = {
            bar: updatedBar,
            symbol: symbol.ticker ?? "",
          };
        }
      }
    }
  };
  return listener;
};

const DatafeedFactory = (
  onSubscribe: (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onRealtimeCallback: SubscribeBarsCallback,
  ) => void,
): IDatafeedChartApi & IExternalDatafeed => {
  return {
    onReady: (callback: OnReadyCallback) => {
      fetch(`${perpsPricesBenchmark}/config`).then((response) => {
        response.json().then((configurationData) => {
          setTimeout(() => callback(configurationData));
        });
      });
    },
    searchSymbols: (
      userInput: string,
      exchange: string,
      symbolType: string,
      onResultReadyCallback: SearchSymbolsCallback,
    ) => {
      fetch(`${perpsPricesBenchmark}/search?query=${userInput}`).then(
        (response) => {
          response.json().then((data) => {
            onResultReadyCallback(data);
          });
        },
      );
    },
    resolveSymbol: (
      symbolName: string,
      onSymbolResolvedCallback: ResolveCallback,
      onResolveErrorCallback: (err: string) => void,
    ) => {
      const { base, quote } = splitBaseQuote(symbolName);
      const pythSymbol = symbolName.startsWith("Crypto")
        ? symbolName
        : formatToPythSymbol(base ?? "", quote);
      fetch(`${perpsPricesBenchmark}/symbols?symbol=${pythSymbol}`).then(
        (response) => {
          response
            .json()
            .then((symbolInfo) => {
              onSymbolResolvedCallback(symbolInfo);
            })
            .catch((error) => {
              onResolveErrorCallback("Cannot resolve symbol");
              return;
            });
        },
      );
    },
    getBars: (
      symbolInfo: LibrarySymbolInfo,
      resolution: ResolutionString,
      periodParams: PeriodParams,
      onHistoryCallback: HistoryCallback,
      onError: (err: string) => void,
    ) => {
      const { firstDataRequest } = periodParams;
      fetch(
        `${perpsPricesBenchmark}/history?symbol=${symbolInfo.ticker}&from=${periodParams.from}&to=${periodParams.to}&resolution=${resolution}`,
      ).then((response) => {
        response
          .json()
          .then((data) => {
            if (data.t.length === 0) {
              onHistoryCallback([], { noData: true });
              return;
            }
            const bars = [];
            for (let i = 0; i < data.t.length; ++i) {
              bars.push({
                time: data.t[i] * 1000,
                low: data.l[i],
                high: data.h[i],
                open: data.o[i],
                close: data.c[i],
              });
            }
            if (firstDataRequest) {
              latestChartBar.current = {
                bar: bars[bars.length - 1] as ChartBar,
                symbol: symbolInfo.ticker ?? "",
              };
            }
            onHistoryCallback(bars, { noData: false });
          })
          .catch((error) => {
            onError(error);
          });
      });
    },
    subscribeBars: (
      symbolInfo: LibrarySymbolInfo,
      resolution: ResolutionString,
      onRealtimeCallback: SubscribeBarsCallback,
    ) => {
      onSubscribe(symbolInfo, resolution, onRealtimeCallback);
    },
    unsubscribeBars: () => {},
  };
};
export { DatafeedFactory };
