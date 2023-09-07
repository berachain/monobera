import { useMemo } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, getAddress, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BRIBE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraJs } from "~/contexts";

export const usePollBribes = () => {
  const publicClient = usePublicClient();
  const { account } = useBeraJs();

  const method = "previewClaimValidatorBribes";
  const QUERY_KEY = [method, account];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      const result = (await publicClient.readContract({
        address: process.env.NEXT_PUBLIC_ERC20BRIBEMODULE_ADDRESS as Address,
        abi: BRIBE_PRECOMPILE_ABI,
        functionName: method,
        args: [account],
      })) as any[];
      return result;
    },
    {
      refreshInterval: POLLING.NORMAL, // make it rlly slow TODO CHANGE
    },
  );

  const useBribes = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useTotalBribes = (prices: any) => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return useMemo(() => {
      if (data === undefined || prices === undefined) return 0;
      let total = 0;
      data.forEach((bribe: any) => {
        const t = bribe.reward?.reduce(
          (acc: number, bribe: { amount: bigint; token: string }) => {
            return (
              acc +
              Number(formatUnits(bribe.amount, 18)) *
                prices[getAddress(bribe.token)]
            );
          },
          0,
        );
        total = total + t;
      });
      return total;
    }, [data, prices]);
  };

  const useBribeTokens = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return useMemo(() => {
      if (data === undefined) return [];
      const list: any[] = [];
      data.forEach((bribe: any) => {
        const t = bribe.reward?.map((bribe: { token: string }) => bribe.token);

        list.push(...t);
      });
      return [...new Set(list.flat())];
    }, [data]);
  };
  const useValidatorBribeTotal = (validatorAddress: string, prices: any) => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return useMemo(() => {
      if (data === undefined || prices === undefined) return 0;
      const validatorBribe = data.find(
        (bribe: any) => bribe.validator === validatorAddress,
      );
      if (validatorBribe === undefined) return 0;
      return validatorBribe.reward?.reduce(
        (acc: number, bribe: { amount: bigint; token: string }) => {
          return (
            acc +
            Number(formatUnits(bribe.amount, 18)) *
              prices[getAddress(bribe.token)]
          );
        },
        0,
      );
    }, [data, validatorAddress, prices]);
  };

  const useValidatorUserBribes = (validatorAddress: string) => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return useMemo(() => {
      if (data === undefined) return [];
      const entry = data.find(
        (bribe: any) =>
          bribe.validator.toLowerCase() === validatorAddress.toLowerCase(),
      );
      if (entry === undefined) return [];
      return entry.reward?.map((bribe: { token: string }) => bribe.token);
    }, [data]);
  };

  return {
    useBribes,
    useTotalBribes,
    useBribeTokens,
    useValidatorBribeTotal,
    useValidatorUserBribes,
    isLoading,
    QUERY_KEY,
  };
};
