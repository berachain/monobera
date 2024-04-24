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

type PriceContextType = {
  prices: { current: PricesMap };
  wsConnected: boolean;
  createConnection: () => void;
  closeConnection: () => void;
  events: { current: EventEmitter | null };
};

const PriceContext = React.createContext({
  prices: { current: {} },
  wsConnected: false,
  createConnection: () => {},
  closeConnection: () => {},
  events: { current: null },
} as PriceContextType);

const normalizePythId = (id: string) => (id?.startsWith("0x") ? id : `0x${id}`);

const PriceContextProvider = ({ children }: any) => {
  const events = useRef(new EventEmitter());
  const socketRef = useRef<EvmPriceServiceConnection>();
  const lastConnectionTime = useRef<number>();
  const pythOffChainPrices = useRef<PricesMap>({});
  const connectionId = useRef<ReturnType<typeof setTimeout>>();
  const [wsConnected, setWsConnected] = useState(false);

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
      const price = priceFeed.getPriceUnchecked();
      const id = normalizePythId(priceFeed.id);
      const priceName = PYTH_IDS.find((price) => id === price.id)?.name;
      if (priceName) {
        return {
          ...acc,
          [priceName]: price,
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
    } catch (error) {
      console.error(error);
    }
    socketRef.current.subscribePriceFeedUpdates(
      PYTH_IDS.map((pythPrice) => pythPrice.id),
      (priceFeed: PriceFeed) => {
        const price = priceFeed.getPriceUnchecked();
        const id = normalizePythId(priceFeed.id);
        const priceName = PYTH_IDS.find((price) => id === price.id)?.name;
        if (priceName) {
          handleConnection(true);
          lastConnectionTime.current = Date.now();
          pythOffChainPrices.current = {
            ...pythOffChainPrices.current,
            [priceName]: price,
          };
          throttleOffChainPricesUpdate(pythOffChainPrices.current);
        }
      },
    );
  }, []);

  const closeConnection = useCallback(() => {
    socketRef.current?.closeWebSocket();
    socketRef.current = undefined;
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

export {
  PriceContextProvider,
  usePriceData,
  useIsPythConnected,
  restartPythConnection,
  usePriceEvents,
  PriceContext,
};
