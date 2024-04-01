import { crocIndexerEndpoint } from "@bera/config";
import { type PoolDayDataV2 } from "@bera/graphql";
import { useAnalytics } from "@bera/shared-ui";
import useSWRImmutable from "swr/immutable";

interface PoolHistoryResponse_Info {
  id?: string;
  poolIdx?: string;
  base?: string;
  quote?: string;
  timeCreate?: string;
  baseInfo?: {
    id?: string;
    address?: string;
    symbol?: string;
    name?: string;
    decimals?: number;
  };
  quoteInfo?: {
    id?: string;
    address?: string;
    symbol?: string;
    name?: string;
    decimals?: number;
  };
  template?: {
    feeRate?: number;
  };
  shareAddress?: {
    address?: string;
  };
}
interface PoolHistoryResponse {
  info: PoolHistoryResponse_Info;
  history: PoolDayDataV2[];
}

export const usePoolHistory = ({ shareAddress }: { shareAddress: string }) => {
  const { captureException } = useAnalytics();

  const QUERY_KEY = ["pool_history", shareAddress];
  const { isLoading, isValidating, mutate } = useSWRImmutable<
    PoolDayDataV2[],
    any,
    any
  >(QUERY_KEY, () => {
    if (!shareAddress) return;
    return fetch(
      `${crocIndexerEndpoint}/v2/pool_history/${shareAddress}?days=90`,
    )
      .then((data) => data.json())
      .then((data) => {
        return data?.data;
      })
      .catch((e) => {
        captureException(e);
      });
  });

  const usePoolHistoryData = () => {
    return useSWRImmutable<PoolHistoryResponse, any, any>(QUERY_KEY);
  };

  return {
    refetch: () => void mutate(),
    isLoading,
    isValidating,
    usePoolHistoryData,
  };
};
