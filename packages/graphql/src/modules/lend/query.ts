import { gql } from "@apollo/client";

export const GetHistoryDayRates = gql`
  query GetHistoryDayRates($timestamp_gt: Int!) {
    historyDayRates(
      where: { timestamp_gt: $timestamp_gt }
      orderBy: timestamp
      orderDirection: asc
    ) {
      id
      timestamp
      reserve
      supplyRates
      borrowRates
    }
  }
`;

export const GetHistoryHourRates = gql`
  query GetHistoryHourRates($timestamp_gt: Int!) {
    historyHourRates(
      where: { timestamp_gt: $timestamp_gt }
      orderBy: timestamp
      orderDirection: asc
    ) {
      id
      timestamp
      reserve
      supplyRates
      borrowRates
    }
  }
`;

export const GetTest = gql`
  query GetTest {
    historyHourRates {
      id
      timestamp
      reserve
      supplyRates
      borrowRates
    }
  }
`;
