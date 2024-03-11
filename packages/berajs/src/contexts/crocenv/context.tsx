import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { CrocEnv } from "@bera/beracrocswap";
import { usePublicClient } from "wagmi";

import { useChainId } from "~/hooks";
import { useEthersProvider } from "~/hooks/useEthersProvider";

export type AppEnvironment = "local" | "testnet" | "production";
export const APP_ENVIRONMENT: AppEnvironment = "local";

export const IS_LOCAL_ENV = APP_ENVIRONMENT === "local";

export interface CrocEnvContextIF {
  crocEnv: CrocEnv | undefined;
  setCrocEnv: (val: CrocEnv | undefined) => void;
}

export const CrocEnvContext = createContext<CrocEnvContextIF>(
  {} as CrocEnvContextIF,
);

const CrocEnvContextProvider = ({ children }: PropsWithChildren) => {
  const chainId = useChainId();

  const [crocEnv, setCrocEnv] = useState<CrocEnv | undefined>();

  console.log({ crocEnv });

  const client = usePublicClient({ chainId: chainId || undefined });

  const provider = useEthersProvider(client as any);

  const setNewCrocEnv = () => {
    if (!provider) {
      APP_ENVIRONMENT === "local" &&
        console.debug("setting crocEnv to undefined");
      setCrocEnv(undefined);
      return;
    }
    if (crocEnv) {
      APP_ENVIRONMENT === "local" && console.debug("keeping provider");
      return;
    }
    if (provider && !crocEnv) {
      const newCrocEnv = new CrocEnv(provider, undefined);
      setCrocEnv(newCrocEnv);
    }
  };
  useEffect(() => {
    setNewCrocEnv();
  }, [crocEnv === undefined, chainId]);

  // data returned by this context
  const crocEnvContext = {
    crocEnv,
    setCrocEnv,
  };

  return (
    <CrocEnvContext.Provider value={crocEnvContext}>
      {children}
    </CrocEnvContext.Provider>
  );
};

export default CrocEnvContextProvider;
