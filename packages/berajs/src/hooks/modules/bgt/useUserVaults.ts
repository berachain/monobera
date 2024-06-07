import useSWR from "swr";

import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { useBeraJs } from "~/contexts";
import { UserValidator, Validator, Vault } from "~/types";
import { GetUserValidatorInformation } from "@bera/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { bgtSubgraphUrl, multicallAddress } from "@bera/config";
import { Address, formatUnits } from "viem";
import { BERA_VAULT_REWARDS_ABI } from "~/abi";
import { usePublicClient } from "wagmi";

interface Call {
  abi: any;
  address: Address;
  functionName: string;
  args: any[];
}

/**
 *
 * @returns the current honey price of a given token
 */

export interface UserVault extends Vault {
  unclaimedBgt: string;
  balance: string;
}
export const useUserVaults = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<
  | {
      totalBgtRewards: string;
      vaults: UserVault[];
    }
  | undefined
> => {
  const { account } = useBeraJs();
  const publicClient = usePublicClient();
  const QUERY_KEY = ["useUserVaults", account];
  const swrResponse = useSWR<
    | {
        totalBgtRewards: string;
        vaults: UserVault[];
      }
    | undefined
  >(
    QUERY_KEY,
    async () => {
      if (!account || !publicClient) return undefined;

      const url = `http://localhost:3001/berachain/v1alpha1/beacon/user/${account}/vaults`;
      const validatorList = await fetch(url);
      const temp: any = await validatorList.json();
      const vaultList: Vault[] = temp.userVaults;
      const calls: Call[] = vaultList.map((vault: Vault) => ({
        address: vault.vaultAddress,
        abi: BERA_VAULT_REWARDS_ABI,
        functionName: "earned",
        args: [account],
      }));

      const result = await publicClient.multicall({
        contracts: calls,
        multicallAddress: multicallAddress,
      });

      const balanceCalls: Call[] = vaultList.map((vault: Vault) => ({
        address: vault.vaultAddress,
        abi: BERA_VAULT_REWARDS_ABI,
        functionName: "balanceOf",
        args: [account],
      }));

      const balanceResult = await publicClient.multicall({
        contracts: calls,
        multicallAddress: multicallAddress,
      });

      let total = 0n;
      const userVaults = vaultList.map((vault: Vault, index: number) => {
        const item = result[index];
        const balanceItem = balanceResult[index];
        total += item.result as bigint;
        if (item.status === "success") {
          return {
            ...vault,
            unclaimedBgt: formatUnits(item.result as bigint, 18),
            balance: formatUnits(balanceItem.result as bigint, 18),
          };
        }
        return vault;
      });

      const sortedUserVaults = userVaults.sort((a: any, b: any) => {
        const aUnclaimed = parseFloat(a.unclaimedBgt);
        const bUnclaimed = parseFloat(b.unclaimedBgt);
        return aUnclaimed - bUnclaimed;
      });

      return {
        totalBgtRewards: formatUnits(total, 18),
        vaults: sortedUserVaults as UserVault[],
      };
    },
    {
      ...options,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.NORMAL,
      keepPreviousData: true,
    },
  );
  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};
