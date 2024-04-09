import { candleFeed, perpsEndpoint } from "@bera/config";
import type {
  Bar,
  DatafeedConfiguration,
  HistoryCallback,
  IDatafeedChartApi,
  IExternalDatafeed,
  LibrarySymbolInfo,
  OnReadyCallback,
  PeriodParams,
  ResolutionString,
  SubscribeBarsCallback,
} from "public/static/charting_library/charting_library";

const supportedResolutions: ResolutionString[] = [
  "1" as ResolutionString,
  "3" as ResolutionString,
  "5" as ResolutionString,
  "15" as ResolutionString,
  "30" as ResolutionString,
  "60" as ResolutionString,
  "240" as ResolutionString,
  "1D" as ResolutionString,
];

const intradayMultipliers = ["1", "5", "15", "60", "240"];

const symbolInfoMap: Record<string, any> = {
  "BTC-USDC": {
    ticker: "BTC-USDC",
    name: "BTC-USDC",
    description: "Description for BTC-USDC",
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
  "ETH-USDC": {
    ticker: "ETH-USDC",
    name: "ETH-USDC",
    description: "Description for ETH-USDC",
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
  "ATOM-USDC": {
    ticker: "ATOM-USDC",
    name: "ATOM-USDC",
    description: "Description for ATOM-USDC",
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
  "TIA-USDC": {
    ticker: "TIA-USDC",
    name: "TIA-USDC",
    description: "Description for TIA-USDC",
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

const configurationData: DatafeedConfiguration = {
  supports_marks: false,
  supports_timescale_marks: false,
  supports_time: true,
  supported_resolutions: supportedResolutions,
};

const websocketConnections: Record<string, any> = {};

const websocket = candleFeed;
const datafeed: IDatafeedChartApi & IExternalDatafeed = {
  onReady: (callback: OnReadyCallback) => {
    setTimeout(() => callback(configurationData)); // callback must be called asynchronously.
  },
  searchSymbols: () => {
    console.log("[searchSymbols]: Method call");
  },
  resolveSymbol: (symbolName: any, onSymbolResolvedCallback: any) => {
    const symbolInfo = symbolInfoMap[symbolName];
    onSymbolResolvedCallback(symbolInfo);
  },
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
          `${perpsEndpoint}/history?symbol=${symbolInfo.name}&resolution=${resolution}`,
        );
        const result = await response.json();
        const bars = result.prices.map((bar: any) => {
          return {
            ...bar,
            time: Number(bar.time),
          };
        });
        console.log(`[getBars]: returned ${bars.length} bar(s)`);
        onResult(bars, { noData: false });
      } else {
        onResult([], { noData: true });
      }
    } catch (error) {
      onError("failed to fetch");
    }
    return Promise.resolve(); // Return a resolved promise to satisfy TypeScript
  },
  subscribeBars(
    symbolInfo: LibrarySymbolInfo,
    resolution: ResolutionString,
    onTick: SubscribeBarsCallback,
    listenerGuid: string,
  ) {
    console.log(
      "[subscribeBars]: Method call with subscribeUID:",
      listenerGuid,
    );
    // Create a WebSocket connection

    // Construct the WebSocket URL
    const wssurl = `${websocket}/${symbolInfo.name}?resolution=${resolution}`;

    // Create a WebSocket connection
    const socket = new WebSocket(wssurl);

    // Set up an event handler for when the WebSocket connection is opened
    socket.onopen = () => {
      console.log("WebSocket connection opened", listenerGuid);
    };

    // Set up an event handler for when a new message is received
    socket.onmessage = (event) => {
      // Parse the received data (assuming it's in JSON format)
      const data = JSON.parse(event.data);

      const bar: Bar = {
        time: data.time,
        open: data.open,
        high: data.high,
        low: data.low,
        close: data.close,
      };
      // Call the onTick callback function with the received data
      onTick(bar);
    };

    // Set up an event handler for errors
    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Set up an event handler for when the WebSocket connection is closed
    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event.reason);
      // Remove the connection from the mapping when it's closed
      if (websocketConnections[listenerGuid] === socket) {
        delete websocketConnections[listenerGuid];
      }
    };

    // Store the WebSocket connection in the mapping
    websocketConnections[listenerGuid] = socket;
  },
  unsubscribeBars(listenerGuid: string) {
    console.log(
      "[unsubscribeBars]: Method call with subscriberUID:",
      listenerGuid,
    );

    if (websocketConnections[listenerGuid]) {
      websocketConnections[listenerGuid].close();
      delete websocketConnections[listenerGuid];
    }
  },
};

export default datafeed;
