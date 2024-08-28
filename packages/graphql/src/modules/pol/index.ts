import { gql } from "@apollo/client";

export const GetTotalBgtDistributed = gql`
  query {
    globalInfo(id: "global") {
      id
      totalBGTDistributed
    }
  }
`;

export const GetBgtInflation = gql`
  query {
    globalInfo(id: "global") {
      id
      rewardRate
      baseRewardRate
    }
  }
`;

export const GetUserValidatorInformation = gql`
  query GetUserValidatorInformation($address: String!) {
    userValidatorInformations(where: { user: $address }) {
      id
      amountQueued
      amountDeposited
      latestBlock
      user
      coinbase
    }
  }
`;

export const GetValidValidator = gql`
  query GetValidValidator($address: String!) {
    validator(id: $address) {
      coinbase
    }
  }
`;

export const GetValidators = gql`
  query GetAllValidators {
    validators(first: 1000, orderDirection: desc, orderBy: amountStaked) {
      coinbase
      amountStaked
    }
  }
`;

// Use for cumulative BGT delegated to validator
export const GetValidatorBgtStaked = gql`
  query GetValidatorBgtStaked($address: Bytes!, $timestamp: Timestamp!) {
    validatorBgtStaked: validatorBGTStakeds(
      interval: day
      where: { coinbase: $address, timestamp_gte: $timestamp }
    ) {
      allTimeBgtStaked
      bgtStaked
      coinbase
      timestamp
    }
  }
`;

// Use for stake flow (bgt delegated to validator +/- per day)
// TODO: Ask for aggregated data for each day instead of individual data points or limited by 1000 query list limit
export const GetValidatorBgtStakedDelta = gql`
  query GetValidatorBgtStakedDelta($address: Bytes!, $timestamp: Timestamp!) {
    validatorBgtStakedDelta: validatorBGTStakedDataPoints(
      where: { coinbase: $address, timestamp_gte: $timestamp }
    ) {
      amountStaked
      coinbase
      timestamp
    }
  }
`;

// Use for BGT distributed to users and commission earned daily
// Deprecated: Use GetValidatorBlockRewardStats instead which has dynamic commissions earned
export const GetValidatorBgtUsage = gql`
  query GetValidatorBgtUsage($address: String!, $timestamp: Timestamp!) {
    validatorUsages(
      interval: day
      where: { validator: $address, timestamp_gte: $timestamp }
    ) {
      bgtDirected
      timestamp
      allTimeBgtDirected
      allTimeUsdValueBgtDirected
      validator {
        commission
      }
    }
  }
`;

// Use for BGT distributed to users and commission earned daily
export const GetValidatorBlockRewardStats = gql`
  query GetValidatorBlockRewardStats(
    $address: String!
    $timestamp: Timestamp!
  ) {
    blockRewardStatsByValidators(
      interval: day
      where: { validator: $address, timestamp_gte: $timestamp }
    ) {
      timestamp
      rewardRate
      commissionRate
      validator {
        coinbase
      }
    }
  }
`;

// Use for Incentives earned graph and for validators incentives token table
export const GetValidatorTokenRewardUsages = gql`
  query GetValidatorTokenRewardUsages(
    $address: String!
    $timestamp: Timestamp!
  ) {
    validatorTokenRewardUsages(
      interval: day
      where: { validator: $address, timestamp_gte: $timestamp }
    ) {
      token {
        address
        id
        name
        symbol
        decimals
      }
      tokenRewarded
      usdValueTokenRewarded
      timestamp
      allTimeUsdValueTokenRewarded
      id
    }
    validatorUsages(interval: day, where: { validator: $address }, first: 1) {
      allTimeUsdValueTokenRewarded
    }
  }
`;

// Get for validator bgt boost delegated and queued tables
// TODO: Need to add pagination when available
export const GetValidatorBgtBoost = gql`
  query GetValidatorBgtBoost($address: String!) {
    userValidatorBoostQueued: userValidatorInformations(
      first: 10
      where: { validator: $address, amountQueued_gt: "0" }
      orderBy: amountQueued
      orderDirection: desc
    ) {
      amountQueued
      user
    }
    userValidatorBoostDeposited: userValidatorInformations(
      first: 10
      where: { validator: $address, amountDeposited_gt: "0" }
      orderBy: amountDeposited
      orderDirection: desc
    ) {
      amountDeposited
      user
    }
  }
`;

// Get latest stats for validator block signing numbers
export const GetValidatorBlockStats = gql`
  query GetValidatorBlockStats($address: String = "") {
    blockStatsByValidators(
      interval: hour
      first: 1
      where: { validator: $address }
    ) {
      allTimeblockCount
    }
    blockStats_collection(interval: hour, first: 1) {
      allTimeblockCount
    }
  }
`;

export const GetAllValidatorBlockCount = gql`
  query GetAllValidatorBlockCount($timestamp: Timestamp) {
    blockStatsByValidators(
      interval: hour
      first: 1000
      where: { timestamp_gte: $timestamp }
    ) {
      allTimeblockCount
      validator {
        coinbase
      }
      timestamp
    }
  }
`;
