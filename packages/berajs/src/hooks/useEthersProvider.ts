import { useMemo } from "react";
import { jsonRpcUrl } from "@bera/config";
import { providers } from "ethers";
import { type PublicClient } from "viem";

export function clientToProvider(client: PublicClient) {
  const { chain } = client;
  const network = {
    chainId: chain?.id,
    name: chain?.name,
  };

  return new providers.JsonRpcProvider(jsonRpcUrl, network as any);
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider(client: PublicClient) {
  // const client = useClient<Config>({ chainId });

  return useMemo(() => clientToProvider(client), [client]);
}
