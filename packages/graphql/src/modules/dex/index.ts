import { gql } from "@apollo/client";

export * from "./types";

export const getAllPools = gql`
  {
    pools {
      id
      pool: address
      poolName: name
      tokens: poolTokens {
        denomWeight
        amount
        coin {
          denom
          address
          symbol
          decimals
        }
      }
      swapFee
      sharesDenom
      sharesAddress
      totalShares
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
      where: { pool: $poolDenom type_in: $type }
      orderBy: timestamp 
      orderDirection:desc
    ) {
      id
      type
      timestamp
      liquidity {
        amount
        swapDirection
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

export const getAllLiquidityChanged = gql`
  query GetAllLiquidityChanged($page: Int!, $limit: Int!, $poolDenom: String) {
    liquidityChangeds(skip: $page first: $limit where: { pool: $poolDenom } orderBy: timestamp orderDirection:desc) {
      id
      type
      timestamp
      liquidity {
        amount
        swapDirection
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
