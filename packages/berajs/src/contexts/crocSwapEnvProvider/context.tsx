import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { CrocEnv } from "@bera/beracrocswap-sdk";
import { type Provider } from "@ethersproject/providers";
import {
  createClient,
  http,
  type Account,
  type Chain,
  type Transport,
} from "viem";

import { type NetworkConfig } from "~/config/types";
import { useChainId } from "~/hooks";
import { useEthersProvider } from "~/hooks/useEthersProvider";
import { useEthersSigner } from "~/hooks/useEthersSigner";

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

type CrocEnvContextProviderProps = {
  children: ReactNode;
  networkConfig: NetworkConfig;
};

const CrocEnvContextProvider = ({
  children,
  networkConfig,
}: CrocEnvContextProviderProps) => {
  const chainId = useChainId();

  //new JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC_URL);
  const [crocEnv, setCrocEnv] = useState<CrocEnv | undefined>();
  console.log(">>>>>>>>", crocEnv);
  const client = createClient<Transport, Chain, Account>({
    chain: networkConfig.chain,
    transport: http(),
  });

  const provider = useEthersProvider(client);
  const signer = useEthersSigner(client);

  const setNewCrocEnv = async () => {
    if (!provider && !signer) {
      APP_ENVIRONMENT === "local" &&
        console.debug("setting crocEnv to undefined");
      setCrocEnv(undefined);
      return;
    } else if (!signer && !!crocEnv) {
      APP_ENVIRONMENT === "local" && console.debug("keeping provider");
      return;
    } else if (provider && !crocEnv) {
      const newCrocEnv = new CrocEnv(provider, signer ? signer : undefined);
      setCrocEnv(newCrocEnv);
    } else {
      // If signer and provider are set to different chains (as can happen)
      // after a network switch, it causes a lot of performance killing timeouts
      // and errors
      if ((await signer?.getChainId()) == chainId) {
        const newCrocEnv = new CrocEnv(chainId, signer ? signer : undefined);
        APP_ENVIRONMENT === "local" && console.debug({ newCrocEnv });
        setCrocEnv(newCrocEnv);
      }
    }
  };
  useEffect(() => {
    setNewCrocEnv();
  }, [crocEnv === undefined, signer, chainId]);

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
