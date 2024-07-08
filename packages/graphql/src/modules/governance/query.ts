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

export const getProposals = gql`
  query GovernanceProposals($input: ProposalsInput!) {
    proposals(input: $input) {
      nodes {
        ... on Proposal {
          id
          onchainId
          status
          originalId
          createdAt
          creator {
            name
            picture
            address
          }
          voteStats {
            votesCount
            percent
            type
            votersCount
          }
          metadata {
            description
          }
          block {
            timestamp
          }
          governor {
            id
            quorum
            name
            timelockId
            token {
              decimals
            }
          }
        }
      }
      pageInfo {
        firstCursor
        lastCursor
        count
      }
    }
  }
`;
