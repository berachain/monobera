import { useMemo } from "react";
import lodash from "lodash";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { STAKING_PRECOMPILE_ABI } from "~/config";
import { useBeraConfig } from "~/contexts";
import { defaultPagination } from "~/utils";
import { VoteOption } from "../../../../../proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";
import { usePollActiveValidators } from "../staking";

interface Call {
  abi: any[];
  address: `0x${string}`;
  functionName: string;
  args: any[];
}

export interface IVote {
  delegation: number;
  metadata: string;
  option: number;
  proposalId: string;
  voter: string;
}

export const usePollProposalVotes = (proposalId: number) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();
  const { useValidatorAddresses } = usePollActiveValidators();
  const validatorAddresses = useValidatorAddresses();
  const method = "proposalVotes";
  const QUERY_KEY = [method, proposalId, validatorAddresses];
  const { isLoading } = useSWR(QUERY_KEY, async () => {
    const temp = await fetch(
      `${process.env.NEXT_PUBLIC_INDEXER_ENDPOINT}/events/gov/votes?proposal_id=${proposalId}`,
    );
    const result: any[] = await temp.json().then((res) => res.result);

    console.log("VOTRES", result);
    const resultObj: Record<string, unknown> = {};

    result.forEach((item) => {
      lodash.set(resultObj, `${item.voter}.metadata`, item.metadata);
      lodash.set(resultObj, `${item.voter}.proposalId`, item.proposalId);
      lodash.set(resultObj, `${item.voter}.option`, item.options[0].option);
      lodash.set(resultObj, `${item.voter}.voter`, item.voter);
    });
    const paths: string[] = [];
    const call: Call[] = result.map((item: any) => {
      paths.push(item.voter);
      return {
        address: networkConfig.precompileAddresses.stakingAddress as Address,
        abi: STAKING_PRECOMPILE_ABI,
        functionName: "getDelegatorValidators",
        args: [item.voter, defaultPagination],
      };
    });
    const voterValidators = await publicClient.multicall({
      contracts: call,
      multicallAddress: networkConfig.precompileAddresses
        .multicallAddress as Address,
    });

    const obj: Record<string, unknown> = {};

    paths.forEach((path, index) => {
      const validators = (
        (voterValidators[index]?.result ?? [])[0] as any[]
      ).map((validator: any) => validator.operatorAddr);
      lodash.set(obj, `${path}.validators`, validators);
      lodash.set(obj, `${path}.voter`, path);
    });

    const delegatedPaths: string[] = [];
    const delegatedCalls: Call[] = [];
    Object.values(obj).forEach((path: any) => {
      path.validators.forEach((validator: string) => {
        delegatedPaths.push(path.voter);
        delegatedCalls.push({
          address: networkConfig.precompileAddresses.stakingAddress as Address,
          abi: STAKING_PRECOMPILE_ABI,
          functionName: "getDelegation",
          args: [path.voter, validator],
        });
      });
    });

    const voterDelegations = await publicClient.multicall({
      contracts: delegatedCalls,
      multicallAddress: networkConfig.precompileAddresses
        .multicallAddress as Address,
    });

    console.log(voterDelegations);

    delegatedPaths.forEach((path, index) => {
      const delegation =
        (voterDelegations[index]?.result as unknown as bigint) ?? 0n;
      const formatted = formatUnits(delegation, 18);
      const total = lodash.get(resultObj, `${path}.delegation`, 0);
      const newTotal = Number(total) + Number(formatted);
      lodash.set(resultObj, `${path}.delegation`, newTotal);
    });

    return resultObj;
  });

  const useProposalVotes = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return Object.values(data ?? {});
  };

  const useTotalProposalVotes = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return useMemo(() => {
      return Object.values(data ?? {}).reduce((sum: number, voter: any) => {
        return sum + voter.delegation;
      }, 0);
    }, [data]);
  };

  const useNormalizedTallyResult = () => {
    const { useTotalDelegated } = usePollActiveValidators();
    const totalBGTDelegated = useTotalDelegated();
    const { data = undefined } = useSWRImmutable(QUERY_KEY);

    const normalizedTallyResult = useMemo(() => {
      if (!data) return undefined;
      const dataArray = Object.values(data);
      const abstainCount = dataArray.reduce((sum: number, voter: any) => {
        if (voter.option === VoteOption.VOTE_OPTION_ABSTAIN)
          return sum + voter.delegation;
        return sum;
      }, 0);

      const noCount = dataArray.reduce((sum: number, voter: any) => {
        if (voter.option === VoteOption.VOTE_OPTION_NO)
          return sum + voter.delegation;
        return sum;
      }, 0);

      const yesCount = dataArray.reduce((sum: number, voter: any) => {
        if (voter.option === VoteOption.VOTE_OPTION_YES)
          return sum + voter.delegation;
        return sum;
      }, 0);

      const vetoCount = dataArray.reduce((sum: number, voter: any) => {
        if (voter.option === VoteOption.VOTE_OPTION_NO_WITH_VETO)
          return sum + voter.delegation;
        return sum;
      }, 0);

      const totalVotes = abstainCount + noCount + yesCount + vetoCount;

      const abstainPercentage = (abstainCount / totalVotes) * 100;
      const noPercentage = (noCount / totalVotes) * 100;
      const yesPercentage = (yesCount / totalVotes) * 100;
      const vetoPercentage = (vetoCount / totalVotes) * 100;

      const globalAbstainPercentage = (abstainCount / totalBGTDelegated) * 100;
      const globalNoPercentage = (noCount / totalBGTDelegated) * 100;
      const globalYesPercentage = (yesCount / totalBGTDelegated) * 100;
      const globalVetoPercentage = (vetoCount / totalBGTDelegated) * 100;

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
    useProposalVotes,
    useTotalProposalVotes,
    useNormalizedTallyResult,
    isLoading,
  };
};
