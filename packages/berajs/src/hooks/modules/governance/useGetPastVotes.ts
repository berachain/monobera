import { Address, formatUnits } from "viem";
import { usePublicClient } from "wagmi";
import { useBeraJs } from "~/contexts";
import { useProposalSnapshot } from "./useProposalSnapshot";
import useSWRImmutable from "swr/immutable";
import { IVotes_ABI } from "~/abi";
import { governanceTokenAddress } from "@bera/config";

export const useGetPastVotes = (
  args: {
    wallet?: Address;
  } & (
    | {
        proposalId?: number | string;
        timepoint: number | bigint;
      }
    | {
        proposalId: number | string;
        timepoint?: number | bigint;
      }
  ),
) => {
  const { account } = useBeraJs();
  const publicClient = usePublicClient();

  const wallet = args.wallet || account;

  const { data: snapshot } = useProposalSnapshot({
    proposalId: args.proposalId,
  });

  const ts = args.timepoint || snapshot;

  const QUERY_KEY =
    ts && publicClient && wallet ? ["useGetPastVotes", ts, wallet] : null;

  return useSWRImmutable(QUERY_KEY, async () => {
    if (!publicClient) {
      throw new Error("public client is not defined");
    }

    if (!wallet) {
      throw new Error("wallet is not defined");
    }

    if (!ts) {
      throw new Error("timepoint is not defined");
    }

    if (Number(ts) > Date.now() / 1000) {
      throw new Error("timepoint is in the future");
    }

    const votes = await publicClient.readContract({
      abi: IVotes_ABI,
      address: governanceTokenAddress,
      functionName: "getPastVotes",
      args: [wallet, BigInt(ts!)],
    });

    console.log(QUERY_KEY, formatUnits(votes, 18));

    return formatUnits(votes, 18);
  });
};
