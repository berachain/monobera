import { gql } from "@apollo/client";

export const GetBlocksTimeStampDocument = gql`
  query GetBlocksTimeStamp($skip: Int!) {
    newest: blocks(first: 1, orderBy: timestamp, orderDirection: desc) {
      timestamp
      number
    }
    oldest: blocks(
      first: 1
      orderBy: timestamp
      orderDirection: desc
      skip: $skip
    ) {
      timestamp
      number
    }
  }
`;
