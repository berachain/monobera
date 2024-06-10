import { perpsEndpoint } from "@bera/config";
import { useSWRConfig } from "swr";
import useSWRImmutable from "swr/immutable";
import { useBeraJs } from "@bera/berajs";

export const usePollVaultEarnings = () => {
  const { account } = useBeraJs();
  const QUERY_KEY = ["vaultEarnings", account];
  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWRImmutable(QUERY_KEY, async () => {
    if (account) {
      const res = await fetch(`${perpsEndpoint}/vaultearnings/${account}`);
      const data = await res.json();
      return data?.earnings;
    }
  });

  return {
    isLoading,
    refetch: () => void mutate(QUERY_KEY),
    data,
  };
};
