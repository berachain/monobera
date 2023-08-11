import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { usePublicClient, type Address, erc20ABI } from "wagmi";

import { BANK_PRECOMPILE_ABI, DEX_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig, useBeraJs } from "~/contexts";
import ERC20ABI from '../../../../../../../polaris-explorer/apps/explorer/app/address/[address]/components/erc20';

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const usePollUserDepositedPools = (endpoint: string) => {
  const publicClient = usePublicClient();
const {account} = useBeraJs()
const {networkConfig} = useBeraConfig()
  const QUERY_KEY = [account, "depositedPool", endpoint];
  useSWR(
    QUERY_KEY,
    async () => {
      try {
        const response = await fetch(endpoint)
        const temp =  await response.json()
        const pool = temp

        const shareDenomArray: Address[] = pool.map((item: any) => item.shareAddress)
        const call: Call[] = shareDenomArray.map((item: Address) => {
            return {
                abi: BANK_PRECOMPILE_ABI ,
                address: networkConfig.precompileAddresses.bankAddress as Address,
                functionName: "getBalance",
                args: [account, item],
            }
        })
        const result = await publicClient.multicall({
            contracts: call,
            multicallAddress: networkConfig.precompileAddresses
              .multicallAddress as Address,
          });
        const deposited = pool.filter((pool: any, i: number) => (result[i] !== undefined && (result[i]?.result as unknown as bigint) !== 0n))
        return deposited
      } catch(e) {
            return undefined;

      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
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
