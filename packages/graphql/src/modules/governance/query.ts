import { gql } from "@apollo/client";

export default gql`
  fragment ProposalSelection on Proposal {
    id
    proposer
    proposalId
    targets
    values
    # signatures
    # calldatas
    description
    status
    createdAt
    voteStart
    quorum
    voteEnd
    voteStart
    queueEnd
    canceledAt
    canceledAt
    executedAt
  }

  fragment ProposalVote on Vote {
    id
    voter
    weight
    support
    timestamp
    reason
  }

  fragment ProposalWithVotes on Proposal {
    ...ProposalSelection
    calldatas
    votes {
      ...ProposalVote
    }
  }

  query GetProposals($offset: Int, $limit: Int) {
    proposals(
      skip: $offset
      first: $limit
      orderBy: createdAt
      orderDirection: desc
    ) {
      ...ProposalSelection
    }
  }

  query GetProposal($id: ID!) {
    proposal(id: $id) {
      ...ProposalWithVotes
    }
  }
`;
