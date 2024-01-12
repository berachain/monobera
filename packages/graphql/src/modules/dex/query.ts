import { gql } from "@apollo/client";

export const getAllPools = gql`
  {
    pools {
      id
      pool: address
      poolName: name
      tokens: poolTokens {
        denomWeight
        amount
        denom
        address
        symbol
        decimals
        latestPriceUsd {
          id
          price
        }
      }
      swapFee
      sharesDenom
      sharesAddress
      totalShares
      tvlUsd
    }
  }
`;

export const getTypedLiquidityChanged = gql`
  query GetLiquidityChanged(
    $page: Int!
    $limit: Int!
    $poolDenom: String
    $type: [String!]
  ) {
    liquidityChangeds(
      skip: $page
      first: $limit
      where: { pool: $poolDenom, type_in: $type }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      type
      timestamp
      sender
      liquidity {
        amount
        swapDirection
        latestPriceUsd {
          id
          price
        }
        coin {
          denom
          address
          symbol
          name
          decimals
        }
      }
    }
  }
`;

export const getPoolDayData = gql`
  query GetPoolDayData($limit: Int!, $poolDenom: String, $timestamp: Int!) {
    poolDayDatas(
      first: $limit
      where: { pool: $poolDenom, date_gte: $timestamp }
      orderBy: date
      orderDirection: desc
    ) {
      id
      tvlUsd
      date
      volumeUsd
      feesUsd
    }
  }
`;

export const getAllLiquidityChanged = gql`
  query GetAllLiquidityChanged($page: Int!, $limit: Int!, $poolDenom: String) {
    liquidityChangeds(
      skip: $page
      first: $limit
      where: { pool: $poolDenom }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      type
      timestamp
      sender
      liquidity {
        amount
        swapDirection
        latestPriceUsd {
          id
          price
        }
        coin {
          denom
          address
          symbol
          name
          decimals
        }
      }
    }
  }
`;

export const getGlobalDexData = gql`
  query GetGlobalData($limit: Int!) {
    bexGlobalDayDatas(first: $limit, orderBy: date, orderDirection: desc) {
      id
      volumeUsd
      date
    }
  }
`;

export const getTokenHoneyPrice = gql`
  query GetTokenHoneyPrice($id: String) {
    tokenHoneyPrices(where: { id: $id }) {
      id
      price
    }
  }
`;

export const getTokenHoneyPrices = gql`
  query GetTokenHoneyPrice($id: [String!]) {
    tokenHoneyPrices(where: { id_in: $id }) {
      id
      price
    }
  }
`;
