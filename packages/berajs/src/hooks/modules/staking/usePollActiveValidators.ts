import { useMemo } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient, type Address } from "wagmi";

import {
  BERACHEF_PRECOMPILE_ABI,
  ERC20BGT_PRECOMPILE_ABI,
  STAKING_PRECOMPILE_ABI,
} from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";
import { BeravaloperToEth, defaultPagination, ethToBeravaloper } from "~/utils";
import { usePollBgtSupply } from "../bank";

export interface Validator {
  operatorAddress: string;
  consensusPubkey: string;
  delegatorShares: bigint;
  jailed: boolean;
  description: ValidatorDescription;
  commission: ValidatorCommission;
  minSelfDelegation: string;
  status: string;
  tokens: string;
  unbondingHeight: number;
  unbondingTime: Date;
}

export interface ValidatorDescription {
  moniker: string;
  identity: string;
  website: string;
  securityContact: string;
  details: string;
}

export interface ValidatorCommission {
  commissionRates: {
    rate: bigint;
    maxRate: bigint;
    maxChangeRate: bigint;
  };
  updateTime: Date;
}

export interface CuttingBoard {
  address: Address;
  amount: string;
  percentage: string;
}

export interface Weight {
  receiverAddress: string;
  percentageNumerator: bigint;
}

export interface Bribe {
  consAddr: string;
  startEpoch: number;
  numBlockProposals: number;
  remainingBlockProposals: number;
  proposers: string[];
  amounts: bigint[];
}

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export interface ValidatorListResponse {
  validators: Validator[];
  nextKey: string;
  total: bigint;
}

export const usePollActiveValidators = () => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  useSWR(
    "getValidators",
    async () => {
      const result = (await publicClient
        .readContract({
          address: networkConfig.precompileAddresses.stakingAddress as Address,
          abi: STAKING_PRECOMPILE_ABI,
          functionName: "getValidators",
          args: [defaultPagination],
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
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );
  const useActiveValidators = (): Validator[] | undefined => {
    const { data } = useSWRImmutable<ValidatorListResponse>("getValidators");
    const validators = data?.validators ?? undefined;
    return validators;
  };

  const useActiveValidator = (
    address: string | undefined,
  ): Validator | undefined => {
    const { data } = useSWRImmutable<ValidatorListResponse>("getValidators");
    return useMemo(() => {
      if (!address || !data?.validators) return undefined;
      return data?.validators.find(
        (v: Validator) => BeravaloperToEth(v.operatorAddress) === address,
      );
    }, [data, address]);
  };

  const useTotalValidators = (): number => {
    const { data } = useSWRImmutable<ValidatorListResponse>("getValidators");
    return Number(data?.total) ?? 0;
  };

  const useTotalDelegated = (): number => {
    const { data } = useSWRImmutable<ValidatorListResponse>("getValidators");
    const total = useMemo(() => {
      return data?.validators?.reduce((sum: number, validator: Validator) => {
        return sum + Number(formatUnits(BigInt(validator.tokens), 18));
      }, 0);
    }, [data]);
    return total ?? 0;
  };

  const usePercentOfStakedBGT = (): number => {
    const total = useTotalDelegated();
    const { useBgtSupply } = usePollBgtSupply();
    const bgtSupply = useBgtSupply();
    if (total && bgtSupply) {
      return (total / Number(bgtSupply)) * 100;
    }
    return 0;
  };

  const usePercentageDelegated = (address: string): number | undefined => {
    const total = useTotalDelegated();
    const validator = useActiveValidator(address);
    return useMemo(() => {
      if (total && validator) {
        return (
          (Number(formatUnits(BigInt(validator.tokens), 18)) / total) * 100
        );
      }
      return undefined;
    }, [total, validator]);
  };

  const useEstimatedBlocksPerYear = (address: string) => {
    const percentDelegated = usePercentageDelegated(address);
    const blockTime = Number(process.env.NEXT_PUBLIC_BLOCKTIME);
    const blocksPerYear = (365 * 24 * 60 * 60) / blockTime;
    return percentDelegated ? (percentDelegated * blocksPerYear) / 100 : 0;
  };

  return {
    useActiveValidators,
    useActiveValidator,
    useTotalDelegated,
    usePercentageDelegated,
    usePercentOfStakedBGT,
    useTotalValidators,
    useEstimatedBlocksPerYear,
  };
};
