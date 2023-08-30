import { useMemo } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits } from "viem";
import { usePublicClient, type Address } from "wagmi";

import { GOVERNANCE_PRECOMPILE_ABI } from "~/config";
import POLLING from "~/config/constants/polling";
import { useBeraConfig } from "~/contexts";
import { usePollActiveValidators } from "../staking";
import { type Proposal } from "./types";

export const usePollProposal = (proposalId: number) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();

  const method = "getProposal";
  const QUERY_KEY = [proposalId, method];
  useSWR(
    QUERY_KEY,
    async () => {
      const result = await publicClient.readContract({
        address: networkConfig.precompileAddresses.governanceAddress as Address,
        abi: GOVERNANCE_PRECOMPILE_ABI,
        functionName: method,
        args: [proposalId],
      });

      return result;
    },
    {
      refreshInterval: POLLING.NORMAL,
    },
  );

  const useProposal = () => {
    const { data = undefined } = useSWRImmutable<Proposal | undefined>(
      QUERY_KEY,
    );
    return data;
  };

  const useNormalizedTallyResult = () => {
    const { useTotalDelegated } = usePollActiveValidators();
    const totalBGTDelegated = useTotalDelegated();
    const { data = undefined } = useSWRImmutable<Proposal | undefined>(
      QUERY_KEY,
    );
    const normalizedTallyResult = useMemo(() => {
      if (!data) return undefined;
      const formattedAbstainCount = formatUnits(
        BigInt(data.finalTallyResult.abstainCount),
        18,
      );
      const formattedNoCount = formatUnits(
        BigInt(data.finalTallyResult.noCount),
        18,
      );
      const formattedYesCount = formatUnits(
        BigInt(data.finalTallyResult.yesCount),
        18,
      );
      const formattedVetoCount = formatUnits(
        BigInt(data.finalTallyResult.noWithVetoCount),
        18,
      );
      const totalVotes =
        Number(formattedAbstainCount) +
        Number(formattedNoCount) +
        Number(formattedYesCount) +
        Number(formattedVetoCount);
      if (totalVotes === 0) return undefined;

      const abstainPercentage =
        (Number(formattedAbstainCount) / totalVotes) * 100;
      const noPercentage = (Number(formattedNoCount) / totalVotes) * 100;
      const yesPercentage = (Number(formattedYesCount) / totalVotes) * 100;
      const vetoPercentage = (Number(formattedVetoCount) / totalVotes) * 100;

      const globalAbstainPercentage =
        (Number(formattedAbstainCount) / totalBGTDelegated) * 100;
      const globalNoPercentage =
        (Number(formattedNoCount) / totalBGTDelegated) * 100;
      const globalYesPercentage =
        (Number(formattedYesCount) / totalBGTDelegated) * 100;
      const globalVetoPercentage =
        (Number(formattedVetoCount) / totalBGTDelegated) * 100;

      const participationRate = (totalVotes / totalBGTDelegated) * 100;
      return {
        abstainPercentage,
        noPercentage,
        yesPercentage,
        vetoPercentage,
        globalAbstainPercentage,
        globalNoPercentage,
        globalYesPercentage,
        globalVetoPercentage,
        totalVotes,
        participationRate,
      };
    }, [data, totalBGTDelegated]);
    return normalizedTallyResult;
  };
  return {
    useProposal,
    useNormalizedTallyResult,
  };
};
