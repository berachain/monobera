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

export const getProposal = gql`
  query ProposalDetails($input: ProposalInput!, $votesInput: VotesInput!) {
    proposal(input: $input) {
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
      executableCalls {
        value
        target
        calldata
        signature
        type
        offchaindata {
          ... on ExecutableCallSwap {
            amountIn
            fee
            buyToken {
              data {
                price
                decimals
                name
                symbol
              }
            }
            sellToken {
              data {
                price
                decimals
                name
                symbol
              }
            }
            to
            quote {
              buyAmount
              feeAmount
            }
            order {
              id
              status
              buyAmount
              address
            }
            priceChecker {
              tokenPath
              feePath
              uniPoolPath
              slippage
            }
          }
          ... on ExecutableCallRewards {
            contributorFee
            tallyFee
            recipients
          }
        }
      }
      governor {
        id
        chainId
        slug
        organization {
          metadata {
            description
          }
        }
        contracts {
          governor {
            address
            type
          }
        }
        timelockId
      }
    }
    votes(input: $votesInput) {
      nodes {
        ... on Vote {
          voter {
            name
            picture
            address
            twitter
          }
          amount
          reason
          type
          block {
            timestamp
          }
        }
      }
    }
  }
`;
