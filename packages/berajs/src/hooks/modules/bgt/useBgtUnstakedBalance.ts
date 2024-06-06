import useSWR from "swr";
import { erc20Abi, formatEther } from "viem";
import { usePublicClient } from "wagmi";
import { useBeraJs } from "~/contexts";
import POLLING from "~/enum/polling";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { useUserActiveValidators } from "./useUserActiveValidators";
import { bgtTokenAddress } from "@bera/config";

// TODO: REFACTOR ON REDEPLOY
export const useBgtUnstakedBalance = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<number | undefined> => {
  const { account, config: beraConfig } = useBeraJs();
  const publicClient = usePublicClient();
  const { data } = useUserActiveValidators();
  const QUERY_KEY = ["bgtUnstakedBalance", account, data];

  const swrResponse = useSWR<number | undefined>(
    QUERY_KEY,
    async () => {
      if (!account || !publicClient || !data) return undefined;

      const bgtBalance = await publicClient.readContract({
        address: bgtTokenAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [account],
      });

      const formattedBalance = parseFloat(formatEther(bgtBalance));
      const unavailableBalance = data?.reduce((acc, val) => {
        return acc + parseFloat(val.userStaked) + parseFloat(val.userQueued);
      }, 0);

      console.log("unavailableBalance", unavailableBalance);
      console.log("formattedBalance", formattedBalance);
      return formattedBalance - (unavailableBalance ?? 0);
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
