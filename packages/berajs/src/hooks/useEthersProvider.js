import { useMemo } from "react";

import { clientToProvider } from "~/utils/ethers-client-to-provider";

/** Action to convert a viem Client to an ethers.js Provider. */
// @ts-ignore
export function useEthersProvider(client) {
  // const client = useClient<Config>({ chainId });

  return useMemo(() => clientToProvider(client), [client]);
}
