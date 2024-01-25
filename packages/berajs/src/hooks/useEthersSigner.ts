import { useMemo } from "react";
import { BrowserProvider, JsonRpcSigner, type Signer } from "ethers";
import {
  createClient,
  http,
  type Account,
  type Chain,
  type Client,
  type Transport,
} from "viem";

import { type NetworkConfig } from "~/config";

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account, chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  };
  const provider = new BrowserProvider(transport, network);
  const signer = new JsonRpcSigner(provider, account.address);
  return signer;
}

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
// export async function useEthersSigner({ chainId }: { chainId?: number } = {}) {
//   const { data: client } = useConnectorClient<Config>({ chainId });
//   return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
// }

export function useEthersSigner(
  networkConfig: NetworkConfig,
): Signer | undefined {
  const client = createClient<Transport, Chain, Account>({
    chain: networkConfig.chain,
    transport: http(),
  });
  // const client = useClient<Config>({ chainId });
  return useMemo(() => (client ? clientToSigner(client) : undefined), [client]);
}
