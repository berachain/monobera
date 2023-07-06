import { useMemo } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { erc20ABI, usePublicClient } from "wagmi";

import { getContracts } from "~/api/contracts";
import {
  BERACHEF_PRECOMPILE_ABI,
  BERACHEF_PRECOMPILE_ADDRESS,
  ERC20BGTMODULE_PRECOMPILE_ADDRESS,
  ERC20BGT_PRECOMPILE_ABI,
  STAKING_PRECOMPILE_ABI,
  STAKING_PRECOMPILE_ADDRESS,
} from "~/config";
import POLLING from "~/config/constants/polling";
import { BeravaloperToEth, ethToBeravaloper } from "~/utils";

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
  consAddr: string;
  weights: Weight[];
  startEpoch: number;
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

export const usePollActiveValidators = () => {
  const publicClient = usePublicClient();
  useSWR(
    "getValidators",
    async () => {
      const result = await publicClient.readContract({
        address: STAKING_PRECOMPILE_ADDRESS,
        abi: STAKING_PRECOMPILE_ABI,
        functionName: "getValidators",
        args: [],
      });
      return result;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );
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
        const call: Call[] = validators.map((val: Validator) => ({
          address: BERACHEF_PRECOMPILE_ADDRESS as `0x${string}`,
          abi: BERACHEF_PRECOMPILE_ABI,
          functionName: "getActiveCuttingBoard",
          args: [BeravaloperToEth(val.operatorAddress)],
        }));

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

  const usePollSelectedValidatorCuttingBoard = (
    validatorAddress: string | undefined,
  ) => {
    const publicClient = usePublicClient();
    const { data = [] } = useSWR(
      [validatorAddress, "getCuttingBoards"],
      async () => {
        if (validatorAddress) {
          try {
            const cuttingBoard = await publicClient.readContract({
              address: BERACHEF_PRECOMPILE_ADDRESS,
              abi: BERACHEF_PRECOMPILE_ABI,
              functionName: "getActiveCuttingBoard",
              args: [ethToBeravaloper(validatorAddress)],
            });

            const call: Call[] = (cuttingBoard as CuttingBoard)?.weights.map(
              (w: Weight) => ({
                address: w.receiverAddress as `0x${string}`,
                abi: erc20ABI as unknown as any[],
                functionName: "symbol",
                args: [],
              }),
            );
            const contracts = getContracts();
            const result = await publicClient.multicall({
              contracts: call,
              multicallAddress: contracts.multicall as `0x${string}`,
            });
            const cb = (cuttingBoard as CuttingBoard)?.weights.map(
              (w: Weight, i) => {
                return {
                  address: w.receiverAddress as `0x${string}`,
                  weight: formatUnits(w.percentageNumerator, 18),
                  symbol: result[i]?.error
                    ? w.receiverAddress
                    : result[i]?.result,
                };
              },
            );
            return cb;
          } catch (e) {
            console.log(e);
          }
        }
        return undefined;
      },
    );
    return data;
  };

  const useSelectedValidatorActiveBribes = (
    validatorAddress: string | undefined,
  ): Bribe | undefined => {
    const publicClient = usePublicClient();
    const { data = undefined } = useSWR(
      [validatorAddress, "getBribes"],
      async () => {
        if (validatorAddress) {
          try {
            const bribes: unknown | any[] = await publicClient.readContract({
              address: ERC20BGTMODULE_PRECOMPILE_ADDRESS,
              abi: ERC20BGT_PRECOMPILE_ABI,
              functionName: "getBribesForValidator",
              args: [ethToBeravaloper(validatorAddress)],
            });
            return (bribes as any[])[0] as Bribe;
          } catch (e) {
            console.log(e);
          }
        }
        return undefined;
      },
    );
    return data;
  };

  return {
    useActiveValidators,
    useActiveValidator,
    useTotalDelegated,
    useValidatorCuttingBoards,
    useSelectedValidatorActiveBribes,
    usePollSelectedValidatorCuttingBoard,
  };
};
