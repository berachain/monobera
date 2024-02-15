import { useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { STAKING_PRECOMPILE_ABI } from "~/config";
import { useBeraConfig } from "~/contexts";
import { defaultPagination } from "~/utils";
import { usePollBgtSupply } from "../bank";
import {
  getEstimatedBlocksPerYear,
  getPercentageGlobalVotingPower,
  getValidatorTotalDelegated,
} from "./utils";

export interface Validator {
  operatorAddr: string;
  consAddr: string;
  delegatorShares: bigint;
  jailed: boolean;
  description: ValidatorDescription;
  commission: ValidatorCommission;
  minSelfDelegation: bigint;
  status: string;
  tokens: bigint;
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
export interface ValidatorListResponse {
  validators: Validator[];
  nextKey: string;
  total: bigint;
}

export const usePollActiveValidators = () => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const { isLoading } = useSWRImmutable("getValidators", async () => {
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
  });
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
        (v: Validator) => v.operatorAddr === address,
      );
    }, [data, address]);
  };

  const useValidatorTokens = (address: string | undefined): number => {
    const validator = useActiveValidator(address);
    return getValidatorTotalDelegated(validator);
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
      return getPercentageGlobalVotingPower(validator, total);
    }, [total, validator]);
  };

  const useEstimatedBlocksPerYear = (address: string) => {
    const percentDelegated = usePercentageDelegated(address);
    return getEstimatedBlocksPerYear(percentDelegated);
  };

  const useValidatorAddresses = (): string[] | undefined => {
    const validators = useActiveValidators();
    return useMemo(() => {
      if (!validators) return undefined;
      return validators.map((v: Validator) => v.operatorAddr);
    }, [validators]);
  };
  return {
    useActiveValidators,
    useActiveValidator,
    useTotalDelegated,
    usePercentageDelegated,
    usePercentOfStakedBGT,
    useTotalValidators,
    useEstimatedBlocksPerYear,
    useValidatorTokens,
    useValidatorAddresses,
    isLoading,
  };
};
