import { EventEmitter } from "events";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { perpsPricesEndpoint } from "@bera/config";
import {
  EvmPriceServiceConnection,
  type PriceFeed,
} from "@pythnetwork/pyth-evm-js";
import throttle from "lodash/throttle";

import { PYTH_IDS } from "~/utils/constants";
import { type PricesMap } from "~/types/prices";
import { generateEncodedPythPrices } from "~/utils/formatPyth";
import { usePythUpdateFee } from "@bera/berajs";

type PriceContextType = {
  prices: { current: PricesMap };
  wsConnected: boolean;
  createConnection: () => void;
  closeConnection: () => void;
  events: { current: EventEmitter | null };
  updateFee: bigint;
};

const PriceContext = React.createContext({
  prices: { current: {} },
  wsConnected: false,
  createConnection: () => {},
  closeConnection: () => {},
  events: { current: null },
  updateFee: 0n,
} as PriceContextType);

const normalizePythId = (id: string) => (id?.startsWith("0x") ? id : `0x${id}`);

const PriceContextProvider = ({ children }: any) => {
  const events = useRef(new EventEmitter());
  const socketRef = useRef<EvmPriceServiceConnection | null>(null);
  const lastConnectionTime = useRef<number>();
  const pythOffChainPrices = useRef<PricesMap>({});
  const connectionId = useRef<ReturnType<typeof setTimeout>>();
  const [wsConnected, setWsConnected] = useState(false);
  let encodedPrices: string[] = [];
  if (pythOffChainPrices.current !== undefined && wsConnected) {
    encodedPrices = generateEncodedPythPrices(pythOffChainPrices, "1");
  }
  const { updateFee } = usePythUpdateFee(wsConnected, encodedPrices);

  const monitorConnection = useCallback(() => {
    if (connectionId.current) clearTimeout(connectionId.current);
    connectionId.current = setTimeout(() => {
      if (Date.now() - (lastConnectionTime.current ?? 0) > 10000) {
        createConnection();
      }
      monitorConnection();
    }, 1000);
  }, [wsConnected]);

  const handleConnection = useCallback((connected: boolean) => {
    if (connected !== wsConnected) {
      setWsConnected(connected);
    }
  }, []);

  const getOffChainPrices = async () => {
    const pythPrices = await socketRef.current?.getLatestPriceFeeds(
      PYTH_IDS.map((pythPrice) => pythPrice.id),
    );
    return pythPrices?.reduce((acc, priceFeed) => {
      const id = normalizePythId(priceFeed.id);
      const pairIndex = PYTH_IDS.find((price) => id === price.id)?.pairIndex;
      if (pairIndex) {
        return {
          ...acc,
          [pairIndex]: priceFeed,
        };
      }
      return acc;
    }, {});
  };

  const createConnection = useCallback(async () => {
    if (socketRef.current) {
      socketRef.current.closeWebSocket();
    }
    socketRef.current = new EvmPriceServiceConnection(perpsPricesEndpoint, {
      priceFeedRequestConfig: {
        binary: true,
      },
      logger: {
        error: console.error,
        warn: console.warn,
        info: () => undefined,
        debug: () => undefined,
        trace: () => undefined,
      },
    });
    lastConnectionTime.current = Date.now();
    monitorConnection();
    socketRef.current.onWsError = (error: Error) => {
      if (error?.message) {
        console.error(error);
      }
      handleConnection(false);
    };

    const throttleOffChainPricesUpdate = throttle(
      (offChainPrices: PricesMap) => {
        events.current.emit("prices_updated", {
          prices: offChainPrices,
          source: "stream",
        });
      },
      10,
    );

    try {
      const offChainPrices = await getOffChainPrices();
      events.current.emit("prices_updated", {
        prices: offChainPrices,
        source: "fetch",
      });
      pythOffChainPrices.current = { ...offChainPrices };
      const encodedPrices = generateEncodedPythPrices(pythOffChainPrices, "1");
    } catch (error) {
      console.error(error);
    }
    socketRef.current.subscribePriceFeedUpdates(
      PYTH_IDS.map((pythPrice) => pythPrice.id),
      (priceFeed: PriceFeed) => {
        const id = normalizePythId(priceFeed.id);
        const pairIndex = PYTH_IDS.find((price) => id === price.id)?.pairIndex;
        if (pairIndex) {
          handleConnection(true);
          lastConnectionTime.current = Date.now();
          pythOffChainPrices.current = {
            ...pythOffChainPrices.current,
            [pairIndex]: priceFeed,
          };
          throttleOffChainPricesUpdate(pythOffChainPrices.current);
        }
      },
    );
  }, []);

  const closeConnection = useCallback(() => {
    socketRef.current?.closeWebSocket();
    socketRef.current = null;
  }, []);

  useEffect(() => {
    if (!socketRef.current) {
      createConnection();
    }
    return () => {
      closeConnection();
    };
  }, []);

  return (
    <PriceContext.Provider
      value={{
        prices: pythOffChainPrices,
        wsConnected,
        createConnection,
        closeConnection,
        events,
        updateFee: updateFee ?? 0n,
      }}
    >
      {children}
    </PriceContext.Provider>
  );
};

const usePriceData = () => {
  const context = React.useContext(PriceContext);
  if (context === undefined) {
    throw new Error("usePriceData must be used within a PriceProvider");
  }
  return context?.prices;
};

const useIsPythConnected = () => {
  const context = React.useContext(PriceContext);
  if (context === undefined) {
    throw new Error("useIsPythConnected must be used within a PriceProvider");
  }
  return context?.wsConnected;
};

const restartPythConnection = () => {
  const context = React.useContext(PriceContext);
  if (context === undefined) {
    throw new Error(
      "restartPythConnection must be used within a PriceProvider",
    );
  }
  context.closeConnection();
  context.createConnection();
};

const usePriceEvents = () => {
  const context = React.useContext(PriceContext);
  if (context === undefined) {
    throw new Error("addEventListener must be used within a PriceProvider");
  }
  return context.events;
};

const usePythUpdateFeeFormatted = () => {
  const context = React.useContext(PriceContext);
  if (context === undefined) {
    throw new Error(
      "usePythUpdateFeeFormatted must be used within a PriceProvider",
    );
  }
  return context.updateFee;
};

export {
  PriceContextProvider,
  usePriceData,
  useIsPythConnected,
  restartPythConnection,
  usePriceEvents,
  usePythUpdateFeeFormatted,
  PriceContext,
};
