import { useMemo } from "react";
import { type PublicClient } from "viem";
import { clientToProvider } from "~/utils/ethers-client-to-provider";

/** Action to convert a viem Client to an ethers.js Provider. */
export function useEthersProvider(client: PublicClient) {
  // const client = useClient<Config>({ chainId });

  return useMemo(() => clientToProvider(client), [client]);
}
