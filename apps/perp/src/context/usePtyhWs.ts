"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { type PricesMap } from "~/types/prices";

import { perpsPricesEndpoint } from "@bera/config";
import {
  EvmPriceServiceConnection,
  type PriceFeed,
} from "@pythnetwork/pyth-evm-js";
import throttle from "lodash/throttle";
import { EventEmitter } from "events";

import { PYTH_IDS } from "~/utils/constants";
import { normalizePythId } from "./utils";
export const usePythWs = () => {
  const events = useRef(new EventEmitter());
  const socketRef = useRef<EvmPriceServiceConnection | null>(null);
  const lastConnectionTime = useRef<number>();
  const pythOffChainPrices = useRef<PricesMap>({});
  const wsTimeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [wsConnected, setWsConnected] = useState(false);

  const monitorConnection = useCallback(() => {
    // If this is called externally, clear the existing timeout
    if (wsTimeoutId.current) clearTimeout(wsTimeoutId.current);

    wsTimeoutId.current = setTimeout(() => {
      if (Date.now() - (lastConnectionTime.current ?? 0) > 10000) {
        createWsConnection();
      }
      monitorConnection();
    }, 1000);
  }, [wsConnected]);

  const handleWsConnection = useCallback((connected: boolean) => {
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

  const createWsConnection = useCallback(async () => {
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
      handleWsConnection(false);
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
        const id = normalizePythId(priceFeed.id);
        const pairIndex = PYTH_IDS.find((price) => id === price.id)?.pairIndex;
        if (pairIndex) {
          handleWsConnection(true);
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

  const closeWsConnection = useCallback(() => {
    socketRef.current?.closeWebSocket();
    socketRef.current = null;
  }, []);

  useEffect(() => {
    if (!socketRef.current) {
      createWsConnection();
    }
    return () => {
      closeWsConnection();
    };
  }, []);

  return {
    wsConnected,
    createWsConnection,
    closeWsConnection,
    events,
    pythOffChainPrices,
  };
};
