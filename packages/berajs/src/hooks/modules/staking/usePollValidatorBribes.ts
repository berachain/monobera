import { useMemo } from "react";
import { beraTokenAddress, erc20BribeModule } from "@bera/config";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, getAddress, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { BRIBE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { usePollEpochs } from "../epochs";
import { usePollActiveValidators } from "./usePollActiveValidators";

export const usePollValidatorBribes = (
  validatorAddress: Address | undefined,
) => {
  const publicClient = usePublicClient();
  const method = "getAllValidatorBribes";
  const QUERY_KEY = [validatorAddress, method];
  const { isLoading } = useSWR(
    QUERY_KEY,
    async () => {
      if (!publicClient) return undefined;
      if (!validatorAddress) return undefined;
      const result = await publicClient
        .readContract({
          address: erc20BribeModule,
          abi: BRIBE_PRECOMPILE_ABI,
          functionName: method,
          args: [validatorAddress],
        })
        .catch((e) => {
          console.log(e);
          return undefined;
        });
      return result;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useValidatorBribes = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useActiveValidatorBribes = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    const { useCurrentEpoch } = usePollEpochs();
    const currentEpoch = useCurrentEpoch();
    const activeBribes = data?.filter(
      (bribe: any) => Number(bribe.startEpoch) <= currentEpoch?.current,
    );
    return activeBribes;
  };

  const useActiveValidatorBribesTotalValue = (prices: any | undefined) => {
    const activeBribes = useActiveValidatorBribes();
    return useMemo(() => {
      if (!prices) return 0;
      const totalValue = activeBribes?.reduce((total: number, bribe: any) => {
        const numBlockProposals = Number(bribe.numBlockProposals);
        const perProposalUsdAmount = bribe.bribePerProposal.amounts.reduce(
          (total: number, bribeAmount: any, index: number) => {
            const formattedBribeAmount = Number(formatUnits(bribeAmount, 18));
            const tokenAddress = bribe.bribePerProposal.tokens[index];
            const price = prices[tokenAddress] ?? 0;
            const bribeValue = Number(formattedBribeAmount) * price;
            return total + bribeValue;
          },
          0,
        );

        const totalValue = perProposalUsdAmount * numBlockProposals;
        return total + totalValue;
      }, 0);
      return totalValue;
    }, [activeBribes, prices]);
  };

  const useActiveValidatorsBribesTotalValuePerProposal = (
    prices: any | undefined,
  ) => {
    const activeBribes = useActiveValidatorBribes();
    return useMemo(() => {
      if (!prices) return 0;
      const totalValue = activeBribes?.reduce((total: number, bribe: any) => {
        const perProposalUsdAmount = bribe.bribePerProposal.amounts.reduce(
          (total: number, bribeAmount: any, index: number) => {
            const formattedBribeAmount = Number(formatUnits(bribeAmount, 18));
            const tokenAddress = bribe.bribePerProposal.tokens[index];
            const price = prices[tokenAddress] ?? 0;
            const bribeValue = Number(formattedBribeAmount) * price;
            return total + bribeValue;
          },
          0,
        );

        const totalValue = perProposalUsdAmount;
        return total + totalValue;
      }, 0);
      return totalValue;
    }, [activeBribes, prices]);
  };

  const useValidatorVApy = (prices: any | undefined) => {
    const { useEstimatedBlocksPerYear, useValidatorTokens } =
      usePollActiveValidators();
    const estimatedBlocksPerYear = useEstimatedBlocksPerYear(
      validatorAddress as Address,
    );
    const validatorTokens = useValidatorTokens(validatorAddress as Address);
    const perProposalUsd =
      useActiveValidatorsBribesTotalValuePerProposal(prices);
    return useMemo(() => {
      if (!estimatedBlocksPerYear || perProposalUsd === 0 || !prices) return 0;
      const beraAddress = beraTokenAddress;
      const beraPrice = prices[getAddress(beraAddress)];
      const estimatedUsdPerYear = perProposalUsd * estimatedBlocksPerYear;
      const validatorTVL = beraPrice * validatorTokens;
      const vAPY = estimatedUsdPerYear / validatorTVL;
      return vAPY;
    }, [estimatedBlocksPerYear, validatorTokens, perProposalUsd, prices]);
  };
  return {
    useValidatorBribes,
    useActiveValidatorBribes,
    useActiveValidatorBribesTotalValue,
    useActiveValidatorsBribesTotalValuePerProposal,
    useValidatorVApy,
    isLoading,
  };
};
