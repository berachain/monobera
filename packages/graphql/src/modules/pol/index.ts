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
    userValidatorInformations(where: { user: $address, limit: 1000 }) {
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
