import { gql } from "@apollo/client";

export const getInflationData = gql`
  query GetInflationData($page: Int!, $limit: Int!) {
    inflationRates(
      skip: $page
      first: $limit
      orderBy: currentBlock
      orderDirection: desc
    ) {
      id
      currentBlockSupply
      lastBlockSupply
      lastBlock
      currentBlock
      difference
      inflationRate
      bgtPerYear
    }
  }
`;

export const getValidatorCuttingBoard = gql`
  query getValidatorCuttingBoard(
    $page: Int!
    $limit: Int!
    $validatorAddress: String!
  ) {
    cuttingBoards(
      skip: $page
      first: $limit
      orderBy: startEpoch
      orderDirection: desc
      where: { valConsAddr: $validatorAddress }
    ) {
      startEpoch
      valConsAddr
      id
      epoch
      weights {
        id
        receiver
        weight
        amount
        epoch
      }
    }
  }
`;

export const getGlobalCuttingBoard = gql`
  query getGlobalCuttingBoard($page: Int!, $limit: Int!) {
    globalCuttingBoardDatas(
      skip: $page
      first: $limit
      orderBy: epoch
      orderDirection: desc
    ) {
      id
      epoch
      weights {
        id
        receiver
        amount
        epoch
      }
    }
  }
`;
