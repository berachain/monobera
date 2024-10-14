import { gql } from "@apollo/client";

export default gql`
  fragment ProposalSelection on Proposal {
    id
    proposer
    proposalId
    description
    status
    createdAt
    quorum
    pollResult {
      for
      forVotersCount
      forPercentage

      against
      againstVotersCount
      againstPercentage

      abstain
      abstainVotersCount
      abstainPercentage

      total
      totalVotersCount
      totalTowardsQuorum
    }
    voteEndBlock
    voteStartBlock
    queueEnd
    canceledAt
    canceledAt
    executedAt

    title
    topics
  }

  fragment ExecutableCallSubset on ExecutableCall {
    id
    target
    value
    calldata
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

    executableCalls {
      ...ExecutableCallSubset
    }

    timelockId

    votes(orderBy: weight, orderDirection: desc) {
      ...ProposalVote
    }
  }

  query GetProposalVotes(
    $proposalId: String!
    $orderBy: Vote_orderBy = weight
    $orderDirection: OrderDirection = desc
  ) {
    votes(
      where: { proposalId: $proposalId }
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      ...ProposalVote
    }
  }

  query GetProposals(
    $offset: Int
    $limit: Int
    $where: Proposal_filter
    $orderBy: Proposal_orderBy = createdAt
    $orderDirection: OrderDirection = desc
  ) {
    proposals(
      skip: $offset
      first: $limit
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
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
