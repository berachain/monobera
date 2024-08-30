import useSWR from "swr";
import { DefaultHookOptions, DefaultHookReturnType } from "~/types/global";
import { beraTokenAddress, bgtSubgraphUrl } from "@bera/config";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { GetWeeklyBgtInflation } from "@bera/graphql";

export interface BgtInflation {
  bgtPerYear: number;
  usdPerYear: number;
}

export const useBgtInflation = (
  options?: DefaultHookOptions,
): DefaultHookReturnType<BgtInflation | undefined> => {
  const QUERY_KEY = ["bgtInflation"];
  const swrResponse = useSWR<BgtInflation | undefined>(
    QUERY_KEY,
    async () => {
      const bgtClient = new ApolloClient({
        uri: bgtSubgraphUrl,
        cache: new InMemoryCache(),
      });
      return await bgtClient
        .query({
          query: GetWeeklyBgtInflation,
          variables: {
            wbera: beraTokenAddress.toLowerCase(),
          },
        })
        .then((res: any) => {
          const weeklyInflationArray = res.data.globalIncentivesUsages;
          const avgDailyInflation =
            calculateAverageInflation(weeklyInflationArray);
          const annualizedInflation =
            calculateAnnualizedInflation(avgDailyInflation);
          return {
            bgtPerYear: annualizedInflation,
            usdPerYear:
              annualizedInflation *
              parseFloat(res.data.tokenInformation.usdValue),
          };
        })
        .catch((e: any) => {
          console.log(e);
          return undefined;
        });
    },
    {
      ...options,
      refreshInterval: 0,
    },
  );

  return {
    ...swrResponse,
    refresh: () => swrResponse.mutate(),
  };
};

function calculateAverageInflation(inflationArray: string[]): number {
  if (inflationArray.length === 0) return 0;
  const sum = inflationArray.reduce(
    (acc, val: any) => acc + parseFloat(val.bgtDistributed),
    0,
  );
  return sum / inflationArray.length;
}

function calculateAnnualizedInflation(avgDailyInflation: number): number {
  return avgDailyInflation * 365;
}
