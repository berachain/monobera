import { useMemo } from "react";
import { providers } from "ethers";
// import { type Chain, type Client, type Transport } from "viem";
// import { type Provider } from "@ethersproject/providers";
import { type PublicClient } from "wagmi";

export function clientToProvider(client: PublicClient) {
  const { chain } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
  };

  //   if (transport.type === "fallback")
  //     return new providers.FallbackProvider(
  //       (transport.transports as ReturnType<Transport>[]).map(
  //         () =>
  //           new providers.JsonRpcProvider(
  //             process.env.NEXT_PUBLIC_JSON_RPC_URL,
  //             network,
  //           ),
  //       ),
  //     );
  return new providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_JSON_RPC_URL,
    network,
  );
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider(client: PublicClient) {
  // const client = useClient<Config>({ chainId });

  return useMemo(() => clientToProvider(client), [client]);
}
