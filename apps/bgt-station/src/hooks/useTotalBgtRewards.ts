import { useBeraJs } from "@bera/berajs";
import { POLLING } from "@bera/shared-ui";
import useSWR from "swr";

export const useTotalBgtRewards = (): any => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["useTotalBgtRewards", account];
  const swrResponse = useSWR<
    | {
        totalBgtRewards: number;
        topVaults: {
          gauge: any;
          amount: number;
        }[];
      }
    | undefined
  >(
    QUERY_KEY,
    async () => {
      if (!account) return undefined;
      return {
        totalBgtRewards: 0,
        topVaults: [
          {
            gauge: {
              address: "0x21",
              symbol: "",
              name: "",
              decimals: 0,
            },
            amount: 0,
          },
        ],
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
