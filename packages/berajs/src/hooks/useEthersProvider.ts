import { useMemo } from "react";
import { FallbackProvider, JsonRpcProvider, type Provider } from "ethers";
import {
  createClient,
  http,
  type Chain,
  type Client,
  type Transport,
} from "viem";

import { type NetworkConfig } from "~/config";

export function clientToProvider(
  client: Client<Transport, Chain>,
): Provider | undefined {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  if (transport.type === "fallback") {
    const providers = (transport.transports as ReturnType<Transport>[]).map(
      ({ value }) => new JsonRpcProvider(value?.url, network),
    );
    if (providers.length === 1) return providers[0];
    return new FallbackProvider(providers);
  }
  return new JsonRpcProvider(transport.url, network);
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider(
  networkConfig: NetworkConfig,
): Provider | undefined {
  const client = createClient({
    chain: networkConfig.chain,
    transport: http(),
  });
  // const client = useClient<Config>({ chainId });
  return useMemo(() => clientToProvider(client), [client]);
}
