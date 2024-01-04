import { gql } from "@apollo/client";

export const getVotes = gql`
  query GetVotes($proposalId: BigInt!) {
    votes(where: { proposalId: $proposalId }) {
      id
      proposalId
      voter
      metadata
      weightedVoteOption {
        id
        option
        weight
      }
    }
  }
`;
