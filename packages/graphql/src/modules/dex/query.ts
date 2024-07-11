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

export const getTokenHoneyPriceReq = gql`
  query GetTokenHoneyPrice($id: String) {
    tokenHoneyPrice(id: $id) {
      id
      price
    }
  }
`;

export const getTokenHoneyPricesReq = gql`
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

export const getPoolList = gql`
  query GetPoolList($page: Int!, $limit: Int!) {
    pools(
      skip: $page
      first: $limit
      orderBy: timeCreate
      orderDirection: desc
    ) {
      id
      poolIdx
      base
      quote
      timeCreate
      template {
        feeRate
      }
      baseInfo {
        id
        address
        symbol
        name
        decimals
      }
      quoteInfo {
        id
        address
        symbol
        name
        decimals
      }
    }
  }
`;

export const searchFilteredPoolList = gql`
  query GetPoolList(
    $baseAssets: [Bytes!]
    $quoteAssets: [Bytes!]
    $keyword: String
  ) {
    pools(
      where: {
        or: [
          {
            base_in: $baseAssets
            quote_in: $quoteAssets
            baseInfo_: { name_contains_nocase: $keyword }
          }
          {
            base_in: $baseAssets
            quote_in: $quoteAssets
            baseInfo_: { symbol_contains_nocase: $keyword }
          }
          {
            base_in: $baseAssets
            quote_in: $quoteAssets
            quoteInfo_: { name_contains_nocase: $keyword }
          }
          {
            base_in: $baseAssets
            quote_in: $quoteAssets
            quoteInfo_: { symbol_contains_nocase: $keyword }
          }
        ]
      }
    ) {
      id
      poolIdx
      base
      quote
      timeCreate
      template {
        feeRate
      }
      baseInfo {
        id
        address
        symbol
        name
        decimals
      }
      quoteInfo {
        id
        address
        symbol
        name
        decimals
      }
      shareAddress {
        address
      }
    }
  }
`;

export const getCrocSelectedPool = gql`
  query GetPoolList($baseAsset: Bytes!, $quoteAsset: Bytes!) {
    pools(where: { base: $baseAsset, quote: $quoteAsset }) {
      id
      poolIdx
      base
      quote
      timeCreate
      template {
        feeRate
      }
      baseInfo {
        id
        address
        symbol
        name
        decimals
      }
      quoteInfo {
        id
        address
        symbol
        name
        decimals
      }
    }
  }
`;

export const getRecentSwaps = gql`
  query GetRecentSwaps($poolHash: Bytes!) {
    swaps(
      first: 50
      orderBy: time
      orderDirection: desc
      where: { pool: $poolHash }
    ) {
      user
      baseFlow
      quoteFlow
      transactionHash
      time
      baseAssetUsdPrice
      quoteAssetUsdPrice
    }
  }
`;

export const getRecentProvisions = gql`
  query GetRecentProvisions($poolHash: Bytes!) {
    liquidityChanges(
      first: 50
      orderBy: time
      orderDirection: desc
      where: { pool: $poolHash }
    ) {
      user
      baseFlow
      quoteFlow
      changeType
      transactionHash
      time
      baseAssetUsdPrice
      quoteAssetUsdPrice
    }
  }
`;

// NEW QUERIES

export const getFilteredPools = gql`
 query GetPoolList(
    $keyword: String
    $skip: Int!
    $first: Int!
    $order: String
    $orderDirection: String
  ) {
    pools(where: {or: [
        {baseInfo_: {name_contains_nocase: $keyword}},
        {baseInfo_: {symbol_contains_nocase: $keyword}},
        {baseInfo_: {address_contains: $keyword}},
        {quoteInfo_: {name_contains_nocase: $keyword}},
        {quoteInfo_: {symbol_contains_nocase: $keyword}},
				{quoteInfo_: {address_contains: $keyword}},
      	{shareAddress_: {address_contains: $keyword}}
    ]},
    orderBy: $order,
    orderDirection: $orderDirection,
    skip: $skip,
    first: $first
    ) {
      id
      poolIdx
      base
      quote
      timeCreate
      tvlUsd
      baseAmount
      quoteAmount
      bgtApy
      template {
        feeRate
      }
      baseInfo {
        id
        address
        symbol
        name
        decimals
        usdValue
        beraValue
      }
      quoteInfo {
        id
        address
        symbol
        name
        decimals
        usdValue
        beraValue
      }
      shareAddress {
        address
      }
      vault {
        id
        vaultAddress
      }
      latestPoolDayData {
        tvlUsd
        feesUsd
        volumeUsd
      }
    }
  }
`;

export const GetHomepageData = gql`
query HomepageData($beraAddress: String) {
  bexGlobalData(id: "global") {
    tvlUsd
  }
  bexGlobalDayDatas(orderBy: date, orderDirection: desc, first: 1) {
    volumeUsd
  }
  globalInfo(id: "global") {
    totalBGTDistributed
  }
  tokenInformations(where: {address_contains: $beraAddress}) {
    usdValue
  }
}
`;

export const GetUserPools = gql`
query UserPools($user: String) {
  userPools(id: $user) {
    depositedPools {
      pool {
        id
        poolIdx
        base
        quote
        timeCreate
        tvlUsd
        baseAmount
        quoteAmount
        bgtApy
        template {
          feeRate
        }
        baseInfo {
          id
          address
          symbol
          name
          decimals
          usdValue
          beraValue
        }
        quoteInfo {
          id
          address
          symbol
          name
          decimals
          usdValue
          beraValue
        }
        shareAddress {
          address
        }
        latestPoolDayData {
          tvlUsd
          feesUsd
          volumeUsd
        }
        vault {
          id
          vaultAddress
        }
      }
    }
  }
}
`;

export const getSelectedPool = gql`
query GetPoolList($shareAddress: String) {
  pools(where: {shareAddress_: {address_contains: $shareAddress}}) {
    id
    poolIdx
    base
    quote
    timeCreate
    tvlUsd
    baseAmount
    quoteAmount
    bgtApy
    template {
      feeRate
    }
    baseInfo {
      id
      address
      symbol
      name
      decimals
      usdValue
      beraValue
    }
    quoteInfo {
      id
      address
      symbol
      name
      decimals
      usdValue
      beraValue
    }
    shareAddress {
      address
    }
    latestPoolDayData {
      tvlUsd
      feesUsd
      volumeUsd
    }
    vault {
      id
      vaultAddress
    }
  }
}
`;

export const GetTokenInformation = gql`
query GetTokenInformation($id: String) {
  tokenInformation(id: $id) {
    id
    address
    symbol
    name
    decimals
    usdValue
    beraValue
  }
}
`;

export const GetTokenInformations = gql`
query GetTokenInformation($ids: [String!]) {
  tokenInformations(where: {address_in: $ids}) {
    id
    address
    symbol
    name
    decimals
    usdValue
    beraValue
  }
}
`;

export const GetPoolDayDatas = gql`
query PoolDayData($poolId: String) {
  poolDayDatas(where: {pool: $poolId}, orderBy: date, orderDirection: desc) {
    date
    tvlUsd
    volumeUsd
    feesUsd
  }
}
`;

export const GetPoolCount = gql`
query PoolCount {
  bexGlobalData(id: "global") {
    poolCount
  }
}
`;
