import { gql } from "@apollo/client";

// export const getVotes = gql`
//   query GetVotes($proposalId: BigInt!) {
//     votes(where: { proposalId: $proposalId }) {
//       id
//       proposalId
//       voter
//       metadata
//       weightedVoteOption {
//         id
//         option
//         weight
//       }
//     }
//   }
// `;

export const getProposals = gql`
  query getProposals($offset: Int, $limit: Int) {
    proposals(
      skip: $offset
      first: $limit
      orderBy: createdAt
      orderDirection: desc
    ) {
      status
      createdAt
      createdAtBlock
      voteStart
      voteEnd
      canceledAt
      canceledAtBlock
      executedAt
      executedAtBlock
      description
      id
      proposalId
      proposalVotes {
        abstain
        against
        for
        id
        total
      }
      queueEnd
      queueStartBlock
      quorum
      queueStart
    }
  }
`;

// export const getProposal = gql`
//   query ProposalDetails($input: ProposalInput!, $votesInput: VotesInput!) {
//     proposal(input: $input) {
//       id
//       onchainId
//       status
//       originalId
//       createdAt
//       events {
//         type
//         txHash
//       }
//       start {
//         ... on Block {
//           timestamp
//         }
//         ... on BlocklessTimestamp {
//           timestamp
//         }
//       }
//       end {
//         ... on Block {
//           timestamp
//         }
//         ... on BlocklessTimestamp {
//           timestamp
//         }
//       }
//       creator {
//         name
//         picture
//         address
//       }
//       voteStats {
//         votesCount
//         percent
//         type
//         votersCount
//       }
//       metadata {
//         description
//       }
//       executableCalls {
//         value
//         target
//         calldata
//         signature
//         type
//         offchaindata {
//           ... on ExecutableCallSwap {
//             amountIn
//             fee
//             buyToken {
//               data {
//                 price
//                 decimals
//                 name
//                 symbol
//               }
//             }
//             sellToken {
//               data {
//                 price
//                 decimals
//                 name
//                 symbol
//               }
//             }
//             to
//             quote {
//               buyAmount
//               feeAmount
//             }
//             order {
//               id
//               status
//               buyAmount
//               address
//             }
//             priceChecker {
//               tokenPath
//               feePath
//               uniPoolPath
//               slippage
//             }
//           }
//           ... on ExecutableCallRewards {
//             contributorFee
//             tallyFee
//             recipients
//           }
//         }
//       }
//       governor {
//         id
//         chainId
//         slug
//         quorum
//         timelockId
//         organization {
//           metadata {
//             description
//           }
//         }
//         contracts {
//           governor {
//             address
//             type
//           }
//         }
//         timelockId
//       }
//     }
//     votes(input: $votesInput) {
//       nodes {
//         ... on Vote {
//           voter {
//             name
//             picture
//             address
//             twitter
//           }
//           amount
//           reason
//           type
//           block {
//             timestamp
//           }
//         }
//       }
//     }
//   }
// `;
