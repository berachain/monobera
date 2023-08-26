import { useMemo } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { STAKING_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig, useBeraJs } from "~/contexts";
import { defaultPagination } from "~/utils";
import {
  usePollActiveValidators,
  type Validator,
  type ValidatorListResponse,
} from ".";

export interface UnbondingDelegationEntry {
  creationHeight: number;
  completionTime: string;
  initialBalance: bigint;
  balance: bigint;
  unbondingId: number;
}

export const usePollDelegatorValidators = () => {
  const publicClient = usePublicClient();
  const { account, isConnected } = useBeraJs();
  const { networkConfig } = useBeraConfig();
  const method = "getDelegatorValidators";
  const QUERY_KEY = [account, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected) {
        const result = (await publicClient
          .readContract({
            address: networkConfig.precompileAddresses
              .stakingAddress as Address,
            abi: STAKING_PRECOMPILE_ABI,
            functionName: "getDelegatorValidators",
            args: [account, defaultPagination],
          })
          .catch((e) => {
            console.log(e);
            return undefined;
          })) as any[];
        return {
          validators: result ? result[0] : undefined,
          nextKey: result ? result[1].nextKey : undefined,
          total: result ? result[1].total : undefined,
        };
      } else {
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useDelegatorValidators = (): Validator[] | undefined => {
    const { data } = useSWRImmutable<ValidatorListResponse>(QUERY_KEY);
    const validators = data?.validators ?? undefined;
    return validators;
  };

  const useDelegatorTotalDelegated = (): number => {
    const { data } = useSWRImmutable<ValidatorListResponse>(QUERY_KEY);
    const total = useMemo(() => {
      return data?.validators?.reduce((sum: number, validator: Validator) => {
        return sum + Number(formatUnits(BigInt(validator.tokens), 18));
      }, 0);
    }, [data]);
    return total ?? 0;
  };

  const useTotalValidatorsDelegated = (): number => {
    const { data } = useSWRImmutable<ValidatorListResponse>(QUERY_KEY);
    return Number(data?.total) ?? 0;
  };

  const usePercentageVotingPower = (): number | undefined => {
    const { useTotalDelegated } = usePollActiveValidators();
    const totalDelegated = useTotalDelegated();
    const data = useDelegatorTotalDelegated();

    const percentage = useMemo(() => {
      if (totalDelegated && data) {
        return (data / totalDelegated) * 100;
      } else {
        return undefined;
      }
    }, [totalDelegated, data]);
    return percentage;
  };

  return {
    useDelegatorValidators,
    useTotalValidatorsDelegated,
    useDelegatorTotalDelegated,
    usePercentageVotingPower,
    isLoading,
  };
};

export interface Entry {
  delegatorAddress: string;
  entries: EntryData[];
  validatorAddress: string;
}

export interface EntryData {
  balance: bigint;
  completionTime: string;
  creationHeight: bigint;
  initialBalance: bigint;
  unbondingId: bigint;
  validatorAddress?: string;
}

export interface UnbondingListResponse {
  entries: Entry[];
  nextKey: string;
  total: bigint;
}

export const usePollDelegatorUnbonding = () => {
  const publicClient = usePublicClient();
  const { account, isConnected } = useBeraJs();
  const { networkConfig } = useBeraConfig();
  const method = "getDelegatorUnbonding";
  const QUERY_KEY = [account, method];

  useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected) {
        const result = (await publicClient
          .readContract({
            address: networkConfig.precompileAddresses
              .stakingAddress as Address,
            abi: STAKING_PRECOMPILE_ABI,
            functionName: "getDelegatorUnbondingDelegations",
            args: [account, defaultPagination],
          })
          .catch((e) => {
            console.log(e);
            return undefined;
          })) as any[];
        return {
          entries: result ? result[0] : undefined,
          nextKey: result ? result[1].nextKey : undefined,
          total: result ? result[1].total : undefined,
        };
      } else {
        return undefined;
      }
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useDelegatorUnbondingEntries = (): Entry[] | undefined => {
    const { data } = useSWRImmutable<UnbondingListResponse>(QUERY_KEY);
    const entries = data?.entries ?? undefined;
    return entries;
  };

  const useDelegatorTotalUnbonding = (): number => {
    const { data } = useSWRImmutable<UnbondingListResponse>(QUERY_KEY);
    const total = useMemo(() => {
      return formatUnits(
        data?.entries?.reduce((total, entry) => {
          const entryBalanceSum = entry?.entries?.reduce(
            (entryTotal, entryData) => entryTotal + entryData.balance,
            0n,
          );
          return total + (entryBalanceSum ?? 0n);
        }, 0n) ?? 0n,
        18,
      );
    }, [data]);
    return Number(total) ?? 0;
  };

  const useDelegatorTotalUnbondingValidators = (): number => {
    const { data } = useSWRImmutable<UnbondingListResponse>(QUERY_KEY);
    return data?.entries?.length ?? 0;
  };

  const useDelegatorUnbondingQueue = () => {
    const { data } = useSWRImmutable<UnbondingListResponse>(QUERY_KEY);
    const result = useMemo(() => {
      const temp = data?.entries?.map((entry) => {
        return entry?.entries?.map((entryData) => {
          return {
            ...entryData,
            validatorAddress: entry.validatorAddress,
          };
        });
      });
      const sortedEntries = temp
        ?.flat()
        .sort((a, b) => a.completionTime.localeCompare(b.completionTime));
      return sortedEntries ?? [];
    }, [data]);
    return result;
  };
  return {
    useDelegatorUnbondingEntries,
    useDelegatorTotalUnbonding,
    useDelegatorTotalUnbondingValidators,
    useDelegatorUnbondingQueue,
  };
};
