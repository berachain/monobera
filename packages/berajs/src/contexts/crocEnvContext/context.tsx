import { createContext, useEffect, useState, type ReactNode } from "react";
import { CrocEnv } from "@crocswap-libs/sdk";
import { type ConnectArg } from "@crocswap-libs/sdk/dist/context";

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
  // const { data: signer, isError, error, isLoading: status } = useWalletClient();
  const provider = useEthersProvider(networkConfig);
  const signer = useEthersSigner(networkConfig);

  //new JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC_URL);
  const [crocEnv, setCrocEnv] = useState<CrocEnv | undefined>();
  console.log("si!!!!!!gner", networkConfig, signer, provider, chainId);

  const setNewCrocEnv = async () => {
    if (APP_ENVIRONMENT === "local") {
      console.debug({ provider });
      console.debug({ signer });
      console.debug({ crocEnv });
      console.debug({ status });
    } else if (!chainId && !signer) {
      APP_ENVIRONMENT === "local" &&
        console.debug("setting crocEnv to undefined");
      setCrocEnv(undefined);
      return;
    } else if (!chainId && !!crocEnv) {
      APP_ENVIRONMENT === "local" && console.debug("keeping provider");
      return;
    } else if (chainId && !crocEnv) {
      const newCrocEnv = new CrocEnv(
        provider as unknown as ConnectArg,
        signer ? signer : undefined,
      );
      setCrocEnv(newCrocEnv);
    } else {
      // If signer and provider are set to different chains (as can happen)
      // after a network switch, it causes a lot of performance killing timeouts
      // and errors
      if (signer?.chain.id == chainId) {
        const newCrocEnv = new CrocEnv(
          provider as unknown as ConnectArg,
          signer ? signer : undefined,
        );
        APP_ENVIRONMENT === "local" && console.debug({ newCrocEnv });
        setCrocEnv(newCrocEnv);
      }
    }
  };
  useEffect(() => {
    setNewCrocEnv();
  }, [crocEnv === undefined, signer]);

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
