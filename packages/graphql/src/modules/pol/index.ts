import { gql } from "@apollo/client";

export const GetTotalBgtDistributed = gql`
  query {
    globalInfo(id:"global") {
        id
        totalBGTDistributed
    }
}
`;
