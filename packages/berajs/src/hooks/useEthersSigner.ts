import { useMemo } from "react";
import { providers, type Signer } from "ethers";
// import { type Account, type Chain, type Client, type Transport } from "viem";
import { useAccount, type PublicClient } from "wagmi";

export function clientToSigner(
  client: PublicClient,
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

export function useEthersSigner(client: PublicClient): Signer | undefined {
  const { address } = useAccount();
  return useMemo(
    () => (client ? clientToSigner(client, address) : undefined),
    [client],
  );
}
