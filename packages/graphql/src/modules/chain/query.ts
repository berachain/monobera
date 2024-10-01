import { gql } from "@apollo/client";

export const GetBlocksTimeStampDocument = gql`
  query GetBlocksTimeStamp($skip: Int!) {
    newest: blocks(first: 1) {
      timestamp
      number
    }
    oldest: blocks(first: 1, skip: $skip) {
      timestamp
      number
    }
  }
`;
