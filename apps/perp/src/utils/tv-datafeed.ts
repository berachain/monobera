import {
  DatafeedConfiguration,
  HistoryCallback,
  IDatafeedChartApi,
  IExternalDatafeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
} from "public/static/charting_library/charting_library";

export function parseFullSymbol(fullSymbol: string) {
  const match = fullSymbol.split("-");
  if (!match) {
    return null;
  }
  return { fromSymbol: match[0], toSymbol: match[1] };
}

export const supportedResolutions: ResolutionString[] = [
  "1" as ResolutionString,
  "3" as ResolutionString,
  "5" as ResolutionString,
  "15" as ResolutionString,
  "30" as ResolutionString,
  "60" as ResolutionString,
  "240" as ResolutionString,
  "1D" as ResolutionString,
];

export const intradayMultipliers = ["1", "5", "15", "60", "240"];

export const symbolInfoMap: Record<string, any> = {
  ["BTC-USD"]: {
    ticker: "BTC-USD",
    name: "BTC-USD",
    description: "Description for BTC-USD",
    type: "crypto",
    session: "24x7",
    timezone: "Etc/UTC",
    exchange: "Berpetuals Dex",
    minmov: "1",
    pricescale: "100000",
    visible_plots_set: "ohlc",
    supported_resolutions: supportedResolutions,
    has_intraday: true,
    intraday_multipliers: intradayMultipliers,
  },
  ["ETH-USD"]: {
    ticker: "ETH-USD",
    name: "ETH-USD",
    description: "Description for ETH-USD",
    type: "crypto",
    session: "24x7",
    timezone: "Etc/UTC",
    exchange: "Berpetuals Dex",
    minmov: "1",
    pricescale: "100000",
    visible_plots_set: "ohlc",
    supported_resolutions: supportedResolutions,
    has_intraday: true,
    intraday_multipliers: intradayMultipliers,
  },
};

export const configurationData: DatafeedConfiguration = {
  supports_marks: false,
  supports_timescale_marks: false,
  supports_time: true,
  supported_resolutions: supportedResolutions,
};

const cachedData: any = [];

const datafeed: IDatafeedChartApi & IExternalDatafeed = {
  onReady: (callback: OnReadyCallback) => {
    console.log("[onReady]: Method call");
    setTimeout(() => callback(configurationData)); // callback must be called asynchronously.
  },
  searchSymbols: (
    userInput: any,
    exchange: any,
    symbolType: any,
    onResultReadyCallback: any,
  ) => {
    console.log("[searchSymbols]: Method call");
  },
  resolveSymbol: (
    symbolName: any,
    onSymbolResolvedCallback: any,
    onResolveErrorCallback: any,
  ) => {
    console.log("[resolveSymbol]: Method call", symbolName);
    const symbolInfo = symbolInfoMap[symbolName];
    onSymbolResolvedCallback(symbolInfo);
  },
  getBars: async (
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    periodParams: PeriodParams,
    onResult: HistoryCallback,
    onError: (err: string) => void,
  ) => {
    try {
      const isFirst = periodParams.firstDataRequest;
      if (isFirst) {
        const response = await fetch(
          `http://k8s-devnet-btsapinl-bb091436b1-463c707996917350.elb.us-east-2.amazonaws.com/history?symbol=${symbolInfo.name}&resolution=${resolution}`,
        );
        const result = await response.json();
        const bars = result.prices;
        console.log(`[getBars]: returned ${bars.length} bar(s)`);
        onResult(bars, { noData: false });
      } else {
        onResult([], { noData: true });
      }
    } catch (error) {
      onError("failed to fetch");
    }
  },
  subscribeBars: (
    symbolInfo: any,
    resolution: any,
    onRealtimeCallback: any,
    subscribeUID: any,
    onResetCacheNeededCallback: any,
  ) => {
    console.log(
      "[subscribeBars]: Method call with subscribeUID:",
      subscribeUID,
    );
  },
  unsubscribeBars: (subscriberUID: any) => {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      subscriberUID,
    );
  },
};

export default datafeed;
