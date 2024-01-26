import { useMemo } from "react";
import { type Provider } from "@ethersproject/providers";
import { providers } from "ethers";
import { type Chain, type Client, type Transport } from "viem";

export function clientToProvider(client: Client<Transport, Chain>) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
  };

  console.log({
    network,
    transport,
  });
  if (transport.type === "fallback")
    return new providers.FallbackProvider(
      (transport.transports as ReturnType<Transport>[]).map(
        () =>
          new providers.JsonRpcProvider(
            process.env.NEXT_PUBLIC_JSON_RPC_URL,
            network,
          ),
      ),
    );
  return new providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_JSON_RPC_URL,
    network,
  );
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider(
  client: Client<Transport, Chain>,
): Provider | undefined {
  // const client = useClient<Config>({ chainId });
  return useMemo(() => clientToProvider(client), [client]);
}
