import { useMemo } from "react";
import { client, getVotes, type Vote } from "@bera/graphql";
import lodash from "lodash";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { formatUnits, type Address } from "viem";
import { usePublicClient } from "wagmi";

import { GOVERNANCE_PRECOMPILE_ABI, STAKING_PRECOMPILE_ABI } from "~/config";
import { useBeraConfig } from "~/contexts";
import { defaultPagination } from "~/utils";
import { VoteOption } from "../../../../../proto/ts-proto-gen/cosmos-ts/cosmos/gov/v1/gov";
import { usePollActiveValidators } from "../staking";
import { calculateVoteStatistics } from "./utils";

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

export interface TallyVote {
  abstainCount: bigint;
  noCount: bigint;
  yesCount: bigint;
  vetoCount: bigint;
}

export const usePollProposalVotes = (proposalId: number) => {
  const publicClient = usePublicClient();
  const { networkConfig } = useBeraConfig();
  const { useValidatorAddresses } = usePollActiveValidators();
  const validatorAddresses = useValidatorAddresses();
  const method = "proposalVotes";
  const QUERY_KEY = [method, proposalId, validatorAddresses];
  const { isLoading } = useSWR(QUERY_KEY, async () => {
    try {
      const result: Vote[] = await client
        .query({
          query: getVotes,
          variables: {
            proposalId: proposalId.toString(),
          },
        })
        .then((res: any) => {
          return res.data.votes;
        })
        .catch((err: any) => console.error(err));

      if (!result) return false;
      const resultObj: Record<string, unknown> = {};

      result.forEach((item: Vote) => {
        lodash.set(resultObj, `${item.voter}.metadata`, item.metadata ?? "");
        lodash.set(resultObj, `${item.voter}.proposalId`, item.proposalId);
        lodash.set(
          resultObj,
          `${item.voter}.option`,
          item.weightedVoteOption[0]?.option ?? 0,
        );
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
            address: networkConfig.precompileAddresses
              .stakingAddress as Address,
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

      delegatedPaths.forEach((path, index) => {
        const delegation =
          (voterDelegations[index]?.result as unknown as bigint) ?? 0n;
        const formatted = formatUnits(delegation, 18);
        const total = lodash.get(resultObj, `${path}.delegation`, 0);
        const newTotal = Number(total) + Number(formatted);
        lodash.set(resultObj, `${path}.delegation`, newTotal);
      });

      return resultObj;
    } catch (e) {
      console.error(e);
    }
  });

  const useProposalVotes = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return Object.values(data ?? {});
  };

  const useTotalProposalVotes = () => {
    const { data = undefined } = useSWRImmutable(QUERY_KEY);
    return useMemo(() => {
      return Object.values(data ?? {}).reduce((sum: number, voter: any) => {
        return sum + (voter.delegation ? parseFloat(voter.delegation) : 0);
      }, 0);
    }, [data]);
  };

  const useProposalTallyResult = (proposalId: number) => {
    const { useTotalDelegated } = usePollActiveValidators();
    const totalBGTDelegated = useTotalDelegated();
    const { data = undefined } = useSWRImmutable([proposalId], async () => {
      const result = (await publicClient
        .readContract({
          address: networkConfig.precompileAddresses
            .governanceAddress as Address,
          abi: GOVERNANCE_PRECOMPILE_ABI,
          functionName: "getProposalTallyResult",
          args: [proposalId],
        })
        .catch((e) => {
          console.log(e);
          return null;
        })) as TallyVote;
      if (!result) return false;
      return result;
    });

    const normalizedTallyResult = useMemo(() => {
      if (!data) return undefined;
      const abstainCount = Number(formatUnits(data.abstainCount ?? "0", 18));
      const noCount = Number(formatUnits(data.noCount ?? "0", 18));
      const yesCount = Number(formatUnits(data.yesCount ?? "0", 18));
      const vetoCount = Number(formatUnits(data.vetoCount ?? "0", 18));
      const statistics = calculateVoteStatistics(
        abstainCount,
        noCount,
        yesCount,
        vetoCount,
        totalBGTDelegated,
      );
      return statistics;
    }, [data, totalBGTDelegated]);
    return normalizedTallyResult;
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
          return sum + (voter.delegation ? parseFloat(voter.delegation) : 0);
        return sum;
      }, 0);

      const noCount = dataArray.reduce((sum: number, voter: any) => {
        if (voter.option === VoteOption.VOTE_OPTION_NO)
          return sum + (voter.delegation ? parseFloat(voter.delegation) : 0);
        return sum;
      }, 0);

      const yesCount = dataArray.reduce((sum: number, voter: any) => {
        if (voter.option === VoteOption.VOTE_OPTION_YES) {
          return sum + (voter.delegation ? parseFloat(voter.delegation) : 0);
        }
        return sum;
      }, 0);

      const vetoCount = dataArray.reduce((sum: number, voter: any) => {
        if (voter.option === VoteOption.VOTE_OPTION_NO_WITH_VETO)
          return sum + (voter.delegation ? parseFloat(voter.delegation) : 0);
        return sum;
      }, 0);

      const statistics = calculateVoteStatistics(
        abstainCount,
        noCount,
        yesCount,
        vetoCount,
        totalBGTDelegated,
      );
      return statistics;
    }, [data, totalBGTDelegated]);

    return normalizedTallyResult;
  };

  return {
    useProposalVotes,
    useTotalProposalVotes,
    useNormalizedTallyResult,
    useProposalTallyResult,
    isLoading,
  };
};
