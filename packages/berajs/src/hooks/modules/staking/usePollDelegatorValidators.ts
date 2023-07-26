import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { STAKING_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig, useBeraJs } from "~/contexts";
import { ethToBera } from "~/utils";
import { type Validator } from ".";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

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
  useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected) {
        const result = await publicClient.readContract({
          address: networkConfig.precompileAddresses.stakingAddress as Address,
          abi: STAKING_PRECOMPILE_ABI,
          functionName: method,
          args: [ethToBera(account as string)],
        });
        return result;
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.FAST,
    },
  );

  const useDelegatorValidators = (): Validator[] => {
    const { data = [] } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    useDelegatorValidators,
  };
};

export const usePollTotalDelegatorDelegated = () => {
  const publicClient = usePublicClient();
  const { account, isConnected } = useBeraJs();
  const { networkConfig } = useBeraConfig();
  const { useDelegatorValidators } = usePollDelegatorValidators();
  const validators: Validator[] = useDelegatorValidators();
  const method = "getDelegation";
  const QUERY_KEY = [account, validators, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected && validators.length > 0) {
        const call: Call[] = validators.map((validator: Validator) => {
          return {
            address: networkConfig.precompileAddresses
              .stakingAddress as Address,
            abi: STAKING_PRECOMPILE_ABI,
            functionName: method,
            args: [ethToBera(account as string), validator.operatorAddress],
          };
        });
        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: networkConfig.precompileAddresses
            .multicallAddress as Address,
        });
        return result?.reduce((sum: number, r: any) => {
          return sum + Number(formatUnits(r.result ?? 0n, 18));
        }, 0);
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useTotalDelegatorDelegated = (): number | undefined => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  return {
    useTotalDelegatorDelegated,
  };
};

export const usePollDelegatorUnbonding = () => {
  const publicClient = usePublicClient();
  const { account, isConnected } = useBeraJs();
  const { networkConfig } = useBeraConfig();
  const { useDelegatorValidators } = usePollDelegatorValidators();
  const validators: Validator[] = useDelegatorValidators();
  const method = "getUnbondingDelegation";
  const QUERY_KEY = [account, validators, method];
  useSWR(
    QUERY_KEY,
    async () => {
      if (isConnected && validators.length > 0) {
        const call: Call[] = validators.map((validator: Validator) => {
          return {
            address: networkConfig.precompileAddresses
              .stakingAddress as Address,
            abi: STAKING_PRECOMPILE_ABI,
            functionName: method,
            args: [ethToBera(account as string), validator.operatorAddress],
          };
        });
        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: networkConfig.precompileAddresses
            .multicallAddress as Address,
        });
        console.log(result);
        return result?.flatMap((entry) => entry.result);
      }
      return undefined;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useDelegatorUnbonding = (): number | undefined => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useTotalDelegatorUnbonding = (): number | undefined => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data?.reduce((sum: number, unbond: UnbondingDelegationEntry) => {
      return sum + Number(formatUnits(unbond.balance, 18));
    }, 0);
  };

  return {
    useDelegatorUnbonding,
    useTotalDelegatorUnbonding,
  };
};
