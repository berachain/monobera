import { dexClient, getInflationData, type InflationRate } from "@bera/graphql";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";

import POLLING from "~/config/constants/polling";

export const usePollBgtInflation = () => {
  const method = "bgtInflation";
  const QUERY_KEY = [method];
  useSWR(
    QUERY_KEY,
    async () => {
      const inflationData: InflationRate | undefined = await dexClient
        .query({
          query: getInflationData,
          variables: {
            page: 0,
            limit: 20,
          },
        })
        .then((res: any) => {
          const positiveInflationData = res.data.inflationRates.find(
            (inflationData: InflationRate) =>
              Number(inflationData.difference) > 0,
          );
          return positiveInflationData;
        })
        .catch((e: any) => {
          console.log(e);
          return undefined;
        });

      return inflationData;
    },
    {
      refreshInterval: POLLING.SLOW,
    },
  );

  const useInflationData = () => {
    const { data = undefined } = useSWRImmutable<InflationRate | undefined>(
      QUERY_KEY,
    );
    return data;
  };

  return {
    useInflationData,
  };
};
