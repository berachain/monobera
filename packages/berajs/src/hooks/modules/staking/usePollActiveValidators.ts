import { useMemo } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { erc20ABI, usePublicClient, type Address } from "wagmi";

import {
  BERACHEF_PRECOMPILE_ABI,
  ERC20BGT_PRECOMPILE_ABI,
  STAKING_PRECOMPILE_ABI,
} from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";
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
  const { networkConfig } = useBeraConfig();

  useSWR(
    "getValidators",
    async () => {
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.stakingAddress as Address,
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
    const { networkConfig } = useBeraConfig();

    const { data = [] } = useSWR([validators, "getCuttingBoards"], async () => {
      if (validators.length > 0) {
        const call: Call[] = validators.map((val: Validator) => ({
          address: networkConfig.precompileAddresses.berachefAddress as Address,
          abi: BERACHEF_PRECOMPILE_ABI,
          functionName: "getActiveCuttingBoard",
          args: [BeravaloperToEth(val.operatorAddress)],
        }));

        const result = await publicClient.multicall({
          contracts: call,
          multicallAddress: networkConfig.precompileAddresses
            .multicallAddress as Address,
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
    const { networkConfig } = useBeraConfig();

    const { data = [] } = useSWR(
      [validatorAddress, "getCuttingBoards"],
      async () => {
        if (validatorAddress) {
          try {
            const cuttingBoard = await publicClient.readContract({
              address: networkConfig.precompileAddresses
                .berachefAddress as Address,
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

            const result = await publicClient.multicall({
              contracts: call,
              multicallAddress: networkConfig.precompileAddresses
                .multicallAddress as Address,
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
    const { networkConfig } = useBeraConfig();

    const { data = undefined } = useSWR(
      [validatorAddress, "getBribes"],
      async () => {
        if (validatorAddress) {
          try {
            const bribes: unknown | any[] = await publicClient.readContract({
              address: networkConfig.precompileAddresses
                .erc20BgtAddress as Address,
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
