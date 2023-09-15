import { useMemo } from "react";
import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, getAddress } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { BRIBE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";
import { usePollEpochs } from "../epochs";
import {
  usePollActiveValidators,
  type Validator,
} from "./usePollActiveValidators";
import {
  getEstimatedBlocksPerYear,
  getPercentageGlobalVotingPower,
  getValidatorTotalDelegated,
} from "./utils";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export interface PoLValidator extends Validator {
  activeBribes: {
    bribePerProposal: {
      tokens: string[];
      amounts: string[];
    };
    numBlockProposals: string;
    startEpoch: string;
  };
  bribeTokenList: string[];
  vApy: number;
  totalActiveBribeUsdAmount: number;
  totalPerProposalUsdAmount: number;
  rank: number;
}
export const usePollGlobalValidatorBribes = (prices: any | undefined) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();
  const {
    useValidatorAddresses,
    useActiveValidators,
    useTotalDelegated,
    useTotalValidators,
    isLoading: isLoadingValidators,
  } = usePollActiveValidators();
  const validatorAddresses = useValidatorAddresses();
  const validators = useActiveValidators();
  const totalValidators = useTotalValidators();
  const globalBGTDelegated = useTotalDelegated();
  const method = "globalValidatorBribes";
  const { useCurrentEpoch } = usePollEpochs();
  const currentEpoch = useCurrentEpoch();
  const QUERY_KEY = [method, prices, validators, currentEpoch];

  const ACTIVE_BRIBES_KEY = "activeBribes";
  const ACTIVE_BRIBES_TOTAL_AMOUNT_KEY = "activeBribesTotalAmount";
  const ACTIVE_BRIBES_PER_PROPOSAL_AMOUNT_KEY = "activeBribesPerProposalAmount";
  const VALIDATOR_VAPY_KEY = "validatorVAPY";

  const POL_VALIDATOR_KEY = "polValidator";
  const POL_VALIDATOR_LIST_KEY = "polValidatorList";

  const GLOBAL_BRIBES_KEY = "globalBribes";
  const GLOBAL_AVG_VAPY = "globalAvgVAPY";
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!validatorAddresses || !validators || !prices) return undefined;

      // build multicall payload for getting brubes
      const bribeCalls: Call[] = validatorAddresses.map((validatorAddress) => ({
        address: networkConfig.precompileAddresses.erc20BribeModule as Address,
        abi: BRIBE_PRECOMPILE_ABI,
        functionName: "getValidatorBribes",
        args: [validatorAddress],
      }));

      const response = await publicClient.multicall({
        contracts: bribeCalls,
        multicallAddress: networkConfig.precompileAddresses
          .multicallAddress as Address,
      });

      const result = response.map((res: any) => res.result);
      const beraAddress = process.env.NEXT_PUBLIC_WBERA_ADDRESS as string;
      const beraPrice = prices[getAddress(beraAddress)];

      let globalBribeUsdAmount = 0;
      let globalVapy = 0;

      const polValidators: PoLValidator[] = [];
      validators.forEach((validator: Validator, index: number) => {
        // calculate validator related information
        const validatorTotalDelegated = getValidatorTotalDelegated(validator);
        const validatorTVL = validatorTotalDelegated * beraPrice;
        const validatorPercentageVotingPower = getPercentageGlobalVotingPower(
          validator,
          globalBGTDelegated,
        );
        const estimatedValidatorBlocksPerYear = getEstimatedBlocksPerYear(
          validatorPercentageVotingPower,
        );

        // calculate amount of bribes emitted per proposal in usd and add to global total of "active" bribes

        // console.log("current epoch", currentEpoch?.current);
        const bribes = result[index]?.filter(
          (bribe: any) => Number(bribe.startEpoch) <= currentEpoch?.current,
        );
        // console.log("active bribes", bribes);
        mutate([ACTIVE_BRIBES_KEY, validator.operatorAddr], bribes);

        const bribeTokenList: any[] = [];
        const totalPerProposalUsdAmount = bribes?.reduce(
          (total: number, bribe: any) => {
            const perProposalUsdAmount = bribe.bribePerProposal.amounts.reduce(
              (total: number, bribeAmount: any, index: number) => {
                const formattedBribeAmount = Number(
                  formatUnits(bribeAmount, 18),
                );
                const tokenAddress = bribe.bribePerProposal.tokens[index];
                bribeTokenList.push(tokenAddress);
                const price = prices[getAddress(tokenAddress)] ?? 0;
                const bribeValue = Number(formattedBribeAmount) * price;
                return total + bribeValue;
              },
              0,
            );

            const totalValue = perProposalUsdAmount;
            return total + totalValue;
          },
          0,
        );

        const totalActiveBribeUsdAmount = bribes?.reduce(
          (total: number, bribe: any) => {
            const numBlockProposals = Number(bribe.numBlockProposals);
            const perProposalUsdAmount = bribe.bribePerProposal.amounts.reduce(
              (total: number, bribeAmount: any, index: number) => {
                const formattedBribeAmount = Number(
                  formatUnits(bribeAmount, 18),
                );
                const tokenAddress = bribe.bribePerProposal.tokens[index];
                const price = prices[tokenAddress] ?? 0;
                const bribeValue = Number(formattedBribeAmount) * price;
                return total + bribeValue;
              },
              0,
            );

            const totalValue = perProposalUsdAmount * numBlockProposals;
            return total + totalValue;
          },
          0,
        );

        mutate(
          [ACTIVE_BRIBES_TOTAL_AMOUNT_KEY, validator.operatorAddr],
          totalActiveBribeUsdAmount,
        );
        mutate(
          [ACTIVE_BRIBES_PER_PROPOSAL_AMOUNT_KEY, validator.operatorAddr],
          totalPerProposalUsdAmount,
        );

        const estimatedUsdPerYear =
          totalPerProposalUsdAmount * estimatedValidatorBlocksPerYear;
        const vAPY = Number.isNaN(estimatedUsdPerYear / validatorTVL)
          ? 0
          : estimatedUsdPerYear / validatorTVL;
        mutate([VALIDATOR_VAPY_KEY, validator.operatorAddr], vAPY);

        globalBribeUsdAmount += totalActiveBribeUsdAmount;
        globalVapy += vAPY;

        const polValidator = {
          ...validator,
          activeBribes: bribes,
          bribeTokenList: [...new Set(bribeTokenList)],
          vApy: vAPY,
          totalActiveBribeUsdAmount,
          totalPerProposalUsdAmount,
          rank: index + 1,
        };
        mutate([POL_VALIDATOR_KEY, validator.operatorAddr], polValidator);
        polValidators.push(polValidator);
      });

      const globalAvgVapy = globalVapy / totalValidators;
      mutate([GLOBAL_BRIBES_KEY], globalBribeUsdAmount);
      mutate([GLOBAL_AVG_VAPY], globalAvgVapy);
      mutate([POL_VALIDATOR_LIST_KEY], polValidators);

      return undefined;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useGlobalActiveBribeValue = () => {
    const { data = undefined } = useSWRImmutable([GLOBAL_BRIBES_KEY]);
    return data;
  };

  const useGlobalAvgApy = () => {
    const { data = undefined } = useSWRImmutable([GLOBAL_AVG_VAPY]);
    return data;
  };

  const useValidatorTotalActiveBribeValue = (address: string) => {
    const { data = undefined } = useSWRImmutable([
      ACTIVE_BRIBES_TOTAL_AMOUNT_KEY,
      address,
    ]);
    return data;
  };

  const useValidatorvAPY = (address: string) => {
    const { data = 0 } = useSWRImmutable([VALIDATOR_VAPY_KEY, address]);
    return data;
  };

  const useValidatorActiveBribes = (address: string) => {
    const { data = undefined } = useSWRImmutable([ACTIVE_BRIBES_KEY, address]);
    return data;
  };

  const usePolValidators = () => {
    const { data = undefined } = useSWRImmutable([POL_VALIDATOR_LIST_KEY]);
    return data;
  };

  const usePolValidator = (address: string) => {
    const { data = undefined } = useSWRImmutable([POL_VALIDATOR_KEY, address]);
    return data;
  };

  const useDelegatorPolValidators = (addresses: string[] | undefined) => {
    const { data = [] } = useSWRImmutable([POL_VALIDATOR_LIST_KEY]);

    return useMemo(() => {
      if (!data || addresses?.length === 0 || !addresses) return [];
      return data.filter((validator: PoLValidator) => {
        return addresses.includes(validator.operatorAddr);
      });
    }, [addresses, data]);
  };
  return {
    useGlobalActiveBribeValue,
    useGlobalAvgApy,
    useValidatorTotalActiveBribeValue,
    useValidatorvAPY,
    useValidatorActiveBribes,
    usePolValidators,
    usePolValidator,
    useDelegatorPolValidators,
    isLoading: isLoadingValidators || isLoading || prices === undefined,
  };
};
