import { gql } from "@apollo/client";

export const getMints = gql`
  query GetMints($page: Int!, $limit: Int!) {
    honeyMints(
      skip: $page
      first: $limit
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      timestamp
      from
      to
      collateralCoin {
        id
        denom
        address
        symbol
        name
        decimals
        origin
      }
      collateralAmount
      mintAmount
      totalHoneySupply
      timestamp
    }
  }
`;

export const getRedemptions = gql`
  query GetRedemptions($page: Int!, $limit: Int!) {
    honeyRedemptions(
      skip: $page
      first: $limit
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      timestamp
      from
      collateralCoin {
        id
        denom
        address
        symbol
        name
        decimals
        origin
      }
      collateralAmount
      totalHoneySupply
      timestamp
    }
  }
`;

export const getMintsAndRedemptions = gql`
  query GetMintsAndRedemptions($page: Int!, $limit: Int!) {
    honeyMints(
      skip: $page
      first: $limit
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      timestamp
      from
      to
      collateralCoin {
        id
        denom
        address
        symbol
        name
        decimals
        origin
      }
      collateralAmount
      mintAmount
      totalHoneySupply
      timestamp
    }
    honeyRedemptions(
      skip: $page
      first: $limit
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      timestamp
      from
      collateralCoin {
        id
        denom
        address
        symbol
        name
        decimals
        origin
      }
      collateralAmount
      totalHoneySupply
      timestamp
    }
  }
`;
