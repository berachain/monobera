import { EventEmitter } from "events";
import React, { PropsWithChildren } from "react";
import { Address } from "viem";

import { type PricesMap } from "~/types/prices";
import { usePythSse } from "./usePythSSE";

type PriceContextType = {
  prices: { current: PricesMap };
  vaa: { current: Address[] };
  isConnected: boolean;
  createConnection: () => void;
  closeConnection: () => void;
  events: { current: EventEmitter | null };
};

const PriceContext = React.createContext({
  prices: { current: {} },
  isConnected: false,
  createConnection: () => {},
  closeConnection: () => {},
  events: { current: null },
} as PriceContextType);

const PriceContextProvider = ({
  children,
  initialPrices,
}: PropsWithChildren<{
  initialPrices?: PricesMap;
}>) => {
  const {
    vaa,
    wsConnected,
    createWsConnection,
    closeWsConnection,
    events,
    pythOffChainPrices,
  } = usePythSse({});

  return (
    <PriceContext.Provider
      value={{
        vaa: vaa,
        prices: pythOffChainPrices,
        isConnected: wsConnected,
        createConnection: createWsConnection,
        closeConnection: closeWsConnection,
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

const useVaa = () => {
  const context = React.useContext(PriceContext);
  if (context === undefined) {
    throw new Error("useVaa must be used within a PriceProvider");
  }
  return context?.vaa;
};

const useIsPythConnected = () => {
  const context = React.useContext(PriceContext);
  if (context === undefined) {
    throw new Error("useIsPythConnected must be used within a PriceProvider");
  }
  return context?.isConnected;
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
  useVaa,
  useIsPythConnected,
  restartPythConnection,
  usePriceEvents,
  PriceContext,
};
