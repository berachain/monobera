import { useMemo } from "react";
import { providers } from "ethers";
import { type PublicClient } from "viem";
// import { type Chain, type Client, type Transport } from "viem";
// import { type Provider } from "@ethersproject/providers";

export function clientToProvider(client: PublicClient) {
  const { chain } = client;
  const network = {
    chainId: chain?.id,
    name: chain?.name,
  };

  return new providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_JSON_RPC_URL,
    network as any,
  );
}

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider(client: PublicClient) {
  // const client = useClient<Config>({ chainId });

  return useMemo(() => clientToProvider(client), [client]);
}
