"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { type PricesMap } from "~/types/prices";

import { PriceUpdate } from "@pythnetwork/hermes-client";
import throttle from "lodash/throttle";
import { EventEmitter } from "events";

import { PYTH_IDS } from "~/utils/constants";
import { normalizePythId } from "./utils";
import { perpsPricesEndpoint } from "@bera/config";
import { PriceFeed } from "@pythnetwork/pyth-evm-js";
function hex2bin(hex: string) {
  return parseInt(hex, 16).toString(2).padStart(8, "0");
}
export const usePythSse = ({
  initialPrices = {},
}: {
  initialPrices?: PricesMap;
}) => {
  const events = useRef(new EventEmitter());
  const eventSource = useRef<EventSource | null>(null);
  const lastConnectionTime = useRef<number>();
  const pythOffChainPrices = useRef<PricesMap>(initialPrices);
  const vaa = useRef<string[]>([]);
  const wsTimeoutId = useRef<ReturnType<typeof setTimeout>>();
  const [wsConnected, setWsConnected] = useState(false);
  const [isError, setIsError] = useState(false);

  const monitorConnection = useCallback(() => {
    // If this is called externally, clear the existing timeout
    if (wsTimeoutId.current) clearTimeout(wsTimeoutId.current);

    wsTimeoutId.current = setTimeout(() => {
      if (Date.now() - (lastConnectionTime.current ?? 0) > 10000) {
        createSseConnection();
      }
      monitorConnection();
    }, 1000);
  }, [wsConnected]);

  const updateSseStatus = useCallback((connected: boolean) => {
    if (connected !== wsConnected) {
      setWsConnected(connected);
    }
  }, []);

  const createSseConnection = useCallback(async () => {
    if (eventSource.current) {
      eventSource.current.close();
    }

    const url = new URL("v2/updates/price/stream", perpsPricesEndpoint);
    PYTH_IDS.forEach((price) => {
      url.searchParams.append("ids[]", price.id);
    });

    lastConnectionTime.current = Date.now();

    eventSource.current = new EventSource(url);

    if (!eventSource.current) {
      // throw error
      setIsError(true);
      return;
    }

    monitorConnection();
    eventSource.current.onerror = (event) => {
      const error = event as ErrorEvent;
      setIsError(true);

      //TBD
      if (error?.message) {
        console.error(error);
      }
      updateSseStatus(false);
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

    eventSource.current.addEventListener("message", (event) => {
      const { parsed: priceFeed, binary } = JSON.parse(
        event.data,
      ) as PriceUpdate;

      vaa.current = binary.data.map((vaa) => `0x${vaa}`);

      pythOffChainPrices.current =
        priceFeed?.reduce((acc, priceFeed) => {
          const id = normalizePythId(priceFeed.id);
          const pairIndex = PYTH_IDS.find(
            (price) => id === price.id,
          )?.pairIndex;
          if (pairIndex) {
            updateSseStatus(true);

            return {
              ...acc,
              // @ts-ignore
              [pairIndex]: new PriceFeed({
                ...priceFeed,
              }),
            };
          }
          return acc;
        }, {}) ?? {};

      throttleOffChainPricesUpdate(pythOffChainPrices.current);
    });
  }, []);

  const closeSseConnection = useCallback(() => {
    eventSource.current?.close();
    eventSource.current = null;
  }, []);

  useEffect(() => {
    if (!eventSource.current) {
      createSseConnection();
    }
    // return () => {
    //   closeSseConnection();
    // };
  }, []);

  return {
    wsConnected,
    vaa,
    isError,
    createWsConnection: createSseConnection,
    closeWsConnection: closeSseConnection,
    events,
    pythOffChainPrices,
  };
};
