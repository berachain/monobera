import useSWRImmutable from "swr/immutable";
import { chainId } from "@bera/config";
export const useGetVerifiedAbi = (address: string) => {
  return useSWRImmutable(["useGetVerifiedAbi", address], async () => {
    const res = await fetch(
      `https://api.routescan.io/v2/network/testnet/evm/${chainId}/etherscan/api?module=contract&action=getabi&address=${address}`,
    );

    const data = await res.json();

    if (data.status === "0") {
      throw new Error(data.result);
    }
    return data.result;
  });
};
