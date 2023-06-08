import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { erc20ABI, usePublicClient } from "wagmi";

import { getContracts } from "~/api/contracts";
import { DEX_PRECOMPILE_ABI, DEX_PRECOMPILE_ADDRESS } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

// this is going to be slow for now until we have event indexing
export const usePollUserDepositedPools = () => {
  const publicClient = usePublicClient();
  const { account, error } = useBeraJs();
  const QUERY_KEY = [account, "userDepositedPools"];
  useSWR(
    QUERY_KEY,
    async () => {
      if (account && !error) {
        const result = await publicClient.readContract({
          address: DEX_PRECOMPILE_ADDRESS,
          abi: DEX_PRECOMPILE_ABI,
          functionName: "getAllPoolAddresses",
          args: [],
        });

        const getShareAddressesCall: Call[] = (result as `0x${string}`[]).map(
          (poolAddress: `0x${string}`) => {
            return {
              abi: DEX_PRECOMPILE_ABI,
              address: DEX_PRECOMPILE_ADDRESS,
              functionName: "getTotalShares",
              args: [poolAddress],
            };
          },
        );
        const contracts = getContracts();
        const getShareAddressesResult = await publicClient.multicall({
          contracts: getShareAddressesCall,
          multicallAddress: contracts.multicall as `0x${string}`,
        });

        const getUserBalancesCall = getShareAddressesResult.map(
          (result: any) => {
            return {
              abi: erc20ABI,
              address: result, // share address
              functionName: "balanceOf",
              args: [account],
            };
          },
        );
        const getUserBalancesResult = await publicClient.multicall({
          contracts: getUserBalancesCall,
          multicallAddress: contracts.multicall as `0x${string}`,
        });
        return getUserBalancesResult;
      }
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useUserDepositedPools = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };
  return {
    useUserDepositedPools,
  };
};
