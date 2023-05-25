import { useContext } from "react";

import { KeplrContext } from "./context";

export const useKeplr = () => {
  const keplrContext = useContext(KeplrContext);

  if (keplrContext === undefined) {
    throw new Error("cosmos wallet context undefined");
  }

  return keplrContext;
};
