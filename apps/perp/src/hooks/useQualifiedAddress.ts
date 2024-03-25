import { perpsCompetitionId, perpsEndpoint } from "@bera/config";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";

export const useQualifiedAddress = ({ wallet = "" }: { wallet: string }) => {
  const QUERY_KEY = ["validAddress", wallet];
  const { mutate } = useSWRConfig();
  const { isLoading, isValidating } = useSWRImmutable(QUERY_KEY, async () => {
    const res = await fetch(
      `${perpsEndpoint}/trading-comp-rankings/${wallet}?comp_id=${perpsCompetitionId}`,
    );
    const data = await res.json();
    return data;
  });

  const useIsQualifiedAddress = () => {
    const { data } = useSWRImmutable(QUERY_KEY);
    const { result } = data || {};
    if (!result && data?.message) {
      return "";
    }
    return result;
  };

  return {
    isLoading,
    isValidating,
    refetch: () => void mutate(QUERY_KEY),
    useIsQualifiedAddress,
  };
};
