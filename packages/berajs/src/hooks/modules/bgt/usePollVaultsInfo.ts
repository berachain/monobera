import useSWR from "swr";
import { Address, formatEther } from "viem";
import { usePublicClient } from "wagmi";

import { getUserVaultsBalance } from "~/actions/bgt/getUserVaultsBalance";
import { getUserVaultsReward } from "~/actions/bgt/getUserVaultsReward";
import { getVaultsSupply } from "~/actions/bgt/getVaultsSupply";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";

export interface UsePollVaultsInfoRes {
  totalSupply: string;
  balance: string | undefined;
  rewards: string | undefined;
  percentage: string | undefined;
}

export const usePollVaultsInfo = (
  args: {
    vaultAddress: Address | undefined;
  },
  options?: DefaultHookOptions,
): DefaultHookReturnType<UsePollVaultsInfoRes | undefined> => {
  const { account, config: beraConfig } = useBeraJs();
  const publicClient = usePublicClient();
  const QUERY_KEY = ["usePollUserVaultsInfo", account, args.vaultAddress];

  const swrResponse = useSWR<UsePollVaultsInfoRes | undefined>(
    QUERY_KEY,
    async () => {
      if (!args.vaultAddress || !publicClient) return undefined;
      const totalSupply = await getVaultsSupply({
        vaultAddress: args.vaultAddress,
        publicClient,
      });
      if (!account) {
        return {
          totalSupply: formatEther(totalSupply),
          balance: undefined,
          rewards: undefined,
          percentage: undefined,
        };
      }

      const userBalance = await getUserVaultsBalance({
        account,
        vaultAddress: args.vaultAddress,
        publicClient,
      });
      const userReward = await getUserVaultsReward({
        account,
        vaultAddress: args.vaultAddress,
        publicClient,
      });

      return {
        totalSupply: formatEther(totalSupply),
        balance: formatEther(userBalance),
        rewards: formatEther(userReward),
        percentage:
          userBalance === 0n || totalSupply === 0n
            ? "0"
            : formatEther(userBalance / totalSupply),
      };
    },
    {
      ...options,
      refreshInterval: options?.opts?.refreshInterval ?? POLLING.NORMAL,
    },
  );

  return {
    ...swrResponse,
    refresh: () => swrResponse.mutate(),
  };
};
