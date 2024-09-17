import { type PublicClient } from "viem";
import { jsonRpcUrl } from "@bera/config";
import { providers } from "ethers";

export function clientToProvider(client: PublicClient) {
  const { chain } = client;
  const network = {
    chainId: chain?.id,
    name: chain?.name,
  };

  return new providers.JsonRpcProvider(jsonRpcUrl, network as any);
}
