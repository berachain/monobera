import { useBeraJs } from "@bera/berajs";
import { perpsEndpoint } from "@bera/config";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

import type { TimeFrame } from "~/types/time";

export const useTradingSummaryChart = ({
  interval,
}: {
  interval: TimeFrame;
}) => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["tradingSummaryChart", account, interval];
  const { mutate } = useSWRConfig();
  const { isLoading } = useSWRImmutable(QUERY_KEY, async () => {
    if (account) {
      const res = await fetch(
        `${perpsEndpoint}/trading-summary/traders/${account}?count_back=${parseInt(
          interval,
          10,
        )}&resolution=1d`,
      );
      const data = await res.json();
      const tradingSummary = data.result.reverse();
      return tradingSummary;
    }
    return undefined;
  });

  const useChart = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data;
  };

  const useTotalVolume = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data?.reduce((acc: number, position: any) => {
      return acc + Number(position.volume);
    }, 0);
  };

  const useTotalPnl = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    return data?.reduce((acc: number, position: any) => {
      return acc + Number(position.pnl);
    }, 0);
  };

  return {
    isLoading,
    refetch: () => void mutate(QUERY_KEY),
    useChart,
    useTotalVolume,
    useTotalPnl,
  };
};
