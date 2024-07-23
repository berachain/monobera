import { Token, useBeraJs } from "@bera/berajs";
import { POLLING } from "@bera/shared-ui";
import useSWR from "swr";

export const useClaimableIncetives = (): any => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["useClaimableIncetives", account];
  const swrResponse = useSWR<
    | {
        tokenList: Token[];
        topIncentives: {
          token: Token;
          amount: number;
        }[];
        honeyValue: number;
      }
    | undefined
  >(
    QUERY_KEY,
    async () => {
      if (!account) return undefined;
      return {
        tokenList: [],
        topIncentives: [
          {
            token: {
              address: "0x21",
              symbol: "",
              name: "",
              decimals: 0,
            },
            amount: 0,
          },
        ],
        honeyValue: 0,
      };
    },
    {
      refreshInterval: POLLING.SLOW * 2,
    },
  );
  return {
    ...swrResponse,
    refresh: () => swrResponse?.mutate?.(),
  };
};
