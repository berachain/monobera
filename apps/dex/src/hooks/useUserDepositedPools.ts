import { useBeraJs, useChainId } from "@bera/berajs";
import { POLLING } from "@bera/shared-ui/src/utils";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { Address, erc20Abi, toHex } from "viem";
import { crocIndexerEndpoint, multicallAddress } from "@bera/config";
import { usePublicClient } from "wagmi";

interface Call {
  abi: typeof erc20Abi;
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const useUserDepositedPools = (lpTokens: Address[]) => {
  const { account } = useBeraJs();
  const publicClient = usePublicClient();
  const chainId = useChainId();
  const QUERY_KEY = ["useUserDepositedPools", ...lpTokens, publicClient];
console.log({
  QUERY_KEY
})
  useSWR(
    QUERY_KEY,
    async () => {
      if (!account || !publicClient) return undefined;
      const call: Call[] = lpTokens.map((item: Address) => ({
        address: item as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      }));
  

    const result = await publicClient.multicall({
      contracts: call,
      multicallAddress: multicallAddress,
    });

    // TODO: complete optimizsation

    console.log({
      result
    })
    const depositedPools = result.filter((res: any) => {
      !res.error && res.result > 0n;
    }).map((res: any) => {res.result})

    console.log({
      depositedPools
    })
    return depositedPools;
    },
    {
      refreshInterval: POLLING.SLOW * 10,
    },
  );

  // const useIsUserDeposited = (pool: PoolV2) => {
  //   const { data = undefined } = useSWRImmutable(QUERY_KEY);
  //   return data;
  // };
  // return {
  //   useIsUserDeposited,
  // };
};
