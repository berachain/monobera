import { useMemo } from "react";
import { providers, type Signer } from "ethers";
import { type Account, type Chain, type Client, type Transport } from "viem";
import { useAccount } from "wagmi";

export function clientToSigner(
  client: Client<Transport, Chain, Account>,
  address: `0x${string}` | undefined,
) {
  const { chain, transport } = client;
  const network = {
    chainId: chain.id,
    name: chain.name,
  };

  const provider = new providers.Web3Provider(transport, network);
  const signer = provider.getSigner(address);
  return signer;
}

/** Hook to convert a Viem Client to an ethers.js Signer. */
export function useEthersSigner(
  client: Client<Transport, Chain, Account>,
): Signer | undefined {
  const { address } = useAccount();
  return useMemo(
    () => (client ? clientToSigner(client, address) : undefined),
    [client],
  );
}
