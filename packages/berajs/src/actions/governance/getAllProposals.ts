import { FALLBACK_BLOCK_TIME } from "@bera/config";
import { governanceClient } from "@bera/graphql";
import {
  GetProposals,
  GetProposalsQuery,
  GetProposalsQueryVariables,
  OrderDirection,
  ProposalSelectionFragment,
  Proposal_Filter,
  Proposal_OrderBy,
  SearchProposals,
  SearchProposalsQuery,
  SearchProposalsQueryVariables,
} from "@bera/graphql/governance";
import { wagmiConfig } from "@bera/wagmi/config";
import { getBlockNumber } from "@wagmi/core";

import { BeraConfig, Proposal } from "~/types";
import { computeActualStatus } from "./computeActualStatus";

export const getAllProposals = async ({
  config,
  where,
  orderBy,
  orderDirection,
  offset = 0,
  perPage = 20,
  text,
}: {
  offset?: number;
  where: Proposal_Filter;
  perPage?: number;
  config: BeraConfig;
  orderBy?: Proposal_OrderBy;
  orderDirection?: OrderDirection;
  text?: string;
}): Promise<ProposalSelectionFragment[] | undefined> => {
  try {
    if (perPage > 1000) {
      throw new Error("perPage must be less than 1000");
    }

    if (!config.subgraphs?.governanceSubgraph) {
      throw new Error("governance subgraph uri is not found in config");
    }

    const [response, blockNumber] = await Promise.all([
      text
        ? governanceClient.query<SearchProposalsQuery>({
            query: SearchProposals,
            variables: {
              offset,
              limit: perPage,
              where,
              text,
            } satisfies SearchProposalsQueryVariables,
          })
        : governanceClient.query<GetProposalsQuery>({
            query: GetProposals,
            variables: {
              offset,
              limit: perPage,
              where,
              orderBy,
              orderDirection,
            } satisfies GetProposalsQueryVariables,
          }),
      getBlockNumber(wagmiConfig, {
        cacheTime: FALLBACK_BLOCK_TIME * 1000,
      }),
    ]);

    return response.data.proposals.map((p) => ({
      ...p,
      status: computeActualStatus(p, blockNumber),
    }));
  } catch (e) {
    console.error("getAllProposals:", e);
    return undefined;
  }
};
