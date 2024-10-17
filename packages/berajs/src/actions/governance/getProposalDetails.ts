import { FALLBACK_BLOCK_TIME } from "@bera/config";
import { governanceClient } from "@bera/graphql";
import {
  GetProposal,
  GetProposalDocument,
  ProposalWithVotesFragment,
} from "@bera/graphql/governance";
import { wagmiConfig } from "@bera/wagmi/config";
import { getBlockNumber } from "@wagmi/core";

import { BeraConfig } from "~/types";
import { computeActualStatus } from "./computeActualStatus";

export const getProposalDetails = async ({
  proposalId,
  config,
}: {
  proposalId: string;
  config: BeraConfig;
}): Promise<ProposalWithVotesFragment> => {
  if (!config.subgraphs?.governanceSubgraph) {
    throw new Error("governance subgraph uri is not found in config");
  }

  const [res, blocknumber] = await Promise.all([
    governanceClient.query({
      query: GetProposal,
      variables: {
        id: proposalId,
      },
    }),
    getBlockNumber(wagmiConfig, {
      cacheTime: FALLBACK_BLOCK_TIME * 1000,
    }),
  ]);

  return {
    ...res.data.proposal,
    status: computeActualStatus(res.data.proposal, blocknumber),
  } as ProposalWithVotesFragment;
};
