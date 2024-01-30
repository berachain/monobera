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

export const GetSupplyDay = gql`
  query GetSupplyDay($timestamp_gt: Int!) {
    honeySupplyDayDatas(
      where: { timestamp_gt: $timestamp_gt }
      orderBy: timestamp
      orderDirection: asc
    ) {
      id
      timestamp
      amount
    }
  }
`;

export const GetSupplyHour = gql`
  query GetSupplyHour($timestamp_gt: Int!) {
    honeySupplyHourDatas(
      where: { timestamp_gt: $timestamp_gt }
      orderBy: timestamp
      orderDirection: asc
    ) {
      id
      timestamp
      amount
    }
  }
`;

export const GetVolumeDay = gql`
  query GetVolumeDay($timestamp_gt: Int!) {
    honeyVolumeDayDatas(
      where: { timestamp_gt: $timestamp_gt }
      orderBy: timestamp
      orderDirection: asc
    ) {
      id
      timestamp
      amount
    }
  }
`;

export const GetVolumeHour = gql`
  query GetVolumeHour($timestamp_gt: Int!) {
    honeyVolumeHourDatas(
      where: { timestamp_gt: $timestamp_gt }
      orderBy: timestamp
      orderDirection: asc
    ) {
      id
      timestamp
      amount
    }
  }
`;

export const GetGlobalData = gql`
  query GetGlobalData {
    honeyVolumeDayDatas(first: 1, orderBy: timestamp, orderDirection: desc) {
      id
      timestamp
      amount
    }
    honeySupplyHourDatas(first: 1, orderBy: timestamp, orderDirection: desc) {
      id
      timestamp
      amount
    }
  }
`;
