import { gql } from "@apollo/client";

export const GetHoneyTxnByType = gql`
  query GetHoneyTxnByType($page: Int!, $limit: Int!, $txnType: String!) {
    honeyTxns(
      skip: $page
      first: $limit
      orderBy: timestamp
      orderDirection: desc
      where: { txnType: $txnType }
    ) {
      id
      timestamp
      from
      to
      collateral
      collateralAmount
      honeyAmount
      txnType
    }
  }
`;

export const GetHoneyTxn = gql`
  query GetHoneyTxn($page: Int!, $limit: Int!) {
    honeyTxns(
      skip: $page
      first: $limit
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      timestamp
      from
      to
      collateral
      collateralAmount
      honeyAmount
      txnType
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
