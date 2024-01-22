import { gql } from "@apollo/client";

export const getAllPools = gql`
  {
    pools(where: { tvlUsd_gt: 10000, tvlUsd_lt: 500000000 }) {
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

export const getSelectedPool = gql`
  query GetSelectedPool($id: String) {
    pool(id: $id) {
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

export const getUniquePoolById = gql`
  query GetUniquePoolID($id: String!) {
    uniquePoolIDs(where: { id: $id }) {
      id
      count
    }
  }
`;

export const getUserPools = gql`
  query GetUserPools($userAddress: String!) {
    userPools(where: { userAddress: $userAddress }) {
      id
      poolAddress
      shares
      userAddress
    }
  }
`;

export const getUserPoolsDetails = gql`
  query GetUserPoolsDetails($list: [Pool_filter]) {
    pools(where: { or: $list }) {
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
