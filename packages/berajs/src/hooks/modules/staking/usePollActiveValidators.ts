import { useMemo } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient } from "wagmi";

import { getContracts } from "~/api/contracts";
import {
  BERACHEF_PRECOMPILE_ABI,
  BERACHEF_PRECOMPILE_ADDRESS,
  BGT_PRECOMPILES_ADDRESS,
  BGT_PRECOMPILE_ABI,
  STAKING_PRECOMPILE_ABI,
  STAKING_PRECOMPILE_ADDRESS,
} from "~/config";
import { BeravaloperToEth } from "~/utils";

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

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export const usePollActiveValidators = () => {
  const publicClient = usePublicClient();
  useSWRImmutable("getValidators", async () => {
    const result = await publicClient.readContract({
      address: STAKING_PRECOMPILE_ADDRESS,
      abi: STAKING_PRECOMPILE_ABI,
      functionName: "getValidators",
      args: [],
    });

    console.log(result);
    return result;
  });
  const useActiveValidators = (): Validator[] => {
    const { data = [] } = useSWRImmutable("getValidators");
    return data;
  };

  const useActiveValidator = (address: string): Validator | undefined => {
    const { data = [] } = useSWRImmutable("getValidators");
    return data?.find(
      (v: Validator) => BeravaloperToEth(v.operatorAddress) === address,
    );
  };

  const useTotalDelegated = (): number => {
    const { data = [] } = useSWRImmutable("getValidators");
    const total = useMemo(() => {
      return data?.reduce((sum: number, validator: Validator) => {
        return sum + Number(formatUnits(validator.delegatorShares, 18));
      }, 0);
    }, [data]);
    return total ?? 0;
  };

  const useValidatorCuttingBoards = () => {
    const { data: validators = [] } = useSWRImmutable("getValidators");
    const publicClient = usePublicClient();
    const { data = [] } = useSWR([validators, "getCuttingBoards"], async () => {
      if (validators.length > 0) {
        console.log("FASBRWEAHG;hgkjdghk");
        const call: Call[] = validators.map((val: Validator) => ({
          address: BERACHEF_PRECOMPILE_ADDRESS as `0x${string}`,
          abi: BERACHEF_PRECOMPILE_ABI,
          functionName: "getActiveCuttingBoard",
          args: [BeravaloperToEth(val.operatorAddress)],
        }));
        console.log("alshdjkgjklasgjklagljkh");
        const contracts = getContracts();
        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: contracts.multicall as `0x${string}`,
        });
        console.log(result);
        return result;
      }
      return undefined;
    });
    return data;
  };

  const useValidatorActiveBribes = () => {
    const { data: validators = [] } = useSWRImmutable("getValidators");
    const publicClient = usePublicClient();
    const { data = [] } = useSWR([validators, "getBribes"], async () => {
      if (validators.length > 0) {
        console.log(BeravaloperToEth(validators[0]));
        const call: Call[] = validators.map((val: Validator) => ({
          address: BGT_PRECOMPILES_ADDRESS as `0x${string}`,
          abi: BGT_PRECOMPILE_ABI,
          functionName: "getActiveBribesForValidator",
          args: [BeravaloperToEth(val.operatorAddress)],
        }));
        const contracts = getContracts();
        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: contracts.multicall as `0x${string}`,
        });
        return result;
      }
      return undefined;
    });
    return data;
  };

  return {
    useActiveValidators,
    useActiveValidator,
    useTotalDelegated,
    useValidatorCuttingBoards,
    useValidatorActiveBribes,
  };
};
